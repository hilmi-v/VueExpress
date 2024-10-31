<script setup>
import {ref, onMounted} from 'vue'
import Cookies from 'js-cookie'
//component
import Sidebar from '@/components/Sidebar.vue'
import TopTitle from '@/components/TopTitle.vue'
import jsCookie from 'js-cookie'

const user = ref(null)

onMounted(() => {
  const userData = Cookies.get('user')
  if(userData) {
    user.value = JSON.parse(userData)
  }
})
</script>
<template>
    <Sidebar>
    <TopTitle title="Dashboard" />
    <h2> Welcome <strong>{{user?.name}}</strong> | {{user?.email}}</h2></sidebar>

</template>
