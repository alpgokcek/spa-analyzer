<template>
  <b-row>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="tableData" title="Grade" @pointClick="onPointClick">
          <DxCommonSeriesSettings argument-field="year_and_term" type="bar" hover-mode="allArgumentPoints" selection-mode="allArgumentPoints" >
          <DxLabel :visible="true">
            <DxFormat :precision="0" type="fixedPoint" />
          </DxLabel>
          </DxCommonSeriesSettings>
          <DxSeries value-field="grade" name="grade" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
          <DxExport :enabled="true"/>
        </DxChart>
      </b-card>
    </b-col>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="tableData" title="Grade5" @pointClick="onPointClick">
          <DxCommonSeriesSettings argument-field="year_and_term" type="bar" hover-mode="allArgumentPoints" selection-mode="allArgumentPoints" >
          <DxLabel :visible="true">
            <DxFormat :precision="0" type="fixedPoint" />
          </DxLabel>
          </DxCommonSeriesSettings>
          <DxSeries value-field="grade5" name="grade" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
          <DxExport :enabled="true"/>
        </DxChart>
      </b-card>
    </b-col>
  </b-row>
</template><script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      this.getData('sgmgpo?type=1&student=' + to.params.student + '&progam=' + to.params.program)
    }
  },
  mounted () {
    this.getData('sgmgpo?type=1&student=' + this.$route.params.student + '&progam=' + this.$route.params.program)
    this.setRows()
  },
  methods: {
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    },
    onPointClick ({ target }) {
      target.select()
    },
    pointClickHandler (e) {
      this.toggleVisibility(e.target)
    },
    legendClickHandler (e) {
      let arg = e.target
      let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
      console.log(item)
      this.toggleVisibility(e)
    },
    toggleVisibility (item) {
      item.isVisible() ? item.hide() : item.show()
    }
  }
}
</script>
