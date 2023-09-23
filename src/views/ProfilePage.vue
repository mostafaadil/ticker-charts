<template>
  <h4>حسابي</h4>
  <div class="row">
    <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 bg-light shadow mt-2 rounded p-3">
      <form @submit.prevent="updateUser()">
        <div class="mb-1 mb-sm-3">
          <label class="form-label">الاسم</label>
          <input required type="text" class="form-control" v-model="userData.name">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">الإيميل</label>
          <input required type="email" class="form-control" v-model="userData.email">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">رقم الهاتف</label>
          <input required type="tel" class="form-control" v-model="userData.tel">
        </div>
        <button class="btn btn-success w-50">تحديث</button>
      </form>
    </div>
    <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 bg-light shadow mt-2 rounded p-3">
      <form @submit.prevent="updatePassword()">
        <div class="mb-1 mb-sm-3">
          <label class="form-label">كلمة المرور القديمة</label>
          <input type="password" class="form-control" v-model="userData.oldpass">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">كلمة المرور الجديدة</label>
          <input type="password" class="form-control" v-model="userData.newpass">
        </div>
        <button class="btn btn-success w-50">تغيير كلمة المرور</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      userData:{}
    }
  },
  methods:{
    updateUser(){
      this.axios.post(this.$store.state.url+"updateUser",this.userData)
          .then(resp=>{
            if(resp.data.status){
              alert("تمت التحديث بنجاح")

            }
            else{
              alert(resp.data.msg)
            }
          })
    },
    updatePassword(){
      this.axios.post(this.$store.state.url+"updatePass",this.userData)
          .then(resp=>{
            if(resp.data.status){
              alert("تمت التحديث بنجاح")

            }
            else{
              alert(resp.data.msg)
            }
          })
    }
  },
  created() {
    this.userData = this.$store.state.userData
  }
}
</script>