<template>
  <nav class="navbar navbar-expand-lg  navbar-expand-xxl navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="#" class="navbar-brand ms-auto d-block d-sm-none" data-bs-toggle="offcanvas" data-bs-target="#side-nav2">
        <img src="/images/logo.png" width="80" class="img-fluid" alt="No working" srcset="">
        رادارنا</a>
      <a href="#" class="navbar-brand ms-auto d-none d-sm-block">
        <img src="/images/logo.png" width="80" class="img-fluid" alt="No working" srcset="">
        رادارنا</a>
      <a class="navbar-toggler" @click="$event.preventDefault(); logout()" data-bs-toggle="collapse"
         data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
         aria-label="Toggle navigation">
        خروج
      </a>
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <p class="navbar-text">أهلا ({{ $store.state.user_role }}) {{   $store.state.userData ? $store.state.userData.user : '' }} </p>
          <li class="nav-item"><a href="#" @click="$event.preventDefault(); logout()" class="nav-link">خروج</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("userData")
      this.$store.state.auth = false
     if(window.socket)
         window.socket.disconnect()
      this.$router.push("/login")
    },
    created() {
      var socket = window.io.connect("https://tickerchart.smart-node.net");
      this.$store.state.socket_id = socket
      console.log(this.$store.state.socket_id)
      socket.on('connect', () => {
        this.axios.post(this.$store.state.url + "session", { id: this.$store.state.UserId, socket_id: socket.id })
          .then(resp => {
            if (resp.data.status) {
              console.log("send")
            }
          })
        console.log("Connected !")
        socket.on("logout", (data) => {
          // alert("You will logging out ")
          if (data.status) {
            localStorage.removeItem("userData")
            this.$store.state.auth = false
            this.$router.push("/login")
          }
        })
      })
    },
  }
}
</script>