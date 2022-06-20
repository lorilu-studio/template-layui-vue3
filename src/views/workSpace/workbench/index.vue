<template>
  <lay-container fluid="true" style="padding:10px">
    <!-- 顶部个人信息 -->
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
    <!-- 菜单按钮行 -->
    <lay-row space="20" style="margin-top: 10px;">
      <lay-col md="3" sm="6" xs="12" v-for="(item,index) in menuList" :key="index">
        <lay-card  shadow="hover" style="min-width: 0; text-align: center;padding: 12px;">
          <lay-icon  style="font-size:32px;" :type="item.icon" :color="item.iconColor"></lay-icon>
          <h4 style="margin-top: 10px; line-height: normal;">{{item.name}}</h4>
        </lay-card>
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

    // 用户信息store
    const userInfoStore = useUserInfoStore();
    // 获取用户信息
    const getUserInfo = async ()=> {
      let userInfo = await Http.post('/userInfo/getUserInfo', {token: userInfoStore.token});
      // 存用户信息
      userInfoStore.userInfo = userInfo.data;
    }


     // 统计信息
    const statisticsInfo = ref({
      'projectCount': 0,
      'toDoCount': 0,
      'finishCount': 0,
      'msgCount': 0
    });
    // 获取统计信息
    const getStatisticsInfo = async ()=> {
      let res = await Http.post('/workSpace/workbench/getStatisticsInfo');
      statisticsInfo.value = res.data;
    };

    // 菜单按钮列表
    const menuList = [
      {
        name: '用户',
        icon: 'layui-icon-username',
        iconColor: '#69c0ff',
        url: '',
      },
      {
        name: '分析',
        icon: 'layui-icon-chart',
        iconColor: 'rgb(149, 222, 100)',
        url: '',
      },
      {
        name: '商品',
        icon: 'layui-icon-cart-simple',
        iconColor: 'rgb(255, 156, 110)',
        url: '',
      },
      {
        name: '订单',
        icon: 'layui-icon-form',
        iconColor: 'rgb(179, 127, 235)',
        url: '',
      },
      {
        name: '票据',
        icon: 'layui-icon-layer',
        iconColor: 'rgb(255, 214, 102)',
        url: '',
      },
      {
        name: '消息',
        icon: 'layui-icon-email',
        iconColor: 'rgb(92, 219, 211)',
        url: '',
      },
      {
        name: '标签',
        icon: 'layui-icon-note',
        iconColor: 'rgb(255, 133, 192)',
        url: '',
      },
      {
        name: '配置',
        icon: 'layui-icon-slider',
        iconColor: 'rgb(255, 192, 105)',
        url: '',
      }
    ];
    onMounted(()=> {
      getUserInfo();
      getStatisticsInfo();
    });

    return {
      userInfoStore,
      statisticsInfo,
      menuList
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
