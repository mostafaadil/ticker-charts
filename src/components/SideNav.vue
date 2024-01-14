
<template>
  <div id="side-nav" class="flex-shrink-0 p-3 bg-white d-none d-md-block">
    <a href="#" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-5 fw-semibold">لوحة التحكم</span>
    </a>
    <ul class="list-unstyled ps-0">
      <slot></slot>
    </ul>
  </div>
  <div id="side-nav2" class="offcanvas offcanvas-end" style="width:60%">
    <a href="#" class="d-flex flex-column align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-5 fw-semibold">لوحة التحكم</span>
      <small>مرحبا {{ $store.state.userData ? $store.state.userData.user : '' }}</small>
    </a>
    <ul class="list-unstyled ps-0">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {

  },
}
</script>
<style>
#side-nav {
  width: 180px;
  text-align: right;
  height: 100vh;
  position: sticky;
  top: 0;
}

#side-nav li.mb-1 {
  transform: translateX(30px);
}

@media only screen and (max-width: 768px) {
  #side-nav {
    width: 140px;
    text-align: right;
    height: 100vh;
  }

  #side-nav button {
    font-size: 14px;
  }
}
</style>