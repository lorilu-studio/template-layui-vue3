<template>
  <lay-container fluid="true" style="padding:10px">
    <lay-panel lay-panel>
      <div class="info-panel">
        <lay-avatar :src="userInfoStore.userInfo.avatar"  size="lg" radius class="avatar"></lay-avatar>
        <div class="welcome">
          <h3>早安,{{userInfoStore.userInfo.username}}。</h3>
        </div>
        <div class="statistics">
          <div>
            <div>
              <lay-icon class="icon"  type="layui-icon-app" color="#40a9ff"></lay-icon>
              项目数
            </div>
            <div class="num">
              <lay-count-up :startVal="0" :endVal="statisticsInfo.projectCount" :decimalPlaces="0" :useGrouping="false"></lay-count-up>
            </div>
          </div>
          <div>
            <div>
              <lay-icon class="icon" type="layui-icon-app" color="#ffa940"></lay-icon>
              待办项
            </div>
            <div class="num">
              <lay-count-up :startVal="0" :endVal="statisticsInfo.finishCount" :decimalPlaces="0" :useGrouping="false"></lay-count-up>/
              <lay-count-up :startVal="0" :endVal="statisticsInfo.toDoCount" :decimalPlaces="0" :useGrouping="false"></lay-count-up>
            </div>
          </div>
          <div>
            <div>
              <lay-icon class="icon" type="layui-icon-app" color="#73d13d"></lay-icon>
              消息
            </div>
            <div class="num">
              <lay-count-up :startVal="0" :endVal="statisticsInfo.msgCount" :decimalPlaces="0" :useGrouping="false"></lay-count-up>
            </div>
          </div>
        </div>
      </div>
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
    
    const statisticsInfo = ref({
      'projectCount': 0,
      'toDoCount': 0,
      'finishCount': 0,
      'msgCount': 0
    });

    // 获取用户信息
    const getUserInfo = async ()=> {
      let userInfo = await Http.post('/userInfo/getUserInfo', {token: userInfoStore.token});
      // 存用户信息
      userInfoStore.userInfo = userInfo.data;
    }
    // 获取统计信息
    const getStatisticsInfo = async ()=> {
      let res = await Http.post('/workSpace/workbench/getStatisticsInfo');
      statisticsInfo.value = res.data;
    };

    
    onMounted(()=> {
      getUserInfo();
      getStatisticsInfo();
    });

    return {
      userInfoStore,
      statisticsInfo
    };
  },
});
</script>

<style  scoped>
   .info-panel{
    padding: 10px 20px;
    display: flex;
    align-items: center;
   }
   .info-panel>.avatar {
    height: 60px;
    width: 60px;
    flex-shrink: 0;
   }
   .info-panel>.welcome {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 20px;
    overflow: hidden;
   }
    .info-panel>.welcome>h3 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 20px;
    }
   .info-panel>.statistics {
    flex-shrink: 0;
    display: flex;
   }
   .info-panel>.statistics>div {
    flex-shrink: 0;
    margin: 0 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
   }
   .info-panel>.statistics>div .icon {
    margin-right: 8px;
   }
   .info-panel>.statistics>div>.num {
    font-size: 24px;
    box-sizing: border-box;
    margin-top: 5px;
   }
</style>
