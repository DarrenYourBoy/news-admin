<template>
  <el-row class="container" type="flex" justify="center" align="middle">
    <div class="form-wrap">
      <h3>登录</h3>
      <el-form
        status-icon
        label-width="100px"
        class="demo-ruleForm form-container"
        :rules="rules"
        ref="formdata"
        :model="formdata"
      >
        <el-form-item label="账户" prop="username">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="primary" class="loginButton">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        password: "",
        username: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3到6个字符间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3到6个字符间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.formdata.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/login",
            method: "post",
            data: this.formdata
          }).then(res => {
            const { message, statusCode, data } = res.data;
            if (statusCode === 401) {
              this.$message.error(message);
            } else {
              this.$message.success(message);
              localStorage.setItem("user", JSON.stringify(data));
              setTimeout(()=>{
                this.$router.push("/");
              },1000)
            }
          });
        }else{

        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.container {
  position: absolute !important;
  top: 0;
  bottom: 0;
  width: 100%;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    margin-left: 100px;
  }
  .loginButton {
    width: 100%;
  }
}
.form-wrap {
  padding: 20px;
  border: 1px #ddd solid;
  border-radius: 10px;
  width: 400px;
  padding-right: 100px;
}
</style>