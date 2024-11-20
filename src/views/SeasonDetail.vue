<style>
.season-detail-title {
  margin-bottom: 50px;
}
</style>

<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable';

import axios from "axios";

import Banner from '/src/components/Banner.vue';
import CheckPlayerName from "@/components/CheckPlayerName.vue";
import Application from "@/assets/js/application";

export default new Application({
  components: {VDataTable, CheckPlayerName, Banner},
  data() {
    return {
      servers: [],
      seasons: [],
      serversValue: '',
      seasonValue: {},
      index_selectedServer: 0,
      tab: 0,

      // 排行数据
      form: {
        page: 1,
        itemsPerPage: 100,
        itemsPerPages: [10, 20, 50, 100, 200, 300, 400, 1000],
        loading: false,
        textValue: '',
        headers: [
          {
            title: '排名',
            align: 'start',
            key: 'rank',
          },
          {title: '玩家', key: 'player', sortable: false, fixed: true},
          {title: '积分', key: 'score'},
          {title: '24H浮动', key: 'float'},
          {title: 'kpm', key: 'kpm'},
          {title: '赛季时长', key: 'time'},
          {title: '击杀', key: 'kill'},
          {title: '救治', key: 'revive'},
          {title: 'STATUS', key: 'status'},
        ],
        originalDesserts: [],
        originalDailyDesserts: [],
        myDesserts: [],
        desserts: [],
        dailyDesserts: [],
      }
    }
  },
  async created() {
    const {type} = this.$route.query;
    if (type)
      this.tab = type;

    await this.getSeasons();
    await this.getServers();
    await this.getSeasonDetail();
    await this.getSeasonDailyDetail();
  },
  methods: {
    onTabs(index) {
    },
    /**
     * 赛季列表
     */
    // async getSeasons() {
    //   const {season} = this.$route.query;

    //   return new Promise((resolve, reject) => {
    //     axios.request({
    //       url: new URL('/config/season.json', import.meta.url).href
    //     }).then(res => {
    //       this.seasons = res.data.child;
    //       this.seasonValue = Object.entries(this.seasons).filter(i => i[0] == season)[0][1];

    //       resolve();
    //     });
    //   });
    // },
    async getSeasons() {
      const {season} = this.$route.query;
      // console.log(season)
      return new Promise((resolve, reject) => {
        axios.request({
          url: 'https://bfv-mmr-config-season.saranokiseki.workers.dev/'
        }).then(res => {
          this.season_response = res.data.data.season;
          // this.server_response = res.data.data.servers;

          this.seasons = this.season_response.child;
          this.seasonValue = Object.entries(this.seasons).filter(i => i[0] == season)[0][1];

          resolve();
        });
      });
    },
    /**
     * 赛季排行详情
     */
    getSeasonDetail() {
      return new Promise((resolve, reject) => {
        const {season} = this.$route.query;
        const requestData = {
          season: season,
          filename: this.seasonValue.fileUrl[0]
        };
        axios.request({
          // url: new URL('/' + this.seasonValue.fileUrl[0], import.meta.url).href
          method: 'POST',
          url: 'https://bfv-mmr-detail-test.saranokiseki.workers.dev/',
          data: requestData
        }).then(res => {
          this.form.originalDesserts = this.parseDataFromText(res.data.data);
          this.form.desserts = this.form.originalDesserts;

          if (this.isLogin) {
            this.form.myDesserts = this.form.originalDesserts.filter(i => {
              return this.allUser.filter(t => t.username == i.player)[0]
            });
          }
          
          resolve();
        });
      });
    },
    updateSeasonDetail() {
      return new Promise((resolve, reject) => {
        const {season} = this.$route.query;
        const requestData = {
          season: season,
          filename: this.seasonValue.fileUrl[this.index_selectedServer]
        };
        axios.request({
          // url: new URL('/' + this.seasonValue.fileUrl[this.index_selectedServer], import.meta.url).href
          method: 'POST',
          url: 'https://bfv-mmr-detail-test.saranokiseki.workers.dev/',
          data: requestData
        }).then(res => {
          this.form.originalDesserts = this.parseDataFromText(res.data.data);
          this.form.desserts = this.form.originalDesserts;

          if (this.isLogin) {
            this.form.myDesserts = this.form.originalDesserts.filter(i => {
              return this.allUser.filter(t => t.username == i.player)[0]
            });
          }
          
          resolve();
        });
      });
    },
    /**
     * 黑马排行
     */
    getSeasonDailyDetail() {
      return new Promise((resolve, reject) => {
        const {season} = this.$route.query;
        const requestData = {
          season: season,
          filename: `${this.seasonValue.fileUrl[0]}-daily`
        };
        axios.request({
          // url: new URL('/' + this.seasonValue.fileUrl[0].replace("list.txt", "dailylist.txt"), import.meta.url).href
          method: 'POST',
          url: 'https://bfv-mmr-detail-test.saranokiseki.workers.dev/',
          data: requestData
        }).then(res => {
          this.form.originalDailyDesserts = this.parseDataFromText_daily(res.data.data);
          this.form.dailyDesserts = this.form.originalDailyDesserts;

          resolve();
        });
      });
    },
    updateSeasonDailyDetail() {
      return new Promise((resolve, reject) => {
        const {season} = this.$route.query;
        const requestData = {
          season: season,
          filename: `${this.seasonValue.fileUrl[this.index_selectedServer]}-daily`
        };
        axios.request({
          // url: new URL('/' + this.seasonValue.fileUrl[this.index_selectedServer].replace("list.txt", "dailylist.txt"), import.meta.url).href
          method: 'POST',
          url: 'https://bfv-mmr-detail-test.saranokiseki.workers.dev/',
          data: requestData
        }).then(res => {
          this.form.originalDailyDesserts = this.parseDataFromText_daily(res.data.data);
          this.form.dailyDesserts = this.form.originalDailyDesserts;

          resolve();
        });
      });
    },
    /**
     * 服务器列表
     */
    // getServers() {
    //   return new Promise((resolve, reject) => {
    //     axios.request({
    //       url: new URL('/config/servers.json', import.meta.url).href
    //     }).then(res => {
    //       this.seasonValue.serverIds.map((i) => {
    //         this.servers.push(res.data.child.filter(t => t.value == i)[0])
    //       })

    //       this.serversValue = this.servers[0];

    //       resolve();
    //     });
    //   });
    // },
    getServers() {
      return new Promise((resolve, reject) => {
        axios.request({
          url: 'https://bfv-mmr-config-season.saranokiseki.workers.dev/'
        }).then(res => {
          // this.season_response = res.data.data.season;
          this.server_response = res.data.data.servers;

          this.seasonValue.serverIds.map((i) => {
            this.servers.push(this.server_response.child.filter(t => t.value == i)[0])
          })

          this.serversValue = this.servers[0];

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
      // const lines = txtContent.split('\r\n');
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
    /**
     * 单人黑马
     * @param txtContent
     */
    parseDataFromText_daily(txtContent) {
      const lines = txtContent.trim().split('\n');
      const parsedData = [];

      const regex = /(\d+),([\w-]+),\s*([-+]?[\d.]+)/;

      lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
          parsedData.push({
            rank: parseInt(match[1]),
            player: match[2].trim(),
            float: parseFloat(match[3])
          });
        }
      });

      return parsedData;
    },
    /**
     * 查找玩家
     */
    queryPlayer() {
      console.log(this.tab, this.textValue)
      if (!this.textValue) {
        this.onResetFiltrate();
        return;
      }
      switch (this.tab) {
        case 0:
          this.form.desserts = this.form.originalDesserts.filter(i => i.player.indexOf(this.textValue) >= 0);
          break;
        case 1:
          this.form.dailyDesserts = this.form.originalDailyDesserts.filter(i => i.player.indexOf(this.textValue) >= 0);
          break;
      }
    },
    /**
     * 重置筛选表单
     */
    onResetFiltrate() {
      this.form.textValue = '';
      this.form.desserts = this.form.originalDesserts;
      this.form.dailyDesserts = this.form.originalDailyDesserts;
    },
    /**
     * 选择服务器
     */
    changeServer(selectedServer) {
        //this.$router.push({path: a })
        // console.log(selectedServer)
        // console.log("called")
        this.index_selectedServer = this.servers.findIndex(x => x.name=== selectedServer)
        // console.log(this.index_selectedServer)
        // console.log(this.servers[this.index_selectedServer])
        // console.log(this.seasonValue)
        this.updateSeasonDetail();
        this.updateSeasonDailyDetail();
    }
  },
  computed: {
    // 赛季是否结束
    isSeasonEnd() {
      if (!this.seasonValue.dateRange) return false;
      return new Date().getTime() > new Date(this.seasonValue.dateRange[1]).getTime()
    }
  }
})
</script>

<template>
  <v-main>
    <Banner>
      <template v-slot:header>
        <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}},
        {title: $t('season.title'),disabled: false, to: {path: '/season'}},
        {title: $t('seasonDetail.title'),disabled: true}]" density="comfortable" class="content">
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-home"></v-icon>
          </template>
        </v-breadcrumbs>
      </template>

      <div class="content">
        <v-card variant="text" class="season-detail-title" v-if="seasonValue">
          <v-card-title>
            <h1>
              # {{ seasonValue.name }}
              <v-chip class="ml-2" color="red" variant="elevated" v-if="isSeasonEnd">已经结束</v-chip>
              <v-chip class="ml-2" color="success" variant="elevated" v-else>可参与</v-chip>
            </h1>
          </v-card-title>
          <v-card-subtitle>
            {{ seasonValue.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="space-evenly" align="center">
              <v-col v-if="seasonValue.dateRange">
                赛季区间:
                <v-chip size="x-small"
                        text-color="white">
                  {{ seasonValue.dateRange[0] || '-' }}
                </v-chip>
                -
                <v-chip size="x-small"
                        color="pink"
                        text-color="white">
                  {{ seasonValue.dateRange[1] || '-' }}
                </v-chip>
              </v-col>
              <v-divider vertical inset class="ml-2"></v-divider>
              <v-col>
                <!-- 更新时间: {{ seasonValue.updateTime }} -->
                更新时间: {{ new Date(seasonValue.updateTime*1000).toLocaleTimeString() }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-row align="start">
          <v-col xs="9" sm="9" md="5" lg="5">
            <v-select 
                v-model="serversValue"
                label="服务器"
                density="compact"
                variant="solo"
                item-title="name"
                item-value="name"
                :items="servers"
                :on-change="changeServer(`${serversValue}`)">
            </v-select>
          </v-col>
          <v-col xs="3" sm="3" md="2" lg="2">
            <v-chip color="primary" ripple size density="compact" :rounded="false"
                    :href="`https://bfvhackers.com/server?name=${serversValue.name}`" target="_new">
              <template v-slot:default>
                <div class="ma-2">
                  <img src="https://bfvhackers.com/static/media/bfv-hacker-lookup-logo.png" width="25" height="25"/>
                </div>
              </template>
              <template v-slot:append>
                <div class="mr-3">bfvHackers</div>
              </template>
            </v-chip>
          </v-col>
          <v-spacer></v-spacer>
          <v-col xs="12" sm="12" md="5" lg="5">
            <v-text-field
                v-model="textValue"
                density="compact"
                variant="solo"
                label="搜索玩家名称"
                prepend-inner-icon="mdi-magnify"
                clearable
                single-line
                hide-details
                @keyup.prevent="queryPlayer"
                @click:clear="onResetFiltrate"
                @click:prepend-inner="queryPlayer"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-tabs
          fixed-tabs
          v-model="tab"
          centered
          @update:modelValue="onTabs">
        <v-tab value="1">
          综合排行
        </v-tab>
        <v-tab value="2">
          每日黑马
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
    </Banner>

    <div class="content mb-5">
      <v-window v-model="tab">
        <v-window-item value="1">
          <!-- 置顶 我排名 -->
          <v-card variant="elevated" class="mt-10 mb-5 ma-1" v-if="isLogin">
            <v-card-title>我的数据</v-card-title>
            <v-card-subtitle>列出关注玩家数据</v-card-subtitle>
            <v-divider thickness="10" class="mt-2 mb-2"></v-divider>
            <v-data-table
                fixed-header
                :page="1"
                :headers="form.headers"
                :items="form.myDesserts"
                item-value="name">
              <template v-slot:item="{ item }">
                <tr>
                  <td>
                    <v-avatar color="#000" v-if="item.rank == 1">
                      {{ item.rank || '0' }}
                    </v-avatar>
                    <v-avatar color="#000" v-else-if="item.rank == 2">
                      {{ item.rank || '0' }}
                    </v-avatar>
                    <v-avatar color="#000" v-else-if="item.rank == 3">
                      {{ item.rank || '0' }}
                    </v-avatar>
                    <template v-else>
                      {{ item.rank || '0' }}
                    </template>
                  </td>
                  <td>
                    <CheckPlayerName :username="item.player"></CheckPlayerName>
                  </td>
                  <td>{{ item.score }}</td>
                  <td :class="[
                      item.float > 0 ? 'text-green' : null,
                      item.float < 0 ? 'text-red' : null,
                  ]">
                    <template v-if="item.float > 0">
                      <v-chip color="green">↑</v-chip>
                    </template>
                    <template v-else-if="item.float == 0">
                      <v-chip>-</v-chip>
                    </template>
                    <template v-else>
                      <v-chip color="red">↓</v-chip>
                    </template>
                    {{ item.float }}
                  </td>
                  <td>{{ item.kpm }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.kill }}</td>
                  <td>{{ item.revive }}</td>
                  <td>
                    <v-btn variant="flat" :href="`https://bfvhackers.com/?name=` + item.player" target="_new">
                      <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
              <template v-slot:bottom></template>
            </v-data-table>
          </v-card>

          <!-- 综合列表 -->
          <v-card>
            <v-card-title>
              排行
            </v-card-title>
            <template v-if="!form.loading">
              <v-data-table
                  fixed-header
                  v-model:page="form.page"
                  :items-per-page="form.itemsPerPage"
                  :headers="form.headers"
                  :items="form.desserts"
                  item-value="name">
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      <v-avatar color="amber" v-if="item.rank == 1">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <v-avatar color="blue" v-else-if="item.rank == 2">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <v-avatar color="black" v-else-if="item.rank == 3">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <template v-else>
                        {{ item.rank || '0' }}
                      </template>
                    </td>
                    <td>
                      <CheckPlayerName :username="item.player"></CheckPlayerName>
                    </td>
                    <td>{{ item.score }}</td>
                    <td :class="[
                        item.float > 0 ? 'text-green' : null,
                        item.float < 0 ? 'text-red' : null,
                    ]">
                      <template v-if="item.float > 0">
                        <v-chip color="green">↑</v-chip>
                      </template>
                      <template v-else-if="item.float == 0">
                        <v-chip>-</v-chip>
                      </template>
                      <template v-else>
                        <v-chip color="red">↓</v-chip>
                      </template>
                      {{ item.float }}
                    </td>
                    <td>{{ item.kpm }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.kill }}</td>
                    <td>{{ item.revive }}</td>
                    <td>
                      <v-btn variant="flat" :href="`https://bfvhackers.com/?name=` + item.player" target="_new">
                        <v-icon>mdi-export-variant</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template v-slot:bottom>
                  <!--                  <v-select variant="solo" v-model="form.itemsPerPage" :items="form.itemsPerPages"></v-select>-->
                  <div class="text-center pt-2">
                    <v-pagination
                        v-model="form.page"
                        size="x-small"
                        :total-visible="7"
                        :length="form.desserts.length"
                    ></v-pagination>
                  </div>
                </template>
              </v-data-table>
            </template>
            <v-progress-circular
                v-else
                indeterminate
                color="primary"
            ></v-progress-circular>
          </v-card>
        </v-window-item>
        <v-window-item value="2">
          <!-- 黑马 -->
          <v-card class="mt-10">
            <v-card-title>黑马</v-card-title>
            <v-card-subtitle>黑马玩家，以鼓励他们再接再厉</v-card-subtitle>
            <template v-if="!form.loading">
              <v-data-table
                  fixed-header
                  :headers="form.headers"
                  :items="form.dailyDesserts"
                  item-value="name">
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      <v-avatar color="amber" v-if="item.rank == 1">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <v-avatar color="blue" v-else-if="item.rank == 2">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <v-avatar color="black" v-else-if="item.rank == 3">
                        {{ item.rank || '0' }}
                      </v-avatar>
                      <template v-else>
                        {{ item.rank || '0' }}
                      </template>
                    </td>
                    <td>
                      <CheckPlayerName :username="item.player"></CheckPlayerName>
                    </td>
                    <td>{{ item.score || 'N/A' }}</td>
                    <td :class="[
                        item.float > 0 ? 'text-green' : null,
                        item.float < 0 ? 'text-red' : null,
                    ]">
                      <template v-if="item.float > 0">
                        <v-chip color="green">↑</v-chip>
                      </template>
                      <template v-else-if="item.float == 0">
                        <v-chip>-</v-chip>
                      </template>
                      <template v-else>
                        <v-chip color="red">↓</v-chip>
                      </template>
                      {{ item.float }}
                    </td>
                    <td>{{ item.kpm || 'N/A' }}</td>
                    <td>{{ item.time || 'N/A' }}</td>
                    <td>{{ item.kill || 'N/A' }}</td>
                    <td>{{ item.revive || 'N/A' }}</td>
                    <td>
                      <v-btn variant="flat" :href="`https://bfvhackers.com/?name=` + item.player" target="_new">
                        <v-icon>mdi-export-variant</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </template>
            <v-progress-circular
                v-else
                indeterminate
                color="primary"
            ></v-progress-circular>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-main>
</template>

<style scoped>

</style>
