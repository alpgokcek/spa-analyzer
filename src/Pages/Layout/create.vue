<template>
  <b-container fluid>
    <Navigation/>
    <TopHeader/>
    <b-row>
      <b-col cols="12">
        <b-overlay :show="bigLoading" rounded="sm">
          <div :class="style.viewPush">
            <router-view/>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['style', 'bigLoading'])
  }
}
</script>
<style lang="sass">
  .asc__insertPage
    .asc__insertPage-h3
      font-size: 14px
      font-weight: 700
      background: #fff
      margin: 0px
      padding: 0px
      line-height: 36px
    .asc__insertPage-header
      margin: 5px 0 10px 0px
      font-size: 12px
      & h3
        color: #333
        font-size: 22px
        font-weight: 700
        margin: 0px
        padding: 0px
        line-height: 36px
      .asc__insertPage-header-Create
        font-size: 12px !important
        line-height: 22px !important
        margin-top: 0px !important
    .asc__insertPage-card-withTab
      .card-body
        padding-top: 0px !important
    .asc__insertPage-header-Dropdown
      float: left
      margin: 0 10px 0 0
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        width: 140px !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      .dropdown-item
        width: 300px
        color: #333 !important
        font-size: 12px !important
        padding: 5px 10px !important
    .asc__insertPage-header-Search
      width: 200px !important
      margin: 0 !important
      float: left !important
      & button
        font-size: 12px !important
        padding: 2px 5px !important
      & input
        font-size: 12px !important
        padding: 5px 10px !important
    .asc__insertPage-header-SelectRows
      width: 140px
      margin: 0 0px 0 0
      float: left
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        width: 140px !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      & input
        font-size: 12px !important
        padding: 5px 10px !important
      .dropdown-item
        width: 200px !important
        margin: 0px 10px 0px 10px !important
        color: #333 !important
        border-bottom: 1px #efefef solid !important
        font-size: 12px !important
        padding: 7px 10px !important
        &:hover
          background-color: #efefef !important
        & i
          padding: 2px !important
          color: #333 !important
      .active
        background-color: transparent !important
        & i
          padding: 2px !important
          background: #ffa300 !important
          color: #fff !important
    .asc__insertPage-header-Download
      float: left
      margin: 0 0 0 0
      & button
        font-size: 12px !important
        padding: 6px 10px !important
        text-align: left !important
        border: 1px #ddd solid !important
        background: #fff !important
        &::after
          float: right !important
          margin-top: 7px !important
      .dropdown-item
        color: #333 !important
        font-size: 12px !important
        padding: 5px 10px !important
      .asc__insertPage-header-h4
        font-size: 16px
        font-style: italic
        font-weight: 700
        background: #fff
        margin: 0px
        padding: 0px 0px 10px 0px
      & h4
        font-size: 16px !important
      .form-group
        & figure
          width: 100%
          padding: 10px 5%
          display: inline-block
          & img
            width: 100%
        .col-form-label
          line-height: 10px !important
      .asc__insertPage-header-table
        & thead
          font-size: 12px !important
        & tbody
          & tr
            line-height: 18px !important
            border-bottom: 1px #ddd solid !important
            font-size: 12px !important
            &:last-child
              border-bottom: none !important
            & td
              padding: 5px 0 !important
              vertical-align: middle !important
              font-size: 12px !important
    .asc__insertPage-cover-selected
      border: 5px #db2027 solid
      & img
        opacity: 1 !important
    .asc__insertPage-cover-scroll
      max-height: 300px
      overflow: auto
      & figure
        width: 50%
        padding: 10px 5%
        display: inline-block
        & img
          opacity: .6
          width: 100%
    .asc__insertPage-body
      .card-body
        .card-title
          font-size: 20px
          margin: 0 0 10px 0
          padding: 0
          font-style: italic
        & figure
          width: 100%
          padding: 10px 5%
          display: inline-block
          & img
            width: 100%
        .table
          font-size: 12px
          .btn
            font-size: 12px
            padding: 2px 5px
          .dropdown-item
            font-size: 12px
        .form-group
          font-size: 12px !important
          margin-top: 10px !important
          margin-bottom: 20px !important
          position: relative !important
          .col-form-label
            position: absolute !important
            cursor: text !important
            font-size: 100% !important
            opacity: 1 !important
            top: -.4em !important
            left: .75rem !important
            z-index: 3 !important
            line-height: 1 !important
            padding: 0 1px !important
            background: #fff!important
            width: fit-content !important
        .asc__insertPage-tab-innerTab
          .tabs
            .nav-tabs
              .nav-item
                .nav-link
                  font-size: 12px !important
                  margin: 0 0 0 0 !important
                  padding: 5px 10px 5px 10px !important
        .tabs
          .nav-tabs
            border-bottom: none !important
            .nav-item
              margin-right: 10px !important
              &:last-child
                margin-right: 0px !important
              .nav-link
                font-size: 20px !important
                margin: 0 0 0 0 !important
                padding: 1rem 10px 0 10px !important
                border-radius: 0px !important
                border: none !important
                font-style: italic !important
                color: #666666 !important
              .active
                color: #fff !important
                background: linear-gradient(45deg, #5970e2, #125392)
      .asc__insertPage-body-h5
        font-weight: bold
        font-size: 14px
        font-style: italic
  .vs__dropdown-toggle
    height: 40px !important
    font-size: 12px !important
    background: #fff !important
    border: 1px #e0e0e0 solid !important
    border-radius: 3px !important
  .form-control
    &[type="text"]
      height: 40px !important
    font-size: 12px !important
    background: #fff !important
    border: 1px #e0e0e0 solid !important
    border-radius: 3px !important
  .b-form-datepicker
    height: 40px !important
    .form-control
      border: none !important
  .b-form-btn-label-control
    > label
      padding-top: 10px !important
  .vue-dropzone
    max-height: 200px
    overflow: auto
    padding: 10px 0px
  .dropzone
    .dz-preview
      margin: 5px 0px
      width: 50%
      overflow: hidden
      .dz-image
        & img
          margin: auto
  </style>
