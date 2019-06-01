<template>
    <div>
        <el-popover
                ref="popo_save_img"
                placement="top"
                width="240"
                v-model="pop_s_i_visible">
            <el-row>
                <el-col :span="24">
                    <el-input type="text" size="mini" v-model="filename" auto-complete="off">
                        <template slot="prepend">Name:</template>
                        <template slot="append">.png</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="bm-0">
                <el-col :span="12">
                    <!--<el-input type="number" size="mini" v-model="dpi" min="96" :max="max_dpi" auto-complete="off">-->
                        <!--<template slot="prepend">DPI:</template>-->
                    <!--</el-input>-->
                </el-col>
                <el-col :span="12">
                    <el-button size="mini" type="danger"  @click="pop_s_i_visible=false">Cancel</el-button>
                    <el-button type="primary" size="mini" @click="canvas2png" :disabled="dpi>max_dpi">OK</el-button>
                </el-col>
            </el-row>
        </el-popover>
        <el-button v-popover:popo_save_img type="info" size="mini" @click="pop_open">SAVE AS IMAGE</el-button>
    </div>
</template>
<script>
    export default{
        data: function () {
            return {
                default_dpi: 96,
                dpi: 96,
                max_dpi:960,
                filename: "",
                pop_s_i_visible: false
            }
        },
        props: {
            canavas_ref: {
                type: String,
                required: true
            }
        },
        computed: {

        },
        methods: {
            pop_open:function(){
                this.filename = (new Date().getTime()).toString(36);
            },
            canvas2png: function () {
                var canvas=document.getElementById(this.canavas_ref);
                var dataurl = canvas.toDataURL("image/png");
                this.download_ex(dataurl, this.filename);
                this.pop_s_i_visible = false;
            },
            download_ex: function (dataurl, filename) {
                var a = document.createElement("a");
                a.href = dataurl;
                a.setAttribute("download", filename);
                var b = document.createEvent("MouseEvents");
                b.initEvent("click", false, true);
                a.dispatchEvent(b);
                return false;
            }
        }
    }
</script>