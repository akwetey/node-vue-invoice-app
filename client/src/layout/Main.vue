<template>
 <div>
    <Header />
    <Sidebar />
    <div class="app-content">
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default {
  name: "Main",
  components: {Sidebar, Header}
}
</script>

<style scoped>

</style>