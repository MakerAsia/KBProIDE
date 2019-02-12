<template>
    <v-tooltip bottom>
        <v-btn slot="activator" icon @click.native="$global.ui.addRightTab('package','Test tab','./components/setting/RightDrawer')">
        <v-icon dark>fa-archive</v-icon>
        </v-btn>
        <span>{{message}}</span>
    </v-tooltip>
</template>

<script>
export default{
    data () {
        return {
            message: 'Setting Wifi'
        }
    }
}
</script>
<style>
</style>