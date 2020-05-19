<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.PhoneCreate')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__insertPage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.submit')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Phone.general')" class="shadow">
          <b-form-group :label="$t('Phone.company')" :class="$v.form.company.$error && !$v.form.company.required ? 'form-group--error' : ''">
            <v-select :options="allCompanies" label="name" @input="selectCompany" />
          </b-form-group>
          <b-form-group :label="$t('Phone.brand')" :class="$v.form.brand.$error && !$v.form.brand.required ? 'form-group--error' : ''">
            <v-select :options="allBrands" label="title" @input="selectedBrand" />
          </b-form-group>
          <b-form-group :label="$t('Phone.title')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" />
          </b-form-group>
          <div class="asc__insertPage-tab-innerTab mb-4">
            <b-tabs>
              <b-tab :title="$t('form.uploadPhoto')" active>
                <b-form-group>
                  <vue-dropzone ref="uploadFile" id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-success="showSuccess"
                  ></vue-dropzone>
                </b-form-group>
              </b-tab>
              <b-tab :title="$t('form.selectCover')">
                <p>{{$t('product.setCover')}}</p>
                <div class="asc__insertPage-cover-scroll">
                  <figure v-for="(img,i) in uploadedImages" :key="i" :id="'cover'+i">
                    <img :src="img.url" @click="setCover(img.path,'cover'+i)">
                  </figure>
                </div>
              </b-tab>
            </b-tabs>
          </div>
          <b-form-group :label="$t('Phone.content')">
            <b-form-textarea v-model="form.summary" rows="3" max-rows="6" ></b-form-textarea>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="9" class="mb-3">
        <b-card class="asc__insertPage-card-withTab shadow">
          <b-tabs content-class="mt-1">
            <b-tab :title="$t('Phone.detail')" active @click="isSelectedUser = false" :disabled="disabledInput">
              <div class="asc__insertPage-tab-innerTab">
                <b-tabs>
                  <b-tab title="Content" active>
                    <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)"/>
                  </b-tab>
                  <b-tab title="General Info">
                    <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="generalText($event)"/>
                  </b-tab>
                  <b-tab title="Tech Spec">
                    <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="techText($event)"/>
                  </b-tab>
                </b-tabs>
              </div>
            </b-tab>
            <b-tab :title="$t('Phone.colorStoragePrice')">
              <b-row>
                <b-col cols="3">
                  <b-form-group :label="$t('Phone.color')">
                    <v-select :options="allColors" label="title" v-model="phoneColor" />
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group :label="$t('Phone.storage')">
                    <v-select :options="allStorages" label="title" v-model="phoneStorage" />
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group :label="$t('Phone.price')">
                    <b-form-input type="text" v-model="phonePrice" />
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group :label="$t('Phone.addBasket')">
                    <b-button @click="addPhoneToBasket(phoneColor.id,phoneColor.title,phoneStorage.id,phoneStorage.title,phonePrice)" type="button" variant="success" size="sm"><i class="fas fa-plus-square"></i></b-button>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-table class="asc__insertPage-header-table" striped hover :items="addedPhones" :fields="addedPhoneFields">
                    <template v-slot:cell(operation)="row">
                      <b-button @click="delPhoneToBasket(row.index)" type="button" variant="warning" size="sm"><i class="fas fa-minus-square"></i></b-button>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
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
      uploadedImages: [],
      disabledInput: false,
      phoneColor: '',
      phoneStorage: '',
      phonePrice: '',
      phoneBrandName: '',
      phoneTitle: '',
      addedPhoneFields: ['colorT', 'storageT', 'price', 'operation', 'phoneTitle'],
      form: {
        company: '',
        type: 'cellPhone',
        brand: '',
        title: '',
        summary: '',
        content: '',
        technicalspec: '',
        generalInfo: '',
        color: '',
        storage: '',
        price: '',
        status: '',
        line: '',
        hot: '',
        spot: '',
        slider: '',
        homepage: '',
        keywords: '',
        related: '',
        photo: ''
      },
      addedPhones: []
    }
  },
  computed: {
    ...mapState(['dropzoneOptions', 'editorOption', 'returnCount', 'returnLog', 'allCompanies', 'allBrands', 'allColors', 'allStorages'])
  },
  mounted () {
    this.companies()
    this.brands('3c0882c8')
    this.colors('cellPhone')
    this.storages('cellPhone')
  },
  methods: {
    contentText ({ html, text }) {
      this.form.content = html
    },
    generalText ({ html, text }) {
      this.form.generalInfo = html
    },
    techText ({ html, text }) {
      this.form.technicalspec = html
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitPhone()
      }
    },
    submitPhone () {
      let phoneInfo = {
        company: this.form.company,
        type: this.form.type,
        brand: this.form.brand,
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        technicalspec: this.form.technicalspec,
        generalInfo: this.form.generalInfo,
        color: this.form.color,
        storage: this.form.storage,
        price: this.form.price,
        status: 1,
        line: this.form.line,
        hot: this.form.hot,
        spot: this.form.spot,
        slider: this.form.slider,
        homepage: this.form.homepage,
        keywords: this.form.keywords,
        related: this.form.related,
        photo: this.form.photo,
        options: this.addedPhones,
        gallery: this.uploadedImages,
        slug: this.phoneTitle
      }
      this.$store.dispatch('createData', {...this.data, api: 'product/phone', info: phoneInfo, turn: 'Phones', retcount: 0})
    },
    companies () {
      this.$store.dispatch('getCompanies', {...this.data, param: `status=1&select=name,id`})
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}`})
    },
    colors (e) {
      this.$store.dispatch('getColors', {...this.data, param: `?type=${e}`})
    },
    storages (e) {
      this.$store.dispatch('getStorages', {...this.data, param: `?type=${e}`})
    },
    selectCompany (e) {
      this.form.company = e.id
    },
    selectedBrand (e) {
      this.form.brand = e.id
      this.phoneBrandName = e.title
    },
    setCover (e, id) {
      $('.asc__insertPage-cover-scroll figure').removeClass('asc__insertPage-cover-selected')
      $('#' + id).addClass('asc__insertPage-cover-selected')
      this.form.photo = e
    },
    addPhoneToBasket (a, b, c, d, e) {
      let phoneArr = {
        color: a,
        colorT: b,
        storage: c,
        storageT: d,
        price: e,
        phoneTitle: this.phoneBrandName + ' ' + this.form.title + ' ' + d + ' Gb ' + ' ' + b
      }

      this.addedPhones.push(phoneArr)
      this.phoneColor = ''
      this.phoneStorage = ''
      this.phonePrice = ''
    },
    delPhoneToBasket (e) {
      this.addedPhones.splice(e, 1)
    },
    showSuccess (file) {
      this.uploadedImages.push(JSON.parse(file.xhr.response))
    }
  },
  validations () {
    return {
      form: {
        company: { required },
        title: { required },
        brand: { required }
      }
    }
  }
}
</script>
