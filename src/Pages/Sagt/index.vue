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
    <DxColumn v-if="tableRows[0].visible" :data-field="tableRows[0].field" :caption="$t( 'Sagt.' + tableRows[0].field)" :format="tableRows[0].format" :data-type="tableRows[0].dataType" :alignment="tableRows[0].alignment" :cell-template="tableRows[0].cellTemplate" />
    <DxColumn v-if="tableRows[1].visible" :data-field="tableRows[1].field" :caption="$t( 'Sagt.' + tableRows[1].field)" :format="tableRows[1].format" :data-type="tableRows[1].dataType" :alignment="tableRows[1].alignment" :cell-template="tableRows[1].cellTemplate" />
    <DxColumn v-if="tableRows[2].visible" :data-field="tableRows[2].field" :caption="$t( 'Sagt.' + tableRows[2].field)" :format="tableRows[2].format" :data-type="tableRows[2].dataType" :alignment="tableRows[2].alignment" :cell-template="tableRows[2].cellTemplate" />
    <DxColumn v-if="tableRows[3].visible" :data-field="tableRows[3].field" :caption="$t( 'Sagt.' + tableRows[3].field)" :format="tableRows[3].format" :data-type="tableRows[3].dataType" :alignment="tableRows[3].alignment" :cell-template="tableRows[3].cellTemplate" />
    <DxColumn v-if="tableRows[4].visible" :data-field="tableRows[4].field" :caption="$t( 'Sagt.' + tableRows[4].field)" :format="tableRows[4].format" :data-type="tableRows[4].dataType" :alignment="tableRows[4].alignment" :cell-template="tableRows[4].cellTemplate" />
    <template #customerCodeCell="cell">
      <kbd>{{cell.data.value}}</kbd>
    </template>
    <template #tokenCell="cell">
      <div class="asc__listPage-operations">
        <!-- <span v-b-tooltip.hover title="Kullanıcı - Firma Eşleştirme"><i class="fas fa-money-bill-wave"></i></span>
        <span v-b-tooltip.hover title="Kullanıcı Yetkileri"><i class="fas fa-money-bill-wave"></i></span> -->
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
      <p :class="cell.data.value == true ? 'd-block text-center mx-auto text-light rounded-sm py-1 btn-success' : 'd-block text-center mx-auto text-light rounded-sm py-1 btn-danger'">{{cell.data.value == true ? $t('list.active') : $t('list.passive')}}</p>
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
        {visible: true, field: 'id', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'student_id', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'grading_tool_id', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: true, field: 'grade', format: '', dataType: '', alignment: '', cellTemplate: ''},
        {visible: false, field: 'created_at', format: '', dataType: '', alignment: '', cellTemplate: ''}
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      if (to.name === 'student') {
        this.getData('sagt?student=' + to.params.student)
      } else if (to.name === 'gradingTool') {
        this.getData('sagt?gradingTool=' + to.params.gradingTool)
      } else if (to.name === 'grade') {
        this.getData('sagt?grade=' + to.params.grade)
      } else {
        this.getData('sagt')
      }
    }
  },
  mounted () {
    if (this.$route.name === 'student') {
      this.getData('sagt?student=' + this.$route.params.student)
    } else if (this.$route.name === 'gradingTool') {
      this.getData('sagt?gradingTool=' + this.$route.params.gradingTool)
    } else if (this.$route.name === 'grade') {
      this.getData('sagt?grade=' + this.$route.params.grade)
    } else {
      this.getData('sagt')
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
