<script>
import { RouterLink, RouterView } from "vue-router";
import Pokemon from "./views/Pokemon.vue";

export default {
  name: "App",
  components: { Pokemon },
};
</script>

<template>
  <!-- <Pokemon /> -->
  <RouterView />
</template>

