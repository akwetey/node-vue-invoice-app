<template>
  <div>
    <Header />
    <Sidebar :data="data" />
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
import axios from "axios";
export default {
  name: "Main",
  components: { Sidebar, Header },
  data() {
    return {
      data: [],
    };
  },
  async created() {
    try {
      const { data: res } = await axios.get(
        "http://localhost:3000/api/invoices"
      );
      this.data = res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
