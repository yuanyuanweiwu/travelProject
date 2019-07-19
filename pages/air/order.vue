<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrederForm :data="infoData"  @setAllPrice='setAllPrice'/>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 通过父组件props传递 -->
        <OrederAside :data="infoData"  :allPrice='allPrice' :count='count'/>
        <!-- 通过Vuex传递 -->
        <!-- <OrederAside  /> -->
      </div>
    </el-row>
  </div>
</template>
<script>
import OrederForm from "@/components/air/orderForm";
import OrederAside from "@/components/air/orderAside";
export default {
  components: {
    OrederForm,
    OrederAside
  },
  data() {
    return {
      infoData: {
        insurances: [],
        seat_infos: {}
      },
      allPrice:0,
      count:0
    };
  },
  methods: {
    setAllPrice(value1,value2){
      this.allPrice=value1;
      this.count=value2
    }
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      this.infoData = res.data;
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.aside {
  width: 350px;
  height: fit-content;
  border: 1px solid #ddd;
}
</style>
