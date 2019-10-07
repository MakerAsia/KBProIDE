<template>

    <v-card>
        <v-img
                src="https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                style="object-fit: contain; width: 100%; height: 250px;"
        ></v-img>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0 text-xs-left" style="font-weight: 500">
                    {{ data.title }}
                </h3>
                <div class="text-xs-left" style="padding-top: 10px"> {{ data.description }}</div>
                <div class="text-xs-left" style="padding-top: 15px">
                        <span>
                            โดย
                            <span style="font-weight: 500">{{ data.author }}</span>
                        </span>
                    <p style="padding-bottom: 0; margin-bottom: 0">
                        วันที่เพิ่มสินค้า {{ data.created_at }}
                    </p>
                </div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-flex class="text-xs-left">
                <span class="text-danger">มีสินค้า {{ data.stock }} ชิ้น</span>
            </v-flex>
            <v-flex class="text-xs-right">
                <v-btn color="success">
                    <i class="fa fa-shopping-bag"></i>&ensp;
                    <span>
                            {{ data.price }} บาท
                        </span>
                </v-btn>
            </v-flex>
        </v-card-actions>
    </v-card>

</template>

<script>
  export default {
    name: "Product",
    props: ["data"]
  };
</script>
