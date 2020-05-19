<template>
  <div class="asc__updatePage">
    <b-modal :id="'discountmodal'" :ref="'discountmodal'" :title="data.title + ' - ' + data.code + ' ' + $t('Discount.discountOperation')">
      <table class="table table-striped">
        <tr>
          <td>{{$t('Discount.pinTitle')}}</td>
          <td>{{discount.pinTitle}}</td>
        </tr>
        <tr>
          <td>{{$t('Discount.pinPrice')}}</td>
          <td>{{discount.pinPrice}}</td>
        </tr>
        <tr>
          <td>{{$t('Discount.pinDiscount')}}</td>
          <td>{{discount.pinDiscount}}</td>
        </tr>
        <tr>
          <td>{{$t('Discount.customerDiscount')}}</td>
          <td><input type="text" class="form-control" v-model="discount.discount"></td>
        </tr>
      </table>
      <template slot="modal-footer">
        <b-button variant="danger" size="sm" squared @click="hideModal()">{{$t('form.cancel')}}</b-button>
        <b-button variant="success" squared @click="submitForm(discount.id, discount.discount)">{{$t('form.update')}}</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        discount: ''
      }
    }
  },
  props: ['data', 'discount'],
  watch: {
    returnCount: function (e) {
      console.log(e + ' modal kapansın')
      this.$store.commit('setReturn', 4)
      this.hideModal()
    }
  },
  computed: {
    ...mapState(['returnCount'])
  },
  methods: {
    submitForm (i, e) {
      let datas = {
        discount: e
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'discount', id: i, info: datas, retcount: 3 })

    },
    hideModal () {
      this.$refs['discountmodal'].hide()
    },
  }
}
</script>
