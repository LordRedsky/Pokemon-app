<script>
import PokemonDetail from "../components/pokemon/PokemonDetail.vue";
import PokemonList from "../components/pokemon/PokemonList.vue";
import { mapWritableState, mapActions } from "pinia";
import { usePokemonStore } from "../stores/pokemons";

export default {
  name: "Pokemon",
  components: { PokemonDetail, PokemonList },
  computed: {
    ...mapWritableState(usePokemonStore, ["imageUrl", "apiUrl", "isShowDetail"]),
  },

  methods: {
    ...mapActions(usePokemonStore, ["closeDetail"]),
  },
};
</script>

<template>
  <main>
    <PokemonList />
    <PokemonDetail v-if="isShowDetail === true" @click.prevent="closeDetail" />
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: calc(100% - 20px);
  min-height: calc(100vh - 20px);
  background: radial-gradient(#156f99, #0a2e50);

  font-family: "Acme", sans-serif;
  font-size: 1rem;
  font-weight: normal;
}

h1 {
  color: whitesmoke;
}
</style>
