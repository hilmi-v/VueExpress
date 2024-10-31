<script setup>
import Sidebar from '@/components/Sidebar.vue'
import TopTitle from '@/components/TopTitle.vue'
import { ref, onMounted } from 'vue'
import Cookie from 'js-cookie'
import Api from '../../../../services/api.js'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'

const users = ref([])
const token = Cookie.get('token')

const fetchUsers = async () =>{
  Api.defaults.headers.common['Authorization'] = token
  Api.get('api/admin/users')
    .then(response => {
      users.value = response.data.data
    })
}

const deleteConfirm = (id) => {
  Swal.fire({
  title: "Are you sure?",
  text: "Delete this user!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    deleteUser(id)
    Swal.fire({
      title: `Deleted!`,
      text: "User been deleted." ,
      icon: "success"
    });
  }
});
}

const deleteUser = async (id) => {
  Api.defaults.headers.common['Authorization'] = token
  Api.delete(`api/admin/users/${id}`)
    .then(() => {
      fetchUsers()
    })
}

onMounted(() => {
  fetchUsers()
})

</script>
<template>
  <Sidebar>
    <TopTitle title="Users" />
    <table class="table w-full table-striped">
    <div class="">
    <RouterLink :to="{name: 'users.create'}" class="block px-4 py-3 my-3 text-white bg-green-600 rounded-lg w-fit hover:bg-green-700 ">Add User</RouterLink>
    </div>
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="users.length === 0">
        <td colspan="4" class="text-center">No users found</td>
      </tr>
      <tr v-else v-for="(user, index) in users" :key="index">
        <td>{{index + 1}}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <RouterLink :to="{name: 'users.edit', params: {id: user.id}}" class="px-4 py-2 mr-2 text-white bg-yellow-300 rounded-lg">Edit</RouterLink>
          <button class="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg" @click="deleteConfirm(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
    </table >

  </Sidebar>
</template>
