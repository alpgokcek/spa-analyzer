<template>
  <div :class="style.navigation">
    <NavigationList :data="items" />
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { admin } from './nav.js'

export default {
  data () {
    return {
      instructor: [
        { title: this.$t('nav.home'),router: 'Dashboard',icon: 'graph-up',params: {},sub: [] },
        { 
          title: this.$t('nav.CourseIndex'),
          router: 'Course',
          icon: '',
          data: { 
            faculty: localStorage.getItem('userFaculty'),
            department: localStorage.getItem('userDepartment')
          },
          sub: []
        }
      ],
      items: []
    }
  },
  computed: {
    ...mapState(['system', 'style'])
  },
  created() {
    this.items = localStorage.getItem('userLevel') === '5' ? this.instructor : admin
  },
}
</script>
<style scoped lang="sass">
  .asc__navigation
    position: fixed
    top: 45px
    left: 0px
    width: 170px
    height: calc(100vh - 45px)
    // background: linear-gradient(45deg, #000, #333)
    background: #fff
    border-radius: 0px 3px 3px 0px
    overflow-x: hidden
    overflow-y: auto
    font-size: 11px
    z-index: 991
  .asc__navigation-none
    left: -200px
  .asc__system-verno
    width: 100%
    text-align: center
    & span
      color: #f29d2a
      font-weight: bold
</style>
