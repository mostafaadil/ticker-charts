<template >
  <nav-bar></nav-bar>
  <div style="display: flex">
    <side-nav>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" aria-expanded="true">
          المستخدمين
        </button>
        <div class="collapse show" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><router-link to="/admin/add_user" class="link-dark rounded">إضافة</router-link></li>
            <li><router-link to="/admin/admin_users" class="link-dark rounded">المدراء</router-link></li>
            <li><router-link to="/admin/approved_users" class="link-dark rounded">المستخدمين</router-link></li>
            <li><router-link to="/admin/non_approved_users" class="link-dark rounded">الطلبات</router-link></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded"  aria-expanded="true">
          السوق
        </button>
        <div class="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><router-link to="/admin/chart" class="link-dark rounded">المنصة</router-link></li>
          </ul>
        </div>
      </li>
    </side-nav>
    <div style="flex: 1;overflow-x: auto" >
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

  }
}
</script>
<style>
@media screen and (max-width: 768px) {
  #chart-table td {
    font-size: 8px !important;
  }
}
label {
  position: unset;
}
</style>