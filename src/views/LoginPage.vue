<template>
  <!-- Sing in  Form -->
  <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <div class="signin-image">
          <figure><img src="images/logo.png" alt="sing up image"></figure>
        </div>

        <div class="signin-form">
          <h2 class="form-title">تسجيل الدخول</h2>
          <form @submit.prevent="doLogin()" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
              <input type="text" name="your_name" v-model="loginData.user" id="your_name" placeholder="اسم المستخدم" />
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input type="password" name="your_pass" v-model="loginData.pass" id="your_pass" placeholder="كلمة المرور" />
            </div>
            <div class="form-group form-button">
              <input type="submit" name="signin" id="signin" class="form-submit" value="دخول" />
            </div>

            <router-link to="/register">أو حساب جديد</router-link>
            <br>
            <router-link to="/reset_password">نسيت كلمة المرور ؟</router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment/moment';
export default {
  data() {
    return {
      loginData: { "socket_id": "fdf" }
    }
  },
  methods: {
    doLogin() {
      // this.loginData.socket_id = "this.$store.state.socket_id"
      // alert(this.loginData)
      this.axios.post(this.$store.state.url + "login", this.loginData)
        .then(resp => {
          if (resp.data.status) {
            // alert(resp.data.data.id)
            localStorage["userData"] = JSON.stringify(this.loginData)
            this.$store.state.auth = true
            this.$store.state.userData = resp.data.data
            this.$store.state.UserId = resp.data.data.id
            this.initSocket()
            if (resp.data.data.role == 'admin') {
              this.$store.state.user_role = "admin"
              this.$router.push("/admin/chart")
            }
            else {
              // alert(resp.data.data.finished_date)
              const otherDate = new Date(resp.data.data.finished_date);
              var isAfter = moment(new Date().toJSON()).isAfter(otherDate);
              // alert(isAfter)
              if (!isAfter) {
                this.$store.state.user_role = "user";
                this.$router.push("/user/chart")

              }
              else {
                alert("لقد انتهي اشتراكك ")
                // this.axios.post(this.$store.state.url + "approveUser", { id: resp.data.data.id, approved: 0 })
                //   .then(resp => {
                //     if (resp.data.status) {
                //        console.log("")
                //     }
                //   })
              }

            }
          }
          else {
            this.loginData = {}
            // alert(81)
            alert(resp.data.msg)
          }
        })
    }
  },
  created() {
    // if(this.$store.state.userData && this.$store.state.userData.user){
    //   console.log("returning back")
    //   this.$router.push("/admin/chart")
    // }
    var userData = localStorage['userData']
    if (userData) {

      this.loginData = JSON.parse(userData)
      // this.$store.state.userData = this.loginData
      this.$store.state.auth = true
      // return this.$router.push("/admin/chart")
      if(window.socket && window.socket.connected)
        window.socket.disconnect()
      this.doLogin()
    }
  }
}
</script>
