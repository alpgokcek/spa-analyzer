<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(id)="cell">
        <router-link :to="{name: 'Section', params: {faculty: $route.params.faculty, department: $route.params.department, course: cell.item.id}}" v-b-tooltip.hover :title="$t('list.sections')"><i class="fas fa-eye"></i></router-link>
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
        {key: 'code', label: 'Course.code'},
        {key: 'year_and_term', label: 'Course.year_and_term'},
        {key: 'title', label: 'Course.title'},
        {key: 'credit', label: 'Course.credit'},
        {key: 'date_time', label: 'Course.date_time'},
        {key: 'departmentName', label: 'Course.departmentName'},
        {key: 'id', label: 'Course.id'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      // let url = ''
      // to.name === 'department' ? url = 'course?department=' + to.params.department : to.name === 'code' ? url = 'course?code=' + to.params.code : url = 'course'
      this.getData('course?department=' + to.params.department)
    }
  },
  mounted () {
    // let url = ''
    // this.$route.params.name == 'Course' ? url = 'course?department=' + this.$route.params.department : this.$route.params.name == 'code' ? url = 'course?code=' + this.$route.params.code : url = 'course'
    this.getData('course?department=' + this.$route.params.department)
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
