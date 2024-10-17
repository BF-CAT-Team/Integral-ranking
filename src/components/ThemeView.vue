<script setup lang="ts">
import {useTheme} from 'vuetify'
import {storage} from "@/assets/js";

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  storage.set('theme', theme.global.name.value);
}
</script>

<template>
  <div @click="toggleTheme">
    <v-chip class="ma-2">
      <v-icon r>mdi-theme-light-dark</v-icon>
    </v-chip>
  </div>
</template>

<style scoped>

</style>
