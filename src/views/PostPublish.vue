<template>
  <div>
    <div class="bread">{{bread}}</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            v-for="(item,index) in allCategory"
            :key="index"
            v-if="item.id !== 999"
            :label="item.id"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          action="http://127.0.0.1:3000/upload"
          :headers="{
            Authorization :token
          }"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="form.type" label="1">文章</el-radio>
        <el-radio v-model="form.type" label="2">视频</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//富文本插件引入
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";

export default {
  data() {
    return {
      form: {
        title: "",
        cover: [],
        categories: [],
        content: "",
        type: "1"
      },
      allCategory: [],
      token: JSON.parse(localStorage.getItem("user") || "{}").token,
      config: {
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || "{}")
              .token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || "{}")
              .token
          },
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    handleRemove(file) {
      const { id } = file.response.data;
      let arr = [];
      this.form.cover.forEach(v => {
        if (v.id !== id) {
          arr.push(v);
        }
      });
      this.form.cover = arr;
    },
    onSubmit() {
      const categories = this.form.categories;
      this.form.categories = [];
      categories.forEach(v => {
        this.form.categories.push({ id: v });
      });
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;

      //通过接口发送
      this.$axios({
        url: "/post",
        method: "post",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || "{}").token
        },
        data: this.form
      }).then(res => {
        const { message } = res.data;
        if (message === "文章发布成功") {
          this.$message({
            message: message,
            type: "success"
          });
        } else {
          this.$message({
            message: message,
            type: "warning"
          });
        }
      });
      //发送完清空this.form.categories
      this.form = {
        title: "",
        cover: [],
        categories: [],
        content: "",
        type: "1"
      };
    },
    handleSuccess(res, file) {
      this.form.cover.push({
        id: res.data.id
      });
    }
  },
  computed: {
    bread() {
      const { matched } = this.$route;
      const arr = [];
      matched.forEach(v => {
        arr.push(v.meta);
      });
      return arr.join("/");
    }
  },
  mounted() {
    this.$axios({
      url: "/category",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user") || "{}").token
      }
    }).then(res => {
      const { data } = res.data;
      this.allCategory = data;
    });
  }
};
</script>

<style>
</style>