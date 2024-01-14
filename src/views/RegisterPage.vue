<template>
  <!-- Sing in  Form -->

  <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <div class="signin-image">
          <figure><img src="images/logo.png" alt="sing up image"></figure>
        </div>

        <div class="signin-form">
          <h2 class="form-title">حساب جديد</h2>
          <form @submit.prevent="doRegister()" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
              <input type="text" name="your_name" v-model="registerData.name" id="your_name" placeholder="الإسم" />
            </div>
            <div class="form-group">
              <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
              <input type="text" name="your_name" v-model="registerData.user" id="your_name" placeholder="اسم المستخدم" />
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input type="password" name="your_pass" v-model="registerData.pass" id="your_pass"
                placeholder="كلمة المرور" />
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input type="tel" name="your_tel" max="" v-model="registerData.tel" id="your_pass"
                placeholder="رقم الهاتف" />
            </div>
            <div class="form-group">
              <label for="email"><i class="zmdi zmdi-lock"></i></label>
              <input type="email" name="your_tel" max="" v-model="registerData.email" id="email"
                placeholder="البريد الإلكتروني" />
            </div>
            <div class="from-group">
              <label class="form-label">مدة الأشتراك</label>
              <select class="form-select" v-model="registerData.duration">
                <option value="3">ثلاثة اشهر</option>
                <option value="6">ستة أشهر</option>
                <option value="9">تسعة أشهر</option>
                <option value="12">سنة</option>
              </select>
            </div>
            <div class="form-group">
              <file-input class="my-4" label="ارفق إيصال الدفع " v-model="registerData.doc">
                <label for="file"></label>
              </file-input>
            </div>
            <div class="form-group">
              <p>
                <input class="checkbox" type="checkbox" required name="terms" style="display: inline-block;">
                <a type="button" @click.prevent="toggleAgreement()" href="#">
                  <u>يعتبر الضغط علي المربع هو موافقة المشترك علي الشروط والاحكام.</u>
                </a>
              </p>
              <div class="row">
                <div class="col" v-if="arguments">
                  لشروط والاحكام :-
                  <br>

                  ١- اقرار المشترك بالموافقة علي الشروط والاحكام المطبقة بدولة الاشتراك حسب اللوائح والأنظمة.
                  <br>
                  ٢- عدم مشاركة الاشتراك مع اشخاص آخرين بأي صورة كانت ويكون المشترك هو المسؤول الأول عن حسابة وإن ثبت
                  غير ذلك يكون عرضة لإلغاء اشتراكة.
                  <br>
                  ٣- عدم افشاء أسرار ومعلومات الموقع لأي طرف ثالث وان ثبت ذلك ستطبق الإجراءات القانونية اللازمة ويتحمل
                  العميل مسؤولية ذلك كما وأن أي إخلال بالشروط والأحكام أو محاولة نسخ أو تعديل البرنامج أو تطوير أي محتوى
                  منه يعتبر إخلالا بالشروط والأحكام وسيتم التعامل معه بالطرق القانونية.
                  <br>
                  ٤- الشروط والأحكام ومبلغ الاشتراك عرضة للتغيير في أي وقت وتحتفظ الشركة في حقها بالتغيير للاشتراكات
                  الجديدة وعند التجديد دون أدنى مسئولية عليها.
                </div>
              </div>
            </div>
            <div class="form-group form-button">
              <input type="submit" name="signin" id="signin" class="form-submit" value="إنشاء حساب" />
            </div>
            <router-link to="/login">أو تسجيل الدخول</router-link>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FileInput from "../components/FileInput.vue";
export default {
  components: {
    FileInput
  },
  data() {
    return {
      arguments: false,
      registerData: {},
      images: null
    }
  },
  methods: {
    toggleAgreement() {
      this.arguments = !this.arguments
    },
    uploadFile() {
      this.Images = document.getElementById("file").files[0];
      console.log(this.images)
    },
    doRegister() {
      this.registerData.role = "user"
      this.axios.post(this.$store.state.url + "register", this.registerData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(resp => {
          if (resp.data.status) {
            alert("تم التسجيل الرجاء انتظار الموافقة على الطلب")
            this.axios.get("https://radarna.com/email.php?email="+this.registerData.email).then((res)=>{
              console.log(res)
              console.log("register");
            })
          }
          else {
            this.registerData = {}
            alert(resp.data.msg)
            // alert("حصل خطأ ما الرجاء المحاولة مرة أخرى")
          }
        })
    }
  }
}
</script>
