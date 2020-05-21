# SPA Analyzer

SPA Analyzer front-end proj.

### Build Setup

```bash
# kopyalanmış projeyi çalıştırmadan önce
npm install

# localhost:8080 portundan projeyi çalıştırmak için
npm run dev

# projeyi derlemek için
npm run build
```

#### import edilecekler
```bash
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
```
#### importları kullanmak
```bash
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Toasted)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(vuescroll)
Vue.prototype.$vuescrollConfig = {
  bar: {
    showDelay: 500,
    onlyShowBarOnScroll: true,
    keepShow: false,
    background: '#6b6666',
    opacity: 1,
    hoverStyle: true
  }
}
Vue.component('vueDropzone', vue2Dropzone)
Vue.use(VueQuillEditor, /* { default global options } */)
```
#### paket siteleri
```bash
https://vuex.vuejs.org/installation.html
https://router.vuejs.org/installation.html#direct-download-cdn
https://bootstrap-vue.js.org/docs
https://kazupon.github.io/vue-i18n/installation.html#explanation-of-different-builds
https://vuescrolljs.yvescoding.org/
https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/installation
https://quilljs.com/docs/download/
```

### Notlar
Faculty/index.vue dosyası doğru şekillendirildi.

Diğer dosyaların tamamı bu dosyaya göre yeniden şekillendirilmeli.

Api bağlantılarına dikkat edilecek.

