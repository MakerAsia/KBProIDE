<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="settingDialog = true">
            <v-icon dark>fa-wifi</v-icon>
            </v-btn>
            
            <span>Setup board</span>
        </v-tooltip>
        
        <v-dialog v-model="settingDialog" max-width="500px">            
            <v-card>
                <v-card-title>
                    <span class="headline">Setup board</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                              <v-subheader class="pa-0 mb-2">Board setting</v-subheader>
                                <v-combobox
                                  v-model="select"
                                  :items="items"
                                  label="Select a favorite activity or create a new one"
                                ></v-combobox>
                            </v-flex>                          
                          
                            <v-flex xs12>
                               <v-subheader class="pa-0 mb-2">WiFi setting</v-subheader>
                               <v-text-field 
                                    v-model="ssid"
                                    label="SSID"                               
                                    hint="WiFi SSID name to connect"
                                    counter
                                    maxlength="32"
                                    clearable
                                    ></v-text-field>
                            </v-flex>
                          <v-divider></v-divider>
                            <v-flex xs12>
                                <v-text-field 
                                    v-model="password"
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
                                v-model="enale_iot" 
                                :label="`Enable IoT : ${enale_iot? 'ON' : 'OFF'}`">
                            </v-switch>                            
                        </v-layout>                        
                    </v-container>                    
                </v-card-text>                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="settingDialog = false">Close</v-btn>                    
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default{
    data () {
        return {
             select: 'Programming',
            items: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify'
            ],
            comport : 'COM5',
            ssid:'fdfd',
            password:'sss',
            enale_iot : false,
            showPassword : false,
            wifiDialog: false,
        }
    }
}
</script>
<style>
</style>