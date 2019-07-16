<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <el-row type="flex" justify="center" class="main">
        <div class="form-wrapper">
          <!-- 表单头部tab -->
          <el-row type="flex" justify="center" class="tabs">
            <span :class="{active: currentTab === 0}" :key="0" @click="handleChangeTab(0)">
              <i class="iconfont icondancheng"></i>
              单程
            </span>
            <span :class="{active: currentTab === 1}" @click="handleChangeTab(1)" :key="1">
              <i class="iconfont iconshuangxiang"></i>
              往返
            </span>
          </el-row>

          <searchForm v-if="currentTab == 0" class="search" />
        </div>
      </el-row>

      <!-- banner广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>

    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item, index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>￥699</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import searchForm from "@/components/air/searchForm";
export default {
  data() {
    return {
      currentTab: 0,
      sales: [
        {
          cover:
            "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg",
          departCity: "广州",
          departCode: "CAN",
          departDate: "2019-06-17",
          destCity: "上海",
          destCode: "SHA",
          price: 760
        }
      ]
    };
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  },
  mounted() {
    this.$axios({
      url: `/airs/sale`
    }).then(res => {
      this.sales = res.data.data;
    });
  },
  components: {
    searchForm
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  .main {
    width: 360px;
    height: 350px;
    position: relative;
    border: 1px solid #ddd;
    box-sizing: border-box;
    .form-wrapper {
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);

      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          background-color: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          border-top: 3px solid #eee;
          &.active {
            color: orange;
            border-top-color: orange;
            background-color: #ffffff;
            font-weight: blod;
          }
        }
      }
      .search {
        padding: 15px 50px 15px 15px;
        position: relative;
      }
    }
  }

  .air-title {
    margin: 14px 0;
    color: orange;
    font-size: 20px;
    font-weight: normal;
    > span {
      font-size: 20px;
    }
  }
  .statement {
    margin: 15px 0;
    border: 1px solid #ddd;
    background: #f5f5f5;
    height: 58px;
    padding: 10px 0;
    box-sizing: border-box;
    > div {
      text-align: center;
      line-height: 38px;
      border-right: 1px solid #ddd;

      &:last-child {
        border-right: none;
      }
      * {
        vertical-align: middle;
      }
      i {
        font-size: 30px;
      }
    }
  }
  .air-sale-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: #409ef4;
    span {
      font-size: 20px;
    }
  }
  .air-sale {
    border: 1px #ddd solid;
    padding: 20px;
    margin-bottom: 50px;

    .air-sale-pic {
      > div {
        width: 225px;
        height: 140px;
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
        }

        .layer-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          height: 30px;
          line-height: 30px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 15px;
          font-size: 14px;

          span:last-child {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
