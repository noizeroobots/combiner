<script setup>
import {defineEmits, ref} from 'vue';
import TheLogo from "./TheLogo.vue";
import TheHeaderProgress from "./TheHeaderProgress.vue";
import '../style/the-header-style.css';
const emit = defineEmits(['reset-view']);

const handleResetView = () => {
  emit('reset-view');
};
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-turquoise">
    <TheLogo/>
    <div class="flex items-center">
      <button @click="handleResetView" class="reset-button">На главную</button>
      <TheHeaderProgress/>
    </div>
  </header>
</template>
