<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="12" md="12" class="pl-0">
        <h3>{{$t('router.updateMerges', {val: getCustomer.title})}}</h3>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card class="shadow" :title="$t('Merge.selectedUsers')">
          <table class="table table-hover table-striped table-sm">
            <thead>
              <tr>
                <th>{{$t('list.user')}}</th>
                <th class="text-right">{{$t('list.operations')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(u,i) in allMerges" :key="i">
                <td>{{u.userName}}</td>
                <td class="text-right">
                  <b-button disabled @click="unMergeUser(u.user, u.customer, u.id)" type="button" variant="danger" size="sm" class="py-0 px-1"><i class="fas fa-times-circle"></i></b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card class="shadow" :title="$t('Merge.users')">
          <b-form-group :label="$t('Customer.users')">
            <v-select :options="allUsers" label="name" @input="selectUser"></v-select>
          </b-form-group>
          <b-button @click="mergeUser()" class="float-right" type="button" variant="success" size="sm"><i class="fas fa-plus-square"></i> {{$t('Merge.mergeUser')}}</b-button>
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
      userToken: this.$route.params.token,
      selectedUser: null
    }
  },
  computed: {
    ...mapState(['allMerges', 'allUsers', 'getCustomer', 'returnCount'])
  },
  watch: {
    getCustomer: function (e) {
      this.users(e.company)
    },
    returnCount: function (e) {
      this.showMerge('customer=' + this.userToken)
    }
  },
  mounted () {
    this.showCustomer(this.userToken)
    this.showMerge('customer=' + this.userToken)
  },
  methods: {
    showCustomer (e) {
      this.$store.dispatch('showCustomer', {...this.data, param: e})
    },
    showMerge (e) {
      this.$store.dispatch('getMerges', {...this.data, param: e})
    },
    users (e) {
      this.$store.dispatch('getUsers', {...this.data, param: `company=${e}`})
      this.$store.commit('setReturn', 0)
    },
    selectUser (e) {
      this.selectedUser = e
    },
    mergeUser () {
      let authInfo
      switch (this.selectedUser.level) {
        case '201':
          authInfo = {level: this.selectedUser.level, company: this.selectedUser.company, customer: this.getCustomer.id, user: this.selectedUser.id, work: 1, c: 1, r: 1, u: 1, d: 1}
          break
        case '202':
          authInfo = {level: this.selectedUser.level, company: this.selectedUser.company, customer: this.getCustomer.id, user: this.selectedUser.id, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case '203':
          authInfo = {level: this.selectedUser.level, company: this.selectedUser.company, customer: this.getCustomer.id, user: this.selectedUser.id, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case '204':
          authInfo = {level: this.selectedUser.level, company: this.selectedUser.company, customer: this.getCustomer.id, user: this.selectedUser.id, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case '205':
          authInfo = {level: this.selectedUser.level, company: this.selectedUser.company, customer: this.getCustomer.id, user: this.selectedUser.id, work: 1, c: 1, r: 1, u: 0, d: 0}
          break
      }
      this.$store.dispatch('createData', {...this.data, api: 'authority', info: authInfo, turn: 'Merge', retcount: 4})
    },
    unMergeUser (u, c, m) {
      let data = '?id=' + u + '-' + c + '-' + m
      this.$store.dispatch('deleteData', {...this.data, api: 'authMerge', info: data, turn: 'merge', retcount: 3})
    }
  }
}
</script>
