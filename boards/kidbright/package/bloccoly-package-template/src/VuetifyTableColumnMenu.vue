<template>
  <v-menu transition="slide-y-transition" bottom :close-on-content-click="false" :max-height="500">
      <v-btn slot="activator" class="ma-0" flat>
        컬럼 표시 설정 {{activeColumns.length}}/{{columns.length}}
        <v-icon small right>settings</v-icon>
      </v-btn>
      <v-list style="width: 200px">
        <v-list-tile v-for="(column, i) in columns" :key="i" @click="_handleClickColumn(column)">
          <v-list-tile-action>
            <v-checkbox v-model="column.display" readonly/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="column.text"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="column.fold">
            <v-icon class="fold-icon" small>unfold_less</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
  import Vue from 'vue'
  export default {
    mounted () {
      this.columns.forEach(v => {
        if (v.display === null || v.display === undefined) {
          Vue.set(v, 'display', true)
        }
      })
    },
    data () {
      return {}
    },
    props: {
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      name: {
        type: String,
        default: null
      }
    },
    methods: {
      _handleClickColumn (column) {
        column.display = column.display === true ? false : true
      }
    },
    computed: {
      activeColumns () {
        return this.columns.filter(v => v.display)
      }
    },
    watch: {
      columns: {
        handler () {
          this.columns.forEach(v => {
            if (v.display === null || v.display === undefined) {
              Vue.set(v, 'display', true)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .fold-icon {
    transform: rotate(90deg);
  }
</style>