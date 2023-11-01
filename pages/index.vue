<template>
  <h1>HOST, SHARE, DEPLOY<br>YOUR AI ASSETS.</h1>
  <img class="mascot" src="~/assets/hares01.png" alt="hah">
  <div class="panel">
    <el-button type="primary">Upload a model</el-button>
    <el-button type="primary">Upload ComfyUI workflow</el-button>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-family: 'Sometype Mono';
  margin-top: 40px;
  margin-left: 160px;
  font-size: 40px;
  line-height: 65px;
}

.mascot {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
  user-select: none;
}

.panel {
  margin-left: 160px;
}
</style>