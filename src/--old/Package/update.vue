<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.update', {val: packTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> {{$t('form.update')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="4" class="mb-3">
        <b-card :title="$t('Phone.general')" class="shadow">
          <b-form-group :label="$t('Package.title')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" />
          </b-form-group>
          <b-form-group :label="$t('Package.commission')">
            <b-form-input type="text" v-model="form.commission" />
          </b-form-group>
          <b-form-group :label="$t('Package.additionalCommission')" v-if="isSimOnly">
            <b-form-input type="text" v-model="form.addCommission" />
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
            <quill-editor v-model="form.content" class="editor" ref="myTextEditor" :options="editorOption" @change="contentText($event)"/>
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
      packTitle: '',
      isSimOnly: false,
      form: {
        title: '',
        commission: '',
        addCommission: '',
        price: '',
        oneTimePayment: '',
        content: '',
        status: '',
        photo: '',
        gallery: ''
      }
    }
  },
  computed: {
    ...mapState(['editorOption', 'editorJs', 'getPackage'])
  },
  watch: {
    getPackage: function (e) {
      this.isSimOnly = e.simonly === 1 ? false : true
      this.packTitle = e.title
      this.form.title = e.title
      this.form.commission = e.commission
      this.form.addCommission = e.add_commission
      this.form.price = e.price
      this.form.oneTimePayment = e.one_time_payment
      this.form.content = e.content
      this.form.status = e.status
      this.form.photo = e.photo
      this.form.gallery = e.gallery
    }
  },
  mounted () {
    this.getData(this.$route.params.slug)
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showPackage', {...this.data, param: e})
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
        commission: this.form.commission,
        add_commission: this.form.addCommission,
        price: this.form.price,
        one_time_payment: this.form.oneTimePayment,
        content: this.form.content,
        status: this.form.status,
        photo: this.form.photo,
        gallery: this.form.gallery
      }
      this.$store.dispatch('updateData', {...this.data, api: 'tariffPack', id: this.$route.params.slug, info: datas, turn: 'Package', retcount: 0})
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
        title: { required }
      }
    }
  }
}
</script>
