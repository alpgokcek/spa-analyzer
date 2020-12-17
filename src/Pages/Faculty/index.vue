<template>
  <div>
    <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
      <template v-slot:cell(department)="cell">
        <router-link :to="{name: 'Department', params: {faculty: cell.item.id}}" v-b-tooltip.hover :title="$t('Departments')"><i class="fas fa-eye"></i></router-link>
      </template>
      <template v-slot:cell(actions)="cell">
        <router-link :to="{name: 'FacultyUpdate', params: {faculty: cell.item.id}}" v-b-tooltip.hover :title="$t('Update faculty')"><i class="fas fa-pen ml-1"></i></router-link>
        <span v-b-tooltip.hover :title="$t('Delete faculty')" type="button" @click="deleteFaculty(cell.item)"><i class="fas fa-trash ml-1 text-primary"></i></span>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      routeName: this.$route.name,
      selectedRow: '',
      rows: [
        {key: 'universityName', label: 'University Name'},
        {key: 'title', label: 'Faculty Name'},
        {key: 'department', label: 'Departments'},
        {key: 'actions', label: 'Actions'},
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      this.getData('faculty')
    }
  },
  mounted () {
    this.getData('faculty')
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    },
    deleteFaculty (item) {
      this.$store.dispatch('deleteData', {...this.data, api: 'faculty', id: item.id, turn: 'Faculty', retcount: 0})
    },
  }
}
</script>
