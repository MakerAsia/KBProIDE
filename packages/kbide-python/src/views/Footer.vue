<template>
<v-footer height="23" style="z-index: 99999" min-height="10" class="grey lighten-3">
    <v-layout row wrap>
        <v-flex xs4>
            <v-card>
                <v-card-text class="px-0 text-xs-left pl-3 pt-0 pb-0 ma-0">
                    <v-icon>fa-microchip</v-icon>
                    <span class="caption">
                            KBIDE Python Mode
                        </span>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs2>
            <v-card>
                <v-card-text class="px-0 text-xs-center pa-0 ma-0">
                        <span class="caption">

                        </span>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card>
                <v-card-text class="px-0 text-xs-right pr-3 pt-0 pb-0 ma-0">
                    <v-icon>fa-puzzle-piece</v-icon>
                    <span class="caption">
                            &nbsp;&nbsp;{{editorStatus}}
              </span>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-footer>
</template>
