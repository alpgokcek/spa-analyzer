<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: tariffTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Tariff.general')" class="shadow">
          <b-form-group :label="$t('Tariff.title')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" />
          </b-form-group>
          <b-row>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.showPrice')" :class="$v.form.price.$error && !$v.form.price.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.price.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.discount')" :class="$v.form.discount.$error && !$v.form.discount.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.discount.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.talk')" :class="$v.form.talk.$error && !$v.form.talk.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.talk.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.internet')" :class="$v.form.internet.$error && !$v.form.internet.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.internet.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.sms')" :class="$v.form.sms.$error && !$v.form.sms.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.sms.$model" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
              <b-form-group :label="$t('Tariff.europe')" :class="$v.form.europe.$error && !$v.form.europe.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.europe.$model" />
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
                <p>{{$t('form.setCover')}}</p>
                <div class="asc__updatePage-cover-scroll">
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
        <b-card :title="$t('Tariff.details')" class="shadow">
          <quill-editor v-model="form.content" class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)"/>
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
      tariffTitle: '',
      form: {
        title: '',
        content: '',
        status: '',
        price: '',
        talk: '',
        internet: '',
        sms: '',
        europe: '',
        discount: '',
        photo: '',
        gallery: ''
      }
    }
  },
  computed: {
    ...mapState(['getTariff', 'dropzoneOptions', 'editorOption', 'storageLink'])
  },
  watch: {
    getTariff: function (e) {
      this.tariffTitle = e.title
      this.form.title = e.title
      this.form.content = e.content
      this.form.status = e.status
      this.form.price = e.price
      this.form.talk = e.talk
      this.form.internet = e.internet
      this.form.sms = e.sms
      this.form.europe = e.europe
      this.form.discount = e.discount
      this.form.photo = e.photo
      this.form.gallery = e.gallery
    }
  },
  mounted () {
    this.getData(this.$route.params.slug)
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showTariff', {...this.data, param: e})
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
        this.submitTariff()
      }
    },
    submitTariff () {
      let datas = {
        title: this.form.title,
        content: this.form.content,
        status: 1,
        discount: this.form.discount,
        price: this.form.price,
        talk: this.form.talk,
        internet: this.form.internet,
        sms: this.form.sms,
        europe: this.form.europe,
        photo: this.form.photo,
        gallery: this.uploadedImages
      }
      this.$store.dispatch('updateData', {...this.data, api: 'tariff', id: this.$route.params.slug, info: datas, turn: 'Tariff', retcount: 0})
    },
    setCover (e, id) {
      $('.asc__updatePage-cover-scroll figure').removeClass('asc__updatePage-cover-selected')
      $('#' + id).addClass('asc__updatePage-cover-selected')
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
        discount: { required },
        price: { required },
        talk: { required },
        internet: { required },
        sms: { required },
        europe: { required }
      }
    }
  }
}
</script>
