<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.addBottomTab('serial-monitor','Serial Monitor','SerialMonitor')">
            <v-icon dark>fa-terminal</v-icon>
        </v-btn>
        <span>Serial Monitor</span>
    </v-tooltip>
</template>
<script>
  export default {
    name: "ActionbarSerial",
  };
</script>
