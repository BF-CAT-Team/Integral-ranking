<script lang="ts">
import axios from "axios";
import Banner from "@/components/Banner.vue";


export default {
  components: {Banner},
  data() {
    return {
      achievementsConfig: {},
      originalAchievements: [],
      showAchievements: [],
      searchAchievementValue: '',
      filtrate: {
        numbers: [{name: 'A系列', value: 'A'}, {name: 'B系列', value: 'B'}, {name: 'C系列', value: 'C'}, {name: 'D系列', value: 'D'}],
        numberValue: [],
        achievementTypes: ['积分天梯', '限时活动限定', '赛事荣誉', '社区贡献荣誉', '赛事纪念成就',  '特定娱乐赛事荣誉', '通用娱乐赛事荣誉', '游戏普通成就', '游戏稀有成就', '游戏传说成就', '游戏史诗成就'],
        achievementTypeValue: [],
      },
      tab: 0
    }
  },
  created() {
    this.getAchievements();
  },
  methods: {
    getAchievements() {
      // axios.request({
      //   url: new URL('/config/achievement.json', import.meta.url).href
      // }).then(res => {
      //   res.data.child.map(i => i.NumberType = i.Number[0].toUpperCase())
      //   this.achievementsConfig = res.data.config;
      //   this.originalAchievements = res.data.child;
      //   this.showAchievements = this.originalAchievements;
      // });
      axios.request({
        url: 'https://bfv-mmr-config-achievements.saranokiseki.workers.dev/'
      }).then(res => {
        res.data.data.child.map(i => i.NumberType = i.Number[0].toUpperCase())
        this.achievementsConfig = res.data.data.config;
        this.originalAchievements = res.data.data.child;
        this.showAchievements = this.originalAchievements;
      });
    },
    onTabs() {
      const index = this.tab;
      switch (index) {
        case "1":
          this.onResetFiltrate();
          break;
        case "2":
          this.filtrate.numberValue = ['D'];
          this.queryAchievement();
          break;
      }
    },
    /**
     * 模糊查询成就
     */
    queryAchievement() {
      const that = this;
      const value = this.searchAchievementValue;
      this.showAchievements = this.originalAchievements.filter((i) => {
        const textQuery = i.Name.indexOf(value) >= 0 || i.getMethod.indexOf(value) >= 0 || i.Describe.indexOf(value) >= 0;
        const numberQuery = that.filtrate.numberValue.includes(i.NumberType)
        const achievementQuery = i.Rarity.indexOf(that.filtrate.achievementTypeValue) >= 0;

        if (i.Forbidden) return false;

        if (value && that.filtrate.numberValue.length <= 0 && that.filtrate.achievementTypeValue.length <= 0) return textQuery;
        if (!value && that.filtrate.numberValue.length > 0) return numberQuery;
        if (!value && that.filtrate.achievementTypeValue.length > 0) return achievementQuery;

        return textQuery && numberQuery && achievementQuery;
      })
    },
    /**
     * 重置筛选表单
     */
    onResetFiltrate() {
      this.filtrate.numberValue = [];
      this.filtrate.achievementTypeValue = [];
      this.searchAchievementValue = "";
      this.showAchievements = this.originalAchievements;
    }
  }
}
</script>

<template>
  <v-main>
    <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}},
        {title: $t('achievements.title'), disabled: true}]" density="comfortable" class="content">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home"></v-icon>
      </template>
    </v-breadcrumbs>

    <Banner height="150">
      <v-tabs fixed-tabs v-model="tab" centered @update:modelValue="onTabs">
        <v-tab value="1">
          {{ $t('achievements.tabs.0') }}
        </v-tab>
        <v-tab value="2">
          {{ $t('achievements.tabs.1') }}
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
    </Banner>

    <v-container class="content mb-5">
      <v-row class="mt-5">
        <v-col xs="12" sm="12" md="3" lg="3" order-md="1" order-lg="2">
          <v-card class="mx-auto">
            <v-toolbar flat>
              <v-toolbar-title>
                筛选
                <v-btn @click="onResetFiltrate">重置</v-btn>
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <h2 class="text-h6 mb-2">编号类型</h2>
              <v-chip-group
                  v-model="filtrate.numberValue"
                  @update:modelValue="queryAchievement"
                  column
                  multiple>
                <v-chip
                    filter
                    v-for="(i, index) in filtrate.numbers"
                    :key="index"
                    :value="i.value"
                    :color="achievementsConfig[i.value]?.class || 'red'"
                    variant="outlined">
                  {{ i.name }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-text>
              <h2 class="text-h6 mb-2">成就类型</h2>
              <v-chip-group
                  v-model="filtrate.achievementTypeValue"
                  @update:modelValue="queryAchievement"
                  column
                  multiple>
                <v-chip
                    filter
                    v-for="(i, index) in filtrate.achievementTypes"
                    :key="index"
                    :value="i"
                    variant="outlined">
                  {{ i }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="9" lg="9" cols="12" order-md="1" order-lg="2">
          <v-alert class="mb-5" type="info" variant="tonal" closable="">
            这是ROBOT社区成就，需要获取请前往ROBOT社区申请对应成就
          </v-alert>

          <v-text-field label="查找"
                        v-model="searchAchievementValue"
                        variant="solo"
                        clearable
                        @click:clear="onResetFiltrate"
                        @keyup.enter.native="queryAchievement">
            <template v-slot:label>
              <span>
                查找成就名称、描述
              </span>
            </template>

            <template v-slot:append>
              <v-btn size="55px" color="primary" @click="queryAchievement">
                <v-icon>mdi-file-find</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <div v-if="showAchievements.length > 0" class="achievement-content">
            <v-card class="achievement-content-card mb-5" variant="elevated" v-for="(i, index) in showAchievements" :key="index">
              <div align="center" class="mt-5">
                <!-- <v-avatar :color="achievementsConfig[i.NumberType].class || 'black'"
                          size="large"> -->
                <v-avatar :color="achievementsConfig[i.Rarity].class || 'black'"
                          size="large">
                  {{ i.Number }}
                </v-avatar>
              </div>
              <v-card-text align="center">
                <h2>{{ i.Name }}</h2>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <p class="mt-5">{{ i.Describe }}</p>
              </v-card-text>
              <v-card-subtitle>
                <!-- <consol class="log">{{achievementsConfig[i.Rarity].class}}</consol> -->
                <v-chip :color="achievementsConfig[i.Rarity].class || 'black'">{{ i.Rarity }}</v-chip>
              </v-card-subtitle>
              <v-card-text>
                <b>条件</b>
                <p>{{ i.getMethod }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div v-else>
            没有找到对应成就
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.achievement-content {
  columns: auto 12em;
  column-count: 2;
  column-gap: 20px;
}
</style>
