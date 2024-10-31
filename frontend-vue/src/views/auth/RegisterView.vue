<script setup>
import TopTitle from '@/components/TopTitle.vue'
import AuthForm from '@/components/AuthForm.vue'
import { useRouter } from 'vue-router'
import api from '../../../services/api'
import { reactive, ref } from 'vue'

const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const validation = ref()

const register = async () => {
  //call api register
  if (user.password !== user.repeatPassword) {
    validation.value = {
      errors: [
        {
          path: 'password',
          msg: "Password and repeat password doesn't match",
        },
      ],
    }
  } else {
    await api
      .post('/api/register', {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then(() => {
        //redirect ke halaman login
        router.push({
          name: 'login',
        })
      })
      .catch(error => {
        //assign validation value with error
        validation.value = error.response.data
      })
  }
}
</script>

<template>
  <div>
    <TopTitle title="Register New User" />
    <div class="flex items-center justify-center w-full" v-if="validation">
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
    <div>
      <AuthForm title="register">
        <form @submit.prevent="register">
          <div class="grid grid-cols-3 gap-2">
            <label for="name" class="w-full text-left"> Name :</label>
            <input
              id="name"
              type="name"
              placeholder="Enter your name"
              class="w-full col-span-2 mb-4 rounded-lg form-input"
              v-model="user.name"
            />

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

            <label for="name" class="w-full text-left">
              repeat password :
            </label>
            <input
              type="password"
              placeholder="repeat password"
              class="w-full col-span-2 mb-4 rounded-lg form-input"
              v-model="user.repeatPassword"
            />
            <button
              type="submit"
              class="w-full col-span-3 p-2 mb-2 text-white bg-green-600 rounded-xl"
            >
              register
            </button>
          </div>
        </form>
      </AuthForm>
    </div>
  </div>
</template>
