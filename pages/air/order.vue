<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrederForm  :data='infoData'/>
      </div>
      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>
<script>
import OrederForm from "@/components/air/orderForm";
export default {
  components: {
    OrederForm
  },
  data() {
    return {
      infoData: {
        insurances: []
      }
    };
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
      console.log(this.infoData);
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
