<script setup>
import TopTitle from '@/components/TopTitle.vue'
import AuthForm from '@/components/AuthForm.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import Api from '../../../services/api'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const validation = ref([])

const login = async () => {
  await Api.post('/api/login', {
    email: user.email,
    password: user.password,
  })
    .then(response => {
      console.log(response)
      //set token and user on cookies
      Cookies.set('token', response.data.data.token, { expires: 7 })
      Cookies.set('user', JSON.stringify(response.data.data.user))

      // // Verify the token is set before redirecting
      if (Cookies.get('token')) {
        //redirect to dashboard
        router.push({ name: 'dashboard' })
      }
    })
    .catch(error => {
      //assign validation value with error
      validation.value = error.response.data
    })
}
</script>

<template>
  <div>
    <TopTitle title="Login User" />
    <div
      class="flex items-center justify-center w-full"
      v-if="validation.errors"
    >
      <ul class="flex flex-col p-4 bg-red-200 rounded-lg">
        <li
          v-for="(error, index) in validation.errors"
          :key="index"
          class="list-disc list-inside"
        >
          {{ `${error.path} : ${error.msg}` }}
        </li>
      </ul>
    </div>
    <div
      class="flex items-center justify-center w-full"
      v-if="validation.message"
    >
      <ul class="flex flex-col p-4 bg-red-200 rounded-lg">
        {{
          validation.message
        }}
      </ul>
    </div>
    <div>
      <AuthForm title="Login">
        <form @submit.prevent="login">
          <div class="grid grid-cols-3 gap-2">
            <label for="name" class="w-full text-left"> Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
              class="w-full col-span-2 mb-4 rounded-lg form-input"
              v-model="user.email"
            />

            <label for="name" class="w-full text-left"> password :</label>
            <input
              type="password"
              placeholder="Enter password"
              class="w-full col-span-2 mb-4 rounded-lg form-input"
              v-model="user.password"
            />
            <button
              type="submit"
              class="w-full col-span-3 p-2 mb-2 text-white bg-green-600 rounded-xl"
            >
              Login
            </button>
          </div>
        </form>
      </AuthForm>
    </div>
  </div>
</template>
