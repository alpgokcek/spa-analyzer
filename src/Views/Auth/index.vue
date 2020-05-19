<template>
  <b-container fluid class="asc__auth">
    <b-row>
      <b-col cols="12">
        <Carousel :item="carousel"/>
      </b-col>
      <b-col cols="12" sm="10" md="8" lg="6" xl="3" class="asc__auth-right">
        <b-row>
          <b-col cols="12">
            <figure class="figure">
              <!-- <img :src="logo.login" class="figure-img img-fluid rounded" :alt="title.siteName" /> -->
              <h3>{{logo.login}}</h3>
            </figure>
          </b-col>
          <router-view/>
          <b-col cols="12" class="asc__auth-footer">
            <p class="asc__auth-footer-verno"><span>V</span> {{system.version}}</p>
            <p class="asc__auth-footer-copyright">{{system.copyright}}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
// import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      carousel: [
        {photo: '@/assets/spalogin.jpg'}
      ]
    }
  },
  computed: {
    ...mapState(['logo', 'title', 'system'])
  }
}
</script>
<style lang="sass">
  .asc__auth
    background-color: #fff
    height: 100vh
    position: relative
    .asc__auth-right
      position: absolute
      right: 0
      top: 0
      background: #fff
      padding: 0 30px
      height: 100%
      box-shadow: 0 0 20px #565656
      z-index: 9
      .figure
        width: 100%
        margin: 0px auto 50px auto
        padding-top: 50px
        padding-bottom: 50px
        text-align: center
        border-bottom: 1px #efefef solid
        & img
          width: 200px
      .form-control
        background: #f4f6f7
        border: 1px #f4f6f7 solid
      & a
        width: 100%
        line-height: 40px
        color: #125392
      & legend
        color: #5f6164
        font-weight: bold
      & button
        background: linear-gradient(45deg, #5970e2, #125392)
        border: none
        color: #fff
        width: 100%
        line-height: 40px
    .asc__auth-form
      font-size: 12px
      & a
        margin: 10px 0
      & p
        padding: 10px 20px
        font-size: 10px
      .asc__auth-warning
        font-size: 12px
        font-weight: bold
        font-style: italic
        color: #ff0000
        display: none
    .asc__auth-footer
      position: absolute
      bottom: 50px
      margin: auto
      left: 0
      right: 0
      .figure
        width: 100%
        margin: auto
        padding-top: 50px
        text-align: center
        border-top: 1px #efefef solid
        border-bottom: none
        & img
          height: 30px
          width: initial
          margin: 5px
      .asc__auth-footer-verno
        font-size: 10px
        text-align: center
        margin: 10px 0 0 0
        padding: 0px
        & span
          color: #125392
      .asc__auth-footer-copyright
        font-size: 11px
        padding: 0px
        margin: 0px 0 0 0
        width: 100%
        text-align: center
</style>
