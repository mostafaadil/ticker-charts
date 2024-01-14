<template >
  <div class="" style="padding: 0">

    <table style="text-align:center" id="chart-table" class="table unselectable   table-bordered table-hover  ">
      <thead>
        <tr style="background-color:grey;color: azure;">
          <td style="font-weight: bolder;font-size: 14px;">الإسم</td>
          <td style="font-weight: bolder;font-size: 14px;">التغير</td>
          <td style="font-weight: bolder;font-size: 14px;">نسبة التغيير</td>
          <td style="font-weight: bolder;font-size: 14px;">الاخر</td>
          <td style="font-weight: bolder;font-size: 14px;">أدنى</td>
          <td style="font-weight: bolder;font-size: 14px;">أعلى</td>
          <td style="font-weight: bolder;font-size: 14px;">القيمة</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>



        <tr>

          <td>{{ $store?.state?.tanse?.name?.toLocaleString() }} </td>
          <td>{{ $store?.state?.tanse?.change?.toLocaleString() }}</td>
          <td>{{ $store?.state?.tanse?.changePercent?.toLocaleString() }}</td>
          <td>{{ $store?.state?.tanse?.last?.toLocaleString() }}</td>
          <td :class="$store?.state?.tanse?.low">{{
            $store?.state?.tanse?.low?.toLocaleString() }}</td>
          <td :class="$store?.state?.tanse?.high?.toLocaleString()">{{ $store?.state?.tanse?.high?.toLocaleString()
          }}
          </td>
          <td :class="$store?.state?.tanse?.volumeClass">{{ $store?.state?.tanse?.amount?.toLocaleString() }}</td>
          <td></td>
          <td></td>

        </tr>


        <tr>
          <td>{{ $store?.state?.mt_stock?.name?.toLocaleString() }} </td>
          <td>{{ $store?.state?.mt_stock?.change?.toLocaleString() }}</td>
          <td>{{ $store?.state?.mt_stock?.changePercent?.toLocaleString() }}</td>
          <td>{{ $store?.state?.mt_stock?.last }}</td>
          <td :class="$store?.state?.mt_stock?.low?.toLocaleString()">{{
            $store?.state?.mt_stock?.low }}</td>
          <td :class="$store?.state?.mt_stock?.high">{{ $store?.state?.mt_stock?.high?.toLocaleString() }}
          </td>
          <td :class="$store?.state?.mt_stock?.volumeClass">{{ $store?.state?.mt_stock?.amount?.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <table style="text-align:center" id="chart-table"
      class="table unselectable  table-responsive  table-bordered table-hover  ">

      <thead style="position: sticky;top: 0" class="sticky-top">
        <tr style="background-color:black;color: azure;">
          <td style="font-weight: bolder;font-size: 14px;">الرمز</td>
          <td style="font-weight: bolder;font-size: 14px;">الإسم</td>
          <td style="font-weight: bolder;font-size: 14px;">السعر</td>
          <td style="font-weight: bolder;font-size: 14px;" v-if="this.$store.state.user_role == 'user'">أدنى</td>
          <td style="font-weight: bolder;font-size: 14px;">التغير</td>
          <td style="font-weight: bolder;font-size: 14px;">نسبة التغير</td>
          <td style="font-weight: bolder;font-size: 14px;">الحجم</td>
          <td style="font-weight: bolder;font-size: 14px;" v-if="this.$store.state.user_role == 'admin'">الإفتتاح</td>
          <td style="font-weight: bolder;font-size: 14px;" v-if="this.$store.state.user_role == 'admin'">أعلى</td>
          <td style="font-weight: bolder;font-size: 14px;" v-if="this.$store.state.user_role == 'admin'">أدنى</td>
          <td style="font-weight: bolder;font-size: 14px;" v-if="this.$store.state.user_role == 'admin'">الإغلاق</td>
        </tr>
      </thead>
      <td colspan="10" style="font-size: 19px; font-weight: bold; text-align:center;background-color: #009688">
        أسهم مرشح صعودها وبمخاطر منخفضة
      </td>
      <tbody>
        <tr class="" :key="row" v-for="(row) in $store.state.darkGreen">
          <td :class="row.symbolClass">{{ row.symbol }}</td>
          <td :class="row.nameClass" style="font-weight:bold">{{ row.name }}</td>

          <td :class="row.amountClass"> {{
            row.last ? row.last.toFixed(2) : row.last }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'user'">{{
              row.low.toFixed(2) }}</td>
          <td :class="row.changeClass">{{ row.change.toFixed(2) }}</td>
          <td :class="row.changePercentClass">{{ row.changePercent.toFixed(2) }}</td>
          <td :class="row.volumeClass">{{ row.volume.toLocaleString() }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.openClass">{{
            row.open.toFixed(2)
          }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.highClass">{{
            row.high.toFixed(2)
          }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'admin'">{{ row.low.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.closeClass">{{
            row.close.toFixed(2)
          }}</td>
        </tr>
      </tbody>
      <tbody>
        <td :colspan="10" style="font-size: 19px; font-weight: bold;background: orange">

          أسهم مرشح صعودها وبمخاطر متوسطة
        </td>
        <tr class="" :key="row" v-for="(row) in $store.state.orange">
          <td :class="row.symbolClass">{{ row.symbol }}</td>
          <td :class="row.nameClass" style="font-weight:bold">{{ row.name }}</td>

          <td :class="row.amountClss"> {{
            row.last.toFixed(2) }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'user'">{{
              row.low.toFixed(2) }}</td>
          <td :class="row.changeClass">{{ row.change.toFixed(2) }}</td>
          <td :class="row.changePercentClass">{{ row.changePercent.toFixed(2) }}</td>
          <td :class="row.volumeClass">{{ row.volume.toLocaleString() }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.openClass">{{ row.open.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.highClass">{{ row.high.toFixed(2) }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'admin'">{{ row.low.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.closeClass">{{ row.close.toFixed(2) }}</td>
        </tr>
      </tbody>
      <td colspan="10" style="font-size: 19px; font-weight: bold; text-align:center;background-color:#67e667 ">
        أسهم منخفضة المخاطر ولكنها ارتفعت سعريا
      </td>
      <tbody>
        <tr class="" :key="row" v-for="(row) in $store.state.lightGreen">
          <td :class="row.symbolClass">{{ row.symbol }}</td>
          <td :class="row.nameClass" style="font-weight:bold">{{ row.name }}</td>

          <td :class="row.amountClss"> {{
            row.last.toFixed(2) }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'user'">{{
              row.low.toFixed(2) }}</td>
          <td :class="row.changeClass">{{ row.change.toFixed(2) }}</td>
          <td :class="row.changePercentClass">{{ row.changePercent.toFixed(2) }}</td>
          <td :class="row.volumeClass">{{ row.volume.toLocaleString() }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.openClass">{{ row.open.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.highClass">{{ row.high.toFixed(2) }}</td>
          <td style="background-color: rgba(0, 0, 0, 0.05);;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'admin'">{{ row.low.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.closeClass">{{ row.close.toFixed(2) }}</td>
        </tr>
      </tbody>
      <tbody>
        <td colspan="10" style="font-size: 19px; font-weight: bold; text-align:center;background-color: yellow">

          أسهم متوسطة المخاطر ولكنها ارتفعت سعريا
        </td>
        <tr class="" :key="row" v-for="(row) in $store.state.yellow">
          <td :class="row.symbolClass">{{ row.symbol }}</td>
          <td :class="row.nameClass" style="font-weight:bold">{{ row.name }}</td>

          <td :class="row.amountClss"> {{
            row.last.toFixed(2) }}</td>
          <td style="background-color:  rgba(0, 0, 0, 0.05);;;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'user'">{{
              row.low.toFixed(2) }}</td>
          <td :class="row.changeClass">{{ row.change.toFixed(2) }}</td>
          <td :class="row.changePercentClass">{{ row.changePercent.toFixed(2) }}</td>
          <td :class="row.volumeClass">{{ row.volume.toLocaleString() }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.openClass">{{ row.open.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.highClass">{{ row.high.toFixed(2) }}</td>
          <td style="background-color:  rgba(0, 0, 0, 0.05);;;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'admin'">{{ row.low.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.closeClass">{{ row.close.toFixed(2) }}</td>
        </tr>
      </tbody>

      <td colspan="10" style="font-size: 19px; font-weight: bold;background: red">

        أسهم عكست إتجاهها ودخلت منطقة الشك والحيرة </td>
      <tbody>
        <tr class="" :key="row" v-for="(row) in $store.state.red">
          <td :class="row.symbolClass">{{ row.symbol }}</td>
          <td :class="row.nameClass" style="font-weight:bold">{{ row.name }}</td>

          <td :class="row.amountClss"> {{
            row.last.toFixed(2) }}</td>
          <td style="background-color:  rgba(0, 0, 0, 0.05);;;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'user'">{{
              row.low.toFixed(2) }}</td>
          <td :class="row.changeClass">{{ row.change.toFixed(2) }}</td>
          <td :class="row.changePercentClass">{{ row.changePercent.toFixed(2) }}</td>

          <td :class="row.volumeClass">{{ row.volume.toLocaleString() }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.openClass">{{ row.open.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.highClass">{{ row.high.toFixed(2) }}</td>
          <td style="background-color:  rgba(0, 0, 0, 0.05);;;" :class="row.lowClass"
            v-if="this.$store.state.user_role == 'admin'">{{ row.low.toFixed(2) }}</td>
          <td v-if="this.$store.state.user_role == 'admin'" :class="row.closeClass">{{ row.close.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import store from "../store/index"
export default {
  data() {
    return {
      data: [],
      darkGreen: [],
      lightGreen: [],
      red: [],
      yellow: [],
      orange: [],
      userData: {},
      tase: {},
      mt: {}
    }
  },
  methods: {
    getUser() {
      this.userData = localStorage.getItem("userData")
      //  alert(this.userData.role)
    },
    stopCopy() {
      return false
    },
    preventSelect() {
      return false
    }
  },
  created() {
    console.log("122222", store.state.tanse);

    //alert(this.$store.state.user_role)
    this.getUser()
  },
  mounted() {
    if (!this.$store.state.auth) this.$router.push("/login")


  }
}
</script>
<style scoped>
.unselectable {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}



/* .green-column {
  background: #e1f8e1;
}

.red-column {
  background: #ffe5e5;
}

.flashing-up {
  background-color: #21521FFF !important
}

.flashing-down {
  background-color: #f46f6f !important
/* } */

p {
  background-color: #009688;
  text-align: center;
  color: black;
  font-weight: 700;
}
</style>
