<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style lang="sass">
  @import url('./assets/fontawesome/css/all.min.css')
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700;1,800&display=swap')
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700;1,900&display=swap')
  #app
    font-family: 'Nunito Sans', sans-serif
  body
    background: #f8f8f8
    min-height: 100vh
  .asc__transition-left
    transition-duration: 0.3s, 0.3s
    transition-timing-function: ease-in-out, ease-in-out
    transition-delay: 0s, 0s
  .asc__transition-right
    transition-duration: 0.4s, 0.4s
    transition-timing-function: ease-in-out, ease-in-out
    transition-delay: 0s, 0s
  .asc__footer
    position: absolute
    bottom: 0px
    right: 0px
  .asc__viewPush
    padding: 55px 0px 0px 180px
  .asc__viewPush-none
    padding: 55px 0px 0px 0px !important
  .form-group--error
    color: #ff0000
    & legend
      color: #ff0000 !important
    .form-control,
    .vs__dropdown-toggle
      border: 1px #ff0000 solid !important
      background: #ff000005 !important
  .form-group--danger
    color: #b18912
    & legend
      color: #b18912 !important
    .form-control,
    .vs__dropdown-toggle
      border: 1px #b18912 solid !important
      background: #ff000005 !important
  .btn-primary
    background: linear-gradient(45deg, #36b5ff, #2d64ff) !important
    border-color: #2d64ff !important
    &:focus
      background-color: #2d64ff !important
      border-color: #36b5ff !important
      box-shadow: 0 0 0 0.2rem #36b5ff6b !important
    &:active
      background-color: #2d64ff !important
      border-color: #36b5ff !important
    &:hover
      background-color: #2d64ff !important
      border-color: #36b5ff !important
      color: #fff !important
  .btn-success
    background: linear-gradient(45deg, #17c541, #94d01f) !important
    border-color: #94d01f !important
    &:focus
      background-color: #94d01f !important
      border-color: #17c541 !important
      box-shadow: 0 0 0 0.2rem #94d01f78 !important
    &:active
      background-color: #94d01f !important
      border-color: #17c541 !important
    &:hover
      background-color: #94d01f !important
      border-color: #17c541 !important
  .card
    border: none !important
</style>
