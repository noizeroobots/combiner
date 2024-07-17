<script setup>
import {ref} from 'vue';
import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import CandlestickChart from "./components/CandlestickChart.vue";
import TheRightSidebar from "./components/right-side-components/TheRightSidebar.vue";
import CandlestickChart4Hours from "./components/CandlestickChart4Hours.vue";
import WelcomeComponent from "./components/WelcomeComponent.vue";

import './style/app-vue-style.css';

// Создаем реактивное состояние для управления отображением графиков и выбранным тикером
const show4HChart = ref(false);
const selectedTicker = ref(null);

const show4H = () => {
  show4HChart.value = true;
};

const show1H = () => {
  show4HChart.value = false;
};

// Функция для обработки выбора тикера
const handleSelectTicker = (ticker) => {
  selectedTicker.value = ticker;
};

// Функция для сброса вида на приветственный компонент
const resetView = () => {
  selectedTicker.value = null;
  show4HChart.value = false;
};

</script>

<template>

  <TheHeader @reset-view="resetView"/>

  <div class="main-container">
    <div class="content-container">

      <WelcomeComponent v-if="!selectedTicker"/>

      <div class="button-container" v-if="selectedTicker">
        <button
            :class="['switch-button', { active: !show4HChart }]"
            @click="show1H">Показать 1Н
        </button>
        <button
            :class="['switch-button', { active: show4HChart }]"
            @click="show4H">Показать 4Н
        </button>
      </div>

      <!-- Условный рендеринг графиков -->
      <div class="chart-container" v-if="selectedTicker">
        <CandlestickChart v-if="!show4HChart" :ticker="selectedTicker" class="chart"/>
        <CandlestickChart4Hours v-else :ticker="selectedTicker" class="chart"/>
      </div>
    </div>
    <TheRightSidebar @select-ticker="handleSelectTicker"/>
  </div>


</template>
