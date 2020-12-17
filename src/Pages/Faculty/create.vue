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
        <b-card :title="$t('Create Faculty')" class="shadow">

          <b-form-group :label="$t('Universities')" :class="$v.form.university.$error ? 'form-group--error' : ''">
            <v-select :options="allUniversities" label="name" @input="selectUniversity"></v-select>
          </b-form-group>

          <b-form-group :label="$t('Faculty Name')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.title.$model" placeholder="Example: Engineering Faculty" />
          </b-form-group>

          <b-button variant="success" size="sm" class="text-white float-right asc__insertPage-header-Create" type="button" @click="submitForm()">
            <i class="far fa-check-square"></i> {{$t('Submit')}}
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
        title: '',
        university:''
      }
    }
  },
  computed: {
    ...mapState(['getUniversity', 'allUniversities'])
  },
  mounted () {
    this.universities()
  },
  methods: {
    universities () {
      this.$store.dispatch('getUniversity', {...this.data, param: '/'})
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Creating faculty...'), type: 'info'})
        this.submitFaculty()
      }
    },
    submitFaculty () {
      let facultyInfo = {
        title: this.form.title,
        university: this.form.university,
        status: true
      }
      this.$store.dispatch('createData', { ...this.data, api: 'faculty', info: facultyInfo, turn: 'Faculty' })
    },
    selectUniversity (e) {
      this.form.university = e.id
    }
  },
  validations () {
    return {
      form: {
        title: { required },
        university: { required }
      }
    }
  }
}
</script>
