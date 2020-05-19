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
    v-for="(row,i) in tableRows" :key="i"
    :data-field="row.field"
    :caption="$t( routeName + '.' + row.caption)"
    :format="row.format"
    :data-type="row.dataType"
    :alignment="row.alignment"
    :cell-template="row.cellTemplate"
    />
    <template #calculateCell="cell">
      <span>{{cell.data.value}} €</span>
    </template>
    <template #customerCodeCell="cell">
      <kbd>{{cell.data.value}}</kbd>
    </template>
    <template #balanceCell="cell">
      <p class="m-0 p-0" v-html="cell.data.value"></p>
    </template>
    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <!-- <router-link :to="{name: 'BalanceUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.balanceReport')"><i class="fas fa-money-bill-wave"></i></router-link> -->
        <!-- <router-link :to="{name: 'SalesUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.salesReport')"><i class="fas fa-chart-line"></i></router-link> -->
        <router-link :to="{name: 'DiscountUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.discount')"><i class="fas fa-percent"></i></router-link>
        <router-link :to="{name: 'BalanceUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.balance')"><i class="fas fa-money-bill"></i></router-link>
        <router-link :to="{name: 'MergeUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.users')"><i class="fas fa-users"></i></router-link>
        <router-link :to="{name: 'CustomerUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.setttings')"><i class="fas fa-cog"></i></router-link>
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
        // {field: 'id', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'code', caption: 'code', width: '160', format: '', dataType: '', alignment: '', cellTemplate: 'customerCodeCell'},
        {field: 'title', caption: 'title', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'balance', caption: 'balance', format: 'currency', dataType: '', alignment: 'right', cellTemplate: 'calculateCell'},
        {field: 'credit', caption: 'credit', format: 'currency', dataType: '', alignment: 'right', cellTemplate: 'calculateCell'},
        {field: 'address', caption: 'address', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'postal_code', caption: 'postal_code', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'fullAddress', caption: 'fullAddress', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'balanceCredit', caption: 'balanceCredit', format: '', dataType: '', alignment: '', cellTemplate: 'balanceCell'},
        {field: 'balanceTitle', caption: 'balanceTitle', format: '', dataType: '', alignment: '', cellTemplate: 'balanceCell'},
        {field: 'token', caption: 'operations', width: '140', format: '', dataType: '', alignment: '', cellTemplate: 'tokenCell'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      if (to.name === 'CustomerPassive') {
        this.getData('customer?status=0')
      } else {
        this.getData('customer?status=1')
      }
    }
  },
  mounted () {
    if (this.$route.name === 'CustomerPassive') {
      this.getData('customer?status=0')
    } else {
      this.getData('customer?status=1')
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
      return rowData.balance + ' €'
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
