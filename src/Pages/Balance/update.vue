<template>
  <div class="asc__updatePage">
    <b-row class="asc__updatePage-header">
      <b-col cols="12" sm="6" md="6" class="pl-0">
        <h3 v-html="$t('router.balance', {val: getCustomer.title + ' - ' + getCustomer.code })" />
      </b-col>
      <!-- <b-col cols="12" sm="6" md="6" class="pr-0 text-right">
        <h3 class="d-inline-block">{{$t('Pincode.filter')}}</h3>
        <b-button variant="success" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 1)">{{ $t('Pincode.active') }}</b-button>
        <b-button variant="info" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 2)">{{ $t('Pincode.sold') }}</b-button>
        <b-button variant="warning" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 3)">{{ $t('Pincode.wrong') }}</b-button>
        <b-button variant="danger" size="sm" class="text-white asc__updatePage-header-Create" type="button" @click="pincodes(form.pin, 0)">{{ $t('Pincode.cancel') }}</b-button>
      </b-col> -->
    </b-row>
    <b-row class="asc__updatePage-body">
      <b-col cols="12" sm="12" md="12" lg="6" xl="4" class="mb-3">
        <b-card :title="$t('Balance.activeCredit')" class="shadow mb-3">
          <b-row>
            <!-- <b-col cols="12" md="6">
              <p class="text-center">{{ $t('Balance.paid') }} <span v-html="getCustomer.balanceCredit"></span></p>
            </b-col>
            <b-col cols="12" md="6">
              <p class="text-center">{{ $t('Balance.salesTotal') }}<span v-html="getCustomer.balanceCredit"></span></p>
            </b-col> -->
            <b-col cols="12" md="4">
              <p class="text-center">{{ $t('Balance.balance') }} <span v-html="getCustomer.balanceCredit"></span></p>
            </b-col>
            <b-col cols="12" md="4">
              <p class="text-center">{{ $t('Balance.beforebalance') }} <span class="bg-primary d-block mx-auto text-light rounded-sm py-1">{{getCustomer.before}}</span></p>
            </b-col>
            <b-col cols="12" md="4">
              <p class="text-center">{{ $t('Balance.creditLimit') }} <span class="bg-info d-block mx-auto text-light rounded-sm py-1">{{getCustomer.credit}}</span></p>
            </b-col>
            <div class="clearfix" />
            <b-col cols="12" md="6">
              <b-form-group :label="$t('Balance.activecredit')">
                <b-form-input type="text" v-model="activeCredit" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label=" ">
                <b-button variant="warning" size="sm" class="text-dark float-right asc__updatePage-header-Create" type="button" @click="submitCredit()">
                  <i class="fas fa-pencil-alt"></i> {{$t('form.updateCredit')}}
                </b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card :title="$t('Balance.balanceOperation')" class="shadow">
          <b-form-group :label="$t('Balance.type')" :class="$v.form.type.$error && !$v.form.type.required ? 'form-group--error' : ''">
            <v-select :options="allPaymentTypes" label="title" @input="selectedType" />
          </b-form-group>
          <b-form-group :label="$t('Balance.bank')" class="has-float-label" v-if="showBank">
            <v-select :options="allBanks" label="bankCode"  @input="selectedBank">
              <template slot="option" slot-scope="option">
                <b class="d-block">{{ option.title }}</b>
                <i>{{ option.code }}</i>
              </template>
            </v-select>
          </b-form-group>
          <b-row>
            <b-col cols="6">
              <b-form-group :label="$t('Balance.minPayment')" class="form-group--danger">
                <b-form-input type="text" v-model="addionalCredit" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group :label="$t('Balance.paymentAmount')" :class="$v.form.recharge.$error && !$v.form.recharge.required ? 'form-group--error' : ''">
                <b-form-input type="text" v-model.trim="$v.form.recharge.$model" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group :label="$t('Balance.remarks')" class="has-float-label">
            <b-form-input type="text" v-model="form.remark"/>
          </b-form-group>
          <b-form-group :label="$t('Balance.arrivalDate')">
            <b-form-datepicker id="example-datepicker" v-model="form.arrivalDate" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <b-form-group v-if="getCustomer">
            <h5 v-html="$t('Balance.submitDanger', {val: getCustomer.title, code: getCustomer.code})" class="text-center"/>
          </b-form-group>
          <b-button variant="success" size="sm" class="text-white float-right asc__updatePage-header-Create" type="button" @click="submitForm()">
            <i class="far fa-check-square"></i> {{$t('form.submit')}}
          </b-button>
        </b-card>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="8" class="mb-3">
        <b-card class="shadow mb-3">
          <h4 class="card-title float-left">{{$t('Balance.customerNote')}}</h4>
          <b-button @click="addNote()" type="button" class="float-right btn-sm" variant="primary" squared>{{ $t('Balance.save')}}</b-button>
          <textarea class="form-control" rows="4" v-model="customerNote"></textarea>
        </b-card>
        <b-card :title="$t('Balance.allBalances')" class="shadow mb-3">
          <b-table striped hover small="" :items="allBalances" :fields="fields">
            <template v-slot:cell(status)="data">
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-danger" v-if="data.value == 0">{{$t('Balance.cancel')}}</span>
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-success" v-if="data.value == 1">{{$t('Balance.inbank')}}</span>
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-warning" v-else-if="data.value == 2">{{$t('Balance.arrived')}}</span>
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-info" v-else-if="data.value == 3">{{$t('Balance.waiting')}}</span>
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-warning" v-else-if="data.value == 4">{{$t('Balance.Gutschrift')}}</span>
              <span class="btn btn-sm d-block text-center mx-auto mb-0 rounded-sm py-0 btn-success" v-else-if="data.value == 5">{{$t('Balance.credit')}}</span>
            </template>
            <template v-slot:cell(id)="data">
              <b-button v-b-modal="'transactionmodal'" @click="balanceId(data.value)">
                <i class="fas fa-cog" />
              </b-button>

              <!-- <b-dropdown :id="'dropdown-' + data.value" :text="$t('Balance.change')" right variant="primary" class="m-0" size="sm">
                <b-dropdown-item @click="changeStatus(data.value, 1)">{{ $t('Pincode.active') }}</b-dropdown-item>
                <b-dropdown-item @click="changeStatus(data.value, 3)">{{ $t('Pincode.wrong') }}</b-dropdown-item>
                <b-dropdown-item @click="changeStatus(data.value, 0)">{{ $t('Pincode.cancel') }}</b-dropdown-item>
              </b-dropdown> -->
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <BalanceModal :data="getCustomer" :balance="balanceData" />
  </div>
