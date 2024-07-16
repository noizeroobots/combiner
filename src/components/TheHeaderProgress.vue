<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import '../style/the-header-style.css';
</script>


<template>

<a href="#" class="text-sm">
      <div v-if="true" class="flex items-center gap-1 justify-between border-b bg-turquoise text-progress">
        Day complete!
        <CheckCircleIcon class="h-7 text-green-500 bg-turquoise" />
      </div>

      <div v-else class="flex items-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>

        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
</template>