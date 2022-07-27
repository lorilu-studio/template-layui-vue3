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
    <lay-row space="20" style="margin-top: 10px;margin-bottom: 10px;">
      <lay-col md="3" sm="6" xs="12" v-for="(item,index) in menuList" :key="index">
        <lay-card  shadow="hover" style="min-width: 0; text-align: center;padding: 12px;">
          <lay-icon  style="font-size:32px;" :type="item.icon" :color="item.iconColor"></lay-icon>
          <h4 style="margin-top: 10px; line-height: normal;">{{item.name}}</h4>
        </lay-card>
      </lay-col>
    </lay-row>
    
    <lay-row space="20">
      <!-- 最近动态模块 -->
      <lay-col md="8" sm="24" xs="24" >
        <lay-card  shadow="hover" style="min-width: 0;">
          <template v-slot:title>
            最近动态
          </template>
          <template v-slot:body>
            <lay-scroll height="300px">
              <lay-timeline>
                  <lay-timeline-item v-for="(item,index) in dynamicList" :key="index" 
                  :title="`${item.time}&nbsp;&nbsp;&nbsp;${item.name}&nbsp;&nbsp;${item.status===1?'解决':'指派'}了${item.type===1?'bug':'任务'}&nbsp;${item.title}`" simple >
                      <template #dot>
                          <lay-icon type="layui-icon-circle" :color="item.status===1?'red':'green'"></lay-icon>
                      </template>
                  </lay-timeline-item>
              </lay-timeline>
            </lay-scroll>
          </template>
        </lay-card>
      </lay-col>

      <!-- 我的任务模块 -->
      <lay-col md="8" sm="24" xs="24" >
        <lay-card  shadow="hover" style="min-width: 0;">
          <template v-slot:title>
            我的任务
          </template>
          <template v-slot:body>
            <lay-table :columns="taskColumns" :dataSource="taskList" height="258px">
               <template v-slot:priority="{ data }">
                 <span :class="`num-tag ${data.priority === 1 ? 'red' : data.priority === 2 ? 'orange' : data.priority === 3 ? 'blue' : ''}`">
                   {{data.priority}} 
                 </span>
               </template>
               <template v-slot:status="{ data }">
                 <span class="task-status" :style="`color: ${data.status === 1 ? 'orange' : data.status === 2 ? 'green' : data.status === 3 ? 'gray' : ''}`">
                   {{data.status === 1 ? '未开始' : data.status === 2 ? '进行中' : data.status === 3 ? '已完成' : ''}} 
                 </span>
               </template>
            </lay-table>
          </template>
        </lay-card>
      </lay-col>
      <!-- 最近动态模块 -->
      <lay-col md="8" sm="24" xs="24" >
        <lay-card  shadow="hover" style="min-width: 0;">
          <template v-slot:title>
            本月目标
          </template>
          <template v-slot:body>
            <div style="height: 300px;lin width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <lay-progress
                :percent="(targetInfo.finish/targetInfo.all)*100"
                circle
                :circleWidth="15"
                :show-text="true"
                :text="targetInfo.finish"
              >
                <template v-slot:text="{  }">
                  <span>asdsadasdasd</span>
                </template>
              </lay-progress>
              <p>{{(targetInfo.finish/targetInfo.all)*100 > 70 ? '恭喜，本月目标已达标！' : '加油， 就快达标了！'}}</p>
            </div>
          </template>
        </lay-card>
      </lay-col>

      <!-- 项目进度模块 -->
      <lay-col md="16" sm="24" xs="24" >
        <lay-card  shadow="hover" style="min-width: 0;">
          <template v-slot:title>
            项目进度
          </template>
          <template v-slot:body>
            <lay-table :columns="projectColumns" :dataSource="projectList" height="258px">
               <template v-slot:name="{ data }">
                 <span style="color:cornflowerblue">
                   {{data.name}} 
                 </span>
               </template>
               <template v-slot:status="{ data }">
                 <span :style="`color: ${data.status === 1 ? 'green' : data.status === 2 ? 'red' : data.status === 3 ? 'orange' : data.status === 4 ? 'gray' : ''}`">
                   {{data.status === 1 ? '进行中' : data.status === 2 ? '已延期' : data.status === 3 ? '未开始' : data.status === 4 ? '已结束' : ''}} 
                 </span>
               </template>
               <template v-slot:progress="{ data }">
                <span>
                  <span style="display: inline-block;  width: 70%;">
                    <lay-progress size="small" :percent="data.progress" ></lay-progress>
                  </span>
                  <span style="display: inline-block;  width: 30%; box-sizing: border-box;padding-left: 5px;">
                    {{data.progress}}%
                  </span>
                </span>

               </template>
            </lay-table>
          </template>
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
      let {data} = await Http.post('/userInfo/getUserInfo', {token: userInfoStore.token});
      // 存用户信息
      userInfoStore.userInfo = data;
      console.log(userInfoStore);

    }


     // 统计信息
    let statisticsInfo = ref({
      'projectCount': 0,
      'toDoCount': 0,
      'finishCount': 0,
      'msgCount': 0
    });
    // 获取统计信息
    const getStatisticsInfo = async ()=> {
      let {data} = await Http.post('/workSpace/workbench/getStatisticsInfo');
      statisticsInfo.value = data;
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
    // 动态列表
    let dynamicList = ref([]);
    // 获取动态列表
    const getDynamicList = async ()=> {
      let {data} = await Http.post('/workSpace/workbench/getDynamicList');
      // 存用户信息
      dynamicList.value = data;
    };

    //任务列表
    let taskList = ref([]);
    let taskColumns=[
      {
        title:"优先级",
        key:"priority",
        customSlot:"priority",
        width: '100px',
        align: 'center'
      },{
        title:"任务名称",
        key:"name",
      },{
        title:"状态",
        key:"status",
        customSlot:"status",
        width: '100px',
        align: 'center'
      }
    ];
    // 获取任务列表
    const getMyTask = async () => {
      let {data} = await Http.post('/workSpace/workbench/getMyTask');
      taskList.value = data;
    };


    // 目标完成信息
    let targetInfo = ref({
      all: 0,
      finish: 0
    });
    // 获取目标完成信息
    const getTargetInfo = async () => {
      let {data: {all, finish}} = await Http.post('/workSpace/workbench/getTargetInfo');
      targetInfo.value.all = all;
      targetInfo.value.finish = finish;

    };


    //项目列表
    let projectList = ref([]);
    let projectColumns=[
      {
        type: 'number'
      },{
        title:"项目名称",
        key:"name",
        align: 'center',
        customSlot:"name",
        ellipsisTooltip: true
      },{
        title:"开始时间",
        key:"startTime",
        align: 'center',
      },{
        title:"结束时间",
        key:"endTime",
        align: 'center',
      },{
        title:"状态",
        key:"status",
        customSlot:"status",
        align: 'center',
      },{
        title:"进度",
        key:"progress",
        customSlot:"progress",
        align: 'center',
      },
    ];
    // 获取项目列表
    const getMyProject = async () => {
      let {data} = await Http.post('/workSpace/workbench/getMyProject');
      projectList.value = data;
      console.log(projectList.value,'projectList.value')
    };

    onMounted(()=> {
      getUserInfo();
      getStatisticsInfo();
      getDynamicList();
      getMyTask();
      getTargetInfo();
      getMyProject();
    });

    return {
      userInfoStore,
      statisticsInfo,
      menuList,
      dynamicList,
      taskList,
      taskColumns,
      targetInfo,
      projectList,
      projectColumns
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
   
  :deep(.layui-table-view) {
    background-color: transparent;
    margin: 0;
  }
  .num-tag {
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    border: 1px solid #aaaaaa;
    font-size: 12px;
    box-sizing: content-box;
  }
  .num-tag.red {
    color: #cf1322;
    background: #fff1f0;
    border-color: #ffa39e;
  }
  .num-tag.orange {
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  .num-tag.blue {
    color: #096dd9;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
</style>
