<template>
  <div class="layui-calendar">
    <h1 class="layui-calendar-header">
      <span class="layui-calendar-header-month">{{
        nian + " " + hanziyue + "月"
      }}</span>
      <div class="layui-calendar-header-action"></div>
      <lay-button-group  class="layui-calendar-header-today">
        <lay-button  @click="gaimonth(-1)" size="sm">
            <span>上个月</span>
        </lay-button>
        <lay-button  @click="gaimonth(1)" size="sm">
            <span>下个月</span>
        </lay-button>
        <lay-button @click="getnianyueri()" size="sm" type="primary">回到今天</lay-button>
      </lay-button-group>
    </h1>
    <div class="layui-calendar-content">
        <div class="layui-calendar-content-header" v-for="item of 7">
        {{ item == 7 ? weektozh(0) : weektozh(item) }}
        </div>

      <div
        class="layui-calendar-content-item"
        :class="[item.day === xianzaitime.ri &&
              item.month === xianzaitime.yue &&
              item.year === xianzaitime.nian ? 'layui-this':'',item.month !== yue ? 'not-current-month-day' : '']"
        v-for="item in daylist"
        :key="item.timestamp"
        @click="clickevent(item)"
      >
        <div>
          <span>{{ item.day }}</span>
        </div>
        <slot
          :year="item.year"
          :month="item.month"
          :day="item.day"
          :week="item.week"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits, onMounted } from "vue";
import { numtozh, weektozh } from "./constant";

const daylist = ref([]);
const xianzaitime = ref({});
const shijian = ref(null);
const nian = ref(null);
const yue = ref(null);
const ri = ref(null);

const emit = defineEmits(["handleclick", "changemonth"]);

const getnianyueri = (canshu = null) => {
  // 置空日期列表
  daylist.value = [];
  if (canshu) {
    shijian.value = new Date(canshu);
  } else {
    shijian.value = new Date();
  }
  nian.value = shijian.value.getFullYear();
  yue.value = shijian.value.getMonth() + 1;
  ri.value = shijian.value.getDate();
  // 当前显示月份改变后，需要向父组件抛出，父组件可以根据月份更新日程
  emit("changemonth", { year: nian.value, month: yue.value });
  tianchong();
};

// 计算需要展示的第一个日期
const startandendday = () => {
  const cloneNowDate = new Date(shijian.value);
  // 先获取这个月的第一天
  const firstdaytime = cloneNowDate.setDate(1);
  // 获取第一天是周几  ，修改2021年7月26日 14:42:58，周日是0不是7，我草。
  let firstdayweek = new Date(firstdaytime).getDay();
  if (firstdayweek === 0) {
    firstdayweek = 7;
  }
  // 展示时间的第一天
  return firstdaytime - (firstdayweek - 1) * 24 * 60 * 60 * 1000;
};

// 向列表填充数据
const tianchong = () => {
  const starttime = startandendday();
  for (let i = 0; i <= 60; i++) {
    let shuju = {};
    const timestamp = starttime + i * 24 * 60 * 60 * 1000;
    const sj = new Date(timestamp);
    const nian1 = sj.getFullYear();
    const yue1 = sj.getMonth() + 1;
    const ri1 = sj.getDate();
    const week = sj.getDay();
    if (yue.value === 1) {
      if (yue1 > yue.value && yue1 !== 12) {
        if (week === 1 || week === 7) {
          break;
        }
      }
    } else if (yue.value === 12) {
      if (yue1 - yue.value === -11) {
        if (week === 1 || week === 7) {
          break;
        }
      }
    } else {
      if (yue1 > yue.value) {
        if (week === 1 || week === 7) {
          break;
        }
      }
    }
    shuju["timestamp"] = timestamp;
    shuju["year"] = nian1;
    shuju["month"] = yue1;
    shuju["day"] = ri1;
    shuju["week"] = week;
    shuju["zhou"] = weektozh(week);
    daylist.value.push(shuju);
  }
};

// 日期点击事件
const clickevent = (item) => {
  emit("handleclick", item);
  // 如果点击的日期不是当前月的，修改当前时间
  if (item.month !== yue.value) {
    getnianyueri(item.timestamp);
  }
};

// 数字转汉字
const hanziyue = computed(() => {
  return numtozh(yue.value);
});

// 点击上个月或者下个月
const gaimonth = (num) => {
  let newmonth = yue.value + num;
  // 如果大于12，转到下一年
  if (newmonth > 12) {
    nian.value += 1;
    newmonth = 1;
  }
  const sj = new Date(
    Date.parse(nian.value + "/" + newmonth + "/" + ri.value)
  ).getTime();
  getnianyueri(sj);
};

const getnow = () => {
  const sj = new Date();
  xianzaitime.value["nian"] = sj.getFullYear();
  xianzaitime.value["yue"] = sj.getMonth() + 1;
  xianzaitime.value["ri"] = sj.getDate();
};

onMounted(() => {
  getnow();
  getnianyueri();
})
</script>

<style>
.layui-calendar-header {
    border: 1px solid #eee;
    border-bottom: none;
    background-color: #fafafa;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
}

.not-current-month-day {
    background-color: #FAFAFA;
}

.layui-calendar-header-action {
    flex-grow: 1;
    text-align: center;
}

.layui-this {
    background-color: #009688;
    color: white;
}

.layui-calendar-content {
    display: flex;
    flex-wrap: wrap;
}

.layui-calendar-content .layui-calendar-content-header{
    background-color: #FAFAFA;
}

.layui-calendar-content .layui-calendar-content-header,
.layui-calendar-content .layui-calendar-content-item{
    border-collapse: collapse;
    width: 14.28571428571429%;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 10px;
}
</style>