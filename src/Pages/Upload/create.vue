<template>
  <div class="asc__insertPage">
    <b-row class="asc__insertPage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('router.FileUpload')}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
      </b-col>
    </b-row>
    <b-row class="asc__insertPage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="mb-3">
        <b-card :title="$t('Upload.UploadExcel')" class="shadow">
         
          <b-form-group :label="$t('Upload.year_and_term')" :class="$v.form.year_and_term.$error && !$v.form.year_and_term.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.year_and_term.$model" placeholder="Örn: 2019-2020-01" />
          </b-form-group>
         
          <b-form-group :label="$t('Upload.type')" :class="$v.form.type.$error && !$v.form.type.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.type.$model" placeholder="Örn: GAT / SPA" />
          </b-form-group>
         
          <b-form-group :label="$t('Upload.code')" :class="$v.form.code.$error && !$v.form.code.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.code.$model" />
          </b-form-group>
         
          <b-form-group :label="$t('Upload.name')" :class="$v.form.name.$error && !$v.form.name.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.name.$model" />
          </b-form-group>
         
          <b-form-group :label="$t('Upload.credit')" :class="$v.form.credit.$error && !$v.form.credit.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.credit.$model" />
          </b-form-group>

          <div class="asc__insertPage-tab-innerTab mb-4">
            <b-form-group>
              <vue-dropzone ref="uploadFile" id="dropzone"
              :options="excelUploadOptions"
              @vdropzone-success="showSuccess"
              v-on:vdropzone-sending="sendingEvent"
              ></vue-dropzone>
            </b-form-group>
          </div>
          <b-button variant="success" size="sm" class="text-white float-right asc__insertPage-header-Create" type="button" @click="submitForm()">
            <i class="far fa-check-square"></i> {{$t('form.submit')}}
          </b-button>
        </b-card>
      </b-col>
      <b-col>
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
      form: {
        department: '',
        year_and_term: '',
        type: '',
        code: '',
        name: '',
        credit: '',
        section: '',
      }
    }
  },
  watch: {
    getCourse: function (e) {
      this.form.code = e.code
      this.form.year_and_term = e.year_and_term
      this.form.name = e.title
      this.form.credit = e.credit
    }
  },
  computed: {
    ...mapState(['excelUploadOptions', 'getCourse'])
  },
  mounted () {
    this.course(this.$route.params.course)
    this.form.department = this.$route.params.department
    this.form.section = this.$route.params.section
  },
  methods: {
    sendingEvent (file, xhr, formData) {

      formData.append('department', this.form.department)
      formData.append('year_and_term', this.form.year_and_term)
      formData.append('type', this.form.type)
      formData.append('code', this.form.code)
      formData.append('name', this.form.name)
      formData.append('credit', this.form.credit)
      formData.append('section', this.form.section)

    },
    course (e) {
      this.$store.dispatch('showCourse', {...this.data, param: e})
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
    showSuccess (file, response) {
      this.errorMsg = response.message
      this.errors = response.errors
      this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Upload.ok'), type: 'info'})
      this.$router.push({name: 'Dashboard'})
    },
    submitPins () {
      this.$refs.uploadFile.processQueue()
    }
  },
  validations () {
    return {
      form: {
        year_and_term: { required },
        type: { required },
        code: { required },
        name: { required },
        credit: { required }
      }
    }
  }
}
</script>
