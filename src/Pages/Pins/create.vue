<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.PinsCreate')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__insertPage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.submit')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Pins.general')" class="shadow">
          <b-form-group :label="$t('Pins.company')" :class="$v.form.company.$error && !$v.form.company.required ? 'form-group--error' : ''">
            <v-select :options="allCompanies" label="name" @input="selectCompany" />
          </b-form-group>
          <b-form-group :label="$t('Pins.brand')" :class="$v.form.brand.$error && !$v.form.brand.required ? 'form-group--error' : ''">
            <v-select :options="allBrands" label="title" @input="selectedBrand" />
          </b-form-group>
          <b-form-group :label="$t('Pins.cardType')" :class="$v.form.type.$error ? 'form-group--error' : ''">
            <v-select @input="selectType" :options="allPinTypes" label="title" />
          </b-form-group>
          <b-form-group :label="$t('Pins.title')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" />
          </b-form-group>
          <b-row>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Pins.price')" :class="$v.form.price.$error && !$v.form.price.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.price.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Pins.discount')" :class="$v.form.discount.$error && !$v.form.discount.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.discount.$model" />
              </b-form-group>
            </b-col>
          </b-row>
          <div class="asc__insertPage-tab-innerTab mb-4">
            <b-tabs>
              <b-tab :title="$t('form.uploadPhoto')" active>
                <b-form-group>
                  <vue-dropzone ref="uploadFile" id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-success="showSuccess" />
                </b-form-group>
              </b-tab>
              <b-tab :title="$t('form.selectCover')">
                <p>{{$t('form.setCover')}}</p>
                <div class="asc__insertPage-cover-scroll">
                  <figure v-for="(img,i) in uploadedImages" :key="i" :id="'cover'+i">
                    <img :src="img.url" @click="setCover(img.path,'cover'+i)">
                  </figure>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="9" class="mb-3">
        <b-card :title="$t('Pins.details')" class="shadow">
          <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)"/>
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
      form: {
        company: '',
        brand: '',
        user: '',
        type: '',
        title: '',
        content: '',
        status: '1',
        price: '',
        discount: '',
        vat: '',
        FreeAccessNumber: '',
        MobileAccessNumber: '',
        LocalAccessNumber: '',
        Telefonzelle: '',
        CustomerService: '',
        photo: ''
      }
    }
  },
  computed: {
    ...mapState(['dropzoneOptions', 'editorOption', 'returnCount', 'allCompanies', 'allPinTypes', 'returnLog', 'allBrands', 'allColors', 'allStorages'])
  },
  mounted () {
    this.companies()
    this.pinTypes()
    this.brands('b03fa0c1')
  },
  methods: {
    companies () {
      this.$store.dispatch('getCompanies', {...this.data, param: `status=1&select=name,id`})
    },
    pinTypes () {
      this.$store.dispatch('getPinTypes', {...this.data, param: '?type=d4b47741'})
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
        this.submitPins()
      }
    },
    submitPins () {
      let datas = {
        company: this.form.company,
        brand: this.form.brand,
        user: this.form.user,
        type: this.form.type,
        title: this.form.title,
        content: this.form.content,
        status: this.form.status,
        price: this.form.price,
        discount: this.form.discount,
        vat: this.form.vat,
        FreeAccessNumber: this.form.FreeAccessNumber,
        MobileAccessNumber: this.form.MobileAccessNumber,
        LocalAccessNumber: this.form.LocalAccessNumber,
        Telefonzelle: this.form.Telefonzelle,
        CustomerService: this.form.CustomerService,
        photo: this.form.photo,
        slug: this.brandName + '-' + this.form.title
      }
      this.$store.dispatch('createData', {...this.data, api: 'pins', info: datas, turn: 'Pins', retcount: 0})
    },
    selectCompany (e) {
      this.form.company = e.id
    },
    selectType (e) {
      this.form.type = e.level
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}`})
    },
    selectedBrand (e) {
      this.form.brand = e.id
      this.brandName = e.title
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
        company: { required },
        brand: { required },
        type: { required },
        title: { required },
        discount: { required },
        price: { required }
      }
    }
  }
}
</script>
