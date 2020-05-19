<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="12" class="pl-0">
        <h3 v-html="$t('router.discount', {val: getCustomer.title + ' - ' + getCustomer.code })" />
      </b-col>
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card class="shadow">
          <h4 class="card-title float-left">{{$t('Discount.setDiscount')}}</h4>          
          <b-button @click="submitDiscount()" type="button" class="float-right btn-sm" variant="primary" squared>{{ $t('Discount.save')}}</b-button>
          <table class="table">
            <thead>
              <tr>
                <th class="w-50">{{$t('Discount.pin')}}</th>
                <th class="w-40">{{$t('Discount.discount')}}</th>
                <th class="w-10"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-select :options="allPins" label="title" v-model="selectedPin"/>
                </td>
                <td><b-form-input type="text" v-model="discountPercent" /></td>
                <td>
                  <button type="button" class="btn btn-success rounded-0" @click="addDiscount(selectedPin.id,selectedPin.title,discountPercent)">
                    <i class="far fa-plus-square" />
                  </button>
                </td>
              </tr>
              <tr v-for="(cds,i) in discounts" :key="'cds'+i">
                <td>{{cds.title}}</td>
                <td>{{cds.discount}}</td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="removeDiscount(i)">
                    <i class="fas fa-trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
            {{selectedPin}}
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="8" class="mb-3">
        <b-card :title="$t('Discount.allDiscounts')" class="shadow mb-3">
          <b-table striped hover small="" :items="allDiscounts" :fields="fields">
            <template v-slot:cell(status)="data">
              <b-dropdown :id="'dropdown-' + data.value" :text="$t('Discount.operation')" right variant="primary" class="m-0" size="sm">
                <b-dropdown-item @click="changeStatus(data.value, 0)">{{ $t('Discount.cancel') }}</b-dropdown-item>
              </b-dropdown>
            </template>
            <template v-slot:cell(id)="data">
              <b-button v-b-modal="'discountmodal'" @click="discountId(data.item)">
                <i class="fas fa-pencil-alt" />
              </b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <DiscountModal :data="getCustomer" :discount="discountData" />
  </div>
</template>
<script>
import DiscountModal from '../../components/DiscountModal'
import { mapState } from 'vuex'
export default {
  components: {
    DiscountModal
  },
  data () {
    return {
      token: this.$route.params.token,
      discounts: [],
      discountList: [],
      data: [],
      selectedPin: '',
      discountPercent: '',
      discountData: null,
      fields: [
        { key: 'pinTitle', label: this.$t('Discount.pinTitle'), sortable: true },
        { key: 'pinPrice', label: this.$t('Discount.pinPrice'), sortable: true },
        { key: 'pinDiscount', label: this.$t('Discount.pinDiscount'), sortable: true },
        { key: 'discount', label: this.$t('Discount.customerDiscount'), sortable: true },
        { key: 'id', label: this.$t('Discount.operation'), sortable: true }
      ]
    }
  },
  watch: {
    returnCount: function (e) {
      console.log(e + ' balance listesini getir')
      this.customer(this.token)
      this.discount(this.token)
      this.pins()
    }
  },
  computed: {
    ...mapState(['getCustomer', 'returnCount', 'returnLog', 'allPins', 'allDiscounts'])
  },
  mounted () {
    this.customer(this.token)
    this.discount(this.token)
    this.pins()
  },
  methods: {
    discountId (e) {
      this.discountData = e
    },
    customer (e) {
      this.$store.dispatch('showCustomer', {...this.data, param: e})
    },
    pins (e) {
      this.$store.dispatch('getPins', {...this.data, param: '?select=pins.title,pins.token,pins.id'})
    },
    discount (e) {
      this.$store.dispatch('getDiscount', {...this.data, param: `?token=${e}`})
    },
    changeStatus (i, s) {
      let datas = {
        status: s
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'discount', id: i, info: datas, retcount: 4 })
    },
    addDiscount(p,t,d){
      console.log(p)
      console.log(t)
      console.log(d)
      let disc = {
        customer: this.getCustomer.id,
        pin: p,
        title: t,
        discount: d
      }
      this.selectedPin = null
      this.discountPercent = null
      this.discounts.push(disc)
    },
    removeDiscount(e) {
        this.discounts.splice(e, 1)
    },
    submitDiscount () {
      let datas = {
        data: this.discounts
      }
      this.$store.dispatch('createData', {...this.data, api: 'discount', info: datas, turn: 'Customer', retcount: 0})
    }
  }
}
</script>
