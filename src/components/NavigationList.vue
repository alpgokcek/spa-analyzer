<template>
  <ul class="asc__navigation-list">
    <li v-for="(item,i) in data" :key="'i'+i">
      <template v-if="!item.sub.length >= 1">
        <router-link active-class="asc__navigation-active" exact :to="{name: item.router}">
          <b-icon class="asc__navigation-list-icon" :icon="item.icon ? item.icon : defaultIcon"></b-icon> {{item.title}}
        </router-link>
      </template>
      <template v-else>
        <span v-b-toggle="'collapse-'+item.router">
          <b-icon :icon="item.icon ? item.icon : defaultIcon"></b-icon>  {{item.title}}
        </span>
        <b-collapse :id="'collapse-'+item.router">
          <ul>
            <li>
              <router-link active-class="asc__navigation-active" exact :to="{name: item.router}">
                <b-icon :icon="item.icon ? item.icon : defaultIcon"></b-icon> {{item.title}}
              </router-link>
            </li>
            <li v-for="(sub,x) in item.sub" :key="'x'+x">
              <router-link active-class="asc__navigation-active" exact :to="{name: sub.router, params: sub.params }">
                <b-icon :icon="sub.icon ? sub.icon : defaultIcon"></b-icon> {{sub.title}}
              </router-link>
            </li>
          </ul>
        </b-collapse>
      </template>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      defaultIcon: 'circle'
    }
  },
  props: ['data'],
  mounted () {
    this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.$route.name)
  }
}
</script>
<style scoped lang="sass">
  .asc__navigation-list
    color: #333
    font-weight: lighter
    list-style: none
    padding: 10px 0
    font-size: 12px
    height: calc(100vh - 65px)
    & li
      line-height: 30px
      border-bottom: 1px #33333310 solid
      transition: .3s
      cursor: pointer
      text-align: center
      margin: auto
      padding: 10px 0
      & span
        display: block !important
      &:hover
        background: #00000010
      .b-icon.bi
        width: 40px
        margin-left: 10px
        font-size: 28px
        display: block
        margin: auto
      & a
        color: #333333
        display: block
        &:hover
          text-decoration: none
      & ul
        list-style: none
        padding: 0px 0px 0px 0px
        & li
          border-bottom: none
          font-weight: lighter
          line-height: 20px
          border: none
          padding: 6px 0 6px 5px
          text-align: left
          .b-icon.bi
            display: inline-block
            width: 20px
            font-size: 14px
            margin-right: 5px
    .asc__navigation-list-icon
      width: 50px
  .asc__navigation-active
    color: #125392 !important
    font-weight: 700 !important
</style>
