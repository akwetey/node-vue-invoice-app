<template>
  <nav class="app-header navbar-expand-lg navbar fixed-top">
    <div class="container-fluid">
      <router-link :to="{ name: 'dashboard' }" href="" class="navbar-brand text-white">
        Dashboard
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>