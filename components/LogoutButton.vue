<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

function logout() {
  localStorage.removeItem(runtimeConfig.public.UserToken)
  window.location.href = '/'
}
</script>

<template>
  <el-button @click="logout">
      Log out
  </el-button>
</template>