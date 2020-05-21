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
      :caption="$t( 'Faculty.' + row.field)"
      :format="row.format"
      :data-type="row.dataType"
      :alignment="row.alignment"
      :cell-template="row.cellTemplate"
    />
    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <router-link :to="{name: 'UserUpdate', params: {token: cell.data.value}}" v-b-tooltip.hover :title="$t('list.setttings')"><i class="fas fa-cog"></i></router-link>
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
        {field: 'universityName', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'title', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'status', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {field: 'id', format: '', dataType: '', alignment: '', cellTemplate: ''}
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
    optionSelected ({ selectedRowsData }) {
      this.selectedRow = selectedRowsData[0]
      console.log(this.selectedRow)
    }
  }
}
</script>
