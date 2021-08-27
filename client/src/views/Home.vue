<template>
  <div>
    <Header />
    <Sidebar :data="getAllInvoices" />
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
  components: { Sidebar, Header },
  data() {
    return {
      data: [],
    };
  },
  computed: {
    getAllInvoices() {
      return this.$store.getters.getAllInvoices;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("getInvoices");
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
