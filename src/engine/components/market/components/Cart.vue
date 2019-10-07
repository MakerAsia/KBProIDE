<template>

    <v-card style="margin-top: 30px; margin-right: 15px">
        <v-list two-line subheader>
            <v-subheader inset>
                <h4 class="text-success-dark">
                    <i class="fa fa-shopping-bag"></i>
                    ตะกร้าสินค้า
                </h4>
            </v-subheader>

            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    avatar
                    @click=""
            >
                <v-list-tile-avatar>
                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <span>{{ item.subtitle }}</span>
                    </v-list-tile-sub-title>
                </v-list-tile-content>

                <div>
                    <input type="number" min="1" value="1" style="background-color: white; border: 1px solid #e0e0e0; text-align: center; width: 50px; margin-right: 10px; border-radius: 3px">
                    <i class="fa fa-remove text-danger" style="cursor: pointer"></i>
                </div>

            </v-list-tile>

            <p class="text-success-dark">ยอดทั้งหมด X,XXX บาท</p>

        </v-list>
    </v-card>

</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
        items: [
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product A", subtitle: "X,XXX บาท" },
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product B", subtitle: "X,XXX บาท" },
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product C", subtitle: "X,XXX บาท" }
        ],
        items2: [
          { icon: "assignment", iconClass: "blue white--text", title: "Vacation itinerary", subtitle: "Jan 20, 2014" },
          { icon: "call_to_action", iconClass: "amber white--text", title: "Kitchen remodel", subtitle: "Jan 10, 2014" }
        ]
      };
    }
  };
</script>
