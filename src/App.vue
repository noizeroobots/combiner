<script setup>
import {ref} from 'vue';
import TheHeader from "./components/TheHeader.vue";
import CandlestickChart from "./components/CandlestickChart.vue";
import TheRightSidebar from "./components/right-side-components/TheRightSidebar.vue";
import CandlestickChart4Hours from "./components/CandlestickChart4Hours.vue";

import './style/app-vue-style.css';

// Создаем реактивное состояние для управления отображением графиков
const show4HChart = ref(false);

const show4H = () => {
  show4HChart.value = true;
};

const show1H = () => {
  show4HChart.value = false;
};
</script>

<template>
  <TheHeader/>

  <div class="main-container">
    <div class="content-container">
    <div class="button-container">
      <button
          :class="['switch-button', { active: !show4HChart }]"
          @click="show1H">Показать 1Н</button>
      <button
          :class="['switch-button', { active: show4HChart }]"
          @click="show4H">Показать 4Н</button>
    </div>

    <!-- Условный рендеринг графиков -->
    <div class="chart-container">
      <CandlestickChart v-if="!show4HChart" class="chart"/>
      <CandlestickChart4Hours v-else class="chart"/>
    </div>
  </div>
  <TheRightSidebar />
  </div>
</template>

