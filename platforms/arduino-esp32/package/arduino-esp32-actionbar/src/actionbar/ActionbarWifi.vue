<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="wifiDialog = true">
            <v-icon dark>fa-wifi</v-icon>
            </v-btn>
            <span>Setup WiFi connect</span>
        </v-tooltip>
        
        <v-dialog v-model="wifiDialog" max-width="500px">            
            <v-card>
                <v-card-title>
                    <span class="headline">Setup WiFi connect</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field 
                                    v-model="$global.board.package['kidbright-actionbar'].wifi_ssid"
                                    label="SSID"                                     
                                    hint="WiFi SSID name to connect"
                                    counter
                                    maxlength="32"
                                    clearable
                                    ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field 
                                    v-model="$global.board.package['kidbright-actionbar'].wifi_password"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    label="Password"
                                    hint="WiFi password"
                                    maxlength="64"
                                    @click:append="showPassword = !showPassword"
                                    clearable
                                    ></v-text-field>
                            </v-flex>
                            <v-switch 
                                v-model="$global.board.package['kidbright-actionbar'].enable_iot" 
                                :label="`Enable IoT : ${$global.board.package['kidbright-actionbar'].enable_iot ? 'ON' : 'OFF'}`">
                            </v-switch>                            
                        </v-layout>                        
                    </v-container>                    
                </v-card-text>                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="wifiDialog = false">Close</v-btn>                    
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default{
    data () {
        return {
            showPassword : false,
            wifiDialog: false,
        }
    }
}
</script>
<style>
</style>