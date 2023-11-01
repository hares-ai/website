<template>
  <el-header class="app-header">
    <NuxtLink to="/">
      <span>hares.ai</span>
    </NuxtLink>
    <LogoutButton v-if="isLogined"></LogoutButton>
    <NuxtLink to="/login" v-else>Sign In</NuxtLink>
  </el-header>
</template>

<script lang="ts" setup>
const isLogined = ref(false)

onMounted(() => {
  isLogined.value = !!localStorage.getItem('hanko')
})
</script>

<style lang="scss">
.app-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>