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
            <b-tab :title="$t('Customer.createUser')" active @click="isSelectedUser = false" :disabled="disabledInput">
              <b-form-group :label="$t('Customer.allCompanies')" :class="$v.form.company.$error ? 'form-group--error' : ''">
                <v-select :disabled="disabledInput ? true : false" :options="allCompanies" label="name" @input="selectCompany"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.level')" :class="$v.form.userLevel.$error ?'form-group--error': ''">
                <v-select :disabled="disabledInput ? true : false" :options="allUserLevels" label="title" @input="selectedLevel"></v-select>
              </b-form-group>
              <b-row>
                <b-col cols="6" sm="4">
                  <b-form-group :label="$t('Customer.gender')">
                    <v-select :disabled="disabledInput ? true : false" :options="userGender" label="label" @input="selectGender"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="8">
                  <b-form-group :label="$t('Customer.name')" :class="$v.form.userName.$error ? 'form-group--error' : ''">
                    <b-form-input :disabled="disabledInput ? true : false" v-model.trim="$v.form.userName.$model" type="text"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group :label="$t('Customer.email')" :class="$v.form.userEmail.$error ? 'form-group--error' : ''">
                <b-form-input :disabled="disabledInput ? true : false" v-model.trim="$v.form.userEmail.$model" type="email"></b-form-input>
              </b-form-group>
              <b-form-group :label="$t('Customer.password')" :class="$v.form.userPassword.$error ? 'form-group--error': ''">
                <b-form-input :disabled="disabledInput ? true : false" v-model.trim="$v.form.userPassword.$model" type="password"></b-form-input>
              </b-form-group>
            </b-tab>
            <b-tab :title="$t('Customer.selectUser')" @click="isSelectedUser = true">
              <b-form-group :label="$t('Customer.allCompanies')" :class="$v.form.company.$error ? 'form-group--error' : ''">
                <v-select :options="allCompanies" label="name" @input="selectCompany"></v-select>
              </b-form-group>
              <b-form-group :label="$t('Customer.users')" :class="$v.form.user.$error ? 'form-group--error' : ''">
                <v-select :options="allUsers" label="name" @input="selectUser"></v-select>
              </b-form-group>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card :title="$t('Customer.customerCreate')" class="shadow">
          <b-form-group :label="$t('Customer.customerCode')" :class="$v.form.code.$error ? 'form-group--error': ''">
            <b-form-input type="text" v-model.trim="$v.form.code.$model" />
          </b-form-group>
          <b-form-group :label="$t('Customer.customerTitle')" :class="$v.form.title.$error ? 'form-group--error': ''">
            <b-form-input type="text" v-model="form.title" />
          </b-form-group>
          <b-form-group :label="$t('Customer.address')">
            <b-form-input type="text" v-model="form.address" />
          </b-form-group>
          <b-row>
            <b-col cols="6">
              <b-form-group :label="$t('Customer.country')" :class="$v.form.country.$error && !$v.form.country.required ? 'form-group--error' : ''">
                <v-select @input="cities" :options="allCountries" label="title" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('Customer.city')" :class="$v.form.city.$error && !$v.form.city.required ? 'form-group--error' : ''">
                <v-select :options="allCities" label="title" @input="selectedCity" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group :label="$t('Customer.postCode')">
            <b-form-input type="text" v-model="form.postal_code" />
          </b-form-group>
          <b-form-group :label="$t('Customer.mwstNumber')">
            <b-form-input type="text" v-model="form.mwst_number" />
          </b-form-group>
          <b-form-group :label="$t('Customer.customerType')" :class="$v.form.customerType.$error ? 'form-group--error' : ''">
            <v-select @input="selectCustomerType" :options="allCustomerTypes" label="title" />
          </b-form-group>
          <b-form-group :label="$t('Customer.disclaimer')">
            <b-form-input type="text" v-model="form.disclaimer" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card :title="$t('Customer.customerInfo')" class="shadow">
          <b-row>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.telephone')})">
                <b-form-input type="text" v-model="form.tel1" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: $t('form.telephone')})">
                <b-form-input type="text" v-model="form.teltitle1" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.fax')})">
                <b-form-input type="text" v-model="form.fax" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: $t('form.fax')})">
                <b-form-input type="text" v-model="form.faxtitle" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.mobile') + '1'})">
                <b-form-input type="text" v-model="form.tel2" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: '1. ' + $t('form.mobile')})">
                <b-form-input type="text" v-model="form.teltitle2" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.mobile') + '2'})">
                <b-form-input type="text" v-model="form.tel3" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: '2. ' + $t('form.mobile')})">
                <b-form-input type="text" v-model="form.teltitle3" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.mobile') + '3'})">
                <b-form-input type="text" v-model="form.tel4" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: '3. ' + $t('form.mobile')})">
                <b-form-input type="text" v-model="form.teltitle4" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.email') + '1'})" :class="{ 'form-group--error': $v.form.email1.$error }">
                <b-form-input type="email" v-model="form.email1" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: '1. ' + $t('form.email')})">
                <b-form-input type="text" v-model="form.emailtitle1" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactLabel', {label: $t('form.email') + '2'})" :class="{ 'form-group--error': $v.form.email2.$error }">
                <b-form-input type="email" v-model="form.email2" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('form.paramContactValue', {value: '2. ' + $t('form.email')})">
                <b-form-input type="text" v-model="form.emailtitle2" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group :label="$t('Customer.note')">
                <b-form-textarea rows="4" v-model="form.note" />
              </b-form-group>
            </b-col>
          </b-row>
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
      isSelectedUser: false,
      disabledInput: false,
      tabIndex: 1,
      userGender: [
        { label: this.$t('Customer.gender-mr'), value: 'mr'},
        { label: this.$t('Customer.gender-mrs'), value: 'mrs'}
      ],
      form: {
        company: '',
        user: '',
        country: '',
        city: '',
        customerType: '',
        tel1: '',
        tel2: '',
        tel3: '',
        tel4: '',
        teltitle1: '',
        teltitle2: '',
        teltitle3: '',
        teltitle4: '',
        email1: '',
        emailtitle1: '',
        email2: '',
        emailtitle2: '',
        fax: '',
        faxtitle: '',
        note: '',
        status: 1,
        balance: '0',
        before: '0',
        credit: '0',
        disclaimer: '',
        discount: '',
        code: '',
        title: '',
        address: '',
        postal_code: '',
        mwst_number: '',
        userGender: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userLevel: '',
        userKvkk: 1,
        userStatus: 1,
        userPhone: '',
        customer: ''
      }
    }
  },
  computed: {
    ...mapState(['returnCount', 'returnLog', 'allCompanies', 'allCustomers', 'allUsers', 'allCustomerTypes', 'allCountries', 'allCities', 'allUserLevels'])
  },
  watch: {
    returnCount: function (e) {
      // 1. user create edilince returnCount 2 olacak şekilde update edilir.
      // 2. retCount 2 olduğu için customer create edilir. Customer Create olunca retcount 3 olacak.
      // 3. retcount 3 olduğunda auth servisi çalışacak.
      // 4. auth bittiğinde retCount 0a çekilecek.
      switch (e) {
        case 2:
          this.disabledInput = true
          this.isSelectedUser = true
          this.tabIndex = 2
          console.log('setReturn 2 ->: ' + e)
          this.form.user = this.returnLog.id
          this.$store.commit('setLog', [])
          this.$store.commit('setReturn', 0)
          this.submitCustomer()
          break
        case 3:
          console.log('setReturn 3 ->: ' + e)
          this.form.customer = this.returnLog.id
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
    this.customerTypes()
    this.userLevels()
    this.$store.commit('setLoader', false)
  },
  methods: {
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.commit('setLoader', true)
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.creatingCustomer'), type: 'info'})
        if (this.form.user) {
          this.submitCustomer()
        } else {
          this.submitUser()
        }
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
    submitCustomer () {
      let customerInfo = {
        company: this.form.company,
        user: this.form.user,
        country: this.form.country,
        city: this.form.city,
        customerType: this.form.customerType,
        tel1: this.form.tel1,
        tel2: this.form.tel2,
        tel3: this.form.tel3,
        tel4: this.form.tel4,
        teltitle1: this.form.teltitle1,
        teltitle2: this.form.teltitle2,
        teltitle3: this.form.teltitle3,
        teltitle4: this.form.teltitle4,
        email1: this.form.email1,
        emailtitle1: this.form.emailtitle1,
        email2: this.form.email2,
        emailtitle2: this.form.emailtitle2,
        fax: this.form.fax,
        faxtitle: this.form.faxtitle,
        note: this.form.note,
        status: this.form.status,
        balance: this.form.balance,
        before: this.form.before,
        credit: this.form.credit,
        credit_limit: this.form.credit,
        disclaimer: this.form.disclaimer,
        discount: this.form.discount,
        code: this.form.code,
        title: this.form.title,
        address: this.form.address,
        postal_code: this.form.postal_code,
        mwst_number: this.form.mwst_number,
        token: ''
      }
      this.$store.dispatch('createData', { ...this.data, api: 'customer', info: customerInfo, turn: 'Customer', retcount: 3 })
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
      this.$store.dispatch('createData', {...this.data, api: 'authority', info: authInfo, turn: 'Customer', retcount: 0})
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
    customerTypes () {
      this.$store.dispatch('getCustomerTypes', {...this.data, param: '?type=09d1d656'})
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
      this.users(e.id)
    },
    selectUser (e) {
      this.form.user = e.id
      this.form.userLevel = parseInt(e.level)
      this.form.company = e.company
    },
    selectGender (e) {
      this.form.userGender = e.value
    },
    selectedLevel (e) {
      this.form.userLevel = parseInt(e.level)
    },
    selectedCountry (e) {
      this.form.country = e.id
      this.cities(e.id)
    },
    selectedCity (e) {
      this.form.city = e.id
    },
    selectCustomerType (e) {
      this.form.customerType = e.level
    }
  },
  validations () {
    if (this.isSelectedUser) {
      return {
        form: {
          user: { required },
          company: { required },
          userLevel: { },
          userName: { },
          userEmail: { },
          userPassword: { },
          code: { required },
          title: { required },
          country: { required },
          city: { required },
          customerType: { required },
          email1: { email },
          email2: { email }
        }
      }
    } else {
      return {
        form: {
          user: { },
          company: { required },
          userLevel: { required },
          userName: { required },
          userEmail: { required },
          userPassword: { required },
          code: { required },
          title: { required },
          country: { required },
          city: { required },
          customerType: { required },
          email1: { email },
          email2: { email }
        }
      }
    }
  }
}
</script>
