<template>
  <div class="row my-1">
    <div class="col-md-4">
      <button class="btn btn-success btn-sm" type="button" @click="makeExcl">تصدير الي صيغة اكسل </button>

    </div>
  </div>
  <table class="table table-bordered table-hover ">
    <tr style="position: sticky;top: 0;">
      <th>الرقم</th>
      <th>الإسم</th>
      <th>المستخدم</th>
      <th>الإيميل</th>
      <th>رقم الهاتف</th>
      <th>ايصال الدفع</th>
      <th> مدة الاشتراك</th>
      <th>تاريخ الإنضمام</th>
      <th>تاريخ الانتهاء</th>

      <th></th>
    </tr>
    <tr v-for="(user, index) in users" :key="user">
      <td>{{ (page - 1) * limit + index + 1 }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.user }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.tel }}</td>
      <td>
        <img class="materialboxed circle" data-caption="A picture of a way with a group of trees in a park" width="70"
          height="70" @click.prevent="downloadItem(`https://api.radarna.com:7500/middlewarepublic/${user.doc}`)"
          :src="'https://api.radarna.com:7500/middlewarepublic/' + user.doc" style="margin-top: 10px" />
      </td>
      <td v-if="user?.duration == 1"> شهر</td>
      <td v-if="user?.duration == 3"> ثلاثة اشهر</td>
      <td v-if="user?.duration == 9"> تسع اشهر</td>
      <td v-if="user?.duration == 6"> ست اشهر</td>
      <td v-if="user?.duration == 12"> سنة</td>
      <td>{{ user.created.substring(0, 10) }}</td>
      <td>{{ user?.finished_date?.substring(0, 10) }}</td>
      <td>
        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#edit-modal"
          @click="preEditUser(user)">تعديل</button>
        <button class="btn btn-outline-success" data-bs-toggle="modal" @click="changeStatus(user, 1)">تفعيل</button>
        <button class="btn btn-outline-success" data-bs-toggle="modal" @click="changeStatus(user, 0)">تعطيل</button>

        <button class="btn btn-outline-danger" @click="deleteUser(user.id)">حذف</button>
      </td>
    </tr>
  </table>
  <ul class="pagination" ng-if="total_users>0">
    <li class="page-item" :class="{ active: (page == p) }" v-for="p in total_pages" :key="p">
      <a href="#" class="page-link" @click="$event.preventDefault(); get(p)">{{ p }}</a>
    </li>
  </ul>
  <div class="row">
    <div id="edit-modal" class="modal fade">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            تحديث المستخدم
          </div>
          <div class="modal-body">
            <form @submit.prevent="editUser()">
              <div class="mb-1 mb-sm-3">
                <label class="form-label">الاسم</label>
                <input required type="text" class="form-control" v-model="userData.name">
              </div>
              <div class="mb-1 mb-sm-3">
                <label class="form-label">اسم المستخدم</label>
                <input required type="text" class="form-control" v-model="userData.user">
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
              <button data-bs-toggle="modal" data-bs-target="#edit-modal" class="btn btn-success w-50">تحديث</button>
            </form>
            <br>
            <form @submit.prevent="editUserPass()">

              <div class="mb-1 mb-sm-3">
                <label class="form-label">كلمة المرور</label>
                <input required type="text" class="form-control" v-model="userData.pass">
              </div>

              <button data-bs-toggle="modal" data-bs-target="#edit-modal" class="btn btn-success w-50"> تغيير</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { excelParser } from "../../src/assets/js/services/exls";
export default {
  data() {
    return {
      total_users: 0,
      page: 1,
      total_pages: 0,
      limit: 20,
      users: [],
      userData: {},
      data: []
    }
  },
  methods: {
    downloadItem(url) {

      window.open(url, '_blank', 'noreferrer');

      // this.axios.get(url, { responseType: 'blob' })
      //   .then(response => {
      //     const blob = new Blob([response.data], { type: 'image/'+url.split('.')[] })
      //     const link = document.createElement('a')
      //     link.href = URL.createObjectURL(blob)
      //     link.download = url
      //     link.click()
      //     URL.revokeObjectURL(link.href)
      //   }).catch(console.error)
    },
    makeExcl() {
      this.data=[]
      for (let i = 0; i < this.users.length; i++) {

        this.data.push({ name: this.users[i].name, user: this.users[i].user, tel: this.users[i].tel, email: this.users[i].email, duration: this.users[i].duration, join_date: this.users[i].created.split('T')[0], finished_date: this.users[i]?.finished_date?.split('T')[0] });

      }

      console.log("-----------------------------------------------", this.data)

      excelParser().exportDataFromJSON(this.data, null, null)
    },
    editUser() {
      this.axios.post(this.$store.state.url + "updateUserData", this.userData)
        .then(resp => {
          if (resp.data.status) {
            alert("Edited Successfully")
            this.userData = {}
            this.get(this.page)
          }
          else {
            alert(resp.data.msg)
          }
        })
    },
    editUserPass() {
      this.axios.post(this.$store.state.url + "updateUserPass", {
        pass: this.userData.pass,
        id: this.userData.id
      })
        .then(resp => {
          if (resp.data.status) {
            alert("Edited Successfully")
            this.userData = {}
            this.get(this.page)
          }
          else {
            alert(resp.data.msg)
          }
        })
    },
    preEditUser(user) {
      this.userData = Object.assign({}, user)
      delete this.userData.pass
    },
    deleteUser(id) {
      if (confirm("Sure to delete this user ?")) {
        this.axios.post(this.$store.state.url + "deleteUser", { id })
          .then(resp => {
            if (resp.data.status) {
              alert("Deleted Successfully")
              if (this.page > 1 && this.users.length == 1)
                this.get(this.page - 1)
              else
                this.get(this.page)
            }
          })
      }
    },
    get(page) {
      this.axios.post(this.$store.state.url + "getApprovedUsers", {
        limit: this.limit,
        page
      }).then(resp => {
        if (resp.data.status) {
          this.page = page
          this.total_users = resp.data.total_users
          this.total_pages = Math.ceil(this.total_users / this.limit)
          this.users = resp.data.data
        }
      })
    },
    changeStatus(id, status) {
      var message = ""
      if (status == 1) {
        message = "هل انت واثق من رغبتك بتفعيل هذا  المشترك?"
      }
      else {
        message = "هل نات واثق من رغبتك تعطيل هذا الحساب "
      }
      if (confirm(message)) {
        this.axios.post(this.$store.state.url + "approveUser", { id: id.id, approved: status })
          .then(resp => {
            if (resp.data.status) {
              if (status == 1) {


                this.axios.get('http://radarna.com/email.php?email=' + id.email).then(() => {

                })
              }
              alert("تم العملية بنجاح")
              this.get(this.page)
            }
          })
      }
    },
  },
  created() {
    this.get(1)
  }
}
</script>