<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3>{{$t('Update Faculty', {val: packTitle})}}</h3>
      </b-col>
      <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="submitForm()">
          <i class="far fa-check-square"></i> Update
        </b-button>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="4" xl="4" class="mb-3">
        <b-card :title="$t('Update Faculty')" class="shadow">
            <b-form-group :label="$t('Faculty Name')" :class="$v.form.title.$error && !$v.form.title.required ? 'form-group--error' : ''">
              <b-form-input type="text" v-model.trim="$v.form.title.$model" />
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
      form: {
        title: '',
        university: ''
      }
    }
  },
  computed: {
    ...mapState(['allUniversities'])
  },
  watch: {
    getFaculty: function (e) {
      this.packTitle = e.title
      this.form.university = e.university
      this.form.title = e.title
    }
  },
  mounted () {
    this.getData(this.$route.params.faculty)
  },
  methods: {
    getData (e) {
      this.$store.dispatch('showFaculty', {...this.data, param: e})
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitFaculty()
      }
    },
    submitFaculty () {
      let datas = {
        title: this.form.title,
        university: this.form.university,
        status: true
      }
      this.$store.dispatch('updateData', {...this.data, api: 'faculty', id: this.$route.params.faculty, info: datas, turn: 'Faculty', retcount: 0})
    },
    selectUniversity (e) {
      this.form.university = e.id
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
