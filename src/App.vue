<template>
  <v-theme-provider with-background>
<!--    <div class="hidden-md hidden-lg hidden-xl hidden-xxl">-->
<!--      <v-alert class="ml-1 mr-1 mt-1">-->
<!--        <v-alert-title>什么太小了!不可以!</v-alert-title>-->
<!--        可恶，开发者还没适配小屏幕设备游览，你要狠狠踢开发者一下呢！-->
<!--      </v-alert>-->
<!--    </div>-->
<!--    class="hidden-xs hidden-sm"-->
    <router-view  />
  </v-theme-provider>
</template>

<script lang="ts" setup>
import './styles/body.css'

// 什么？ 看什么看! 杂🐟~杂🐟杂🐟杂🐟！
console.info('我想透透你!')
</script>
