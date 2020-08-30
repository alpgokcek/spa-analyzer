<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="12" md="12" class="pl-0">
        <h3></h3>
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="8" xl="7" class="mb-3">
        <b-card class="asc__updatePage-card-withTab shadow">
        <b-form-input v-model="form.faculty" placeholder="fakülte"></b-form-input>
        <b-form-input v-model="form.name" placeholder="isim"></b-form-input>
        <b-form-input v-model="form.status" placeholder="durum"></b-form-input>
        <b-button variant="success" type="button" @click="updateData()">Güncelle</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      deptId: this.$route.params.param,
      form: {
        faculty: null,
        name: '',
        status: null
      }
    }
  },
  computed: {
    ...mapState(['showDepartment'])
  },
  watch: {
    showDepartment: function (e) {
      this.form.faculty = e.faculty
      this.form.name = e.name
      this.form.status = e.status
    }
  },
  mounted () {
    this.getDepartmentData(this.deptId)
  },
  methods: {
    updateData () {
      let datas = {
        name: this.form.name,
        status: this.form.status
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'department', id: this.deptId, info: datas, retcount: 0 })
    },
    getDepartmentData (e) {
      this.$store.dispatch('getDepartment', {...this.data, param: e})
    }
  }
}
</script>
