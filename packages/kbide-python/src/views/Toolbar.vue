<template>
    <v-toolbar
            color="primary"
            fixed
            dark
            app
            height="64px"
    >
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <img v-on="on" src="/static/logo/KBIDE.png" height="45"
                     alt="Problem? report me at fb.com/comdet"
                     class="mr-3"
                     style="border-radius: 8px; background-color: #ffffffa8; //margin-top: 4px;">
            </template>
            <span>KBIDE by MakerAsia</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <img v-on="on" src="/static/logo/kidcom_128.png" height="45"
                     alt="KidBright Community"
                     class="mr-2"
                     style="border-radius: 8px; background-color: rgba(255, 255, 255, 0.8); //margin-top: 4px;">
            </template>
            <span>KidBright Community</span>
        </v-tooltip>

        <!-- dynamic left toolbar -->

        <v-divider class="mx-1" inset vertical></v-divider>
        <h3>KBIDE Python Mode</h3>
        <!-- load board package toolbar -->

        <!-- load board package toolbar -->


        <v-spacer></v-spacer>

        <!-- load app package actionbar -->
    </v-toolbar>
</template>
