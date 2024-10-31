<script setup>
import layout from '@/components/Layouts/Admin.vue'
import TopTitle from '@/components/TopTitle.vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import Cookies from 'js-cookie'
import api from '@/../services/api'
import Swal from 'sweetalert2'
const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  password: '',
})

const validation = ref([])

const token = Cookies.get('token')
const createUser = async () => {
  api.defaults.headers.common['Authorization'] = token
  await api
    .post('api/admin/users', user)
    .then(response => {
      console.log(response)
      router.push({ name: 'users.index' })
      Swal.fire({
        title: 'Good job!',
        text: 'User created successfully',
        icon: 'success',
      })
    })
    .catch(error => {
      console.log(error.response.data)
      validation.value = error.response.data.errors
    })
}
</script>
<template>
  <layout class="">
    <TopTitle title="Create User" />
    <RouterLink
      :to="{ name: 'users.index' }"
      class="block px-4 py-3 my-3 text-white bg-gray-600 rounded-lg w-fit hover:bg-gray-700"
      >back</RouterLink
    >
    <div class="" v-if="validation">
      <u>
        <li v-for="(error, index) in validation" :key="index">
          {{ error.path }} : {{ error.msg }}
        </li>
      </u>
    </div>

    <div class="flex w-full max-w-5xl p-10 mx-auto rounded-lg shadow-lg">
      <form @submit.prevent="createUser" class="grid w-full grid-cols-1 gap-4">
        <label for="name">Name : </label>
        <input
          v-model="user.name"
          type="text"
          required
          class="w-full bg-gray-100 rounded-lg form-input"
          id="name"
          placeholder="Enter your name"
        />
        <label for="email">Email : </label>
        <input
          v-model="user.email"
          type="email"
          required
          class="w-full bg-gray-100 rounded-lg form-input"
          id="email"
          placeholder="enter your email"
        />
        <label for="password">Password : </label>
        <input
          v-model="user.password"
          type="text"
          id="password"
          required
          class="w-full bg-gray-100 rounded-lg form-input"
          placeholder="enter your password"
        />
        <button
          type="submit"
          class="w-full p-2 text-white bg-green-600 rounded-lg"
        >
          create
        </button>
      </form>
    </div>
  </layout>
</template>
