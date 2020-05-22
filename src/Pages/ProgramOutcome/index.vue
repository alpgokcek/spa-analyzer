<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(id)="row">
      <router-link :to="{name: 'SgmgpoGet', params: {student: $route.params.student, program: row.item.id}}" v-b-tooltip.hover :title="$t('list.users')"><i class="fas fa-eye"></i></router-link>
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
        {key: 'year_and_term', label: 'Program.year_and_term'},
        {key: 'code', label: 'Program.code'},
        {key: 'explanation', label: 'Program.explanation'},
        {key: 'created_at', label: 'Program.created_at'},
        {key: 'updated_at', label: 'Program.updated_at'},
        {key: 'id', label: 'Program.id'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      // let url = to.name === 'code' ? 'program-outcome?code=' + to.params.code : to.name === 'department' ? 'program-outcome?department=' + to.params.department : 'program-outcome'
      this.getData('program-outcome' + to.params.department)
    }
  },
  mounted () {
    // let url = this.$route.params.name === 'code' ? 'program-outcome?code=' + this.$route.params.code : this.$route.params.name === 'department' ? 'program-outcome?department=' + this.$route.params.department : 'program-outcome'
    this.getData('program-outcome?department=' + this.$route.params.department)
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e })
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
