<script setup lang="ts">
function logout() {
  localStorage.removeItem(process.env.NUXT_PUBLIC_USER_TOKEN as string)
  window.location.href = '/'
}
</script>

<template>
  <el-button @click="logout">
      Log out
  </el-button>
</template>