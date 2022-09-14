<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/navbar/Navbar.vue";


export default {
    name: "App",
    components: { Navbar }
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

