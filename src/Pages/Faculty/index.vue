<template>
  <b-table responsive striped hover :items="tableData" :fields="rows" size="sm">
    <template v-slot:cell(id)="cell">
      <router-link :to="{name: 'Department', params: {faculty: cell.item.id}}" v-b-tooltip.hover :title="$t('list.departments')"><i class="fas fa-eye"></i></router-link>
    </template>
  </b-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      routeName: this.$route.name,
      selectedRow: '',
      rows: [
        {key: 'universityName', label: 'Faculty.universityName'},
        {key: 'title', label: 'Faculty.title'},
        {key: 'id', label: 'Faculty.id'},
      ]
    }
  },
  computed: {
    ...mapState(['tableData', 'tableRows', 'tableActions', 'tableRows'])
  },
  watch: {
    '$route' (to) {
      this.getData('faculty')
    }
  },
  mounted () {
    this.getData('faculty')
    this.setRows()
  },
  methods: {
    setRows () {
      this.$store.commit('setTableRows', this.rows)
    },
    getData (e) {
      this.$store.dispatch('getTableData', { ...this.data, link: e })
    }
  }
}
</script>
