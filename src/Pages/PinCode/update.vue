<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.upload', {val: getPin.title })}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <h3 class="d-inline-block">{{$t('Pincode.filter')}}</h3>
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 1)">{{ $t('Pincode.active') }}</b-button>
        <b-button variant="info" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 2)">{{ $t('Pincode.sold') }}</b-button>
        <b-button variant="warning" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 3)">{{ $t('Pincode.wrong') }}</b-button>
        <b-button variant="danger" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 0)">{{ $t('Pincode.cancel') }}</b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Pincode.general')" class="shadow">
          <b-form-group :label="$t('Pincode.suppliers')" :class="$v.form.suppliers.$error && !$v.form.suppliers.required ? 'form-group--error' : ''">
            <v-select :options="allBrands" label="title" @input="selectedBrand" />
          </b-form-group>
          <b-form-group :label="$t('Pincode.purchasePrice')" :class="$v.form.purchasePrice.$error && !$v.form.purchasePrice.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.purchasePrice.$model" />
          </b-form-group>
          <b-form-group :label="$t('Pincode.ended_at')" :class="$v.form.ended_at.$error && !$v.form.ended_at.required ? 'form-group--error' : ''">
            <b-form-datepicker id="example-datepicker" v-model.trim="$v.form.ended_at.$model" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <div class="asc__updatePage-tab-innerTab mb-4">
            <b-form-group>
              <vue-dropzone ref="uploadFile" id="dropzone"
              :options="pinUploadOptions"
              @vdropzone-success="showSuccess"
              v-on:vdropzone-sending="sendingEvent"
              ></vue-dropzone>
            </b-form-group>
          </div>
          <b-form-group v-if="getPin.title">
            <h5 v-html="$t('Pincode.uploadDanger', {val: getPin.title})" class="text-center"/>
          </b-form-group>
          <b-button variant="success" size="sm" class="text-white float-right asc__updatePage-header-Create" type="button" @click="submitForm()">
            <i class="far fa-check-square"></i> {{$t('form.submit')}}
          </b-button>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="8" xl="9" class="mb-3">
        <b-card v-if="errors.length >= 1" :title="errorMsg" class="shadow mb-5">
          <ul>
            <li v-for="(err, i) in errors" :key="i">
              {{ err }}
            </li>
          </ul>
        </b-card>
        <b-card :title="$t('Pincode.allCodes')" class="shadow">
          <b-table striped hover small="" :items="allPinCodes" :fields="fields">
            <template v-slot:cell(status)="data">
              <p v-if="data.value == 1" class="btn-success btn-sm d-block text-center mx-auto mb-0 text-light rounded-sm py-0">
                {{ $t('Pincode.active') }}
              </p>
              <p v-else-if="data.value == 2" class="btn-info btn-sm d-block text-center mx-auto mb-0 text-light rounded-sm py-0">
                {{ $t('Pincode.sold') }}
              </p>
              <p v-else-if="data.value == 3" class="btn-warning btn-sm d-block text-center mx-auto mb-0 text-light rounded-sm py-0">
                {{ $t('Pincode.wrong') }}
              </p>
              <p v-else-if="data.value == 0" class="btn-danger btn-sm d-block text-center mx-auto mb-0 text-light rounded-sm py-0">
                {{ $t('Pincode.cancel') }}
              </p>
            </template>
            <template v-slot:cell(id)="data">
              <b-dropdown :id="'dropdown-' + data.value" :text="$t('Pincode.change')" right variant="primary" class="m-0" size="sm">
                <b-dropdown-item @click="changeStatus(data.value, 1)">{{ $t('Pincode.active') }}</b-dropdown-item>
                <b-dropdown-item @click="changeStatus(data.value, 3)">{{ $t('Pincode.wrong') }}</b-dropdown-item>
                <b-dropdown-item @click="changeStatus(data.value, 0)">{{ $t('Pincode.cancel') }}</b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
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
      errors: [],
      errorMsg: '',
      pinName: '',
      uploadedImages: [],
      fields: [
        { key: 'status', label: this.$t('Pincode.status'), sortable: true },
        { key: 'serino', label: this.$t('Pincode.seriNo'), sortable: true },
        { key: 'code', label: this.$t('Pincode.pinCode'), sortable: true },
        { key: 'purchasePrice', label: this.$t('Pincode.purchasePrice'), sortable: true },
        { key: 'supplierTitle', label: this.$t('Pincode.supplierTitle'), sortable: true },
        { key: 'ended_at', label: this.$t('Pincode.ended_at'), sortable: true },
        { key: 'id', label: this.$t('Pincode.operation'), sortable: true }
      ],
      form: {
        pin: '',
        suppliers: '',
        purchasePrice: '',
        ended_at: ''
      }
    }
  },
  watch: {
    returnCount: function (e) {
      console.log(e)
      this.pincodes(this.form.pin, 1)
    }
  },
  computed: {
    ...mapState(['pinUploadOptions', 'getPin', 'apiURL', 'returnCount', 'returnLog', 'allPins', 'allBrands', 'allPinCodes'])
  },
  mounted () {
    this.form.pin = this.$route.params.slug
    this.pin(this.form.pin)
    this.pincodes(this.form.pin, 1)
    this.brands('b03fa0c1')
  },
  methods: {
    pin (e) {
      this.$store.dispatch('showPin', {...this.data, param: e})
    },
    pincodes (e, s) {
      this.$store.commit('setReturn', 0)
      this.$store.dispatch('getPinCodes', {...this.data, param: `?pincode=${e}&status=${s}`})
    },
    changeStatus (i, s) {
      let datas = {
        status: s
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'pincode', id: i, info: datas, retcount: 4 })
    },
    sendingEvent (file, xhr, formData) {
      formData.append('suppliers', this.form.suppliers)
      formData.append('purchasePrice', this.form.purchasePrice)
      formData.append('ended_at', this.form.ended_at)
      formData.append('pin', this.form.pin)
    },
    showSuccess (file, response) {
      this.errorMsg = response.message
      this.errors = response.errors
      this.$store.dispatch('showAlert', {...this.e, msg: response.message, type: 'info'})
      this.pincodes(this.form.pin, 1)
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}`})
    },
    selectedBrand (e) {
      this.form.suppliers = e.id
      this.brandName = e.title
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
      this.$refs.uploadFile.processQueue()
    },
    setCover (e, id) {
      $('.asc__updatePage-cover-scroll figure').removeClass('asc__updatePage-cover-selected')
      $('#' + id).addClass('asc__updatePage-cover-selected')
      this.form.photo = e
    }
  },
  validations () {
    return {
      form: {
        pin: { required },
        suppliers: { required },
        purchasePrice: { required },
        ended_at: { required }
      }
    }
  }
}
</script>
