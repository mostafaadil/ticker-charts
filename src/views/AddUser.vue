<template>
  <div class="row">
    <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 bg-light shadow mt-2 rounded p-3">
      <form @submit.prevent="addUser()">
        <div class="mb-1 mb-sm-3">
          <label class="form-label">الاسم</label>
          <input required type="text" class="form-control" v-model="userData.name">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">اسم المستخدم</label>
          <input required type="text" class="form-control" v-model="userData.user">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">الإيميل</label>
          <input required type="email" class="form-control" v-model="userData.email">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">كلمة المرور</label>
          <input required type="password" class="form-control" v-model="userData.pass">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">رقم الهاتف</label>
          <input required type="tel" class="form-control" v-model="userData.tel">
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">مدة الأشتراك</label>
          <select class="form-select" v-model="userData.duration">
            <option value="3">ثلاثة اشهر</option>
            <option value="6">ستة أشهر</option>
            <option value="9">تسعة أشهر</option>
            <option value="12">سنة</option>
          </select>
        </div>
        <div class="mb-1 mb-sm-3">
          <label class="form-label">الدور</label>
          <select class="form-select" v-model="userData.role">
            <option value="user">مستخدم</option>
            <option value="admin">أدمن</option>
          </select>
        </div>
        <div class="form-group">
          <file-input class="my-4" label="ارفق إيصال الدفع " v-model="userData.doc">
            <label for="file"></label>
          </file-input>
        </div>
        <button class="btn btn-success w-50">إضافة</button>
      </form>
    </div>
  </div>
</template>
<script>
import FileInput from "../components/FileInput.vue";
export default {
  components: {
    FileInput
  }, data() {
    return {
      userData: {}
    }
  },
  methods: {
    addUser() {
      this.axios.post(this.$store.state.url + "register", this.userData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(resp => {
          if (resp.data.status) {
            alert("تم التسجيل الرجاء انتظار الموافقة على الطلب")
          }
          else {
            this.registerData = {}
            alert("حصل خطأ ما الرجاء المحاولة مرة أخرى")
          }
        })
    }
  }
}
</script>