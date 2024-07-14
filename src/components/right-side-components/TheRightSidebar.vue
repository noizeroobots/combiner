<script setup>
// Импорт стилей
import '../../style/right-sidebar-style.css';
import { ref, onMounted } from 'vue';
import { fetchTickers } from '../../api.js';

// Создаем реактивное состояние для хранения тикеров
const tickers = ref([]);

// Получаем тикеры при монтировании компонента
onMounted(async () => {
  tickers.value = await fetchTickers();
});
</script>

<template>
  <div class="right-sidebar">
    <h2>Инструмент</h2>
    <ul>
      <li v-for="ticker in tickers" :key="ticker">
        <a href="#">{{ ticker }}</a>
      </li>
    </ul>
  </div>
</template>
