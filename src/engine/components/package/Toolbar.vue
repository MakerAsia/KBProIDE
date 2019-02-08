<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.addRightTab('package','Test tab','./components/setting/RightDrawer')">
        <v-icon dark>fa-archive</v-icon>
        </v-btn>
        <span>Package Manager</span>
    </v-tooltip>
</template>

<script>

</script>