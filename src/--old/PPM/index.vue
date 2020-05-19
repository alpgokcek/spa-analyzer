<template>
  <DxDataGrid
    class="asc__listPage-dataGrid"
    id="gridContainer"
    :data-source="tableData"
    ref="dataGrid"
    :show-borders="false"
    :show-column-lines="false"
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
    v-for="(row,i) in tableRows" :key="i"
    :data-field="row.field"
    :caption="$t( routeName + '.' + row.caption)"
    :format="row.format"
    :data-type="row.dataType"
    :alignment="row.alignment"
    :cell-template="row.cellTemplate"
    />
    <template #operationCell="cell">
      <div class="asc__listPage-operations">
        <router-link :to="{name: 'PPMUpdate', params: {slug: cell.data.value}}" v-b-tooltip.hover :title="$t('list.setttings')"><i class="fas fa-cog"></i></router-link>
      </div>
    </template>
    <template #calculateCell="cell">
      <span>{{cell.data.value}} €</span>
    </template>
    <template #statusCell="cell">
      <p :class="cell.data.value == 1 ? 'btn-success d-block text-center mx-auto mb-0 text-light rounded-sm py-1' : 'btn-danger d-block text-center mx-auto mb-0 text-light rounded-sm py-1'">{{$t(cell.data.value == 1 ? 'Phone.active' : 'Phone.passive')}}</p>
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
        {field: 'productTitle', caption: 'productTitle', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'packTitle', caption: 'packTitle', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'hw_commission', caption: 'hwCommission', format: 'currency', dataType: '', alignment: '', cellTemplate: 'calculateCell'},
        {field: 'add_commission', caption: 'addCommission', format: 'currency', dataType: '', alignment: '', cellTemplate: 'calculateCell'},
        {field: 'productPrice', caption: 'productPrice', format: 'currency', dataType: '', alignment: '', cellTemplate: 'calculateCell'},
        {field: 'packPrice', caption: 'packPrice', format: 'currency', dataType: '', alignment: '', cellTemplate: 'calculateCell'},
        {field: 'status', caption: 'status', format: '', dataType: '', alignment: '', cellTemplate: 'statusCell'},
        {field: 'slug', caption: 'operations', format: '', dataType: '', alignment: '', cellTemplate: 'operationCell'}
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
      this.getData('ppm')
    }
  },
  mounted () {
    this.getData('ppm')
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.commit('setTableActions', this.setTableActions)
      this.$store.dispatch('getTableData', { ...this.data, link: e })
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
<style>
</style>
