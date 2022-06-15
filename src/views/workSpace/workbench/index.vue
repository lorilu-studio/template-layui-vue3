<template>
  <lay-container fluid="true" style="padding:10px">
    <lay-panel lay-panel>
      <lay-avatar :src="userInfoStore.userInfo.avatar" radius></lay-avatar>
    </lay-panel>
    <lay-row space="10">
      <lay-col md="6" sm="6" xs="12">
        <lay-card>1</lay-card>
      </lay-col>
      <lay-col md="6" sm="6" xs="12">
        <lay-card>2</lay-card>
      </lay-col>
      <lay-col md="6" sm="6" xs="12">
        <lay-card>3</lay-card>
      </lay-col>
      <lay-col md="6" sm="6" xs="12">
        <lay-card>4</lay-card>
      </lay-col>
      <lay-col md="18" sm="18" xs="24">
        <lay-card>5</lay-card>
      </lay-col>
      <lay-col md="6" sm="6" xs="24">
        <lay-card>6</lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>
<script lang="ts">
import { onMounted,defineComponent, ref } from "vue";
import Http from '../../../api/http';
import { useUserInfoStore } from "../../../store/userInfo";

export default defineComponent({
  setup() {
    const userInfoStore = useUserInfoStore();
    
    onMounted(()=> {
      Http.post('/workSpace/workbench/getDynamicList').then((res)=> {
        console.log(res)
      })
    });

    return {
      userInfoStore
    };
  },
});
</script>
