<template>
  <div>
    <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
      <template v-slot:cell(token)="cell">
        <router-link :to="{name: 'FacultyUpdate', params: {param: cell.item.token}}" v-b-tooltip.hover :title="$t('list.updateFaculty')">Update</router-link>
      </template>
      <template v-slot:cell(id)="cell">
        <router-link :to="{name: 'Department', params: {faculty: cell.item.id}}" v-b-tooltip.hover :title="$t('list.departments')"><i class="fas fa-eye"></i></router-link>
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
        {key: 'instructorName', label: 'instructor'},
        {key: 'departmentName', label: 'department'},
        {key: 'id', label: 'id'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows', 'listStatus'])
  },
  watch: {
    '$route' (to) {
      this.getData('departments-has-instructors')
    }
  },
  mounted () {
    this.getData('departments-has-instructors')
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e, query: '?' + this.listStatus })
    },
    balanceCell (rowData) {
      return rowData.level
    },
    creditCell (rowData) {
      return rowData.credit + ' €'
    },
    hideRow (e) {
      // console.log(e)
    },
    optionSelected ({ selectedRowsData }) {
      this.selectedRow = selectedRowsData[0]
      console.log(this.selectedRow)
    },
    operationClick (e) {
      this.$router.push({name: e.itemData.route, params: {url: this.selectedRow.token}})
    }
  }
}
</script>
