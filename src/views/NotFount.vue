<script lang="ts">

import {defineComponent} from "vue";
import DefaultFooter from "@/layouts/default/Footer.vue";
import DefaultBar from "@/layouts/default/AppBar.vue";

export default defineComponent({
  components: {DefaultBar, DefaultFooter}
})
</script>

<template>
  <v-app>
    <default-bar/>

    <v-main class="content">
      <h1>Not Fount</h1>
      <p>啊咧，好像走丢了！</p>
    </v-main>

    <default-footer/>
  </v-app>
</template>

<style scoped>

</style>
