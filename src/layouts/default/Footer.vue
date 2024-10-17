<script lang="ts">
import ThemeView from "@/components/ThemeView.vue"
import LanguageView from "@/components/LanguageView.vue";

export default {
  components: {LanguageView, ThemeView},
  created() {
    // this.locale.value = this.$vuetify.locale.current || lang.default
  },
  watch: {
    'locale.current': {
      handler(value) {
        this.locale.value = value;
        this.changeLanguage(value)
      }
    }
  },
  methods: {
    /**
     * 更变本地语言
     * @param locale
     */
    changeLanguage(locale: string) {
      current.value = locale
      // this.$vuetify.locale.current = locale
    }
  }
}
</script>

<template>
  <v-divider></v-divider>
  <footer>
    <v-container class="content">
      <v-row>
        <v-col xs="12" sm="6" md="6" lg="3" class="hidden-xs hidden-sm">
          <b class="mb-2 d-block">{{ $t('footer.about')}}🏆</b>
          <p>{{$t('footer.aboutDescription')}}</p>
        </v-col>
        <v-col xs="12" sm="6" md="6" lg="3">
          <b class="mb-2 d-block">{{$t('footer.community')}}</b>
          <ul>
            <li><a href="//kook.top/kakJdz" target="_blank" class="text-decoration-none">KOOK社区<v-icon size="15">mdi-export-variant</v-icon></a></li>
          </ul>
        </v-col>
        <v-col xs="12" sm="6" md="6" lg="3">
          <b class="mb-2 d-block">{{$t('footer.links')}}</b>
          <ul>
            <li><a href="//bfban.com" target="_blank" class="text-decoration-none">联BAN<v-icon size="15">mdi-export-variant</v-icon></a></li>
            <li><a href="https://www.bfvrobot.net/" target="_blank" class="text-decoration-none">BFV ROBOT<v-icon size="15">mdi-export-variant</v-icon></a></li>
            <li><a href="//bfvhackers.com" target="_blank" class="text-decoration-none">BFV HACKERS<v-icon size="15">mdi-export-variant</v-icon></a></li>
          </ul>
        </v-col>
        <v-col xs="12" sm="6" md="6" lg="3">
          <b class="mb-2 d-block">{{ $t('footer.language') }}</b>
          <LanguageView></LanguageView>
        </v-col>
      </v-row>
    </v-container>
    <br>
    <v-divider></v-divider>

    <div class="px-4 py-2 text-center bg-black w-100">
      2023-{{ new Date().getFullYear() }} <strong>🦖🦈🐧</strong>
      <p style="text-align: center;">Website By
        <a href="//bfban.com" target="_blank" class="text-decoration-none text-shades-white">Fishbat627</a> |
        <a href="//b1397kb.com" target="_blank" class="text-decoration-none text-shades-white">B1397KB</a> |
        <a href="//www.alongsir.cn" target="_blank" class="text-decoration-none text-shades-white">htaccessCN</a> |
        <a href="https://www.bfvrobot.net/" target="_blank" class="text-decoration-none text-shades-white">Cabbagelol</a>
      </p>
    </div>
    <!--51LA-->
  </footer>
</template>

<style scoped>
footer {
  padding-top: 30px;
}
</style>
