<template>
  <b-container fluid>
    <Navigation/>
    <TopHeader/>
    <b-row>
      <b-col cols="12">
        <div :class="style.viewPush">
          <div class="asc__listPage">
            <b-row class="asc__listPage-Header">
              <b-col cols="12" sm="6" md="6" class="pl-0">
                <h3>{{pageTitle}}</h3>
              </b-col>
              <b-col cols="12" sm="6" md="6" class="pr-0">
                <router-link v-if="createLink" class="btn btn-sm btn-primary float-right text-light asc__listPage-Header-Create" :to="{name: createLink}">
                  <b-icon icon="plus-square"></b-icon> {{$t('list.create')}}
                </router-link>

                <!-- <b-dropdown id="selectedRows" right variant="white" :text="$t('list.selectedRows')" class="asc__listPage-Header-SelectRows mx-1 float-right">
                  <b-dropdown-item v-for="(row,i) in tableRows" :key="i" :active="row.visible" @click="hideRow(i, row.visible == true ? false : true)">
                    <b-icon :icon="row.visible == true ? 'check-box' : 'square'"></b-icon> {{$t(routeName+'.'+row.field)}}
                  </b-dropdown-item>
                </b-dropdown> -->
              </b-col>
            </b-row>
            <b-card>
              <b-overlay :show="bigLoading" rounded="sm">
                <b-row>
                  <b-col>
                    <router-view/>
                  </b-col>
                </b-row>
              </b-overlay>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- <b-modal :id="dispatchModalId" title="Sevk Emri Ver" hide-footer>
      <DispatchModal :data="dispatchModalData" :close="dispatchModalId" />
    </b-modal> -->

  </b-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      pageTitle: this.$route.meta.title,
      routeName: this.$route.name,
      createLink: this.$route.meta.createLink
    }
  },
  computed: {
    ...mapState(['style', 'bigLoading', 'tableRows', 'tableFilters'])
  },
  mounted () {
    if (this.$route.fullPath === '/') {
      this.$router.push({name: 'Dashboard'})
    }
  },
  methods: {
    hideRow (e, w) {
      this.$store.dispatch('hideTableRow', {...this.row, id: e, what: w})
    }
  },
  watch: {
    '$route' (to) {
      this.pageTitle = to.meta.title
      this.createLink = to.meta.createLink
    }
  }
}
</script>
<style lang="sass">
  .asc__listPage
    .card-body
      padding: 10px
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important
    .asc__listPage-operations
      text-align: right
      & a
        border: 1px #efefef solid
        border-radius: 2px
        margin: 0 1px
        color: #212529
        background: #ffffff
        width: 20px
        line-height: 20px
        display: inline-block
        text-align: center
    .asc__listPage-Header
      margin: 5px 0 10px 0px
      font-size: 12px
      & h3
        font-size: 22px
        font-weight: 700
        margin: 0px
        padding: 0px
        line-height: 36px
        color: #333
    .asc__listPage-Header-Dropdown
      float: left
      margin: 0 10px 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        width: 300px
        color: #333 !important
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-Search
      width: 200px
      margin: 0
      float: left
      & button
        font-size: 12px
        padding: 2px 5px
      & input
        font-size: 12px
        padding: 5px 10px
    .asc__listPage-Header-SelectRows
      width: 140px
      margin: 0 0px 0 0
      float: left
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        width: 140px
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      & input
        font-size: 12px
        padding: 5px 10px
      .dropdown-menu
        box-shadow: 0 0 10px #a2a2a2
        max-height: 400px
        overflow-x: hidden
        overflow-y: auto
        .dropdown-item
          width: 200px
          margin: 0px 10px 0px 10px
          color: #333 !important
          border-bottom: 1px #efefef solid
          font-size: 12px
          padding: 7px 10px
          &:hover
            background-color: #efefef
          & i
            padding: 2px
            color: #333
        .active
          background-color: transparent
          & i
            padding: 2px
            background: #ffa300
            color: #fff
    .asc__listPage-Header-Create
      font-size: 12px
      line-height: 22px
      margin-top: 0px
    .asc__listPage-Header-Download
      float: left
      margin: 0 0 0 0
      & button
        font-size: 12px
        padding: 6px 10px
        text-align: left
        border: 1px #ddd solid
        background: #fff
        &::after
          float: right
          margin-top: 7px
      .dropdown-item
        color: #333 !important
        font-size: 12px
        padding: 5px 10px
</style>
<style scope>
  .asc__general-btn-inTable {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 10px;
  }
  .asc__listPage-dataGrid {
    height: calc(100vh - 140px);
    transition-timing-function: ease;
  }
  .dx-widget {
    font-size: 11px !important;
    font-family: 'Nunito Sans', sans-serif !important;
  }
  .dx-datagrid .dx-row > td {
    padding: 2px 4px 4px 4px !important;
    vertical-align: middle !important;
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .dx-dropdownbutton-action.dx-button .dx-button-content {
    padding: 2px !important
  }
  .dx-button-content .dx-icon-spindown {
    display: none !important
  }
  .dx-filter-menu.dx-menu .dx-menu-item .dx-menu-item-content {
    padding: 0px 0px 0px 0px !important
  }
  .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
    font-size: 11px !important;
    font-weight: 700 !important;
  }
  .dx-datagrid-headers .dx-texteditor-input,
  .dx-datagrid-rowsview .dx-texteditor-input {
    padding: 0px !important;
    min-height: 28px !important;
  }
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-placeholder:before,
  .dx-datagrid-filter-row .dx-editor-cell
  .dx-editor-with-menu .dx-texteditor-input {
    padding-left: 16px !important;
  }
  .dx-dropdownbutton-popup-wrapper.dx-popup-wrapper .dx-overlay-content {
    width: 200px !important;
  }
  .dx-datagrid-headers {
    font-weight: bold !important;
    color: #000000 !important;
  }
  .dx-datagrid-nowrap, .dx-datagrid-nowrap .dx-header-row>td>.dx-datagrid-text-content {
    white-space: pre-wrap !important;
  }
</style>
