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

    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <!-- <span v-b-tooltip.hover title="Kullanıcı - Firma Eşleştirme"><i class="fas fa-money-bill-wave"></i></span> -->
        <router-link :to="{name: 'AuthUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.authorization')"><i class="fas fa-key"></i></router-link>
        <router-link :to="{name: 'UsersUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.setttings')"><i class="fas fa-cog"></i></router-link>
      </div>
    </template>
    <template #emailCell="cell">
      <kbd><a class="text-light" :href="'mailto:'+cell.data.value"><i class="far fa-envelope"></i> {{cell.data.value}}</a></kbd>
    </template>
    <template #phoneCell="cell">
      <a :href="'tel:'+cell.data.value"><i class="far fa-phone-alt"></i> {{cell.data.value}}</a>
    </template>
    <template #statusCell="cell">
      <p :class="cell.data.value == true ? 'd-block text-center mx-auto text-light rounded-sm py-1 btn-success' : 'd-block text-center mx-auto text-light rounded-sm py-1 btn-danger'">{{cell.data.value == true ? $t('list.active') : $t('list.passive')}}</p>
    </template>
    <template #kvkkCell="cell">
      <p :class="cell.data.value == true ? 'd-block text-center mx-auto text-light rounded-sm py-1 btn-success' : 'd-block text-center mx-auto text-light rounded-sm py-1 btn-danger'">{{cell.data.value == true ? $t('list.approved') : $t('list.disapproved')}}</p>
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
        {visible: true, field: 'name', caption: 'name', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'companyName', caption: 'companyName', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'levelTitle', caption: 'levelTitle', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'phone', caption: 'phone', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'email', caption: 'email', format: '', dataType: '', alignment: '', cellTemplate: 'emailCell'},
        {visible: true, field: 'status', caption: 'status', format: '', dataType: '', alignment: '', cellTemplate: 'statusCell'},
        {visible: true, field: 'kvkk', caption: 'kvkk', format: '', dataType: '', alignment: '', cellTemplate: 'kvkkCell'},
        {visible: true, field: 'api_token', caption: 'api_token', format: '', dataType: '', alignment: '', cellTemplate: 'tokenCell'}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      if (to.name === 'CustomerUser') {
        this.getData('user?customer=' + to.params.customer)
      } else {
        this.getData('user')
      }
    }
  },
  mounted () {
    if (this.$route.name === 'CustomerUser') {
      this.getData('user?customer=' + this.$route.params.customer)
    } else {
      this.getData('user')
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
    },
    operationClick (e) {
      this.$router.push({name: e.itemData.route, params: {url: this.selectedRow.token}})
    }
  }
}
</script>
