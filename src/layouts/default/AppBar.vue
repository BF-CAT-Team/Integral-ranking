<template>
  <header class="bg-primary">
    <v-toolbar color="primary" elevation="0" class="content" border="10px">
      <template v-slot:prepend>
        <v-toolbar-items class="hidden-md hidden-lg hidden-xl hidden-xxl">
          <v-app-bar-nav-icon @click="drawer = true" class="mr-2"></v-app-bar-nav-icon>
          <v-navigation-drawer v-model="drawer" temporary>
            <v-list density="comfortable" nav>
              <v-list-item :title="$t('achievements.title')" value="achievements" :to="{path:'/achievements'}"></v-list-item>
              <v-list-item :title="$t('season.title')" value="season" :to="{path:'/season'}"></v-list-item>
              <v-list-item :title="$t('helps.title')" value="helps" :to="{path:'/helps'}"></v-list-item>
              <v-divider></v-divider>
              <ThemeView></ThemeView>
            </v-list>
          </v-navigation-drawer>
        </v-toolbar-items>

        <img src="/src/assets/images/game-logo.png" class="hidden-xs hidden-sm" height="20">

        <svg style="width: 20px" t="1599670208146" class="icon hidden-xs hidden-sm" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" p-id="6842" width="12" height="12">
          <path
              d="M952.311 921.329l-409.418-410.41 407.261-408.248c8.53-8.551 8.53-22.416 0-30.967-8.532-8.552-22.36-8.552-30.892 0L511.999 479.952 104.737 71.704c-8.53-8.552-22.362-8.552-30.892 0-8.53 8.552-8.53 22.417 0 30.967L481.107 510.92 71.687 921.33c-8.529 8.551-8.529 22.416 0 30.967a21.755 21.755 0 0 0 15.448 6.413c5.59 0 11.181-2.139 15.446-6.413L512 541.886l409.419 410.41a21.755 21.755 0 0 0 15.446 6.413c5.592 0 11.18-2.139 15.447-6.413 8.53-8.55 8.53-22.417 0-30.967z"
              fill="#f2f2f2"></path>
        </svg>

        <div class="hidden-xs hidden-sm">
          <div style="line-height: .5px; margin-top: 10px"><b>ROBOT</b></div>
          <a href="https://www.bfvrobot.net/" target="_new" class="text-decoration-none text-shades-white">
            <span class="text-subtitle-2" style="opacity: .5;">bfvrobot.net<v-icon size="12">mdi-export-variant</v-icon></span>
          </a>
        </div>

        <svg style="width: 20px" t="1599670208146" class="icon hidden-xs hidden-sm" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" p-id="6842" width="12" height="12">
          <path
              d="M952.311 921.329l-409.418-410.41 407.261-408.248c8.53-8.551 8.53-22.416 0-30.967-8.532-8.552-22.36-8.552-30.892 0L511.999 479.952 104.737 71.704c-8.53-8.552-22.362-8.552-30.892 0-8.53 8.552-8.53 22.417 0 30.967L481.107 510.92 71.687 921.33c-8.529 8.551-8.529 22.416 0 30.967a21.755 21.755 0 0 0 15.448 6.413c5.59 0 11.181-2.139 15.446-6.413L512 541.886l409.419 410.41a21.755 21.755 0 0 0 15.446 6.413c5.592 0 11.18-2.139 15.447-6.413 8.53-8.55 8.53-22.417 0-30.967z"
              fill="#f2f2f2"></path>
        </svg>

        <router-link :to="{path:'/'}" class="text-decoration-none text-shades-white">
          <v-icon icon="mdi-trophy" color="#FFC107"></v-icon>
          <b>{{ $t('header.title') }}</b>
        </router-link>

        <v-chip class="ms-2">
          Beta
        </v-chip>
      </template>

      <!--      <v-divider class="ms-5" inset vertical></v-divider>-->
      <!--      <v-toolbar-title></v-toolbar-title>-->

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs hidden-sm">
        <v-btn variant="text" :to="{path:'/achievements'}">{{ $t('achievements.title') }}</v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn variant="text" :to="{path:'/season'}">{{ $t('season.title') }}</v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn variant="text" :to="{path:'/assist'}">{{ $t('helps.title') }}</v-btn>
        <v-divider inset vertical></v-divider>
        <v-row justify="center" align="center" class="ma-1">
          <ThemeView></ThemeView>
        </v-row>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <Lantern></Lantern> -->
  </header>
</template>

<script lang="ts">

import ThemeView from "@/components/ThemeView.vue";
// import Lantern from "@/components/Lantern.vue";

export default {
  // components: {Lantern, ThemeView},
  components: {ThemeView},
  data() {
    return {
      drawer: false
    }
  }
}
</script>
