<template>
  <table class="table table-bordered table-hover ">
    <tr>
      <th>الرقم</th>
      <th>الإسم</th>
      <th>المستخدم</th>
      <th>الإيميل</th>
      <th>تاريخ الإنضمام</th>
      <th></th>
    </tr>
    <tr v-for="(user, index) in users" :key="user">
      <td>{{ (page - 1) * limit + index + 1 }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.user }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.created.substring(0, 10) }}</td>
      <td>
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
          Edit User
        </div>
        <div class="modal-body">
          <form @submit.prevent="editUser()">
            <div class="mb-1 mb-sm-3">
              <label class="form-label">الإسم</label>
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
              <label class="form-label">كلمة السر</label>
              <input required type="password" class="form-control" v-model="userData.pass">
            </div>
            <div class="mb-1 mb-sm-3">
              <label class="form-label">رقم الهاتف</label>
              <input required type="tel" class="form-control" v-model="userData.tel">
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

        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import  'jquery'
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
    
    editUser() {
      this.axios.post(this.$store.state.url + "editUser", this.userData)
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
      this.axios.post(this.$store.state.url + "getAdmins", {
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
