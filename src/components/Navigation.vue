<template>
  <div :class="style.navigation">
    <NavigationList :data="items" />
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { items } from './nav.js'

export default {
  data () {
    return {
      items: items
    }
  },
  computed: {
    ...mapState(['system', 'style'])
  }
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
