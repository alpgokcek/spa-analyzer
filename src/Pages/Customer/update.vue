<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: customerTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card :title="$t('Customer.customerUpdate')" class="shadow">
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
                <v-select v-model="countryTitle" @input="cities" :options="allCountries" label="title" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('Customer.city')" :class="$v.form.city.$error && !$v.form.city.required ? 'form-group--error' : ''">
                <v-select v-model="cityTitle" :options="allCities" label="title" @input="selectedCity" />
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
            <v-select v-model="typeTitle" @input="selectCustomerType" :options="allCustomerTypes" label="title" />
          </b-form-group>
          <b-form-group :label="$t('Customer.status')">
            <b-row>
              <b-col cols="4">&nbsp;</b-col>
              <b-col cols="3" class="text-right">{{$t('list.passive')}}</b-col>
              <b-col cols="2" class="text-center"><b-form-checkbox v-model="status" name="check-button" switch></b-form-checkbox></b-col>
              <b-col cols="3" class="text-left">{{$t('list.active')}}</b-col>
            </b-row>
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
                <b-form-textarea rows="5" v-model="form.note" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card :title="$t('Customer.balanceCredit')" class="shadow">
          <b-form-group :label="$t('Customer.balance')">
            <b-form-input type="text" v-model="form.balance" />
          </b-form-group>
          <b-form-group :label="$t('Customer.dispo')">
            <b-form-input type="text" v-model="form.credit" />
          </b-form-group>
          <b-form-group :label="$t('Customer.credit')">
            <b-form-input type="text" v-model="form.credit_limit" />
          </b-form-group>
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
      countryTitle: '',
      cityTitle: '',
      status: true,
      typeTitle: '',
      customerTitle: '',
      form: {
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
        status: '',
        balance: '0',
        before: '0',
        credit: '0',
        credit_limit: '0',
        disclaimer: '',
        discount: '',
        code: '',
        title: '',
        address: '',
        postal_code: '',
        mwst_number: ''
      }
    }
  },
  computed: {
    ...mapState(['getCustomer', 'returnCount', 'returnLog', 'allCustomers', 'allCustomerTypes', 'allCountries', 'allCities'])
  },
  watch: {
    getCustomer: function (e) {
      this.countryTitle = e.countryName
      this.cityTitle = e.cityName
      this.status = e.status === '1' ? true : false
      this.customerTitle = e.title
      this.typeTitle = e.typeTitle
      this.form.country = e.country
      this.form.city = e.city
      this.form.customerType = e.type
      this.form.tel1 = e.tel1
      this.form.tel2 = e.tel2
      this.form.tel3 = e.tel3
      this.form.tel4 = e.tel4
      this.form.teltitle1 = e.teltitle1
      this.form.teltitle2 = e.teltitle2
      this.form.teltitle3 = e.teltitle3
      this.form.teltitle4 = e.teltitle4
      this.form.email1 = e.email1
      this.form.emailtitle1 = e.emailtitle1
      this.form.email2 = e.email2
      this.form.emailtitle2 = e.emailtitle2
      this.form.fax = e.fax
      this.form.faxtitle = e.faxtitle
      this.form.note = e.note
      this.form.status = e.status
      this.form.balance = e.balance
      this.form.before = e.before
      this.form.credit = e.credit
      this.form.credit_limit = e.credit_limit
      this.form.disclaimer = e.disclaimer
      this.form.discount = e.discount
      this.form.code = e.code
      this.form.title = e.title
      this.form.address = e.address
      this.form.postal_code = e.postal_code
      this.form.mwst_number = e.mwst_number
    },
    status: function (e) {
      if (e === true) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
    }
  },
  mounted () {
    this.loadData(this.$route.params.token)
    this.countries()
    this.customerTypes()
  },
  methods: {
    loadData (e) {
      this.$store.dispatch('showCustomer', {...this.data, param: e})
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitCustomer()
      }
    },
    submitCustomer () {
      let customerInfo = {
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
        credit_limit: this.form.credit_limit,
        disclaimer: this.form.disclaimer,
        discount: this.form.discount,
        code: this.form.code,
        title: this.form.title,
        address: this.form.address,
        postal_code: this.form.postal_code,
        mwst_number: this.form.mwst_number
      }
      this.$store.dispatch('updateData', {...this.data, api: 'customer', id: this.$route.params.token, info: customerInfo, turn: 'Customer', retcount: 0 })
    },
    customers (e, s) {
      this.$store.dispatch('getCustomers', {...this.data, param: `status=${s}&company=${e}&select=company,title,id`})
    },
    customerTypes () {
      this.$store.dispatch('getCustomerTypes', {...this.data, param: '?type=09d1d656'})
    },
    countries () {
      this.$store.dispatch('getCountries')
    },
    cities (e) {
      this.form.country = e.id
      this.$store.dispatch('getCities', {...this.data, param: `?country=${e.id}&status=1`})
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
    return {
      form: {
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
</script>
