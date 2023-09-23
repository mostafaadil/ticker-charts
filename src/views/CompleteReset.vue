<template>
  <!-- Sing in  Form -->
  <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <div class="signin-image">
          <figure><img src="http://dashboard.radarna.com/images/logo.png" alt="sing up image"></figure>
        </div>

        <div class="signin-form">
          <h2 class="form-title">إعادة تعيين كلمة المرور</h2>
          <form @submit.prevent="doCompleteReset()" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
              <input type="password" name="your_name" v-model="resetData.pass" id="your_name" placeholder="كلمة المرور" />
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input type="password" name="your_pass" v-model="resetData.repass" id="your_pass" placeholder="إعادة كلمة المرور" />
            </div>
            <div class="form-group form-button">
              <input type="submit" name="signin" id="signin" class="form-submit" value="إعادة تعيين" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      resetData: { "socket_id": "fdf" }
    }
  },
  methods: {
    doCompleteReset() {
      // this.resetData.socket_id = "this.$store.state.socket_id"
      // alert(this.resetData)
      if(this.resetData.pass!=this.resetData.repass)
           return alert("يجب أن تكون كلمتي السر متطابقتين")
      axios.post(this.$store.state.url + "complete_reset", {
        user_id:this.$route.params.user_id,
        code:this.$route.params.code,
        pass:this.resetData.pass
      })
          .then(resp => {
            if(resp){
              alert("نجحت العملية. يمكنك تسجيل الدخول بكلمة الجديدة الان")
              this.$router.push("/login")
            }
          })
    }
  },
  created() {


  }
}
</script>
<style>

</style>