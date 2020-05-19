<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: userName})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card class="asc__updatePage-card-withTab shadow">
          <b-tabs content-class="mt-1" v-model="tabIndex">
            <b-tab :title="$t('Customer.createUser')" active @click="isSelectedUser = false">
              <b-form-group :label="$t('Customer.level')" :class="$v.form.userLevel.$error ?'form-group--error': ''">
                <v-select :options="allUserLevels" v-model="userLevel" label="title" @input="selectedLevel"></v-select>
              </b-form-group>

              <b-row>
                <b-col cols="6" sm="4">
                  <b-form-group :label="$t('Customer.gender')">
                    <v-select :options="userGender" label="label" v-model="userGenderLabel" @input="selectGender"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="8">
                  <b-form-group :label="$t('Customer.name')" :class="$v.form.userName.$error ? 'form-group--error' : ''">
                    <b-form-input v-model.trim="$v.form.userName.$model" type="text"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group :label="$t('Customer.email')" :class="$v.form.userEmail.$error ? 'form-group--error' : ''">
                <b-form-input v-model.trim="$v.form.userEmail.$model" type="email"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.phone')" :class="$v.form.userPhone.$error ? 'form-group--error' : ''">
                <b-form-input v-model.trim="$v.form.userPhone.$model" type="tel"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.status')">
                <b-row>
                  <b-col cols="4">&nbsp;</b-col>
                  <b-col cols="3" class="text-right">{{$t('list.passive')}}</b-col>
                  <b-col cols="2" class="text-center"><b-form-checkbox v-model="status" name="check-button" switch></b-form-checkbox></b-col>
                  <b-col cols="3" class="text-left">{{$t('list.active')}}</b-col>
                </b-row>
              </b-form-group>
              <b-form-group :label="$t('Customer.kvkk')" :class="$v.form.userKvkk.$error ? 'form-group--error': ''">
                <b-row>
                  <b-col cols="4">&nbsp;</b-col>
                  <b-col cols="3" class="text-right">{{$t('list.disapproved')}}</b-col>
                  <b-col cols="2" class="text-center"><b-form-checkbox v-model="kvkk" name="check-button" switch></b-form-checkbox></b-col>
                  <b-col cols="3" class="text-left">{{$t('list.approved')}}</b-col>
                </b-row>
              </b-form-group>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      showInput: false,
      tabIndex: 1,
      userToken: this.$route.params.token,
      status: true,
      kvkk: false,
      userLevel: '',
      userName: '',
      userGenderLabel: '',
      userGender: [
        { label: this.$t('Customer.gender-mr'), value: 'mr'},
        { label: this.$t('Customer.gender-mrs'), value: 'mrs'}
      ],
      form: {
        userCompany: '',
        userGender: '',
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
    ...mapState(['getUser', 'allUserLevels'])
  },
  watch: {
    getUser: function (e) {
      this.status = e.status === '1' ? true : false
      this.form.userCompany = e.company
      this.userName = e.name
      this.kvkk = e.kvkk === '1' ? true : false

      switch (e.gender) {
        case 'mr':
          this.userGenderLabel = this.$t('Customer.gender-mr')
          break;
        case 'mrs':
          this.userGenderLabel = this.$t('Customer.gender-mrs')
          break;
        case null:
          this.userGenderLabel = ''
          break;
      }
      this.form.userGender = e.gender
      this.form.userName = e.name
      this.form.userEmail = e.email
      this.form.userLevel = e.level
      this.form.userKvkk = e.kvkk
      this.form.userStatus = e.status
      this.form.userPhone = e.phone
      this.userLevel = e.userLevel
    },
    status: function (e) {
      if (e === true) {
        this.form.userStatus = 1
      } else {
        this.form.userStatus = 0
      }
    },
    kvkk: function (e) {
      if (e === true) {
        this.form.userKvkk = 1
      } else {
        this.form.userKvkk = 0
      }
    }
  },
  mounted () {
    this.showUser(this.userToken)
    this.userLevels()
  },
  methods: {
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.creatingUser'), type: 'info'})
        this.submitUser()
      }
    },
    submitUser () {
      let userinfo = {
        company: this.form.userCompany,
        name: this.form.userName,
        email: this.form.userEmail,
        level: this.form.userLevel,
        kvkk: this.form.userKvkk,
        status: this.form.userStatus,
        phone: this.form.userPhone
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'user', id: this.userToken, info: userinfo, turn: 'User', retcount: 0 })
    },
    showUser (e) {
      this.$store.dispatch('showUser', {...this.data, param: e})
    },
    selectGender (e) {
      this.form.userGender = e.value
    },
    selectedLevel (e) {
      this.form.userLevel = parseInt(e.level)
    },
    userLevels () {
      this.$store.dispatch('getUserLevels', {...this.data, param: '?type=7e1fbe19'})
    }
  },
  validations () {
    return {
      form: {
        userName: { required },
        userEmail: { required },
        userLevel: { required },
        userKvkk: { required },
        userPhone: { required }
      }
    }
  }
}
</script>
