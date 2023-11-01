<template>
  <nav class="app-header">
    <NuxtLink to="/">Header</NuxtLink>
    <LogoutButton v-if="isLogined"></LogoutButton>
    <NuxtLink to="/login" v-else>Sign In</NuxtLink>
  </nav>
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
  height: 50px;
  background-color: gray;
}
</style>