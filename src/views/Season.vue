<script lang="ts">
import axios from "axios";
// import season from '/public/config/season.json'
// import server from '/public/config/servers.json'
import Banner from "@/components/Banner.vue";

export default {
  components: {Banner},
  data() {
    return {
      seasonsCount: 0,
      seasons: [],
      // servers: server,
      servers: [],
    }
  },
  created() {
    axios.request({
      url: 'https://bfv-mmr-config-season.saranokiseki.workers.dev/'
    }).then(res => {
      this.season_response = res.data.data.season;
      this.server_response = res.data.data.servers;

      this.servers = this.server_response;
      const t = Object.entries(this.season_response.child);
      this.seasonsCount = 1;
      this.seasons = t.sort((a, b) => {
        const start = new Date(a[1].dateRange[0]).getTime();
        const end = new Date(a[1].dateRange[1]).getTime();
        return start >= end ? 1 : -1
      });
    });
    
  },
  methods: {}
}
</script>

<template>
  <v-main>
    <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}},
        {title: $t('season.title'),disabled: true}]" density="comfortable" class="content">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home"></v-icon>
      </template>
    </v-breadcrumbs>
    <Banner height="150"></Banner>
    <v-container class="content mt-5 pb-0">
      <v-timeline :line-inset="0" align="start" truncate-line="start" direction="vertical">
        <v-timeline-item
            v-for="(i, index) in seasons"
            fill-dot
            width="100%"
            :key="index"
            :dot-color="index == seasonsCount - 1 ? 'primary' : ''"
            :icon="index == seasonsCount - 1 ? 'mdi-star' : 'mdi-ray-start-end'"
            :icon-color="'#fff'">
          <div class="text-h6">
            <v-row>
              <v-col class="text-h5" :class="index == seasonsCount - 1 ? 'text-primary' : ''">
                {{ i[1].name }}
                <v-icon
                    v-if="index == seasonsCount - 1"
                    color="error"
                    icon="mdi-fire-circle"
                    size="small"
                ></v-icon>
              </v-col>
            </v-row>
          </div>

          <div>
            <v-chip size="x-small"
                    text-color="white">
              {{ i[1].dateRange[0] }}
            </v-chip>
            -
            <v-chip size="x-small"
                    color="pink"
                    text-color="white">
              {{ i[1].dateRange[1] }}
            </v-chip>
          </div>

          <v-alert color="primary" variant="tonal" :value="true" class="mt-2 mb-2">
            {{ i[1].description }}
          </v-alert>

          {{$t('season.serverparticipate')}}: {{ i[1].serverIds.length || '0' }}
          <div class="mb-5">
            <v-chip size="x-small"
                    v-for="(serverItem, serverIndex) in i[1].serverIds"
                    :ket="serverIndex"
                    text-color="white">
              {{ serverItem }}
            </v-chip>
          </div>

          <v-btn size="small" variant="outlined" color="primary" :to="{path: '/season/detail', query: {season: i[0]}}">{{$t('season.detail')}}</v-btn>
          <div :class="[index == seasonsCount - 1 ? 'mt-10 mb-10' : '']"></div>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-divider></v-divider>
    <div class="content text-center mt-2 mb-2">
      \(*╹▽╹*) / \(*╹▽╹*) / \(*╹▽╹*) /
    </div>
  </v-main>
</template>

<style scoped>

</style>
