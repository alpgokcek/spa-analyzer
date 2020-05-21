<template>
  <DxDataGrid
    class="asc__listPage-dataGrid"
    id="gridContainer"
    :data-source="tableData"
    ref="dataGrid"
    :show-borders="false"
    :show-column-lines="true"
    :show-row-lines="false"
    remote-operations="true"
    :row-alternation-enabled="true"
    :allow-column-reordering="true"
    :allow-column-resizing="true"
    :column-auto-width="true"
    :selection="{ mode: 'single' }"
    @selection-changed="optionSelected"
    >
    <DxFilterRow :visible="true" apply-filter="auto"/>
    <DxHeaderFilter :visible="true"/>
    <DxColumnFixing :enabled="true"/>
    <DxColumn
      v-for="(row,i) in tableRows"
      :key="i"
      :data-field="row.field"
      :caption="$t( 'Department.' + row.field)"
      :format="row.format"
      :data-type="row.dataType"
      :alignment="row.alignment"
      :cell-template="row.cellTemplate"
    />
    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <router-link :to="{name: 'ProgramOutcome', params: {department: $route.params.department, student: cell.data.value}}" v-b-tooltip.hover :title="$t('list.users')"><i class="fas fa-eye"></i></router-link>
      </div>
    </template>

    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 50, 100]" />
  </DxDataGrid>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      routeName: this.$route.name,
      selectedRow: '',
      rows: [
        {visible: true, field: 'userName', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'sectionTitle', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'letter_grade', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: false, field: 'average', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'id', format: '', dataType: '', alignment: '', cellTemplate: 'tokenCell'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      let url = to.name === 'student' ? 'sts?student=' + to.params.student : to.name === 'section' ? 'sts?section=' + to.params.section : 'sts'
      this.getData(url)
    }
  },
  mounted () {
    let url = this.$route.params.name === 'student' ? 'sts?student=' + this.$route.params.student : this.$route.params.name === 'section' ? 'sts?section=' + this.$route.params.section : 'sts'
    this.getData(url)
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
