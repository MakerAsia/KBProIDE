<template>
  <section>
    <vuetify-table :columns="columns"
                   :data="data"
                   :page="page"
                   :rows-per-page="rowsPerPage"
                   :total-elements="totalElements"
                   key-field="id"
                   @next="_handleClickNext"
                   @prev="_handleClickPrev"
    />
    <v-btn @click="addColumn">add</v-btn>
  </section>
</template>

<script>
  export default {
    data () {
      const columns = [
        {key: 'id', text: '아이디', width: 200, align: 'center', type: 'currency' },
        {key: 'name', text: '이름', width: 100},
        {key: 'servicePeriod.startAt', text: '시작일', width: 250},
        {key: 'servicePeriod.endAt', text: '종료일', width: 250},
      ]
      const data = [
        {id: 3001, name: 'foo', servicePeriod: {startAt: '2018-07-01', endAt: '2018-07-31'}},
        {id: 3002, name: 'foo', servicePeriod: {startAt: '2018-07-01', endAt: '2018-07-31'}},
        {id: 3003, name: 'foo', servicePeriod: {startAt: '2018-07-01', endAt: '2018-07-31'}},
        {id: 3004, name: 'foo', servicePeriod: {startAt: '2018-07-01', endAt: '2018-07-31'}},
        {id: 3005, name: 'foo', servicePeriod: {startAt: '2018-07-01', endAt: '2018-07-31'}},
      ]
      return {
        columns,
        data,
        page: 1,
        totalElements: 15,
        rowsPerPage: 5
      }
    },
    methods: {
      _handleClickNext () {
        this.page = this.page + 1
      },
      _handleClickPrev () {
        this.page = this.page - 1
      },
      addColumn () {
        const columns = this.columns
        columns.unshift({ key: 'checkbox', text: 'checkbox', type: 'checkbox', value: false })
        this.columns = columns
      }
    }
  }
</script>

<style scoped>

</style>