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
    <DxColumn :caption="$t('list.operations')" cell-template="select-module-template" :width="120" />
    <DxColumn v-if="tableRows[0].visible" :data-field="tableRows[0].field" :caption="$t( routeName + '.' + tableRows[0].field)" :format="tableRows[0].format" :data-type="tableRows[0].dataType" :alignment="tableRows[0].alignment" :cell-template="tableRows[0].cellTemplate" />
    <DxColumn v-if="tableRows[1].visible" :data-field="tableRows[1].field" :caption="$t( routeName + '.' + tableRows[1].field)" :format="tableRows[1].format" :data-type="tableRows[1].dataType" :alignment="tableRows[1].alignment" :cell-template="tableRows[1].cellTemplate" />
    <DxColumn v-if="tableRows[2].visible" :data-field="tableRows[2].field" :caption="$t( routeName + '.' + tableRows[2].field)" :format="tableRows[2].format" :data-type="tableRows[2].dataType" :alignment="tableRows[2].alignment" :cell-template="tableRows[2].cellTemplate" />
    <DxColumn v-if="tableRows[3].visible" :data-field="tableRows[3].field" :caption="$t( routeName + '.' + tableRows[3].field)" :format="tableRows[3].format" :data-type="tableRows[3].dataType" :alignment="tableRows[3].alignment" :cell-template="tableRows[3].cellTemplate" />
    <DxColumn v-if="tableRows[4].visible" :data-field="tableRows[4].field" :caption="$t( routeName + '.' + tableRows[4].field)" :format="tableRows[4].format" :data-type="tableRows[4].dataType" :alignment="tableRows[4].alignment" :cell-template="tableRows[4].cellTemplate" />
    <DxColumn :calculate-cell-value="commissionCell" v-if="tableRows[5].visible" :data-field="tableRows[5].field" :caption="$t( routeName + '.' + tableRows[5].field)" :format="tableRows[5].format" :data-type="tableRows[5].dataType" :alignment="tableRows[5].alignment" :cell-template="tableRows[5].cellTemplate" />
    <DxColumn :calculate-cell-value="priceCell" v-if="tableRows[6].visible" :data-field="tableRows[6].field" :caption="$t( routeName + '.' + tableRows[6].field)" :format="tableRows[6].format" :data-type="tableRows[6].dataType" :alignment="tableRows[6].alignment" :cell-template="tableRows[6].cellTemplate" />

    <template #statusCell="cell">
      <p :class="cell.data.value == 1 ? 'btn-success d-block text-center mx-auto mb-0 text-light rounded-sm py-1' : 'btn-danger d-block text-center mx-auto mb-0 text-light rounded-sm py-1'">{{$t(cell.data.value == 1 ? 'Phone.active' : 'Phone.passive')}}</p>
    </template>
    <template #simonlyCell="cell">
      <p :class="cell.data.value == 1 ? 'btn-info d-block text-center mx-auto mb-0 text-light rounded-sm py-1' : 'btn-warning d-block text-center mx-auto mb-0 rounded-sm py-1'">{{$t(cell.data.value == 1 ? 'Package.yesSimonly' : 'Package.withPhone')}}</p>
    </template>
    <template #select-module-template="cell">
      <DxDropDownButton text="..." width="100" :items="tableActions" key-expr="id" display-expr="text" @item-click="operationClick" />
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
        {visible: true, field: 'tariffTitle', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'title', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'simonly', format: '', dataType: '', alignment: '', cellTemplate: 'simonlyCell'},
        {visible: false, field: 'content', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'status', format: '', dataType: '', alignment: 'left', cellTemplate: 'statusCell'},
        {visible: true, field: 'commission', format: 'currency', dataType: '', alignment: 'right', cellTemplate: ''},
        {visible: true, field: 'price', format: 'currency', dataType: '', alignment: 'right', cellTemplate: ''}
      ],
      setTableActions: [
        { id: 1, text: this.$t('list.setttings'), icon: 'edit', route: 'ProductUpdate' }
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      if (to.params.name)
        this.getData(`tariffPack?tariff=${to.params.name}`)
      else
        this.getData(`tariffPack`)
    }
  },
  mounted () {
    if (this.$route.params.name)
      this.getData(`tariffPack?tariff=${this.$route.params.name}`)
    else
      this.getData(`tariffPack`)
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.dispatch('setTableRows', { ...this.row, data: this.rows})
    },
    getData (e) {
      this.$store.commit('setTableActions', this.setTableActions)
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    },
    priceCell (rowData) {
      return rowData.price + ' €'
    },
    commissionCell (rowData) {
      return rowData.commission + ' €'
    },
    hideRow (e) {
      // console.log(e)
    },
    optionSelected ({ selectedRowsData }) {
      this.selectedRow = selectedRowsData[0]
    },
    operationClick (e) {
      this.$router.push({name: e.itemData.route, params: {url: this.selectedRow.token}})
    }
  }
}
</script>
<style>
</style>
