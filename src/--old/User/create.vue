<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.CustomerCreate')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <!-- <b-button variant="danger" size="sm" class="text-white asc__insertPage-header-Create py-0 px-1" type="button" @click="resetForm()">
          <i class="far fa-trash-alt"></i> {{$t('list.trash')}}
        </b-button> -->
        <b-button variant="success" size="sm" class="text-white asc__insertPage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.submit')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card class="asc__insertPage-card-withTab shadow">
          <b-tabs content-class="mt-1" v-model="tabIndex">
            <b-tab :title="$t('Customer.createUser')" active @click="isSelectedUser = false">
              <b-form-group :label="$t('Customer.allCompanies')" :class="$v.form.company.$error ? 'form-group--error' : ''">
                <v-select :options="allCompanies" label="name" @input="selectCompany"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.level')" :class="$v.form.userLevel.$error ?'form-group--error': ''">
                <v-select :options="allUserLevels" label="title" @input="selectedLevel"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.allCustomers')" v-if="showInput">
                <v-select :options="allCustomers" label="title" @input="selectCustomer"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.gender')" :class="$v.form.userGender.$error ? 'form-group--error' : ''">
                <v-select :options="userGender" label="label" @input="selectGender"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.name')" :class="$v.form.userName.$error ? 'form-group--error' : ''">
                <b-form-input v-model.trim="$v.form.userName.$model" type="text"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.email')" :class="$v.form.userEmail.$error ? 'form-group--error' : ''">
                <b-form-input v-model.trim="$v.form.userEmail.$model" type="email"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.password')" :class="$v.form.userPassword.$error ? 'form-group--error': ''">
                <b-form-input v-model.trim="$v.form.userPassword.$model" type="password"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.phone')" :class="$v.form.userPhone.$error ? 'form-group--error' : ''">
                <b-form-input v-model.trim="$v.form.userPhone.$model" type="tel"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.kvkk')" :class="$v.form.userKvkk.$error ? 'form-group--error': ''">
                <b-form-checkbox v-model="form.userKvkk" name="check-button" switch>
                  {{$t('Customer.kvkkSubmit')}}
                </b-form-checkbox>
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
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      showInput: false,
      tabIndex: 1,
      userGender: [
        { label: this.$t('Customer.gender-mr'), value: 'mr'},
        { label: this.$t('Customer.gender-mrs'), value: 'mrs'}
      ],
      form: {
        company: '',
        userGender: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userLevel: '',
        userKvkk: true,
        userStatus: 1,
        userPhone: ''
      }
    }
  },
  computed: {
    ...mapState(['returnCount', 'returnLog', 'allCompanies', 'allUsers', 'allUserLevels', 'allCustomers'])
  },
  watch: {
    returnCount: function (e) {
      switch (e) {
        case 2:
          console.log('setReturn 2 ->: ' + e)
          this.form.user = this.returnLog.id
          this.$store.commit('setLog', [])
          this.$store.commit('setReturn', 0)
          this.submitAuth()
          break
        default:
          console.log('setReturn default ->: ' + e)
          break
      }
    }
  },
  mounted () {
    this.companies()
    this.countries()
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
        company: this.form.company,
        gender: this.form.userGender,
        name: this.form.userName,
        email: this.form.userEmail,
        password: this.form.userPassword,
        level: this.form.userLevel,
        status: this.form.userStatus,
        kvkk: this.form.userKvkk,
        phone: this.form.userPhone
      }
      this.$store.dispatch('createData', { ...this.data, api: 'user', info: userinfo, turn: 'Customer', retcount: 2 })
    },
    submitAuth () {
      let authInfo
      switch (this.form.userLevel) {
        case 201:
          authInfo = {level: this.form.userLevel, company: this.form.company, customer: this.form.customer, user: this.form.user, work: 1, c: 1, r: 1, u: 1, d: 1}
          break
        case 202:
          authInfo = {level: this.form.userLevel, company: this.form.company, customer: this.form.customer, user: this.form.user, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case 203:
          authInfo = {level: this.form.userLevel, company: this.form.company, customer: this.form.customer, user: this.form.user, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case 204:
          authInfo = {level: this.form.userLevel, company: this.form.company, customer: this.form.customer, user: this.form.user, work: 1, c: 1, r: 1, u: 1, d: 0}
          break
        case 205:
          authInfo = {level: this.form.userLevel, company: this.form.company, customer: this.form.customer, user: this.form.user, work: 1, c: 1, r: 1, u: 0, d: 0}
          break
      }
      this.$store.dispatch('createData', {...this.data, api: 'authority', info: authInfo, turn: 'User', retcount: 0})
    },
    companies () {
      this.$store.dispatch('getCompanies', {...this.data, param: `status=1&select=name,id`})
    },
    customers (e, s) {
      this.$store.dispatch('getCustomers', {...this.data, param: `status=${s}&company=${e}&select=company,title,id`})
    },
    users (e) {
      this.$store.dispatch('getUsers', {...this.data, param: `company=${e}`})
    },
    userLevels () {
      this.$store.dispatch('getUserLevels', {...this.data, param: '?type=7e1fbe19'})
    },
    countries () {
      this.$store.dispatch('getCountries')
    },
    cities (e) {
      this.form.country = e.id
      this.$store.dispatch('getCities', {...this.data, param: `?country=${e.id}&status=1`})
    },
    selectCompany (e) {
      this.form.company = e.id
      this.customers(e.id, 1)
    },
    selectGender (e) {
      this.form.userGender = e.value
    },
    selectUser (e) {
      this.form.user = e.id
      this.form.userLevel = parseInt(e.level)
      this.form.company = e.company
    },
    selectedLevel (e) {
      if ((e.level === 201) || (e.level === 202) || (e.level === 203)) {
        this.showInput = false
        // bu 3 değerden biriyse otomatik olarak DEMPIN firmasına bağlanacak.
        this.form.customer = 22
      } else {
        this.showInput = true
      }
      this.form.userLevel = parseInt(e.level)
    },
    selectedCountry (e) {
      this.form.country = e.id
      this.cities(e.id)
    },
    selectedCity (e) {
      this.form.city = e.id
    },
    selectCustomer (e) {
      this.form.customer = e.id
    }
  },
  validations () {
    return {
      form: {
        company: { required },
        userGender: { required },
        userName: { required },
        userEmail: { required, email },
        userPassword: { required },
        userLevel: { required },
        userKvkk: { required },
        userPhone: { required }
      }
    }
  }
}
</script>
