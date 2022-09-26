<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App_m",
  components: {},
};
</script>

<style lang="scss">
body {
  min-width: 786px !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