</template>
<script>
import BalanceModal from '../../components/BalanceModal'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    BalanceModal
  },
  data () {
    return {
      token: this.$route.params.token,
      balanceData: null,
      form: {
        type: '',
        bank: '',
        recharge: '',
        arrivalDate: '',
        remark: '',
        status: 3
      },
      fields: [
        { key: 'recharge', label: this.$t('Balance.recharge'), sortable: true },
        { key: 'paid', label: this.$t('Balance.paid'), sortable: true },
        { key: 'statusType', label: this.$t('Balance.type'), sortable: true },
        { key: 'bankName', label: this.$t('Balance.bank'), sortable: true },
        { key: 'arrival_date', label: this.$t('Balance.arrival_date'), sortable: true },
        { key: 'paid_date', label: this.$t('Balance.paid_date'), sortable: true },
        { key: 'remark', label: this.$t('Balance.remark'), sortable: true },
        { key: 'comment', label: this.$t('Balance.comment'), sortable: true },
        { key: 'status', label: this.$t('Balance.status'), sortable: true },
        { key: 'id', label: this.$t('Balance.operation'), sortable: true }
      ],
      customerNote: '',
      showBank: true,
      addionalCredit: '',
      activeCredit: ''
    }
  },
  watch: {
    getCustomer: function (e) {
      this.customerNote = e.note
      this.activeCredit = e.credit_limit
      this.addionalCredit = this.activeCredit - this.getCustomer.credit
    },
    returnCount: function (e) {
      console.log(e + ' balance listesini getir')
      this.customer(this.token)
      this.balance(this.token)
    }
  },
  computed: {
    ...mapState(['getCustomer', 'returnCount', 'allPaymentTypes', 'allBanks', 'allBalances', 'returnLog'])
  },
  mounted () {
    this.paymentTypes('7b87b37c')
    this.bank()
    this.customer(this.token)
    this.balance(this.token)
    this.brands('b03fa0c1')
  },
  methods: {
    paymentTypes (e) {
      this.$store.dispatch('getPaymentTypes', {...this.data, param: `?type=${e}`})
    },
    bank () {
      this.$store.dispatch('getBanks', {...this.data, param: '?'})
    },
    customer (e) {
      this.$store.dispatch('showCustomer', {...this.data, param: e})
    },
    balanceId (e) {
      this.balanceData = e
    },
    balance (e) {
      let between = '2000-01-01,2050-12-31'
      this.$store.dispatch('getBalance', {...this.data, param: `?token=${e}&between=${between}`})
    },
    brands (e) {
      this.$store.dispatch('getBrands', {...this.data, param: `?type=${e}`})
    },
    submitCredit () {
      let datas = {
        status: 1,
        credit: this.activeCredit
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'customer', id: this.token, info: datas, retcount: 4 })
    },
    addNote () {
      let datas = {
        status: 1,
        note: this.customerNote
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'customer', id: this.token, info: datas, retcount: 4 })
    },
    submitBalance () {
      let datas = {
        customer: this.token,
        type: this.form.type,
        bank: this.form.bank,
        recharge: this.form.recharge,
        arrival_date: this.form.arrivalDate,
        remark: this.form.remark,
        status: this.form.status
      }

      let a = this.activeCredit - this.getCustomer.credit_limit
      let b = this.form.recharge
      if (a < b) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Balance.inCreditLimit'), type: 'info'})
      } else if (a == b) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Balance.additionalCreditReset'), type: 'info'})
      } else if (a > b){
        let c = a - b
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('Balance.missingPayment', {val: c}), type: 'info'})
      }
      this.$store.dispatch('createData', {...this.data, api: 'balance', info: datas, turn: 'Customer', retcount: 0})
    },
    submitForm () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.fillRequired'), type: 'warning'})
      } else {
        this.$store.dispatch('showAlert', {...this.e, msg: this.$t('form.pleaseWait'), type: 'info'})
        this.submitBalance()
      }
    },
    changeStatus (i, s) {
      let datas = {
        status: s
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'balance', id: i, info: datas, retcount: 4 })
    },
    showSuccess (file, response) {
      this.errorMsg = response.message
      this.errors = response.errors
      this.$store.dispatch('showAlert', {...this.e, msg: response.message, type: 'info'})
      this.pincodes(this.form.pin, 1)
    },
    selectedType (e) {
      this.form.type = e.level
      switch (e.level) {
        case '401':
          this.showBank = true
          this.form.status = 3
          break
        case '402':
          this.showBank = true
          this.form.status = 3
          break
        case '403':
          this.showBank = true
          this.form.status = 4
          break
        case '404':
          this.showBank = true
          this.form.status = 3
          break
        case '405':
          this.showBank = false
          this.form.bank = 1
          this.form.status = 5
          break
        default:
          this.showBank = true
          break
      }
    },
    selectedBank (e) {
      this.form.bank = e.id
    }
  },
  validations () {
    return {
      form: {
        recharge: { required },
        type: { required }
      }
    }
  }
}
</script>
