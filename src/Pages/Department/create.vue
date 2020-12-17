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
        <b-card :title="$t('Create Department')" class="shadow">

          <b-form-group :label="$t('Faculties')" :class="$v.form.faculty.$error ? 'form-group--error' : ''">
            <v-select :options="allFaculties" label="title" @input="selectFaculty"></v-select>
          </b-form-group>

          <b-form-group :label="$t('Department Name')" :class="$v.form.name.$error && !$v.form.name.required ? 'form-group--error' : ''">
            <b-form-input type="text" v-model.trim="$v.form.name.$model" placeholder="Example: Engineering Faculty" />
          </b-form-group>

          <b-button variant="success" size="sm" class="text-white float-right asc__insertPage-header-Create" type="button" @click="submitForm()">
            <i class="far fa-check-square"></i> {{$t('Submit')}}
          </b-button>
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
      form: {
        name: '',
        faculty: ''
      }
    }
  },
  computed: {
    ...mapState(['allFaculties'])
  },
  mounted () {
    this.faculties()
  },
  methods: {
    faculties () {
      this.$store.dispatch('getFaculty', {...this.data, param: ''})
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Creating department...'), type: 'info'})
        this.submitDepartment()
      }
    },
    submitDepartment () {
      let departmentInfo = {
        name: this.form.name,
        faculty: this.form.faculty,
        status: true
      }
      this.$store.dispatch('createData', { ...this.data, api: 'department', info: departmentInfo, turn: 'Department' })
    },
    selectFaculty (e) {
      this.form.faculty = e.id
    }
  },
  validations () {
    return {
      form: {
        name: { required },
        faculty: { required }
      }
    }
  }
}
</script>
