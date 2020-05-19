<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.PackageCreate')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__insertPage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.submit')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="4" class="mb-3">
        <b-card :title="$t('Phone.general')" class="shadow">
          <b-form-group :label="$t('Package.brand')">
            <v-select :options="allBrands" label="title" @input="selectedBrand" />
          </b-form-group>
          <b-form-group :label="$t('Package.tariff')" :class="$v.form.tariff.$error && !$v.form.tariff.required ? 'form-group--error' : ''">
            <v-select :options="allTariffs" label="title" @input="selectedTariff" />
          </b-form-group>
          <b-form-group :label="$t('Package.isSimOnly')">
            <b-row>
              <b-col cols="4">&nbsp;</b-col>
              <b-col cols="3" class="text-left">{{$t('Package.withPhone')}}</b-col>
              <b-col cols="2" class="text-center"><b-form-checkbox v-model="simonly" name="check-button" switch></b-form-checkbox></b-col>
              <b-col cols="3" class="text-right">{{$t('Package.yesSimonly')}}</b-col>
            </b-row>
          </b-form-group>
          <b-form-group :label="$t('Package.title')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" />
          </b-form-group>
          <b-form-group :label="$t('Package.commission')">
            <b-form-input type="text" v-model="form.commission" />
          </b-form-group>
          <b-form-group :label="$t('Package.additionalCommission')" v-if="simonly === false">
            <b-form-input type="text" v-model="form.addcommission" />
          </b-form-group>
          <b-form-group :label="$t('Package.additionalPrice')">
            <b-form-input type="text" v-model="form.price" />
          </b-form-group>
          <b-form-group :label="$t('Package.oneTimePayment')">
            <b-form-input type="text" v-model="form.oneTimePayment" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="8" class="mb-3">
        <b-card :title="$t('Phone.general')" class="shadow">
          <b-form-group>
            <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)"/>
          </b-form-group>
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
      uploadedImages: [],
      brandName: '',
      simonly: false,
      tarifName: '',
      form: {
        tariff: '',
        title: '',
        price: '',
        simonly: 0,
        oneTimePayment: '',
        commission: '',
        addCommission: '',
        status: 1,
        content: '',
        talk: '',
        internet: '',
        sms: ''
      }
    }
  },
  computed: {
    ...mapState(['editorOption', 'editorJs', 'returnCount', 'returnLog', 'allTariffs', 'allBrands'])
  },
  watch: {
    simonly: function (e) {
      if (e === true) {
        this.form.simonly = 1
      } else {
        this.form.simonly = 0
      }
      console.log(this.form.simonly)
    }
  },
  mounted () {
    this.brands('b03fa0c1')
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
        this.submitTariff()
      }
    },
    submitTariff () {
      let datas = {
        tariff: this.form.tariff,
        title: this.form.title,
        commission: this.form.commission,
        addCommission: this.form.addCommission,
        price: this.form.price,
        simonly: this.form.simonly,
        oneTimePayment: this.form.oneTimePayment,
        status: this.form.status,
        content: this.form.content,
        talk: this.form.talk,
        internet: this.form.internet,
        sms: this.form.sms,
        slug: this.form.title + '-' + this.brandName + '-' + this.tarifName
      }
      this.$store.dispatch('createData', {...this.data, api: 'tariffPack', info: datas, turn: 'Package', retcount: 0})
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}`})
    },
    selectedBrand (e) {
      this.brandName = e.title
      this.tariffs(e.id)
    },
    selectedTariff (e) {
      this.form.tariff = e.id
      this.tarifName = e.title
    },
    tariffs (e) {
      this.form.tariff = e
      this.tariffName = e.title
      this.$store.dispatch('getTariffs', {...this.data, param: `?brand=${e}`})
    },
    setCover (e, id) {
      $('.asc__insertPage-cover-scroll figure').removeClass('asc__insertPage-cover-selected')
      $('#' + id).addClass('asc__insertPage-cover-selected')
      this.form.photo = e
    },
    showSuccess (file) {
      this.uploadedImages.push(JSON.parse(file.xhr.response))
    }
  },
  validations () {
    return {
      form: {
        title: { required },
        tariff: { required }
      }
    }
  }
}
</script>
