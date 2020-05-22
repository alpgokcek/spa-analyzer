<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(id)="row">
      <router-link :to="{name: 'ProgramOutcome', params: {department: $route.params.department, student: row.item.student_id}}" v-b-tooltip.hover :title="$t('list.users')"><i class="fas fa-eye"></i></router-link>
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
        {key: 'userName', field: 'Sts.userName'},
        {key: 'sectionTitle', field: 'Sts.sectionTitle'},
        {key: 'letter_grade', field: 'Sts.letter_grade'},
        {key: 'average', field: 'Sts.average'},
        {key: 'id', field: 'Sts.id'},
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      // let url = to.name === 'student' ? 'sts?student=' + to.params.student : to.name === 'section' ? 'sts?section=' + to.params.section : 'sts'
      this.getData('sts?section=' + to.params.section)
    }
  },
  mounted () {
    // let url = this.$route.params.name === 'student' ? 'sts?student=' + this.$route.params.student : this.$route.params.name === 'section' ? 'sts?section=' + this.$route.params.section : 'sts'
    this.getData('sts?section=' + this.$route.params.section)
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
