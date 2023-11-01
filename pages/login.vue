<template>
  <hanko-auth @onAuthFlowCompleted="afterLogin()" />
</template>

<script setup lang="ts">
function afterLogin() {
  window.location.href = '/profile'
}
</script>