<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="12" md="12" class="pl-0">
        <h3>{{$t('router.updateAuthority', {val: getUser.name})}}</h3>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="8" xl="7" class="mb-3">
        <b-card class="asc__updatePage-card-withTab shadow">
          <b-tabs content-class="mt-1" v-model="tabIndex">
            <b-tab v-for="(merg,i) in getMerge" :key="i" :title="merg.customerName" @click="getAuth(getUser.api_token+','+merg.customer)">
              <table class="table table-hover table-striped table-sm">
                <thead>
                  <tr>
                    <th>{{$t('Authorization.operation')}}</th>
                    <th class="text-center">{{$t('Authorization.create')}}</th>
                    <th class="text-center">{{$t('Authorization.read')}}</th>
                    <th class="text-center">{{$t('Authorization.update')}}</th>
                    <th class="text-center">{{$t('Authorization.delete')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(auth,x) in getAuthority" :key="'a'+x">
                    <td><b>{{$t('Authorization.'+auth.work)}}</b></td>
                    <td class="text-center"><input type="checkbox" :name="'c'+auth.id" @change="changeAuth(auth.id, auth.c, auth.r, auth.u, auth.d, auth)" v-model="auth.c" ></td>
                    <td class="text-center"><input type="checkbox" :name="'r'+auth.id" @change="changeAuth(auth.id, auth.c, auth.r, auth.u, auth.d, auth)" v-model="auth.r" ></td>
                    <td class="text-center"><input type="checkbox" :name="'u'+auth.id" @change="changeAuth(auth.id, auth.c, auth.r, auth.u, auth.d, auth)" v-model="auth.u" ></td>
                    <td class="text-center"><input type="checkbox" :name="'d'+auth.id" @change="changeAuth(auth.id, auth.c, auth.r, auth.u, auth.d, auth)" v-model="auth.d" ></td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showInput: false,
      tabIndex: 1,
      userToken: this.$route.params.token,
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
    ...mapState(['getUser', 'getMerge', 'allUserLevels', 'getAuthority'])
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
      this.$store.dispatch('showUser', {...this.data, param: e})
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
