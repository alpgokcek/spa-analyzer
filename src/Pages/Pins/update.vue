<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: pinTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Pins.general')" class="shadow">
          <b-form-group :label="$t('Pins.cardType')" :class="$v.form.type.$error ? 'form-group--error' : ''">
            <v-select @input="selectType" v-model="cardType" :options="allPinTypes" label="title" />
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
          <b-form-group :label="$t('Pins.status')">
            <b-row>
              <b-col cols="4">&nbsp;</b-col>
              <b-col cols="3" class="text-right">{{$t('list.passive')}}</b-col>
              <b-col cols="2" class="text-center"><b-form-checkbox v-model="status" name="check-button" switch></b-form-checkbox></b-col>
              <b-col cols="3" class="text-left">{{$t('list.active')}}</b-col>
            </b-row>
          </b-form-group>
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
        <b-card :title="$t('Pins.details')" class="shadow">
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
      pinTitle: '',
      cardType: '',
      status: '',
      form: {
        type: '',
        title: '',
        content: '',
        status: '',
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
    ...mapState(['getPin', 'allPinTypes', 'dropzoneOptions', 'editorOption', 'storageLink'])
  },
  watch: {
    getPin: function (e) {
      this.pinTitle = e.title
      this.cardType = e.cardType
      this.status = e.status === '1' ? true : false
      this.form.type = e.type
      this.form.title = e.title
      this.form.content = e.content
      this.form.status = e.status
      this.form.price = e.price
      this.form.discount = e.discount
      this.form.vat = e.vat
      this.form.FreeAccessNumber = e.FreeAccessNumber
      this.form.MobileAccessNumber = e.MobileAccessNumber
      this.form.LocalAccessNumber = e.LocalAccessNumber
      this.form.Telefonzelle = e.Telefonzelle
      this.form.CustomerService = e.CustomerService
      this.form.photo = e.photo
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
    this.getData(this.$route.params.slug)
    this.pinTypes()
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showPin', {...this.data, param: e})
    },
    pinTypes () {
      this.$store.dispatch('getPinTypes', {...this.data, param: '?type=d4b47741'})
    },
    contentText ({ html, text }) {
      this.form.content = html
    },
    selectType (e) {
      this.form.type = e.level
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitPin()
      }
    },
    submitPin () {
      let datas = {
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
        photo: this.form.photo
      }
      this.$store.dispatch('updateData', {...this.data, api: 'pins', id: this.$route.params.slug, info: datas, turn: 'Pins', retcount: 0})
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
        type: { required },
        title: { required },
        price: { required },
        discount: { required }
      }
    }
  }
}
</script>
