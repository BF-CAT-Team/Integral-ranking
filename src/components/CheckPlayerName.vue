<script lang="ts">
import Application from "@/assets/js/application";

export default new Application({
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasUserName() {
      return this.allUser.filter(i => i.username == this.username).length > 0
    }
  }
})
</script>

<template>
  <div>
    <template v-if="hasUserName">
      <v-chip class="mr-1">{{ username }}</v-chip>
      <v-chip color="red" class="hidden-sm-and-down">我</v-chip>
    </template>
    <template v-else>
      {{ username }}
    </template>
  </div>
</template>

<style scoped>

</style>
