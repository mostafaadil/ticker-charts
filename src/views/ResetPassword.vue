<template>
  <!-- Sing in  Form -->
  <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <div class="signin-image">
          <figure><img src="images/logo.png" alt="sing up image"></figure>
        </div>

        <div class="signin-form">
          <h2 class="form-title">إستعادة كلمة المرور</h2>
          <form @submit.prevent="doReset()" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
              <input type="text" name="your_name" v-model="resetData.user" id="your_name" placeholder="البريد الإلكتروني" />
            </div>
            <div class="form-group form-button">
              <input type="submit" name="signin" id="signin" class="form-submit" value="إرسال" />
            </div>

            <router-link to="/login">أو تسجيل الدخول</router-link>
            <br>
            <router-link to="/register">أو حساب جديد</router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      resetData: { }
    }
  },
  methods: {
    doReset() {
      // this.resetData.socket_id = "this.$store.state.socket_id"
      // alert(this.resetData)
      this.axios.post(this.$store.state.url + "start_reset", this.resetData)
        .then(resp => {
          if (resp.data.status) {
            alert("تم إرسال تعليمات إسترجاع كلمة السر في البريد الإكتروني الخاص بك")
          }
          else {
            this.resetData = {}
            // alert(81)
            alert(resp.data.msg)
          }
        })
    }
  },
  created() {
 
    
  }
}
</script>
