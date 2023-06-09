<script setup lang="ts">
// import TestCom from '../../src/index'
import { LoginArea, SimulateLoginPlugin } from 'dev-login-plugin'
import 'dev-login-plugin/index.css'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <SimulateLoginPlugin content="abc">
    <template #default>
      <span>hello world</span>
    </template>
  </SimulateLoginPlugin>
  <LoginArea />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
