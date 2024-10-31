<script setup>
import layout from '@/components/Layouts/Admin.vue'
import TopTitle from '@/components/TopTitle.vue'

import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'

import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import Api from '@/../services/api'

const router = useRouter()
const route = useRoute()
const token = Cookies.get('token')

const validation = ref([])
const user = reactive({
  name: '',
  email: '',
  password: '',
})

onMounted(async () => {
  Api.defaults.headers.common['Authorization'] = token
  Api.get('api/admin/users/' + route.params.id).then(response => {
    user.name = response.data.data.name
    user.email = response.data.data.email
  })
})

//method updateUser
const updateUser = async () => {
  //call api store user
  Api.defaults.headers.common['Authorization'] = token
  await Api
    .put(`/api/admin/users/${route.params.id}`, {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .then(() => {
      //redirect ke halaman users index
      router.push({
        name: 'users.index',
      })
      Swal.fire({
        title: 'Good job!',
        text: 'User Updated successfully',
        icon: 'success',
      })
    })
    .catch(error => {
      //assign validation value with error
      validation.value = error.response.data
    })
}

</script>
<template>
  <layout class="">
    <pre>
      {{ router.data }}
    </pre>
    <TopTitle title="Edit User" />
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
      <form @submit.prevent="updateUser" class="grid w-full grid-cols-1 gap-4">
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
          class="w-full p-2 text-white bg-yellow-400 rounded-lg"
        >
          Edit
        </button>
      </form>
    </div>
  </layout>
</template>
