<script setup lang="ts">
import lang from '@/../public/config/langs.json'
import {useLocale} from 'vuetify'
import {storage} from "@/assets/js";

const {current} = useLocale()

function changeLocale(locale) {
  storage.set('lang', locale)
  current.value = locale
}
</script>

<template>
  <v-select
      v-model="$vuetify.locale.current"
      @update:modelValue="changeLocale"
      density="compact"
      variant="solo"
      item-title="label"
      item-value="value"
      persistent-hint
      :items="lang.child">
  </v-select>
</template>

<style scoped>

</style>
