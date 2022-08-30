<template>
  <div>
    <lay-card>
      <p class="title">复杂表单</p>
      <p class="describe">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.
      </p>
    </lay-card>
    <lay-container :fluid="true" style="padding: 10px; padding-top: 0px">
      <lay-card title="基本信息">
       
      </lay-card>
      <lay-card title="附加信息">
       
      </lay-card>
      <lay-card title="货品列表">
        <lay-table :columns="columns28" :data-source="dataSource28">
          <template #username="{ data }">
            <lay-input
              v-if="edingKeys[data.id]"
              :model-value="data.username"
              @input="changeUsername($event, data)"
            >
            </lay-input>
            <span v-else>
              {{ data.username }}
            </span>
          </template>
          <template #operate="{ data }">
            <lay-button type="primary" size="xs" v-if="!edingKeys[data.id]" @click="editHandle(data.id)"
              >编辑</lay-button
            >
            <lay-button type="primary" size="xs" v-if="edingKeys[data.id]" @click="deleteEdit(data.id)"
              >保存</lay-button
            >
          </template>
        </lay-table>
      </lay-card>
    </lay-container>
  </div>
</template>

<script lang="ts">
import { ref, watch, reactive } from "vue";
import { layer } from "@layui/layer-vue";

export default {
  setup() {
    const edingKeys = ref<string[]>([]);

    const columns28 = [
      {
        title: "名称",
        width: "200px",
        key: "username",
        customSlot: "username",
      },
      {
        title: "描述",
        key: "password",
      },
      {
        title: "重量",
        key: "sex",
        width: "100px",
      },
      {
        title: "备注",
        key: "remark",
        ellipsisTooltip: true,
      },
      {
        title: "操作",
        width: "180px",
        key: "operate",
        customSlot: "operate",
        ellipsisTooltip: true,
      },
    ];

    const dataSource28 = ref([
      {
        id: "1",
        username: "root",
        password: "root",
        sex: "男",
        age: "18",
        remark: "layui - vue（谐音：类 UI) ",
      },
      {
        id: "2",
        username: "root",
        password: "root",
        sex: "男",
        age: "18",
        remark: "layui - vue（谐音：类 UI) ",
      },
      {
        id: "3",
        username: "woow",
        password: "woow",
        sex: "男",
        age: "20",
        remark: "layui - vue（谐音：类 UI) ",
      },
      {
        id: "4",
        username: "woow",
        password: "woow",
        sex: "男",
        age: "20",
        remark: "layui - vue（谐音：类 UI) ",
      },
      {
        id: "5",
        username: "woow",
        password: "woow",
        sex: "男",
        age: "20",
        remark: "layui - vue（谐音：类 UI) ",
      },
    ]);

    const editHandle = (key: string) => {
      edingKeys.value.push(key);
    };

    const deleteEdit = (key: string) => {
      edingKeys.value.splice(edingKeys.value.indexOf(key), 1);
    };

    const changeUsername = (val: string, data: any) => {
      dataSource28.value.forEach((element) => {
        if (element.id == data.id) {
          element.username = val;
        }
      });
    };

    return {
      edingKeys,
      deleteEdit,
      columns28,
      editHandle,
      dataSource28,
      changeUsername,
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 20px;
}

.describe {
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
