<template>
  <van-button type="primary" @click="showToast('toast')">button</van-button>
  <VanButton type="success" @click="showNotify('notify')">button</VanButton>
  <LazyVanButton type="default">lazy button</LazyVanButton>
  <el-button @click="ElMessage('hello')">button</el-button>
  <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazy button</LazyElButton>
  <div>hi, test pwa</div>
</template>