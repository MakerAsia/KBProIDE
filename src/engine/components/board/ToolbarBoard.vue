<template>
    <v-tooltip bottom>
        <v-btn slot="activator" icon @click.native="$global.ui.snackbar('Hello world')"> 
        <v-icon dark>fa-microchip</v-icon>
        </v-btn>
        <span>Board Manager</span>
    </v-tooltip>
</template>

<script>


</script>