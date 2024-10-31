<script setup>
import TopTitle from '@/components/TopTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="p-5 shadow-sm">
    <TopTitle title="Vue X Express user Crud and Auth" />
  </div>
  <div class="flex justify-center gap-4 p-5 mx-auto shadow-sm">
    <RouterLink
      to="/login"
      class="px-3 py-2 font-semibold text-white bg-blue-600 rounded-lg"
    >
      Login
    </RouterLink>
    <RouterLink
      to="/register"
      class="px-3 py-2 font-semibold text-white bg-green-600 rounded-lg"
    >
      Register
    </RouterLink>
  </div>
</template>
