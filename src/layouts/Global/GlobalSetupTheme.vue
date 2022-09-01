<template>
  <ul class="global-setup-theme">
    <li class="global-setup-theme-item">
      <a href="javascript:;">
        <div><span class="logo"></span><span class="head"></span></div>
        <div><span class="menu"></span><span class="body"></span></div>
      </a>
    </li>
    <li class="global-setup-theme-item">
      <a href="javascript:;">
        <div><span class="logo"></span><span class="head"></span></div>
        <div><span class="menu"></span><span class="body"></span></div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "GlobalSetupTheme",
};
</script>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.global-setup-theme {
  padding: 10px 10px;
}

.global-setup-theme-item {
  width: 74px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 0 20px 0 0;
  padding: 2px 2px 2px 2px;
  background-color: #f2f2f2;
  cursor: pointer;
  .logo {
    display: block;
    width: 20%;
    float: left;
    height: 12px;
    background: #28333e;
  }
  .head {
    display: block;
    width: 80%;
    float: left;
    height: 12px;
    background: white;
  }
  .menu {
    display: block;
    width: 20%;
    float: left;
    height: 40px;
    background: #28333e;
  }
  .body {
    display: block;
    width: 80%;
    float: left;
    height: 40px;
    background: #f4f5f7;
  }
}
</style>
