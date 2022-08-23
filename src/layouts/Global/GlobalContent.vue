<template>
    <div class="global-content">
      <lay-transition type="fade">
        <router-view v-if="appStore.routerAlive"></router-view>
      </lay-transition>
    </div>
</template>

<script lang="ts">
export default {
    name: "GlobalContent"
}
</script>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";

const appStore = useAppStore();
</script>

<style scoped>
.global-content {
    height: calc(100% - 46px);
    overflow: auto;
}
</style>