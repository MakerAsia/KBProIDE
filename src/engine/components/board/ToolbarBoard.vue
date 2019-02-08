<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.snackbar('Hello world')"> 
        <v-icon dark>fa-microchip</v-icon>
        </v-btn>
        <span>Board Manager</span>
    </v-tooltip>
</template>

<script>


</script>