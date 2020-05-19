<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.updatePPM')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="12" xl="8" class="mb-3">
        <b-card class="shadow mb-3">
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
            <b-col cols="8">
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
        <b-card class="shadow">
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
    ...mapState(['storageLink', 'editorOption', 'getPPM', 'getPhone', 'getPackage', 'getTariff'])
  },
  watch: {
    getPPM: function (e) {
      this.selectedTariff(e.tariffTitle, e.tariffId, e.tariffSlug)
      this.selectedPackage(e.packSlug)
      this.selectedPhone(e.phoneSlug)
      this.clcHwCommission = e.hw_commission
      this.clcAddCommission = e.add_commission
    },
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
    this.getData(this.$route.params.slug)
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showPPM', {...this.data, param: e})
    },
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
        addCommission: this.form.clcAddCommission
      }
      this.$store.dispatch('updateData', {...this.data, api: 'ppm', id: this.$route.params.slug, info: datas, turn: 'PPM', retcount: 0})
    },
    selectedBrand (e) {
      this.$store.dispatch('getTariffs', {...this.data, param: `?brand=${e.id}&select=id,title,slug`})
      this.clc.getTariffLogo = e.logo
    },
    selectedTariff (t, i, s) {
      console.log(t)
      this.tarifName = t
      this.$store.dispatch('getPackage', {...this.data, param: `?tariff=${i}&simonly=0&select=id,title,slug`})
      this.$store.dispatch('showTariff', {...this.data, param: s})
    },
    selectedPackage (e) {
      this.$store.dispatch('showPackage', {...this.data, param: e})
    },
    selectedPhone (e) {
      this.$store.dispatch('showPhone', {...this.data, param: e})
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
        clcAddCommission: { required }
      }
    }
  }
}
</script>
