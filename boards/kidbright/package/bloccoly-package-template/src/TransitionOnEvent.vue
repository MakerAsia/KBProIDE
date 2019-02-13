<template>
  <section class="transition-on-event-container">
    <vuetify-table :columns="columns"
                   :data="data"
                   :page="page"
                   :rows-per-page="rowsPerPage"
                   :total-elements="totalElements"
                   key-field="id"
                   @next="_handleClickNext"
                   @prev="_handleClickPrev"
                   @click-header="_handleClickHeader"
                   @page="_handleChangePage"
    > 
      <div class="table-caption pa-2 primary white--text" slot="table-caption">caption</div>
    </vuetify-table>
  </section>
</template>

<script>
  import Vue from 'vue'
  import VuetifyTable from './VuetifyTable'
  export default {
    data () {
      const columns = [
        { key: 'id', text: '아이디', width: 200, align: 'center' },
        { key: 'name', text: '이름', width: 100 },
        { key: 'servicePeriod.startAt', text: '시작일', width: 250 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'name', text: '이름', width: 100 },
        { key: 'servicePeriod.endAt', text: '종료일', width: 250 },
      ]

      const data1 = [
        { id: 1001, name: 'foo+++++++++++++++++++++++++++', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 1002, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 1003, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 1004, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 1005, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
      ]
      const data2 = [
        { id: 2001, name: 'foo----------------------', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 2002, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 2003, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 2004, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 2005, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
      ]
      const data3 = [
        { id: 3001, name: 'foo================================', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 3002, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 3003, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 3004, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
        { id: 3005, name: 'foo', servicePeriod: { startAt: '2018-07-01', endAt: '2018-07-31' } },
      ]
      return {
        columns,
        datum: [ data1, data2, data3 ],
        page: 1,
        totalElements: 15,
        rowsPerPage: 5,
        foldColumns: []
      }
    },
    methods: {
      _handleClickNext () {
        this.page = this.page + 1
      },
      _handleClickPrev () {
        this.page = this.page - 1
      },
      _handleClickHeader (header) {
        Vue.set(header, 'fold', header.fold === true ? false : true)
      },
      _handleChangePage (page) {
        this.page = page
      }
    },
    computed: {
      data () {
        return this.datum[this.page - 1]
      }
    },
    components: {
      VuetifyTable
    }
  }
</script>

<style scoped>
  .transition-on-event-container {
    position: relative;
    width: 100%;
  }
  .table-caption {
    display: flex;
    align-items: center;
    padding: 11px;
  }
</style>
