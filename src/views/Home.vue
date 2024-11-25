<style>
.home {
  height: 100%;
}

.home-timeline {
  display: block;
  margin: 20px 0 50px 0;
}
</style>

<template>
  <v-main class="home">
    <Banner height="420" show-mask="80">
      <template v-slot:header>
        <v-row class="content" justify="center" align="center">
          <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}}]" density="comfortable">
            <template v-slot:prepend>
              <v-icon size="small" icon="mdi-home"></v-icon>
            </template>
          </v-breadcrumbs>
          <v-spacer></v-spacer>
          <v-btn variant="text" :to="{path: '/my'}">
            {{ $t('my.title')}}
          </v-btn>
        </v-row>
      </template>

      <div class="home-timeline">
        <v-row no-gutters justify="end" align="end">
          <v-col xs="0" ms="5" lg="7" xl="7" class="hidden-xs hidden-sm">
            <v-timeline :line-inset="0" side="end" align="center" truncate-line="end" direction="horizontal">
              <v-timeline-item fill-dot
                               class="hidden-xs hidden-md-and-down"
                               :hide-opposite="true"
                               :icon="'mdi-chevron-left'"
                               :icon-color="'#fff'">
                <div>
                  <div class="text-h6">之前赛季</div>
                  <v-btn size="x-small" variant="outlined" :to="{path:'season'}">查看</v-btn>
                </div>
              </v-timeline-item>
              <v-timeline-item
                  v-for="(i, index) in (seasons.child ? Object.entries(seasons.child).slice(Object.entries(seasons.child).length - 2) : [])"
                  fill-dot
                  :key="index"
                  :dot-color="index == 1 ? 'primary' : ''"
                  :icon="index == 1 ? 'mdi-star' : 'mdi-ray-start-end'"
                  :icon-color="'#fff'">
                <div>
                  <div class="text-h6">
                    {{ i[1].name }}
                    <v-btn v-if="index == 1"
                           variant="outlined"
                           class="mr-1 hidden-md-and-down"
                           :to="{path:'season/detail', query: {season: i[0]}}"
                           size="x-small">
                      详情
                    </v-btn>

                    <v-icon
                        v-if="index == 1"
                        color="error"
                        icon="mdi-fire-circle"
                        size="small"
                    ></v-icon>
                  </div>

                  <p class="hidden-md-and-down">
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
                  </p>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-col>
          <v-col xs="12" ms="6" lg="3" xl="3">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  variant="plain"
                  icon="mdi-chevron-left"
                  size="x-small"
                  @click="prev"
              ></v-btn>
              <v-btn
                  variant="plain"
                  icon="mdi-chevron-right"
                  size="x-small"
                  @click="next"
              ></v-btn>
            </v-card-actions>
            <v-sheet elevation="1" rounded>
              <v-window v-model="onboarding">
                <v-window-item value="1">
                  <ConspicuousRanking></ConspicuousRanking>
                </v-window-item>
                <v-window-item value="2">
                  <v-card v-if="allUser.length > 0">
                    <v-card-title>{{ $t('home.currentTaggedUser') }}</v-card-title>
                    <v-card-subtitle class="mb-2">{{ $t('home.currentTaggedUser_2') }}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-row align="start" justify="start">
                        <v-list class="w-100 ml-1 mr-1">
                          <v-list-item v-for="(i,index) in allUser" variant="tonal" color="primary" class="mb-1"
                                       :ripple="true" :height="10" active rounded :key="index" :title="i.username">
                            {{ new Intl.DateTimeFormat($vuetify.locale.current).format(i.creationTime) || 'N/A' }}
                          </v-list-item>
                        </v-list>
                      </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn block variant="text" :to="{path: '/my'}">
                        {{ $t('home.setting') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card v-else>
                    <v-card-title>{{$t('home.userTag')}}</v-card-title>
                    <v-card-text>{{$t('home.userTagExplanation')}}</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :to="{path:'/my'}">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-window-item>
                <v-window-item value="3">
                  <v-card>
                  <v-card-title>测试与正式赛季的区别？</v-card-title>
                  <v-card-text>正式赛季的积分将会被继承到后续正式赛季中。测试赛季的积分将不会被继承。</v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-sheet>
          </v-col>
          <v-col xs="0" ms="1" lg="2" xl="2" class="hidden-xs hidden-sm">
            <v-timeline side="end" align="center" truncate-line="start" direction="horizontal">
              <v-timeline-item fill-dot
                               :icon="'mdi-chevron-right'"
                               :icon-color="'#fff'">
                <p class="mb-1 hidden-sm-and-down">&emsp;</p>
                <p class="mb-10 hidden-md-and-down">&emsp;</p>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </div>
    </Banner>

    <v-divider class="mt-5"></v-divider>
    <v-tabs class="content" v-model="form.tab">
      <v-tab value="join">{{$t('home.server')}}</v-tab>
      <v-tab value="all">{{$t('home.filter')}}</v-tab>
      <v-spacer></v-spacer>
    </v-tabs>
    <v-divider class="mb-0"></v-divider>

    <v-container>
      <v-window v-model="form.tab" class="content mt-5 mb-5 pa-1">
        <v-window-item value="join">
          <h3 class="text-h5">{{$t('home.participatedServer')}}</h3>
          <p class="mb-5 text-subtitle-1">{{$t('home.participatedServerExplanation')}}</p>
          <v-row>
            <v-col md="12" sm="12" lg="8" order-md="2" order-sm="2" order-lg="1">
              <v-row>
                <v-col
                    v-for="(seasonItem, seasonItemIndex) in seasons.child && seasons.child[seasons.current] && seasons.child[seasons.current].serverDatas || []"
                    :key="seasonItemIndex"
                    md="12" xs="12" lg="6">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card v-bind="props">
                      <template v-slot:loader="{ isActive }">
                        <v-progress-linear
                            :active="isActive"
                            color="deep-purple"
                            height="4"
                            indeterminate
                        ></v-progress-linear>
                      </template>

                      <v-img cover
                             height="200"
                             :src="seasonItem.picture">
                        <v-overlay
                            :model-value="isHovering"
                            contained
                            scrim="primary"
                            class="align-center justify-center">
                          <v-card-actions>
                            <v-btn variant="flat" :to="{path:'season/detail', query:{season: seasons.current}}">{{ $t('home.seasonDetail') }}
                            </v-btn>
                          </v-card-actions>
                        </v-overlay>
                      </v-img>

                      <v-card-title>{{ seasonItem.name }}</v-card-title>
                      <v-card-text>
                        <span class="me-1">{{ seasonItem.name }}</span>
                        <v-icon
                            color="error"
                            icon="mdi-fire-circle"
                            size="small"
                        ></v-icon>
                      </v-card-text>
                      <v-divider class="mt-0 mb-1"></v-divider>
                      <v-card-text>
                        <div class="text-subtitle-1 mb-5">
                          适用
                          <v-chip color="blue">{{ seasons.child[seasons.current].name }}</v-chip>
                        </div>

                        <div>{{ seasonItem.description }}</div>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="12" sm="12" lg="4" order-md="1" order-sm="1" order-lg="2" class="hidden-md-and-down">
              <v-alert
                  class="mb-2"
                  variant="elevated"
                  type="info">
                <template v-slot:title>{{$t('home.howtojoin')}}</template>
                <p>{{$t('home.howtojoin_step')}}</p>
              </v-alert>

              <!--              <v-card>-->
              <!--                <v-toolbar flat>-->
              <!--                  <v-toolbar-title>-->
              <!--                    筛选-->
              <!--                  </v-toolbar-title>-->
              <!--                </v-toolbar>-->

              <!--                <v-card-text>-->
              <!--                  <h2 class="text-h6 mb-2">编号类型</h2>-->
              <!--                  <v-chip-group-->
              <!--                      column-->
              <!--                      multiple>-->
              <!--                    <v-chip-->
              <!--                        filter-->
              <!--                        v-for="(i, index) in 10"-->
              <!--                        :key="index"-->
              <!--                        :value="i"-->
              <!--                        variant="outlined">-->
              <!--                      {{ i }}-->
              <!--                    </v-chip>-->
              <!--                  </v-chip-group>-->
              <!--                </v-card-text>-->
              <!--              </v-card>-->
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="all">
          <h3 class="text-h5 mb-5">{{$t('home.server')}}</h3>
          <v-text-field label="查找" v-model="form.searchServerValue" variant="solo"
                        clearable
                        @click:clear="querySearchServer"
                        @change="querySearchServer">
            <template v-slot:label>
              <span>
                查找所有天梯服务器
              </span>
            </template>
          </v-text-field>

          <v-row>
            <v-col
                v-for="(serverItem, serverItemIndex) in form.serverDatas"
                :key="seasonItemIndex"
                cols="12"
                md="4">
              <v-card max-width="374">
                <template v-slot:loader="{ isActive }">
                  <v-progress-linear
                      :active="isActive"
                      color="deep-purple"
                      height="4"
                      indeterminate
                  ></v-progress-linear>
                </template>
                <v-card-title>{{ serverItem.name }}</v-card-title>
                <v-card-text>
                  <span class="me-1">{{ serverItem.name }}</span>
                </v-card-text>
                <v-divider class="mt-0 mb-1"></v-divider>
                <v-card-text>
                  <div>{{ serverItem.description }}</div>
                </v-card-text>
                <v-card-text>
                  <p class="mb-2">参加赛季</p>
                  <v-chip color="blue" class="mr-2"
                          :to="{path:'season/detail', query:{season: s, server: serverItem.value}}"
                          v-for="(s, sindex) in serverItem.season" :key="sindex">
                    {{ s }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import axios from "axios";
// import season from '/public/config/season.json'
// import server from '/public/config/servers.json'

import Banner from '/src/components/Banner.vue'
import ConspicuousRanking from "/src/components/ConspicuousRanking.vue"
import Application from "@/assets/js/application"

export default new Application({
  components: {Banner, ConspicuousRanking},
  data() {
    return {
      // servers: server,
      // seasons: season,
      servers: [],
      seasons: [],

      form: {
        tab: 'join',
        searchServerValue: '',
        serverDatas: [],
      },

      length: 2,
      onboardingInterval: null,
      onboarding: 0,
    }
  },
  watch: {
    onboarding: {
      handler(value) {
      },
      deep: false
    }
  },
  created() {
    axios.request({
      url: 'https://bfv-mmr-config-season.saranokiseki.workers.dev/'
    }).then(res => {
      console.log(res.data);
      this.season_response = res.data.data.season;
      this.server_response = res.data.data.servers;
      console.log(this.season_response);
      console.log(this.server_response);
      this.servers = this.server_response;
      this.seasons = this.season_response;

      const that = this;
      const seasonsAsArray = Object.entries(this.seasons.child || {});

      this.form.serverDatas = this.servers.child;

      // 赛季serverIds内服务器id，从server列表查询完整服务器信息，并赋在赛季map中
      seasonsAsArray.map(i => {
        let value = i[1];
        value.serverDatas = value.serverIds.map(ids => {
          let item = that.servers.child.filter(t => t.value == ids)[0];
          item.picture = new URL(item.picture, import.meta.url).href
          return item;
        });
      })

      this.onBoardingInterval();
    })
  },
  methods: {
    /**
     * 搜索服务器
     */
    querySearchServer() {
      this.form.serverDatas = this.servers.child.filter(t => {
        return t.value.indexOf(this.form.searchServerValue) >= 0 || t.name.indexOf(this.form.searchServerValue) >= 0;
      })
    },
    /**
     * 注册定时
     */
    onBoardingInterval() {
      const that = this;
      this.onboardingInterval = setInterval(function () {
        that.next(false)
      }, 10000)
    },
    /**
     * 停止定时
     */
    clearBoardingInterval() {
      if (this.onboardingInterval)
        clearInterval(this.onboardingInterval);
    },
    /**
     * 面板下一步
     * @param skip 是否跳过定时
     */
    next(skip) {
      if (skip)
        this.clearBoardingInterval();
      this.onboarding = this.onboarding > this.length - 2
          ? 0
          : this.onboarding + 1
    },
    /**
     * 面板上一步
     */
    prev() {
      this.clearBoardingInterval();
      this.onboarding = this.onboarding <= 0
          ? this.length - 1
          : this.onboarding - 1
    },
  }
})
</script>
