<script lang="ts">
import help from "/public/config/helps.json"

export default {
  data() {
    return {
      helps: help,
    }
  }
}
</script>

<template>
  <v-main>
    <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}},
        {title: $t('helps.title'),disabled: true}]" density="comfortable" class="content">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-divider></v-divider>

    <v-container class="content mt-5 mb-5">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
            v-for="(i,index) in helps.child"
            :key="index">
          <v-expansion-panel-title>
            <b>{{ i.Q }}</b>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="assist-content" v-html="i.A"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-main>
</template>

<style scoped>
.assist-content {
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>
