<template>
  <div class="asc__updatePage">
    <b-modal :id="'transactionmodal'" :ref="'transactionmodal'" :title="data.title + ' - ' + data.code + ' ' + $t('Balance.balanceOperation')">
      <b-form-group :label="$t('Balance.paid_date')">
        <b-form-datepicker id="example-datepicker" v-model="form.paidDate" class="mb-2"></b-form-datepicker>
      </b-form-group>
      <b-form-group :label="$t('Balance.bank')" class="has-float-label">
        <v-select :options="allBanks" label="bankCode"  @input="selectedBank">
          <template slot="option" slot-scope="option">
            <b class="d-block">{{ option.title }}</b>
            <i>{{ option.code }}</i>
          </template>
        </v-select>
      </b-form-group>
      <b-form-group :label="$t('Balance.comment')" class="has-float-label">
        <b-form-input type="text" v-model="form.comment"/>
      </b-form-group>
      <b-form-group :label="$t('Balance.status')" class="has-float-label">
        <v-select :options="statuses" label="label"  @input="selectedStatus" />
      </b-form-group>
      <template slot="modal-footer">
        <b-button variant="danger" size="sm" squared @click="hideModal()">Cancel</b-button>
        <b-button variant="success" squared @click="submitForm()">Submit</b-button>
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
        bank: '',
        paidDate: '',
        status: null,
        comment: ''
      },
      statuses: [
        {id: 0, label: this.$t('Balance.cancel')},
        {id: 1, label: this.$t('Balance.inbank')},
        {id: 2, label: this.$t('Balance.arrived')},
        {id: 3, label: this.$t('Balance.waiting')},
        {id: 4, label: this.$t('Balance.Gutschrift')},
        {id: 5, label: this.$t('Balance.credit')}
      ]
    }
  },
  props: ['data', 'balance'],
  watch: {
    returnCount: function (e) {
      console.log(e + ' modal kapansın')
      this.$store.commit('setReturn', 4)
      this.hideModal()
    }
  },
  computed: {
    ...mapState(['allBanks', 'returnCount'])
  },
  mounted() {
    this.bank()
  },
  methods: {
    bank () {
      this.$store.dispatch('getBanks', {...this.data, param: '?'})
    },
    customer (e) {
      this.$store.dispatch('showCustomer', {...this.data, param: e})
    },
    selectedBank (e) {
      this.form.bank = e.id
    },
    selectedStatus (e) {
      this.form.status = e.id
    },
    submitForm () {
      let datas = {
        bank: this.form.bank,
        paid_date: this.form.paidDate,
        comment: this.form.comment,
        status: this.form.status
      }
      this.$store.dispatch('updateData', { ...this.data, api: 'balance', id: this.balance, info: datas, retcount: 3 })

    },
    hideModal () {
      this.$refs['transactionmodal'].hide()
    },
  //   showModal(refname, dataId) {
  //     this.$refs['transactionmodal'].show()
  //     this.updateId = dataId
  //     this.updateToken = refname
  //   },
  //   updateForm() {
  //     axios.put(`${apiLink}balance/${this.updateId}`, {
  //       user: localStorage.getItem('userToken'),
  //       bank: this.formSelectedBank.id,
  //       paid_date: this.formPaidDate,
  //       comment: this.formComment,
  //       status: this.statusState
  //     })
  //   }
  }
}
</script>
