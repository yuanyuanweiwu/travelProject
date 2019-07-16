<template>
  <div class="flighters">
    <el-row type="flex" justify="space-between" align="middle" class="filters-top">
      <el-col :span="8">单程:{{data.info.departCity}}-{{data.info.destCity}}/{{data.info.departDate}}</el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ],
      airport: "",
      flightTimes: "",
      company: "",
      airSize: ""
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleAirport(value) {
     const arr=this.data.flights.filter(v=>{
         return v.org_airport_name==value
     })
     
     this.$emit('setDataList',arr);
    },
    handleFlightTimes() {},
    handleCompany() {},
    handleAirSize() {},
    handleFiltersCancel() {}
  }
};
</script>
<style lang="less" scoped>
.flighters {
  margin-bottom: 15px;
  .filters-top {
    > div {
      margin-left: 10px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
  .filter-cancel {
    margin-top: 5px;
  }
}
</style>
