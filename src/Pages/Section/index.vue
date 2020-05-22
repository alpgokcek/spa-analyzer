<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(is_file_uploaded)="row">
      <router-link :to="{name: 'FileDelete', params: {department: $route.params.department, course: $route.params.course, section: row.item.id }}" v-if="row.item.is_file_uploaded === 1" class="btn btn-sm btn-danger" :title="$t('list.deleteFile')">
        <i class="fas fa-trash"></i> <span>{{ $t('list.deleteFile') }}</span>
      </router-link>
      <router-link :to="{name: 'FileUpload', params: {department: $route.params.department, course: $route.params.course, section: row.item.id }}" v-else class="btn btn-sm btn-success" :title="$t('list.uploadFile')">
        <i class="fas fa-cloud-upload-alt"></i> <span>{{ $t('list.uploadFile') }}</span>
      </router-link>
    </template>
  </b-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      routeName: this.$route.name,
      selectedRow: '',
      rows: [
        {key: 'courseName', label: 'Section.courseName'},
        {key: 'code', label: 'Section.code'},
        {key: 'title', label: 'Section.title'},
        {key: 'is_file_uploaded', label: 'Section.is_file_uploaded'},
        {key: 'id', label: 'Section.id'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      this.getData('section')
    }
  },
  mounted () {
    this.getData('section?course=' + this.$route.params.course)
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    }
  }
}
</script>
