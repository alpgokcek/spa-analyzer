<template>
  <div class="asc__updatePage">
    api_token: {{ userData.api_token }} <br>
    created_at: {{ userData.created_at }} <br>
    department_id: {{ userData.department_id }} <br>
    email: {{ userData.email }} <br>
    faculty_id: {{ userData.faculty_id }} <br>
    id: {{ userData.id }} <br>
    level: {{ userData.level }} <br>
    name: {{ userData.name }} <br>
    phone: {{ userData.phone }} <br>
    photo: {{ userData.photo }} <br>
    student_id: {{ userData.student_id }} <br>
    university: {{ userData.university }} <br>
    updated_at: {{ userData.updated_at }} <br>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showInput: false,
      tabIndex: 1,
      userToken: this.$route.params.param,
      status: '',
      userLevel: '',
      authc: '',
      authr: '',
      authu: '',
      authd: '',
      form: {
        userCompany: '',
        userName: '',
        userEmail: '',
        userLevel: '',
        userKvkk: '',
        userStatus: 1,
        userPhone: ''
      }
    }
  },
  computed: {
    ...mapState(['getUser', 'getMerge', 'allUserLevels', 'getAuthority', 'userData'])
  },
  watch: {
    getUser: function (e) {
      this.status = e.status === '1' ? true : false
      this.form.userCompany = e.company
      this.form.userName = e.name
      this.form.userEmail = e.email
      this.form.userLevel = e.level
      this.form.userKvkk = e.kvkk
      this.form.userStatus = e.status
      this.form.userPhone = e.phone
      this.userLevel = e.userLevel
    },
    getMerge: function (e) {
      this.getAuth(this.getUser.api_token + ',' + e[0].customer)
    },
    getAuthority: function (e) {
    },
    status: function (e) {
      if (e === true) {
        this.form.userStatus = 1
      } else {
        this.form.userStatus = 0
      }
    }
  },
  mounted () {
    this.showUser(this.userToken)
    this.showMerge(this.userToken)
  },
  methods: {
    showUser (e) {
      this.$store.dispatch('getUser', {...this.data, param: e})
    },
    getAuth (e) {
      this.$store.dispatch('showAuthority', {...this.data, param: e})
    },
    showMerge (e) {
      this.$store.dispatch('showMerge', {...this.data, param: e})
    },
    selectedLevel (e) {
      this.form.userLevel = parseInt(e.level)
    },
    userLevels () {
      this.$store.dispatch('getUserLevels', {...this.data, param: '?type=7e1fbe19'})
    },
    changeAuth (i, xc, xr, xu, xd) {
      let userInfo
      let newC, newR, newU, newD
      xc === true ? newC = 1 : newC = 0
      xr === true ? newR = 1 : newR = 0
      xu === true ? newU = 1 : newU = 0
      xd === true ? newD = 1 : newD = 0
      userInfo = {c: newC, r: newR, u: newU, d: newD}
      this.$store.dispatch('updateData', { ...this.data, api: 'authority', id: i, info: userInfo, turn: 'Authority', retcount: 4 })
    }
  }
}
</script>
