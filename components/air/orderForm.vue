<template>
  <div class="main">
    <div class="air-colum">
      <!-- 乘机信息 -->
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1" :checked="true"></el-option>
                <el-option label="小孩" value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.userId">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <span class="delete-user" @click="handleDeleteUse(index)">X</span>
        </div>
      </el-form>
      <el-button type="primary" class="addu" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 保险 -->
    <div class="air-colum">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`"
            border
            @change="handleInsurances(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="air-colum">
      <h2>联系人</h2>
      <div class="contact">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="contactPhone">
              <el-button slot="append" @click="handleSendCaptcha">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import orderVue from "../../pages/air/order.vue";
export default {
  data() {
    return {
      users: [
        {
          username: "张三",
          userId: "123"
        }
      ],
      insurances: [], // 保险数据
      contactName: "张三", // 联系人名字
      contactPhone: "15007897685", // 联系人电话
      captcha: "000000", // 验证码
      invoice: false, // 发票
      select: "",
      selects: [{ value: 1, label: "身份证" }, { value: 2, label: "护照" }],
      labelPosition: "left"
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users = [...this.users, { username: "", userId: "" }];
    },

    // 移除乘机人
    handleDeleteUse(index) {
      this.users.splice(index, 1);
    },
    //保险
    handleInsurances(id) {
      if (this.insurances.indexOf(id) > -1) {
        let arr = this.insurances.slice(0);
        arr.splice(this.insurances.indexOf(id), 1);
        this.insurances - arr;
      } else {
        this.insurances = [...new Set([...this.insurances, id])];
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (!/^1[3-9]\d{9}$/.test(this.contactPhone)) {
        this.$confirm("手机号码错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        this.$confirm(`模拟手机验证码为：${res.data.data}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      const rules = {
        planUsers: {
          value: this.users,
          message: "请填写乘机人"
        },
        contactNames: {
          value: this.contactName,
          message: "请填写联系人"
        },
        contactPhones: {
          value: this.contactPhone,
          message: "请填写联系电话"
        },
        contactCaptchs: {
          value: this.captcha,
          message: "请填写验证码"
        }
      };
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        const item = rules[v];
        if (!item.value) {
          valid = false;
          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
      if (!valid) {
        return;
      }

      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id
      };

      const {
        user: { userInfo }
      } = this.$store.state;
      this.$message({
        message: "正在生成订单,请稍后",
        type: "success"
      });
      this.$axios({
        url: `/airorders`,
        method: "POST",
        data: orderData,
        headers: {
          Authorization: `Bearer ${userInfo.token || "NO TOKEN"}`
        }
      })
        .then(res => {
          // 跳转到付款页
          this.$router.push({
            path: "/air/pay"
          });
        })

        .catch(err => {
          console.log(err);

          const { message } = err.response.data;
          this.$confirm(message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.air-colum {
  border-bottom: 1px dashed rgb(163, 161, 161);
  padding-bottom: 20px;
  margin-bottom: 10px;

  h2 {
    font-weight: normal;
    font-size: 22px;
    margin-bottom: 15px;
  }
  /deep/ .el-input-group__prepend {
    width: 100px;
    background-color: #fff;
  }

  .member-info-item {
    border-bottom: 1px #eee dashed;
    padding-bottom: 20px;
    position: relative;

    .delete-user {
      position: absolute;
      top: 50%;
      right: -30px;
      display: block;
      font-size: 18px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      background-color: lightblue;
      border-radius: 3px;
      cursor: pointer;
    }
    &:first-child {
      .delete-user {
        display: none;
      }
    }
  }
  .add-member {
    margin-top: 20px;
  }
  .addu {
    margin-top: 10px;
  }
}
.input-with-select {
  background-color: #fff;
}
.contact {
}
.submit {
  width: 200px;
  height: 50px;
  margin: 20px auto;
  display: block;
}
</style>
