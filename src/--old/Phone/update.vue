<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: phoneTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Phone.general')" class="shadow">
          <b-row>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Phone.price')">
                <b-form-input type="text" v-model="phonePrice" @keyup="incVat()" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Phone.priceVat')">
                <b-form-input type="text" v-model="phonePriceVat" @keyup="descVat()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <figure>
                <img :src="storageLink + form.photo">
              </figure>
            </b-col>
          </b-row>
          <div class="asc__updatePage-tab-innerTab mb-4">
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
                <div class="asc__updatePage-cover-scroll">
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
        <b-card class="asc__updatePage-card-withTab shadow">
          <b-tabs content-class="mt-1">
            <b-tab title="Content" active>
              <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)" v-model="form.content" />
            </b-tab>
            <b-tab title="General Info">
              <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="generalText($event)" v-model="form.generalInfo" />
            </b-tab>
            <b-tab title="Tech Spec">
              <quill-editor class="editor" ref="myTextEditor" :options="editorOption" @change="techText($event)" v-model="form.technicalspec" />
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
      phonePrice: '',
      phonePriceVat: '',
      phoneTitle: '',
      form: {
        subTitle: '',
        status: '',
        price: '',
        kdv: '',
        cargoPrice: '',
        cargoDay: '',
        summary: '',
        content: '',
        technicalspec: '',
        generalInfo: '',
        line: '',
        hot: '',
        spot: '',
        slider: '',
        homepage: '',
        keywords: '',
        related: '',
        photo: '',
        gallery: ''
      }
    }
  },
  computed: {
    ...mapState(['getPhone', 'dropzoneOptions', 'kdv', 'cargoPrice', 'cargoDay', 'editorOption', 'storageLink'])
  },
  watch: {
    getPhone: function (e) {
      this.phoneTitle = e.title
      this.phonePrice = e.price
      this.phonePriceVat = e.kdv
      this.form.subTitle = e.sub_title
      this.form.status = e.status
      this.form.price = e.price
      this.form.kdv = e.kdv
      this.form.cargoPrice = e.cargo_price
      this.form.cargoDay = e.cargo_day
      this.form.summary = e.summary
      this.form.content = e.content
      this.form.technicalspec = e.technical_spec
      this.form.generalInfo = e.general_info
      this.form.line = e.line
      this.form.hot = e.hot
      this.form.spot = e.spot
      this.form.slider = e.slider
      this.form.homepage = e.homepage
      this.form.keywords = e.keywords
      this.form.related = e.related
      this.form.photo = e.photo
      this.form.gallery = e.gallery
    }
  },
  mounted () {
    this.getData(this.$route.params.slug)
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showPhone', {...this.data, param: e})
    },
    contentText ({ html, text }) {
      this.form.content = html
    },
    generalText ({ html, text }) {
      this.form.generalInfo = html
    },
    techText ({ html, text }) {
      this.form.technicalspec = html
    },
    incVat () {
      this.phonePriceVat = parseFloat(this.phonePrice) + ((parseFloat(this.phonePrice) * this.kdv) / 100)
    },
    descVat () {
      this.phonePrice = parseFloat(this.phonePriceVat / (1 + (this.kdv / 100))).toFixed(2)
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
        subTitle: this.form.subTitle,
        status: this.form.status,
        price: this.phonePrice,
        kdv: this.phonePriceVat,
        cargoPrice: this.form.cargoPrice,
        cargoDay: this.form.cargoDay,
        summary: this.form.summary,
        content: this.form.content,
        technicalspec: this.form.technicalspec,
        generalInfo: this.form.generalInfo,
        line: this.form.line,
        hot: this.form.hot,
        spot: this.form.spot,
        slider: this.form.slider,
        homepage: this.form.homepage,
        keywords: this.form.keywords,
        related: this.form.related,
        photo: this.form.photo,
        gallery: this.form.gallery
      }
      this.$store.dispatch('updateData', {...this.data, api: `product`, id: this.$route.params.slug, info: phoneInfo, turn: 'Phone', retcount: 0})
    },
    setCover (e, id) {
      $('.asc__updatePage-cover-scroll figure').removeClass('asc__updatePage-cover-selected')
      $('#' + id).addClass('asc__updatePage-cover-selected')
      this.form.photo = e
    },
    showSuccess (file) {
      console.log(file)
      this.uploadedImages.push(JSON.parse(file.xhr.response))
    },
    showError (file) {
      console.log(file)
    }
  },
  validations () {
    return {
      form: {
        price: { required },
        kdv: { required },
        content: { required }
      }
    }
  }
}
</script>
