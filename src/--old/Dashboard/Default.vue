<template>
  <b-row>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="barChart" title="Yıllık Durum" @pointClick="onPointClick">
          <DxCommonSeriesSettings argument-field="mounth" type="bar" hover-mode="allArgumentPoints" selection-mode="allArgumentPoints" >
          <DxLabel :visible="true">
            <DxFormat :precision="0" type="fixedPoint" />
          </DxLabel>
          </DxCommonSeriesSettings>
          <DxSeries value-field="dispatch" name="olumsuz" />
          <DxSeries value-field="order" name="olumlu" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
          <DxExport :enabled="true"/>
        </DxChart>
      </b-card>
    </b-col>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxPieChart
          id="pie"
          :data-source="pieChart"
          palette="Bright"
          title="olumlu / olumsuz"
          @point-click="pointClickHandler($event)"
          @legend-click="legendClickHandler($event)"
        >
          <DxSeries argument-field="label" value-field="area" >
            <DxLabel :visible="true">
              <DxConnector :visible="true" :width="1" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="true"/>
        </DxPieChart>
      </b-card>
    </b-col>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="barChart" title="Yıllık Durum" @pointClick="onPointClick">
          <DxCommonSeriesSettings argument-field="mounth" type="bar" hover-mode="allArgumentPoints" selection-mode="allArgumentPoints" >
          <DxLabel :visible="true">
            <DxFormat :precision="0" type="fixedPoint" />
          </DxLabel>
          </DxCommonSeriesSettings>
          <DxSeries value-field="dispatch" name="olumsuz" />
          <DxSeries value-field="order" name="olumlu" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
          <DxExport :enabled="true"/>
        </DxChart>
      </b-card>
    </b-col>
    <b-col cols="12"  md="12" lg="6" class="mb-3">
      <b-card>
        <DxPieChart
          id="pie"
          :data-source="pieChart"
          palette="Bright"
          title="olumlu / olumsuz"
          @point-click="pointClickHandler($event)"
          @legend-click="legendClickHandler($event)"
        >
          <DxSeries argument-field="label" value-field="area" >
            <DxLabel :visible="true">
              <DxConnector :visible="true" :width="1" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="true"/>
        </DxPieChart>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      carousel: [
        {photo: 'https://ideatechcdn.s3.eu-west-2.amazonaws.com/img/kartonsansl1.jpg', code: '<h1>Kartonsan,</h1><p>üretim kapasitesi açısından Türkiye’nin lider Avrupa’nın ise dördüncü büyük kuşeli karton üreticisidir.</p>'},
        {photo: 'https://ideatechcdn.s3.eu-west-2.amazonaws.com/img/kartonsansl2.jpg', code: '<h1>Kartonsan,</h1><p>örnek bir kurumsal vatandaş olarak ekonomi, çevre ve toplum ekseninde sorumluluklarının bilincinde faaliyetlerini gerçekleştirmektedir.</p>'}
      ],
      barChart: [
        {mounth: 'Ocak', order: 40300, dispatch: 1300},
        {mounth: 'Şubat', order: 15431, dispatch: 5431},
        {mounth: 'Mart', order: 43462, dispatch: 3462},
        {mounth: 'Nisan', order: 12343, dispatch: 2343},
        {mounth: 'Mayıs', order: 32412, dispatch: 2412},
        {mounth: 'Haziran', order: 21442, dispatch: 1442},
        {mounth: 'Temmuz', order: 41424, dispatch: 1424},
        {mounth: 'Ağustos', order: 54412, dispatch: 4412},
        {mounth: 'Eylül', order: 64324, dispatch: 4324},
        {mounth: 'Ekim', order: 12354, dispatch: 2354},
        {mounth: 'Kasım', order: 54324, dispatch: 4324},
        {mounth: 'Aralık', order: 23414, dispatch: 3414}
      ],
      pieChart: [
        {label: 'olumlu Edilen', area: 4312555},
        {label: 'Sevk Edilen', area: 1712555}
      ]
    }
  },
  mounted () {
  },
  methods: {
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
<style scope>
  .hooper {
    height: 300px
  }
  #pie * {
      margin: 0 auto;
  }
</style>
