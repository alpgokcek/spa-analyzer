<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(id)="cell">
      <router-link :to="{name: 'Course', params: {faculty: $route.params.faculty, department: cell.item.id}}" v-b-tooltip.hover :title="$t('list.courses')">
        course
      </router-link>
      <router-link :to="{name: 'DepartmentsHasInstructors', params: {department: cell.item.id}}" v-b-tooltip.hover :title="$t('list.DHI')">
        instructors
      </router-link>
      <router-link :to="{name: 'DepartmentUpdate', params: {param: cell.item.id}}">
        update
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
        { key: 'name', label: 'Department.name' },
        { key: 'facultyName', label: 'Department.facultyName' },
        { key: 'universityName', label: 'Department.universityName' },
        { key: 'id', label: 'Department.id' }
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows', 'listStatus'])
  },
  watch: {
    '$route' (to) {
      if (to.name === 'faculty') {
        this.getData('department?faculty=' + to.params.faculty)
      } else {
        this.getData('department')
      }
    },
    listStatus: function (e) {
      this.getData('department?faculty=' + this.$route.params.faculty)
    }
  },
  mounted () {
    this.getData('department?faculty=' + this.$route.params.faculty)
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e, query: '&' + this.listStatus })
    }
  }
}
</script>
