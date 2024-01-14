<template>
  <table class="table table-bordered table-hover">
    <tr>
      <th>الرقم</th>
      <th>الإسم</th>
      <th>المستخدم</th>
      <th>الإيميل</th>
      <th>رقم الهاتف</th>
      <th>ايصال الدفع</th>
      <th> مدة الاشتراك</th>
      <th>تاريخ الإنضمام</th>
      <th>تاريخ الانتهاء</th>
      <th> </th>
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
      <td v-if="user?.duration==1"> شهر</td>
      <td v-if="user?.duration==3"> ثلاثة اشهر</td>
      <td v-if="user?.duration==9"> تسع اشهر</td>
      <td v-if="user?.duration==6"> ست اشهر</td>
      <td v-if="user?.duration==12"> سنة</td>
      <td>{{ user.created.substring(0, 10) }}</td>
      <td>{{ user?.finished_date?.substring(0, 10)}}</td>
      <td>
        <button class="btn btn-outline-success" @click="approve(user.id, user.email)">موافقة</button>
        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#edit-modal"
          @click="preEditUser(user)">تحديث</button>
        <button class="btn btn-outline-danger" @click="deleteUser(user.id)">حذف</button>
      </td>
    </tr>
  </table>
  <ul class="pagination" ng-if="total_users>0">
    <li class="page-item" :class="{ active: (page == p) }" v-for="p in total_pages" :key="p">
      <a href="#" class="page-link" @click="$event.preventDefault(); get(p)">{{ p }}</a>
    </li>
  </ul>

  <div id="edit-modal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          تحديث المستخدم
        </div>
        <div class="modal-body">
          <form @submit.prevent="editUser()">
            <div class="mb-1 mb-sm-3">
              <label class="form-label">الإسم</label>
              <input required type="text" class="form-control" v-model="userData.name">
            </div>
            <div class="mb-1 mb-sm-3">
              <label class="form-label">إسم المستخدم</label>
              <input required type="text" class="form-control" v-model="userData.user">
            </div>
            <div class="mb-1 mb-sm-3">
              <label class="form-label">الإيميل</label>
              <input required type="email" class="form-control" v-model="userData.email">
            </div>
            <!-- <div class="mb-1 mb-sm-3">
              <label class="form-label">كلمة المرور</label>
              <input required type="password" class="form-control" v-model="userData.pass">
            </div> -->
            <div class="mb-1 mb-sm-3">
              <label class="form-label">رقم الهاتف</label>
              <input required type="tel" class="form-control" v-model="userData.tel">
            </div>
            <div class="mb-1 mb-sm-3">
              <label class="form-label">الدور</label>
              <select class="form-select" 
              >
                <option value="user">مستخدم</option>
                <option value="admin">أدمن</option>
              </select>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#edit-modal" class="btn btn-success w-50">تحديث</button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total_users: 0,
      page: 1,
      total_pages: 0,
      limit: 20,
      users: [],
      userData: {}
    }
  },
  methods: {
    downloadItem(url) {

      window.open(url, '_blank', 'noreferrer');


    },
    editUser() {
      this.axios.post(this.$store.state.url + "editUser", this.userData)
        .then(resp => {
          if (resp.data.status) {
            alert("تم التعديل بنجاح")
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
    approve(id, email) {
      if (confirm("هل انت واثق من رغبتك بتفعيل هذا  المشترك?")) {
        this.axios.post(this.$store.state.url + "approveUser", { id:id, approved: 1 })
          .then(resp => {
            if (resp.data.status) {
              this.axios.get('https://radarna.com/email.php?email=' + email).then(() => {

              })
              alert("تم الموافقة")
              this.get(this.page)
            }
          })
      }
    },
    get(page) {
      this.axios.post(this.$store.state.url + "getNonApprovedUsers", {
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
    }
  },
  created() {
    this.get(1)
  }
}
</script>