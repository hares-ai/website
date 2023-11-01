<script setup lang="ts">
function logout() {
  window.location.href = '/'
}
</script>

<template>
  <el-button @click="logout" plain>
      Log out
  </el-button>
</template>