<script lang="ts" setup>
useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" },
  ],
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
</script>

<template>
  <VitePwaManifest />
  <El-Container id="_app">
    <AppHeader></AppHeader>
    <El-Main>
      <slot />
    </El-Main>
    <AppFooter></AppFooter>
  </El-Container>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  background-color: #000;
  color: #fff;
}

body {
  margin: 0;
  font-family: 'Sometype Mono';
}

#_app,
body {
  min-height: 100%;
}

#__nuxt {
  height: 100%;
}

#_app {
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>