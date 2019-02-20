<template>
    <!--v-btn color="primary darken-2" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
        <i aria-hidden="true" class="v-icon fa fa-wifi theme--dark"></i>
    </v-btn-->
    <div>
        <v-dialog v-model="dialogxx" max-width="500px">
            <v-btn slot="activator" color="red lighten-2" dark>
            {{wording}}
            </v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="SSID" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password" type="password"></v-text-field>
                            </v-flex>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-checkbox v-model="isIoT"></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Notifications</v-list-tile-title>
                                    <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default{
    data () {
        return {
            dialogxx: false,
            isIoT : false,
            wording : 'Open it'
        }
    }
}
</script>
<style>
</style>