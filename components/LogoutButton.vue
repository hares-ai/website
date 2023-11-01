<script setup lang="ts">
const hanko = useHanko()
function logout() {
  hanko!.user.logout()
  // window.location.href = '/'
}
</script>

<template>
  <el-button @click="logout" plain>
      Log out
  </el-button>
</template>