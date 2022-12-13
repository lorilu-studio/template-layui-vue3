<template>
  <lay-container style="margin-top:10px;">
        <lay-card>
          <Calendar>
            <template v-slot="data">
              <div
                class="custom-class"
              >
                <span
                  >{{ data.year }}-{{ data.month }}-{{ data.day }}</span
                >
                <p>自定义内容</p>
              </div>
            </template>
          </Calendar>
        </lay-card>
  </lay-container>
</template>

<script setup lang="ts">
import Calendar from "../../components/Calendar.vue";
</script>
