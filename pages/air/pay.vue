<template>
  <div class="container">
    <div class="main">
      <div class="pay-header">
        支付总金额
        <span>￥{{this.$store.state.air.allPrice}}</span>
      </div>
      <div class="pay-content">
        <h2>微信支付</h2>
        <el-row type="flex" justify="space-between" align="middle" class="pay-content-main">
          <div class="pay-qrcode">
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-weixin">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { async } from 'q';
export default {
  methods: {
    IsPay(data) {
     return  this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id: data.id,
          nonce_str: data.price,
          out_trade_no: data.orderNo
        },
        //  添加授权的头信息
        headers: {
          // 下面请求头信息不是通用的，针对当前的项目的（基于JWT token标准）
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const { trade_state } =res.data;
        if (trade_state === "NOTPAY") {
          return false;
        } else {
          return true;
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      const { id } = this.$route.query;
      const {
        user: { userInfo }
      } = this.$store.state;
      this.$axios({
        url: `airorders/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token || "NO TOKEN"}`
        }
      }).then(res => {
        const { payInfo, price } = res.data;
        // 创建二维码
        const stage = document.getElementById("qrcode-stage");
        QRCode.toCanvas(stage, payInfo.code_url, {
          width: 200
        });
        
        this.timer= setInterval( async() => {
            const pay = await this.IsPay(res.data);
            console.log(pay);
            
              if(pay){
                this.$message.success('订单支付完成');

                clearInterval(this.timer);
                return;
              }
        }, 3000);
      });
    }, 10);
  }
};
</script>

<style lang="less" scoped>
.container {
  background: #f5f5f5;
  padding: 30px 0;
  .main {
    width: 1000px;
    margin: 0 auto;
    .pay-header {
      text-align: right;
      font-size: 18px;
      padding-bottom: 5px;
      span {
        font-size: 26px;
        color: orangered;
      }
    }
    .pay-content {
      margin-top: 5px;
      border-top: 5px solid orange;
      padding: 15px;
      background: #fff;
      h2 {
        font-size: 26px;
        font-weight: normal;
      }

      .pay-content-main {
        padding: 0 80px;

        .pay-qrcode {
          border: 1px solid #ddd;
          padding: 15px;
          #qrcode-stage {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
          }
          p {
            line-height: 2;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
