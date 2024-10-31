<script setup>
import { RouterLink } from 'vue-router'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  Cookies.remove('token')
  Cookies.remove('user')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2">
      <div class="sticky top-0 w-full h-screen text-white bg-blue-800">
        <h3 class="p-5 text-xl font-bold">Main menu</h3>
        <ul class="flex flex-col p-5 space-y-7">
          <RouterLink to="/dashboard" class="p-1 font-medium border-b">Dashboard</RouterLink>
          <RouterLink to="/users" class="p-1 font-medium border-b">Users</RouterLink>
          <a class="p-1 font-medium border-b cursor-pointer" @click="logout"
            >Longout</a
          >
        </ul>
      </div>
    </div>
    <div class="col-span-10 mt-5 ms-10">
      <slot></slot>
    </div>
  </div>
</template>
