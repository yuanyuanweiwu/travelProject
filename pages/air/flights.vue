<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in datalist" :key="index" :data="item" />
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      flightsData: { flights: [], info: {}, options: {} },
      cacheFlightsData: { lights: [], info: {}, options: {} },
      //   datalist: [],
      total: 0,
      pageSize: 5,
      pageIndex: 1
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  computed: {
    datalist() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.flightsData.flights.slice(start, end);
    }
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data };

        this.setDataList();
      });
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
    },
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    setDataList(arr) {
      if (arr) {
        this.page = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }
    }
  },
  mounted() {
    this.getData();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getData();
  }
  //  watch: {
  //    $route(){
  //      this.getData()
  //    }
  //  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>