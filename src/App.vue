<script setup>
import { ref } from 'vue';
import TheHeader from "./components/TheHeader.vue";
import CandlestickChart from "./components/CandlestickChart.vue";
import TheRightSidebar from "./components/right-side-components/TheRightSidebar.vue";
import CandlestickChart4Hours from "./components/CandlestickChart4Hours.vue";

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
    <div class="button-container">
      <button class="switch-button" @click="show1H">Показать 1Н</button>
      <button class="switch-button" @click="show4H">Показать 4Н</button>
    </div>

    <!-- Условный рендеринг графиков -->
    <div class="chart-container">
      <CandlestickChart v-if="!show4HChart" class="chart" />
      <CandlestickChart4Hours v-else class="chart" />
    </div>
  </div>
  <TheRightSidebar class="sidebar" />
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  margin-bottom: 20px;
}

.switch-button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.switch-button:hover {
  background-color: #0056b3;
}

.chart-container {
  width: 100%;
  height: 400px; /* можно настроить под нужные размеры */
}

.chart {
  width: 100%;
  height: 100%;
}

.sidebar {
  /* стили для сайдбара */
}
</style>
