<script lang="ts">
import {VDataTable} from 'vuetify/labs/VDataTable';

import {storage} from "@/assets/js";
import Application from "@/assets/js/application";

export default new Application({
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      form: {
        username: ''
      },
      my: {
        headers: [
          {
            title: '名称',
            align: 'start',
            sortable: false,
            fixed: true,
            key: 'username',
          },
          {title: '创建时间', key: 'creationTime'},
          {title: '更新时间', key: 'updateTime'},
          {key: 'actions', align: 'end', sortable: false},
        ],
        desserts: []
      },
      editedItem: {
        username: '',
      },
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  components: {VDataTable},
  created() {
    this.my.desserts = this.allUser;
  },
  methods: {
    /**
     * 按钮,编辑
     * @param item
     */
    editItem(item) {
      this.editedIndex = this.my.desserts.indexOf(item)
      this.editedItem = Object.assign({}, {
        updateTime: new Date().getTime()
      }, item)
      this.dialog = true
    },

    /**
     * 按钮,删除
     * @param item
     */
    deleteItem(item) {
      this.editedIndex = this.my.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    /**
     * 删除确认
     */
    deleteItemConfirm() {
      this.my.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
      storage.set('user', this.my.desserts)
    },

    /**
     * 删除关闭
     */
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    /**
     * 添加关闭
     */
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    /**
     * 添加确认
     */
    addItem() {
      if (!this.editedItem.username) return;
      if (this.editedIndex > -1) {
        Object.assign(this.my.desserts[this.editedIndex], this.editedItem)
      } else {
        this.my.desserts.push(Object.assign({
          creationTime: new Date().getTime()
        }, this.editedItem))
      }
      storage.set('user', this.my.desserts)
      this.close()
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增用户名' : '编辑'
    },
  }
})
</script>

<template>
  <v-main>
    <v-breadcrumbs :items="[
        {title: $t('home.title'),disabled: false, to: {path: '/'}},
        {title: $t('my.title'),disabled: true}]" density="comfortable" class="content">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-divider></v-divider>

    <div class="content mt-5 mb-5">
      <v-data-table
          :headers="my.headers"
          :items="my.desserts"
          class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>

            <!-- ADD -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" dark class="mb-2" v-bind="props">
                  <v-icon size="25">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="editedItem.username"
                          clearable
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" v-if="editedItem.creationTime">
                      <v-text-field
                          v-model="editedItem.creationTime"
                          readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" v-if="editedItem.updateTime">
                      <v-text-field
                          v-model="editedItem.updateTime"
                          readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      variant="text"
                      @click="close">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn
                      color="primary"
                      variant="text"
                      :disabled="!editedItem.username"
                      @click="addItem">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Delete -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">删除此用户</v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn variant="text" @click="closeDelete">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn color="error" variant="text" @click="deleteItemConfirm">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td style="min-width: 200px">
              <code>{{ item.username }}</code>
            </td>
            <td>{{ new Intl.DateTimeFormat($vuetify.locale.current).format(item.creationTime) || 'N/A' }}</td>
            <td>
              {{ item.updateTime ? new Intl.DateTimeFormat($vuetify.locale.current).format(item.updateTime) : 'N/A' }}
            </td>
            <td class="text-right">
              <v-btn color="primary" class="me-2" variant="tonal" density="compact" @click="editItem(item)">
                <v-icon size="small">mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="text-red-accent-2" variant="tonal" density="compact" @click="deleteItem(item)">
                <v-icon size="small">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
    </div>
  </v-main>
</template>

<style scoped>

</style>
