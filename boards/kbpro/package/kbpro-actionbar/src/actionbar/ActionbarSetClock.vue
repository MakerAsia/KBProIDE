<template>
    <v-btn color="primary darken-2" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
        <i aria-hidden="true" class="v-icon fa fa-clock-o theme--dark"></i>
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