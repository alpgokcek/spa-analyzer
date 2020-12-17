<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(sections)="cell">
      <router-link :to="{name: 'Sections', params: {instructor: cell.item.instructor_email}}" v-b-tooltip.hover :title="$t('Courses')"><i class="fas fa-eye"></i></router-link>
    </template>
    <template v-slot:cell(actions)="cell">
        <span v-b-tooltip.hover :title="$t('Delete instructor from department')" type="button" @click="deleteDepartmentHasInstructors(cell.item)"><i class="fas fa-trash ml-1 text-primary"></i></span>
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
        { key: 'id', label:'ID'},
        { key: 'name', label:'Name'},
        { key: 'student_id', label:'Student ID'},
        { key: 'level', label:'Level'},
        { key: 'sections', label: 'Sections'},
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  mounted () {
    let url = "user";
    let flag = false;
    if (!!this.$route.params.level) {
      url += `?level=${this.$route.params.level}`
      flag = true;
    } if(!!this.$route.params.department) {
      url += `${flag ? '&' : '?' }department=${this.$route.params.department}`
    }
    this.getData(url)
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
