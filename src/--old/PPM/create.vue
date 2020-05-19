<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.createPPM')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__insertPage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.submit')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="12" xl="4" class="mb-3">
        <b-card :title="$t('PPM.general')" class="shadow mb-3">
          <b-form-group :label="$t('PPM.brand')">
            <v-select :options="allBrands" label="title" @input="selectedBrand" />
          </b-form-group>
          <b-form-group :label="$t('PPM.tariff')">
            <v-select :options="allTariffs" label="title" @input="selectedTariff" />
          </b-form-group>
          <b-form-group :label="$t('PPM.package')" :class="$v.form.package.$error && !$v.form.package.required ? 'form-group--error' : ''">
            <v-select :options="allPackages" label="title" @input="selectedPackage" />
          </b-form-group>
          <b-form-group :label="$t('PPM.phone')" :class="$v.form.phone.$error && !$v.form.phone.required ? 'form-group--error' : ''">
            <v-select :options="allPhones" label="sub_title" @input="selectedPhone" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="8" class="mb-3">
        <b-card v-if="showTariff" class="shadow mb-3">
          <b-row>
            <b-col cols="4">
              <b-row>
                <b-col cols="8">
                  <h4>{{clc.getTariffTitle}}</h4>
                </b-col>
                <b-col cols="4" class="text-right">
                  <img width="100%" :src="storageLink + clc.getTariffLogo">
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">{{$t('PPM.tariffPrice')}} €</b-col>
                <b-col cols="4" class="text-right">{{clc.getTariffPrice}} €</b-col>
                <b-col cols="8">{{$t('PPM.tariffDiscount')}}</b-col>
                <b-col cols="4" class="text-right">{{clc.getTariffDiscount}} €</b-col>
                <b-col cols="12" class="text-right"><h3>{{clcTariffPrice}} €</h3></b-col>
              </b-row>
            </b-col>
            <b-col cols="8" v-if="showPack">
              <b-row>
                <b-col cols="4" class="text-right">
                  <img height="160" :src="storageLink + clc.getPackageLogo">
                </b-col>
                <b-col cols="8">
                  <b-row>
                    <b-col cols="12"><h4>{{clc.getPackageTitle}}</h4></b-col>
                    <b-col cols="8">{{$t('PPM.tariffPrice')}}</b-col>
                    <b-col cols="4" class="text-right">{{clc.getPackagePrice}} €</b-col>
                    <b-col cols="8">{{$t('PPM.tariffDiscount')}}</b-col>
                    <b-col cols="4" class="text-right">{{clc.getPackageCommission}} €</b-col>

                    <b-col cols="8">{{$t('PPM.packageAddCommission')}}</b-col>
                    <b-col cols="4" class="text-right">{{clc.getPackageAddCommission}} €</b-col>
                    <b-col cols="8">{{$t('PPM.packageOneTimePayment')}}</b-col>
                    <b-col cols="4" class="text-right">{{clc.getPackageOneTimePayment}} €</b-col>

                    <b-col cols="12" class="text-right"><h3>{{clcPackagePrice}} €</h3></b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
        <b-card v-if="showPhone" class="shadow">
          <b-row>
            <b-col cols="3">
              <img :src="storageLink+clc.getPhonePhoto" width="100%">
            </b-col>
            <b-col cols="9">
              <b-row>
                <b-col cols="4">
                  <h4>{{clc.getPhoneTitle}}</h4>
                  <b-form-group :label="$t('PPM.clcHwCommission')" :class="$v.form.clcHwCommission.$error && !$v.form.clcHwCommission.required ? 'form-group--error' : ''">
                    <b-form-input type="number" v-model="clcHwCommission" @focus.native="clcHwCommission = null" />
                  </b-form-group>
                </b-col>
                <b-col cols="4">
                  <h4 class="text-right">{{clc.getPhonePrice}} €</h4>
                  <b-form-group :label="$t('PPM.clcAddCommission')" :class="$v.form.clcAddCommission.$error && !$v.form.clcAddCommission.required ? 'form-group--error' : ''">
                    <b-form-input type="number" v-model="clcAddCommission" @focus.native="clcAddCommission = null" />
                  </b-form-group>
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col cols="4">
                  <h4>{{$t('PPM.subTotal')}}</h4>
                </b-col>
                <b-col cols="4" class="text-right">
                  <h4>{{clcPhonePrice}} €</h4>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
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
      brandName: '',
      tarifName: '',
      phoneName: '',
      showTariff: false,
      showPack: false,
      showPhone: false,
      form: {
        clcHwCommission: '',
        clcAddCommission: '',
        package: '',
        phone: '',
        status: 1
      },
      clcTariffPrice: '',
      clcPackagePrice: '',
      clcPhonePrice: '',
      clcHwCommission: parseInt(0),
      clcAddCommission: parseInt(0),
      clcPhoneCommission: '',
      clcPhonePriceTotal: '',
      clc: {
        getTariffLogo: '',
        getTariffTitle: '',
        getTariffPrice: '',
        getTariffDiscount: '',

        getPackageLogo: '',
        getPackageTitle: '',
        getPackagePrice: '',
        getPackageCommission: '',
        getPackageAddCommission: '',
        getPackageOneTimePayment: '',

        getPhoneTitle: '',
        getPhonePrice: ''
      }
    }
  },
  computed: {
    ...mapState(['storageLink', 'editorOption', 'returnCount', 'returnLog', 'allTariffs', 'allBrands', 'allPackages', 'allPhones', 'getPhone', 'getPackage', 'getTariff'])
  },
  watch: {
    getPhone: function (e) {
      this.clc.getPhonePrice = this.getPhone.price
      this.clc.getPhoneTitle = this.getPhone.title
      this.clc.getPhonePhoto = this.getPhone.photo
      this.getPackageTotalWithPhone()
      this.getSubTotal()
    },
    getPackage: function (e) {
      this.clc.getPackageLogo = this.getPackage.photo
      this.clc.getPackageTitle = this.getPackage.title
      this.clc.getPackagePrice = this.getPackage.price
      this.clc.getPackageCommission = this.getPackage.commission
      this.clc.getPackageAddCommission = this.getPackage.addCommission
      this.clc.getPackageOneTimePayment = this.getPackage.oneTimePayment
      this.getPackageTotalNoPhone()
    },
    getTariff: function (e) {
      this.clc.getTariffTitle = this.getTariff.title
      this.clc.getTariffPrice = this.getTariff.price
      this.clc.getTariffDiscount = this.getTariff.discount
      this.getTariffTotal()
    },
    clcHwCommission: function (e) {
      console.log(e)
      this.form.clcHwCommission = parseInt(e)
      this.getSubTotal()
    },
    clcAddCommission: function (e) {
      console.log(e)
      this.form.clcAddCommission = parseInt(e)
      this.getSubTotal()
    }
  },
  mounted () {
    this.brands('b03fa0c1')
    this.phones()
  },
  methods: {
    contentText ({ html, text }) {
      this.form.content = html
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitPPM()
      }
    },
    submitPPM () {
      let datas = {
        hwCommission: this.form.clcHwCommission,
        addCommission: this.form.clcAddCommission,
        package: this.form.package,
        phone: this.form.phone,
        status: this.form.status,
        slug: this.brandName + '-' + this.tarifName + '-' + this.phoneName
      }
      this.$store.dispatch('createData', {...this.data, api: 'ppm', info: datas, turn: 'PPM', retcount: 0})
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}&select=id,title,logo`})
    },
    phones () {
      this.$store.dispatch('getPhones', {...this.data, param: '&select=title,id,sub_title,slug'})
    },
    selectedBrand (e) {
      this.brandName = e.title
      this.$store.dispatch('getTariffs', {...this.data, param: `?brand=${e.id}&select=id,title,slug`})
      this.clc.getTariffLogo = e.logo
    },
    selectedTariff (e) {
      this.tarifName = e.title
      this.$store.dispatch('getPackage', {...this.data, param: `?tariff=${e.id}&simonly=0&select=id,title,slug`})
      this.$store.dispatch('showTariff', {...this.data, param: e.slug})
      this.showTariff = true
    },
    selectedPackage (e) {
      this.form.package = e.id
      this.$store.dispatch('showPackage', {...this.data, param: e.slug})
      this.showPack = true
    },
    selectedPhone (e) {
      this.form.phone = (e.id)
      this.$store.dispatch('showPhone', {...this.data, param: e.slug})
      this.phoneName = e.slug
      this.showPhone = true
    },
    getTariffTotal () {
      if (this.getTariff) {
        this.clcTariffPrice = this.clc.getTariffPrice
      }
    },
    getPackageTotalNoPhone () {
      if (this.getPackage) {
        let gpt = this.clc.getTariffPrice - (this.clc.getTariffDiscount / 24) + parseFloat(this.clc.getPackagePrice)
        this.clcPackagePrice = gpt.toFixed(2)
      }
    },
    getPackageTotalWithPhone () {
      if (this.getPackage) {
        let gptp = parseFloat(this.clc.getTariffPrice) + parseFloat(this.clc.getPackagePrice)
        this.clcPackagePrice = gptp.toFixed(2)
      }
    },
    getSubTotal () {
      this.clcPhoneCommission = parseFloat(this.clc.getPackageCommission) + parseFloat(this.clcHwCommission)
      this.clcPhonePriceTotal = this.clcPhoneCommission - parseFloat(this.clcAddCommission)
      this.clcPhonePrice = parseFloat(this.clc.getPhonePrice) - this.clcPhonePriceTotal
    }
  },
  validations () {
    return {
      form: {
        clcHwCommission: { required },
        clcAddCommission: { required },
        package: { required },
        phone: { required }
      }
    }
  }
}
</script>
