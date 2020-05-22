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
<<<<<<< HEAD
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
=======
    <DxFilterRow :visible="true" apply-filter="auto"/>
    <DxHeaderFilter :visible="true"/>
    <DxColumnFixing :enabled="true"/>
    <DxColumn v-if="tableRows[0].visible" :data-field="tableRows[0].field" :caption="$t( 'Department.' + tableRows[0].field)" :format="tableRows[0].format" :data-type="tableRows[0].dataType" :alignment="tableRows[0].alignment" :cell-template="tableRows[0].cellTemplate" />
    <DxColumn v-if="tableRows[1].visible" :data-field="tableRows[1].field" :caption="$t( 'Department.' + tableRows[1].field)" :format="tableRows[1].format" :data-type="tableRows[1].dataType" :alignment="tableRows[1].alignment" :cell-template="tableRows[1].cellTemplate" />
    <DxColumn v-if="tableRows[2].visible" :data-field="tableRows[2].field" :caption="$t( 'Department.' + tableRows[2].field)" :format="tableRows[2].format" :data-type="tableRows[2].dataType" :alignment="tableRows[2].alignment" :cell-template="tableRows[2].cellTemplate" />
    <DxColumn v-if="tableRows[3].visible" :data-field="tableRows[3].field" :caption="$t( 'Department.' + tableRows[3].field)" :format="tableRows[3].format" :data-type="tableRows[3].dataType" :alignment="tableRows[3].alignment" :cell-template="tableRows[3].cellTemplate" />
    <template #customerCodeCell="cell">
      <kbd>{{cell.data.value}}</kbd>
    </template>
>>>>>>> a01b43dc75b8d0aa32f4c7be56fd5f9aa7da50e2
    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <router-link :to="{name: 'Course', params: {department: $route.params.id, code: cell.data.value}}" v-b-tooltip.hover :title="$t('list.courses')"><i class="fas fa-eye"></i></router-link>
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
        {field: 'name', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'facultyName', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'universityName', format: '', dataType: '', alignment: '', cellTemplate: ''},
        // {field: 'faculty', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'id', format: '', dataType: '', alignment: '', cellTemplate: 'tokenCell'}
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
    if (this.$route.name === 'faculty') {
      this.getData('department?faculty=' + this.$route.params.faculty)
    } else {
      this.getData('department')
    }
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
