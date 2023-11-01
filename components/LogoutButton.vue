<script setup lang="ts">
const hanko = useHanko()
function logout() {
  hanko!.user.logout()
  // window.location.href = '/'
}
</script>

<template>
  <button @click="logout">
      Log out
  </button>
</template>