<template>
  <div class="container">
    <div class="main">
      <!-- logo -->
      <div class="logo">
        <a href="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </a>
      </div>
      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">机票</nuxt-link>
      </el-row>
      <!-- 右侧登录 -->
      <div>
        <el-row>
          <div v-if="!$store.state.user.userInfo.token">
            <nuxt-link to="/user/login">登陆/注册</nuxt-link>
          </div>
          <div  class="dr" v-else>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt= />
                {{$store.state.user.userInfo.user.nickname}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="handleOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOut() {
      const { commit } = this.$store;
      commit("user/clearUserInfo");
      this.$message({
        message: "退出成功",
        type: "success"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  box-shadow: 0 2px 2px #dddddd;
  .main {
    height: 60px;
    line-height: 60px;
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .logo {
      margin-right: 20px;
      img {
        width: 156px;
        height: 42px;
        vertical-align: middle;
      }
    }
    .navs {
      flex: 1;

      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;

        &:hover {
          color: #409eff;
          border-bottom: 5px #409eff solid;
        }
      }

      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }

    .el-dropdown-link {
      img {
        width: 36px;
        height: 38px;
        vertical-align: middle;
      }
    }
  }
  .dr{
    cursor: pointer;
  }
}
</style>
