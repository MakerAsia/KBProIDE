<template>
    <v-tooltip bottom>
        <v-btn slot="activator" icon @click.native="$global.ui.addBottomTab('plugin','Test tab2','./components/plugin/RightDrawer')">
        <v-icon dark>fa-plug</v-icon>
        </v-btn>
        <span>Plugin Manager</span>
    </v-tooltip>
</template>

<script>

</script>