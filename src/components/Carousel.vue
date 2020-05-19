<template>
  <div class="asc__auth-carousel">
    <hooper :settings="hooperSettings">
      <slide v-for="(slider,i) in item" :key="'slider'+i" :index="'slider'+i" class="slide asc__auth-carousel-slider" :style="{ backgroundImage: 'url(' + slider.photo + ')' }">
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
      <hooper-progress slot="hooper-addons"></hooper-progress>
    </hooper>
  </div>
</template>
<script>
// import axios from 'axios'
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper'
  // https://baianat.github.io/hooper/api.html#props
import 'hooper/dist/hooper.css'
export default {
  data () {
    return {
      hooperSettings: {
        wheelControl: false,
        itemsToShow: 1,
        centerMode: true,
        autoPlay: true,
        playSpeed: 4000,
        transition: 750,
        vertical: true
      }
    }
  },
  props: ['item'],
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scope lang="sass">
  .asc__auth-carousel
    width: 100%
    height: 100vh
    display: block
    .hooper
      height: 100vh
    .asc__auth-carousel-slider
      padding: 100px
      height: 100vh
      background-size: cover
      background-position: center center
      display: block
      position: relative
</style>
