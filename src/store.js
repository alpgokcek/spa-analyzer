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
    excelUploadOptions: {
      url: 'https://cors-anywhere.herokuapp.com/https://spa-analyzer-flask.herokuapp.com/file-upload',
      thumbnailHeight: 100,
      maxFilesize: 10,
      autoProcessQueue: false,
      addRemoveLinks: true,
      dictDefaultMessage: '<i class="fas fa-cloud-upload-alt d-block"></i> <b>UPLOAD</b>',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
      paramName: 'file'
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
    allCourses: [],
    getCourse: []
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
    deleteFile ({ commit }, data) {
      axios.post( `https://cors-anywhere.herokuapp.com/https://spa-analyzer-flask.herokuapp.com/file-remove`, data.info, axiosHeader)
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

    getAuthority ({ state, commit}, data) {

    },
    getCourse ({ state, commit}, data) {
      axios.get(`course${data.param}`, axiosHeader)
      .then(res => {
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCourses = []
            break
          case 200:
            state.allCourses = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.allCourses = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.allCourses = []
      })
    },
    getCourseOutcome ({ state, commit}, data) {

    },
    getAssessment ({ state, commit}, data) {

    },
    getDashboard ({ state, commit}, data) {

    },
    getDepartment ({ state, commit}, data) {

    },
    getDepartmentsHasInstructors ({ state, commit}, data) {

    },
    getFaculty ({ state, commit}, data) {

    },
    getGradingTool ({ state, commit}, data) {

    },
    getGtcco ({ state, commit}, data) {

    },
    getIgs ({ state, commit}, data) {

    },
    getLog ({ state, commit}, data) {

    },
    getProgramOutcome ({ state, commit}, data) {

    },
    getPopco ({ state, commit}, data) {

    },
    getSection ({ state, commit}, data) {

    },
    getSagt ({ state, commit}, data) {

    },
    getSgmgco ({ state, commit}, data) {

    },
    getSgmgpo ({ state, commit}, data) {

    },
    getSts ({ state, commit}, data) {

    },
    getUniversity ({ state, commit}, data) {

    },
    getUser ({ state, commit}, data) {

    },
    getUsersAdmin ({ state, commit}, data) {

    },
    getUsersStudent ({ state, commit}, data) {

    },
    getUsersInstructor ({ state, commit}, data) {

    },
    getCheckAuth ({ state, commit}, data) {

    },

    
    // <-- listeler
    // detaylar -->
    showCourse ({ state }, data) {
      axios.get(`course/${data.param}`, axiosHeader)
      .then(res => {
        state.bigLoading = false
        switch (res.status) {
          case 404:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getCourse = []
            break
          case 200:
            state.getCourse = res.data.data
            break
          default:
            this.dispatch('showAlert', {...this.e, msg: res.data.message, type: 'info'})
            state.getCourse = []
            break
        }
      })
      .catch(err=> {
        this.dispatch('showAlert', {...this.e, msg: err, type: 'danger'})
        state.bigLoading = false
        state.getCourse = []
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
          localStorage.setItem('userLevel', user.data.level)
          switch (user.data.level) {
            case '5':
              localStorage.setItem('userUniversity', user.data.user.university)
              localStorage.setItem('userFaculty', user.data.user.faculty_id)
              localStorage.setItem('userDepartment', user.data.user.department_id)
              break
          
            default:
              break
          }
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
      localStorage.removeItem('userUniversity')
      localStorage.removeItem('userFaculty')
      localStorage.removeItem('userDepartment')
      localStorage.removeItem('userLevel')
    },
    changeLang (state, payload) {
      state.appLang = payload.changedLang
      localStorage.setItem('siteLang', payload.changedLang)
    }
  }
})
