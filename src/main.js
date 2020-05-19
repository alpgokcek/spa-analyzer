/* eslint-disable */
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import { store } from './store'
import VueRouter from 'vue-router'
import router from './router'
import i18n from './i18n'
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import vue2Dropzone from 'vue2-dropzone'
import VueQuillEditor from 'vue-quill-editor'


import { DxDataGrid, DxColumn, DxPaging, DxLoadPanel, DxScrolling, DxPager, DxHeaderFilter, DxSearchPanel, DxFilterRow, DxColumnChooser, DxColumnFixing, DxExport } from 'devextreme-vue/data-grid'
import { DxChart, DxSeries, DxCommonSeriesSettings, DxLabel, DxFormat, DxLegend, DxSize, DxConnector } from 'devextreme-vue/chart'
// import { DxSelectBox, DxCheckBox, DxDrawer, DxRadioGroup, DxToolbar } from 'devextreme-vue'
// import DxDropDownButton from 'devextreme-vue/drop-down-button'
import DxPieChart from 'devextreme-vue/pie-chart'
import { DxList } from 'devextreme-vue/list'
import { DxTooltip } from 'devextreme-vue/tooltip'

import Carousel from './components/Carousel'
import Navigation from './components/Navigation'
import NavigationList from './components/NavigationList'
import TopHeader from './components/Header'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)
Vue.use(Vuelidate)
Vue.use(VueQuillEditor)

Vue.component('Carousel', Carousel)
Vue.component('Navigation', Navigation)
Vue.component('NavigationList', NavigationList)
Vue.component('TopHeader', TopHeader)
Vue.component('vueDropzone', vue2Dropzone)

Vue.component('v-select', vSelect)
Vue.component('DxDataGrid', DxDataGrid)
Vue.component('DxColumn', DxColumn)
Vue.component('DxPaging', DxPaging)
Vue.component('DxPager', DxPager)
Vue.component('DxColumnChooser', DxColumnChooser)
Vue.component('DxColumnFixing', DxColumnFixing)
Vue.component('DxLoadPanel', DxLoadPanel)
Vue.component('DxScrolling', DxScrolling)
Vue.component('DxHeaderFilter', DxHeaderFilter)
Vue.component('DxSearchPanel', DxSearchPanel)
Vue.component('DxFilterRow', DxFilterRow)
Vue.component('DxTooltip', DxTooltip)
// Vue.component('DxSelectBox', DxSelectBox)
// Vue.component('DxCheckBox', DxCheckBox)
// Vue.component('DxDrawer', DxDrawer)
// Vue.component('DxRadioGroup', DxRadioGroup)
// Vue.component('DxToolbar', DxToolbar)
// Vue.component('DxDropDownButton', DxDropDownButton)
Vue.component('DxList', DxList)
Vue.component('DxExport', DxExport)
Vue.component('DxChart', DxChart)
Vue.component('DxSeries', DxSeries)
Vue.component('DxCommonSeriesSettings', DxCommonSeriesSettings)
Vue.component('DxLabel', DxLabel)
Vue.component('DxFormat', DxFormat)
Vue.component('DxLegend', DxLegend)
Vue.component('DxSize', DxSize)
Vue.component('DxConnector', DxConnector)
Vue.component('DxPieChart', DxPieChart)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
})
