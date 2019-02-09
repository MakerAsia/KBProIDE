<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
            <v-icon dark>fa-folder-open</v-icon>
        </v-btn>
        <span>Open file</span>
    </v-tooltip>
</template>