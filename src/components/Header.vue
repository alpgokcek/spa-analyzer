<template>
  <div class="asc__header">
    <b-row>
      <b-col cols="10" md="6">
        <router-link :to="{name: 'Dashboard'}" class="asc__header-logo"><h3>{{logo.header}}</h3></router-link>
      </b-col>
      <b-col cols="2" md="6" class="asc__header-userBox">
        <b-dropdown id="asc__header-userBox" variant="white" :text="loginUser.name" class="d-none d-md-inline-block">
          <b-dropdown-item><i class="fa fa-key"></i> {{$t('nav.changePassword')}}</b-dropdown-item>
          <b-dropdown-item @click="changeLang()"><i class="fa fa-language"></i> {{toggleLang}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout()"><i class="fa fa-sign-out-alt"></i> {{$t('nav.logout')}}</b-dropdown-item>
        </b-dropdown>
        <div @click="collapseNav()" :class="style.icon">
          <i class="fas fa-bars"></i>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      headerLinks: [],
      windowWidth: 0,
      windowHeight: 0,
      toggleLang: 'Türkçe'
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapState(['logo', 'loginUser', 'style'])
  },
  methods: {
    ...mapMutations(['hamburger']),
    collapseNav () {
      this.hamburger()
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    changeLang () {
      switch (this.$i18n.locale) {
        case 'en':
          this.$i18n.locale = 'tr'
          this.toggleLang = 'English'
          localStorage.setItem('selectedLang', 'tr')
          break
        case 'tr':
          this.$i18n.locale = 'en'
          this.toggleLang = 'Türkçe'
          localStorage.setItem('selectedLang', 'en')
          break
      }
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  watch: {
    windowWidth: function (e) {
      if (this.style.icon === 'asc__header-hamburger asc__header-hamburger-active d-inline-block') {
        // bu alan daha sonra navigationState şeklinde bir değişkene bağlanmalı.
      } else {
        if ((e <= 992) && (this.style.navigation === 'asc__navigation asc__transition-left')) {
          this.$store.dispatch('hamburger', {...this.view, what: 'close'})
        } else if ((e >= 993) && (this.style.navigation === 'asc__navigation asc__navigation-none asc__transition-right')) {
          this.$store.dispatch('hamburger', {...this.view, what: 'open'})
        }
      }
    }
  }
}
</script>

<style lang="sass">
  .asc__header
    color: #ffffff
    width: 100%
    position: fixed
    top: 0px
    left: 0px
    height: 45px
    padding: 5px 15px
    background: linear-gradient(45deg, #5970e2, #125392)
    box-shadow: 0 0 10px #313131
    z-index: 992
    .asc__header-logo
      & h3
        color: #fff
        font-weight: bold
        font-size: 20px
        line-height: 35px
      &:hover
        text-decoration: none
      height: 35px
    .asc__header-hamburger
      line-height: 25px
      cursor: pointer
      color: #fff
      border: 1px transparent solid
      border-radius: 2px
      width: 25px
      text-align: center
      margin-top: 5px
    .asc__header-hamburger-active
      background: #fff
      color: #9c1c20
    .asc__header-userBox
      color: #fff
      text-align: right
      & button
        font-size: 12px !important
        background: none
        color: #fff
      .dropdown-menu
        width: 200px
        .dropdown-item
          font-size: 12px
</style>
