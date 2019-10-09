<template>
  <div>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <h3 class="logo">黑马头条</h3>
        <el-menu class="el-menu-vertical-demo" background-color="#d3dce6" text-color="#000">
          <el-submenu index="1">
            <template slot="title">
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="postList">文章列表</el-menu-item>
              <el-menu-item index="1-2" @click="postPublish">发布文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <img
            :src="$axios.defaults.baseURL+ user.head_img"
            alt
            class="headImg"
            style="cursor:pointer"
          />
          <span class="nickname">{{user.nickname}}</span>
          <!-- <span  style="cursor:pointer">退出</span> -->
          <el-button type="danger" class="logOut">退出</el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || "{}").user
    };
  },
  props: ["src"],
  methods: {
    postList() {
      this.$router.push("postList");
    },
    postPublish() {
      this.$router.push("postPublish");
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}
.aside {
  .logo {
    height: 60px;
    line-height: 60px;
    margin: 0;
    padding: 0;
  }
}
.header {
  text-align: right;
  line-height: 60px;
  * {
    vertical-align: middle;
  }
  .headImg {
    height: 38px;
    width: 38px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .nickname {
    margin: 0 10px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>