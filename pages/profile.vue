<template>
  <hanko-profile />
  <LogoutButton />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["hanko-logged-in"],
});
</script>
