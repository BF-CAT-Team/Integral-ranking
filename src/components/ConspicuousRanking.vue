<script lang="ts">
// import season from '/public/config/season.json'
// import server from '/public/config/servers.json'
import axios from "axios";

import CheckPlayerName from './CheckPlayerName.vue'

export default {
  data() {
    return {
      // servers: server,
      // seasons: season,
      servers: [],
      seasons: [],

      players: []
    }
  },
  async created() {
    axios.request({
      url: 'https://bfv-mmr-config-season.saranokiseki.workers.dev/'
    }).then(res => {
      console.log(res.data);
      this.season_response = res.data.data.season;
      this.server_response = res.data.data.servers;
      this.servers = this.server_response;
      this.seasons = this.season_response;

      this.getSeasonDetail();
    })
  },
  components: {CheckPlayerName},
  methods: {
    /**
     * 赛季排行详情
     */
    getSeasonDetail() {
      return new Promise((resolve, reject) => {
        const requestData = {
          season: this.seasons.current,
          filename: this.seasons.child[this.seasons.current].fileUrl
        };
        axios.request({
          // url: new URL('/' + this.seasons.child[this.seasons.current].fileUrl, import.meta.url).href
          method: 'POST',
          url: 'https://bfv-mmr-detail-test.saranokiseki.workers.dev/',
          data: requestData
        }).then(res => {
          this.players = this.parseDataFromText(res.data.data).slice(0, 3);
          resolve();
        });
      });
    },
    /**
     * 拆解数据
     * @param txtContent
     */
    parseDataFromText(txtContent) {
      const lines = txtContent.trim().split('\n');
      const parsedData = [];

      const regex = /(\d+),([\w-]+),([\d.]+),\s*([-+]?[\d.]+),([\d.]+),([\d.]+),\s*([-+]?[\d.]+),\s*([-+]?[\d.]+)/;

      lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
          parsedData.push({
            rank: parseInt(match[1]),
            player: match[2].trim(),
            score: parseFloat(match[3]),
            float: parseFloat(match[4]),
            kpm: parseFloat(match[5]),
            time: parseFloat(match[6]),
            kill: parseFloat(match[7]),
            revive: parseFloat(match[8])
          });
        }
      });

      return parsedData;
    },
  }
}
</script>

<template>
  <v-card>
    <v-divider></v-divider>
    <v-row class="mt-1" v-if="players[0]">
      <v-col class="text-center">
        <div class="text-h5 text-amber text-no-wrap">
          <CheckPlayerName :username="players[0].player"></CheckPlayerName>
        </div>
        <div class="text-subtitle-1">🏆 冠军</div>
      </v-col>
    </v-row>
    <v-row v-if="players[1] && players[2]" align="stretch" justify="center">
      <v-col cols="5" class="text-center">
        <div class="text-blue text-no-wrap">
          <CheckPlayerName :username="players[1].player"></CheckPlayerName>
        </div>
        <div class="text-subtitle-2">🥈 第二名</div>
      </v-col>
      <v-divider vertical style="margin: 25px 0"></v-divider>
      <v-col cols="5" class="text-center">
        <div class="text-red-accent-1 text-no-wrap">{{ players[2].player || '-' }}</div>
        <div class="text-subtitle-2">🥉 第三名</div>
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-card-actions>
      <v-btn block variant="text" :to="{path: 'season/detail', query: {season: seasons.current}}">
        {{$t('home.gotoCurrentSeason')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
