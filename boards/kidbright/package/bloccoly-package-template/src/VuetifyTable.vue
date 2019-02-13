<template>    
  <v-btn color="primary darken-2" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
    <v-icon>fa-file-text-o</v-icon>
  </v-btn>
</template>

<script>
export default{
    data () {
        return {
            message: 'Compile'
        }
    }
}
</script>
<style>
</style>