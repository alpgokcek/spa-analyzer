<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(courses)="cell">
      <router-link :to="{name: 'Course', params: {faculty: $route.params.faculty, department: cell.item.id}}" v-b-tooltip.hover :title="$t('Courses')"><i class="fas fa-eye"></i></router-link>
    </template>
    <template v-slot:cell(instructors)="cell">
      <router-link :to="{name: 'DepartmentsHasInstructors', params: {department: cell.item.id}}" v-b-tooltip.hover :title="$t('Instructors')"><i class="fas fa-eye"></i></router-link>
    </template>
    <template v-slot:cell(students)="cell">
      <router-link :to="{name: 'Users', params: {level: 6, department: cell.item.id}}" v-b-tooltip.hover :title="$t('Students')"><i class="fas fa-eye"></i></router-link>
    </template>
    <template v-slot:cell(actions)="cell">
        <router-link :to="{name: 'DepartmentUpdate', params: {faculty: $route.params.faculty, department: cell.item.id}}" v-b-tooltip.hover :title="$t('Update department')"><i class="fas fa-pen ml-1"></i></router-link>
        <span v-b-tooltip.hover :title="$t('Delete department')" type="button" @click="deleteDepartment(cell.item)"><i class="fas fa-trash ml-1 text-primary"></i></span>
      </template>
  </b-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      routeName: this.$route.name,
      rows: [
        { key: 'facultyName', label: 'Faculty Name'},
        { key: 'name', label: 'Department Name'},
        { key: 'courses', label: 'Courses'},
        { key: 'instructors', label: 'Instructors'},
        { key: 'students', label: 'Students'},
        { key: 'actions', label: 'Actions'},
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      if (to.name === 'faculty') {
        this.getData('department?faculty=' + to.params.faculty)
      } else {
        this.getData('department')
      }
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
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    },
    deleteDepartment (item) {
      this.$store.dispatch('deleteData', {...this.data, api: 'department', id: item.id, turn: this.$route.params.faculty ? 'department?faculty=' + this.$route.params.faculty : 'department', retcount: 0})
    },
  }
}
</script>
