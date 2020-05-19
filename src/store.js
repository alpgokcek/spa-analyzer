/* eslint-disable */
// mutations içerde
// actions dışarda
// ne diysın ? 
// axios actions içinde olacak, mutationsta olmaz.
// actions + mutations kullan => {commit} 
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastPlugin } from 'bootstrap-vue'
import { systemName, verno, copyright, apiLink, storageLink, now, today, mmMinDate, mmMaxDate, mmToday, mmNow } from './system'
import router from './router'
import i18n from './i18n'
// import CodeTool from '@editorjs/code'
// import Table from '@editorjs/table'
// import ImageTool from '@editorjs/image'
// import Checklist from '@editorjs/checklist'
// import Paragraph from '@editorjs/paragraph'
// import Header from '@editorjs/header'
// import Marker from '@editorjs/marker'
// import Quote from '@editorjs/quote'
// import Delimiter from '@editorjs/delimiter'
// import List from '@editorjs/list'
// import RawTool from '@editorjs/raw'
// import LinkTool from '@editorjs/link' // https://github.com/editor-js/link#usage
Vue.use(Vuex)
Vue.use(ToastPlugin)
export default axios
axios.defaults.baseURL = apiLink || process.env.BASE_URL
let axiosHeader = {
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
  }
}
export const store = new Vuex.Store({
  state: {
    apiURL: apiLink,
    bigLoading: true,
    storageLink: storageLink,
    style: {
      icon: 'asc__header-hamburger d-inline-block',
      viewPush: 'asc__viewPush asc__transition-left',
      navigation: 'asc__navigation asc__transition-left'
    },
    dropzoneOptions: {
      url: `${apiLink}storage`,
      thumbnailHeight: 100,
      maxFilesize: 10,
      addRemoveLinks: true,
      dictDefaultMessage: '<i class="fas fa-cloud-upload-alt d-block"></i> <b>UPLOAD</b>',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
      paramName: 'uploadFile'
    },
    pinUploadOptions: {
      url: `${apiLink}pinupload`,
      thumbnailHeight: 100,
      maxFilesize: 10,
      autoProcessQueue: false,
      addRemoveLinks: true,
      dictDefaultMessage: '<i class="fas fa-cloud-upload-alt d-block"></i> <b>UPLOAD</b>',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
      paramName: 'uploadFile'
    },
    editorJs: {
      // paragraph: {
      //   class: Paragraph,
      //   inlineToolbar: true,
      // },
      // image: {
      //   class: ImageTool,
      //   config: {
      //     endpoints: {
      //       byFile: 'http://127.0.0.1:8000/api/simple', // Your backend file uploader endpoint
      //       byUrl: 'http://127.0.0.1:8000/storage', // Your endpoint that provides uploading by Url
      //     },
      //     field: 'uploadFile',
      //     additionalRequestHeaders: {
      //       'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      //     }
      //   }
      // },
      // header: {
      //   class: Header,
      //   shortcut: 'CMD+SHIFT+H',
      //   config: {
      //     placeholder: 'Enter a header',
      //     levels: [1, 2, 3, 4, 5, 6],
      //     defaultLevel: 3
      //   }
      // },
      // list: {
      //   class: List,
      //   inlineToolbar: true,
      // },
      // checklist: {
      //   class: Checklist,
      //   inlineToolbar: true,
      // },
      // code: {
      //   class: CodeTool
      // },
      // raw: RawTool,
      // delimiter: Delimiter,
      // table: {
      //   class: Table,
      //   inlineToolbar: true,
      //   config: {
      //     rows: 2,
      //     cols: 3,
      //   }
      // },
      // quote: {
      //   class: Quote,
      //   inlineToolbar: true,
      //   shortcut: 'CMD+SHIFT+O',
      //   config: {
      //     quotePlaceholder: 'Enter a quote',
      //     captionPlaceholder: 'Quote\'s author',
      //   },
      // },
      // Marker: {
      //   class: Marker,
      //   shortcut: 'CMD+SHIFT+M',
      // }
    },
    editorOption: {
      theme: 'bubble',
      placeholder: "content...",
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'color': []}, {'background': []}],
          [{'font': []}],
          [{'align': []}],
          ['link', 'image'],
          ['clean']
        ]
      }
    },
    title: {
      siteName: systemName,
      description: '',
      meta: '',
    },
    system: {
      copyright: copyright,
      version: verno,
      today: mmToday,
      now: mmNow,
      minDate: mmMinDate.setDate(now.getDate() + 1),
      maxDate: mmMaxDate.setDate(now.getDate() + 30)
    },
    logo: {
      login: 'SPA ANALYZER',
      header: 'SPA ANALYZER',
      footer: 'SPA ANALYZER',
      xlogin: 'SPA ANALYZER',
      xheader: 'SPA ANALYZER',
      xfooter: 'SPA ANALYZER'
    },
    loginUser: {
      signed: localStorage.getItem('signed'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('userName'),
      phoneNumber: localStorage.getItem('phoneNumber')
    },
    tableFilters: [
      { value: 3, title: 'Tüm Kayıtlar' },
      { value: 1, title: 'Onaylılar' },
      { value: 2, title: 'Onaysızlar' }
    ],
    tableData: [],
    tableRows: [],
    tableActions: [
      { id: 1, text: i18n.t('list.show'), icon: 'user' },
      { id: 2, text: i18n.t('list.edit'), icon: 'edit' },
      { id: 3, text: i18n.t('list.print'), icon: 'print' }
    ],
    returnCount: 0,
    returnLog: [],
    kdv: 19,
    cargoPrice: parseFloat('19.99'),
    cargoDay: parseFloat('4'),
    // listeler -->
    allCompanies: [],
    allCustomers: [],
    allBalances: [],
    allDiscounts: [],
    allUsers: [],
    allCountries: [],
    allCities: [],
    allCustomerTypes: [],
    allPinTypes: [],
    allUserLevels: [],
    allPaymentTypes: [],
    allBanks: [],
    allBrands: [],
    allColors: [],
    allStorages: [],
    allTariffs: [],
    allPackages: [],
    allPhones: [],
    allMerges: [],
    allPins: [],
    allPinCodes: [],
    getCompany: [],
    getCustomer: [],
    getUser: [],
    getPhone: [],
    getTariff: [],
    getPackage: [],
    getAuthority: [],
    getMerge: [],
    getPPM: [],
    getPin: []
    // <-- listeler
  },
  actions: {
    // TÜM create - update - delete işlemleri -->
    getTableData ({ state, commit }, data) {
      state.bigLoading = true
      state.tableData = []
      return axios.get(`${data.link}`, axiosHeader)
        .then(res => {
          state.bigLoading = false
          commit('setTableData', res.data.data)
        })
        .catch(err => {
          state.bigLoading = false
          this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        })
    },
    createData ({ commit }, data) {
      axios.post( `${data.api}`, data.info, axiosHeader)
      .then(res => {
        let ret = res.data.success
        if (ret == true) {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'success'})
          commit('setReturn', data.retcount)
          commit('setLog', res.data.data)
          
          if (data.retcount === 0) {
            router.push({name: data.turn})
          }
        } else {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
      })
    },
    updateData ({ commit }, data) {
      axios.put( `${data.api}/${data.id}`, data.info, axiosHeader)
      .then(res => {
        let ret = res.data.success
        if (ret == true) {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'success'})
          commit('setReturn', data.retcount)
          commit('setLog', res.data.data)
          if (data.retcount === 0) {
            router.push({name: data.turn})
          }
        } else {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
      })
    },
    deleteData ({ commit }, data) {
      axios.delete( `${data.api}${data.info}`, axiosHeader)
      .then(res => {
        let ret = res.data.success
        if (ret == true) {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'success'})
          commit('setReturn', data.retcount)
          commit('setLog', res.data.data)
          if (data.retcount === 0) {
            router.push({name: data.turn})
          }
        } else {
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
        }
      })
      .catch(err=> {
        console.log(err)
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
      })
    },
    // <-- TÜM create - update - delete işlemleri
    // listeler -->
    getCompanies ({ state }, data) {
      axios.get(`company?${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCompanies = []
            break
          case 200:
            state.allCompanies = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCompanies = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCompanies = []
      })
    },
    getCustomers ({ state }, data) {
      axios.get(`customer?${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCustomers = []
            break
          case 200:
            state.allCustomers = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCustomers = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCustomers = []
      })
    },
    getBalance ({ state }, data) {
      axios.get(`balance${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBalances = []
            break
          case 200:
            state.allBalances = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBalances = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allBalances = []
      })
    },
    getDiscount ({ state }, data) {
      axios.get(`discount${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allDiscounts = []
            break
          case 200:
            state.allDiscounts = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allDiscounts = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allDiscounts = []
      })
    },
    getUsers ({ state }, data) {
      axios.get(`user?${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allUsers = []
            break
          case 200:
            state.allUsers = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allUsers = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allUsers = []
      })
    },
    getMerges ({ state }, data) {
      axios.get(`authMerge?${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allMerges = []
            break
          case 200:
            state.allMerges = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allMerges = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allMerges = []
      })
    },
    getTariffs ({ state }, data) {
      axios.get(`tariff${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allTariffs = []
            break
          case 200:
            state.allTariffs = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allTariffs = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allTariffs = []
      })
    },
    getPackage ({ state }, data) {
      axios.get(`tariffPack${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPackages = []
            break
          case 200:
            state.allPackages = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPackages = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPackages = []
      })
    },
    getPhones({ state }, data) {
      axios.get(`product?type=cellPhone${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPhones = []
            break
          case 200:
            state.allPhones = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPhones = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPhones = []
      })
    },
    getCountries ({ state }) {
      axios.get(`settings/country`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCountries = []
            break
          case 200:
            state.allCountries = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCountries = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCountries = []
      })
    },
    getCities ({ state }, data) {
      axios.get(`settings/city${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCities = []
            break
          case 200:
            state.allCities = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCities = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCities = []
      })
    },
    getCustomerTypes ({ state }, data) {
      axios.get(`settings/level${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCustomerTypes = []
            break
          case 200:
            state.allCustomerTypes = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCustomerTypes = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCustomerTypes = []
      })
    },
    getPinTypes ({ state }, data) {
      axios.get(`settings/level${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPinTypes = []
            break
          case 200:
            state.allPinTypes = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPinTypes = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPinTypes = []
      })
    },
    getPins ({ state }, data) {
      axios.get(`pins${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPins = []
            break
          case 200:
            state.allPins = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPins = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPins = []
      })
    },
    getPinCodes ({ state }, data) {
      axios.get(`pincode${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPinCodes = []
            break
          case 200:
            state.allPinCodes = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPinCodes = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPinCodes = []
      })
    },
    getUserLevels ({ state }, data) {
      axios.get(`settings/level${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allUserLevels = []
            break
          case 200:
            state.allUserLevels = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allUserLevels = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allUserLevels = []
      })
    },
    getPaymentTypes ({ state }, data) {
      axios.get(`settings/level${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPaymentTypes = []
            break
          case 200:
            state.allPaymentTypes = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allPaymentTypes = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allPaymentTypes = []
      })
    },
    getBrands ({ state }, data) {
      axios.get(`settings/brand${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBrands = []
            break
          case 200:
            state.allBrands = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBrands = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allBrands = []
      })
    },
    getColors({ state }, data) {
      axios.get(`settings/color${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allColors = []
            break
          case 200:
            state.allColors = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allColors = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allColors = []
      })
    },
    getStorages({ state }, data) {
      axios.get(`settings/storage${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allStorages = []
            break
          case 200:
            state.allStorages = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allStorages = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allStorages = []
      })
    },
    getBanks({ state }, data) {
      axios.get(`bank${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBanks = []
            break
          case 200:
            state.allBanks = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allBanks = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allBanks = []
      })
    },
    // <-- listeler
    // detaylar -->
    showPackage ({ state }, data) {
      axios.get(`tariffPack/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPackage = []
            break
          case 200:
            state.getPackage = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPackage = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getPackage = []
      })
    },
    showPhone({ state }, data) {
      axios.get(`product/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPhone = []
            break
          case 200:
            state.getPhone = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPhone = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getPhone = []
      })
    },
    showTariff ({ state }, data) {
      axios.get(`tariff/${data.param}`, axiosHeader)
      .then(res => {
      switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getTariff = []
            break
          case 200:
            state.getTariff = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getTariff = []
            break
        }
      })
      .catch(err=> {
      console.log(err)
      this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getTariff = []
      })
    },
    showPPM ({ state }, data) {
      axios.get(`ppm/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPPM = []
            break
          case 200:
            state.getPPM = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getPPM = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getPPM = []
      })
    },
    showMerge ({ state }, data) {
      axios.get(`authMerge/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getMerge = []
            break
          case 200:
            state.getMerge = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getMerge = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getMerge = []
      })
    },
    showAuthority ({ state }, data) {
      axios.get(`authority/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getAuthority = []
            break
          case 200:
            state.getAuthority = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getAuthority = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getAuthority = []
      })
    },
    showUser ({ state }, data) {
      axios.get(`user/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getUser = []
            break
          case 200:
            state.getUser = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getUser = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getUser = []
      })
    },
    showCustomer ({ state }, data) {
      axios.get(`customer/${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getCustomer = []
            break
          case 200:
            state.getCustomer = res.data.data[0]
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getCustomer = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getCustomer = []
      })
    },
    showPin ({ state }, data) {
      axios.get(`pins/${data.param}`, axiosHeader)
      .then(res => {
      switch (res.status) {
        case 404:
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
          state.getPin = []
          break
        case 200:
          state.getPin = res.data.data
          break
        default:
          this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
          state.getPin = []
          break
        }
      })
      .catch(err=> {
      console.log(err)
      this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.getTariff = []
      })
    },
    // <-- detaylar
    // --> diğer işlemler
    hideTableRow ({ state }, row) {
      state.tableRows[row.id].visible = row.what
    },
    hamburger ({ state }, view) {
      // mutations ve actions altında iki farklı hamburger var. tekleştirilebilir.
      if (view.what === 'close') {
        state.style.icon = 'asc__header-hamburger asc__header-hamburger-active d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__viewPush-none asc__transition-right'
        state.style.navigation = 'asc__navigation asc__navigation-none asc__transition-right'
      } else {
        state.style.icon = 'asc__header-hamburger d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__transition-left'
        state.style.navigation = 'asc__navigation asc__transition-left'
      }
    },
    showAlert ({state}, e) {
      switch (e.type) {
        case 'danger':
          switch (e.msg.response.status) {
            case 401:
              this.dispatch('logout')
              break
            case 403:
              router.push({name: 'Dashboard'})
              break
          }
          if (e.msg.response.data.errors) {
            this._vm.$bvToast.toast(JSON.stringify(e.msg.response.data.errors), {
              title : JSON.stringify(e.msg.response.data.message),
              variant : 'danger',
              noCloseButton: true,
              toaster: 'b-toaster-top-right'
            })
          } else {
            this._vm.$bvToast.toast(JSON.stringify(e.msg.response.data.message), {
              title : JSON.stringify(e.msg.response.statusText),
              variant : 'danger',
              noCloseButton: true,
              toaster: 'b-toaster-bottom-right'
            })
          }
          break
        default:
          this._vm.$bvToast.toast(e.msg, {
            variant : e.type,
            noCloseButton: true,
            toaster: 'b-toaster-bottom-right'
          })
          break
      }
    },
    login ({ state }, isUser) {
      $('#loginButton').attr('disabled', true)
      $('#loginLoader').show()
      this.dispatch('showAlert', {...this.e, msg: i18n.t('general.wait'), type: 'info'})
      axios.post(`auth/login`, {
        email: isUser.email,
        password: isUser.password
      })
        .then(user => {
          localStorage.setItem('userToken', user.data.access_token)
          localStorage.setItem('userName', user.data.name)
          state.loginUser.name = localStorage.getItem('userName')
          axiosHeader = {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
          }
          router.push({ name: 'Dashboard' })
        })
        .catch(err => {
          $('#loginButton').attr('disabled', false)
          $('#loginLoader').hide()
          $('#loginWarning').show()
          this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        })
    },
    logout ({commit}) {
      commit('clearToken')
      location.href = '../'
    }
  },
  mutations: {
    setLog (state, data) {
      state.returnLog = data
    },
    setLoader (state, data) {
      state.bigLoading = data
    },
    setReturn (state, data) {
      state.returnCount = data
    },
    setTableData (state, data) {
      state.tableData = data
    },
    setTableRows (state, data) {
      state.tableRows = data
    },
    setTableActions (state, data) {
      state.tableActions = data
    },
    hamburger (state) {
      if (state.style.viewPush === 'asc__viewPush asc__transition-left') {
        state.style.icon = 'asc__header-hamburger asc__header-hamburger-active d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__viewPush-none asc__transition-right'
        state.style.navigation = 'asc__navigation asc__navigation-none asc__transition-right'
      } else {
        state.style.icon = 'asc__header-hamburger d-inline-block'
        state.style.viewPush = 'asc__viewPush asc__transition-left'
        state.style.navigation = 'asc__navigation asc__transition-left'
      }
    },
    clearToken () {
      localStorage.setItem('signed', false)
      localStorage.removeItem('userToken')
      localStorage.removeItem('userName')
    },
    changeLang (state, payload) {
      state.appLang = payload.changedLang
      localStorage.setItem('siteLang', payload.changedLang)
    }
  }
})
