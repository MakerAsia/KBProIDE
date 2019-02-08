<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
            <v-icon dark>fa-gear</v-icon>
        </v-btn>
        <span>Setting</span>
    </v-tooltip>
</template>