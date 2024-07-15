<script setup>
import '../../style/right-sidebar-style.css';
import { ref, onMounted, defineEmits } from 'vue';
import { fetchTickers } from '../../api.js';

// Создаем реактивное состояние для хранения тикеров
const tickers = ref([]);
const selectedTicker = ref(null);

// Создаем функцию emit
const emit = defineEmits(['select-ticker']);

// Получаем тикеры при монтировании компонента
onMounted(async () => {
  tickers.value = await fetchTickers();
  console.log("DEBUG: Получаем тикеры при монтировании компонента ", tickers.value)
});

// Эмитим событие при нажатии на тикер
const selectTicker = (ticker) => {
  selectedTicker.value = ticker;
  emit('select-ticker', ticker);
};
</script>

<template>
  <div class="right-sidebar">
    <h2>Инструмент</h2>
    <ul>
      <li v-for="ticker in tickers" :key="ticker">
        <a href="#" @click.prevent="selectTicker(ticker)" :class="{ 'active': ticker === selectedTicker }" >
          {{ ticker }}
        </a>
      </li>
    </ul>
  </div>
</template>
