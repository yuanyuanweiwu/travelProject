<template>
  <div class="Aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{data.dep_date}}</div>
        <div>{{data.org_city_name}}-{{data.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-step" align="middle">
        <el-col :span="5" class="flight-airport">
          <strong>{{data.dep_time}}</strong>
          <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--{{rankTime}}--</span>
          <span>{{data.airline_name}}{{data.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{data.arr_time}}</strong>
          <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
        </el-col>
      </el-row>
      <el-row class="info-bar" type="flex" justify="space-between">
        <span>订单总价</span>
        <span>金额</span>
        <span>数量</span>
      </el-row>
      <el-row class="info-bar" type="flex" justify="space-between">
        <span>成人机票</span>
        <span>¥ {{data.seat_infos.org_settle_price}}</span>
        <!-- <span>{{count}}</span> -->
        <span>{{this.$store.state.air.count}}</span>
      </el-row>
      <el-row class="info-bar" type="flex" justify="space-between">
        <span>机建+燃油</span>
        <span>¥{{data.airport_tax_audlet}}/人/单程</span>
        <!-- <span>{{count}}</span> -->
        <span>{{this.$store.state.air.count}}</span>
      </el-row>
      <el-row class="info-bar" type="flex" justify="space-between" align="middle">
        <span>应付总额</span>
        <!-- <span class="totalnumber">¥{{allPrice}}</span> -->
        <span class="totalnumber">¥{{this.$store.state.air.allPrice}}</span>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    allPrice: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 1
    }
  },
  mounted() {},
  computed: {
    rankTime() {
      if (!this.data.arr_time) return "";
      let dep_time = this.data.dep_time.split(":");
      let arr_time = this.data.arr_time.split(":");

      if (dep_time[0] > arr_time[0]) {
        arr_time[0] +=24;
      }

      let dep_minutes = dep_time[0] * 60 + +dep_time[1];
      let arr_minutes = arr_time[0] * 60 + +arr_time[1];

      let hours = Math.floor((arr_minutes - dep_minutes) / 60);
      let minuts = (dep_minutes - arr_minutes) % 60;
      return `${hours}小时${minuts}分钟`;
    }
  }
};
</script>
<style lang="less" scoped>
.Aside {
  width: 350px;
  height: fit-content;
  border: 1px solid #ddd;

  .air-info {
    padding: 15px;

    .info-top {
      margin-bottom: 15px;
      > div:last-child {
        font-size: 14px;
      }
    }
    .info-step {
      border-bottom: 1px dashed #ddd;
      padding-bottom: 10px;
      .flight-airport {
        strong {
          display: block;
          font-size: 22px;
          font-weight: normal;
        }
        span {
          color: #999;
          font-size: 12px;
        }
      }
      .flight-time {
        color: #999;

        span {
          display: block;
          font-size: 12px;
          text-align: center;
        }
      }
    }
    .info-bar {
      color: #666;
      font-size: 14px;
      padding: 10px 5px;
      border-bottom: 1px dashed #ddd;
      &:last-child {
        border-bottom: none;
      }
      .totalnumber {
        font-size: 22px;
        color: orange;
      }
    }
  }
}
</style>
