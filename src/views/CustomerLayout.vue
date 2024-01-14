<template>
  <nav-bar></nav-bar>
  <div style="display: flex">
    <side-nav>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
          data-bs-target="#home-collapse" aria-expanded="true">
          المستخدم
        </button>
        <div class="collapse show" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><router-link to="/user/profile" class="link-dark rounded">البروفايل</router-link></li>
            <li><router-link to="/user/subscription" class="link-dark rounded">الاشتراك</router-link></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" aria-expanded="true">
          السوق
        </button>
        <div class="" id="dashboard-collapse1">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><router-link to="/user/chart" class="link-dark rounded">المنصة</router-link></li>
          </ul>
        </div>
      </li>
    </side-nav>
    <div style="flex: 1;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
export default {
  components: {
    NavBar,
    SideNav
  },
  methods: {

  },
  created() {
    console.log(111)
    if (!this.$store.state.auth) this.$router.push("/login")
    else {
      // this.initSocket()
    }
  }
}
</script>
<style>
@media screen and (max-width: 768px) {
  #chart-table td {
    font-size: 10.5px !important;
    padding: 0.02rem;
  }
}

label {
  position: unset;
}
</style>