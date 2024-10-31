<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="p-5 shadow-sm">
    <h1 class="text-3xl font-bold text-center">
      {{ props.title }}
    </h1>
  </div>
</template>
