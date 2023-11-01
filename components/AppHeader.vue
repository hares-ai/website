<template>
  <el-header class="app-header">
    <NuxtLink to="/" class="name">
      <img class="logo" src="~/assets/logo.svg" alt="">
      <span>hares.ai</span>
    </NuxtLink>
    <LogoutButton v-if="isLogined"></LogoutButton>
    <NuxtLink to="/login" v-else>
      <el-button plain>Sign In</el-button>
    </NuxtLink>
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

  .name {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }

    span {
      font-family: 'Sometype Mono';
    }
  }
}
</style>