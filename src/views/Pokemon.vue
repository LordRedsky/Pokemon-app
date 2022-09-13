<script>
import PokemonDetail from "../components/pokemon/PokemonDetail.vue";
import PokemonList from "../components/pokemon/PokemonList.vue";
import PokemonSearch from "../components/pokemon/PokemonSearch.vue";
import { mapWritableState, mapActions } from "pinia";
import { usePokemonStore } from "../stores/pokemons";
import NavBar from "../components/navbar/NavBar.vue";

export default {
  name: "Pokemon",
  components: { PokemonDetail, PokemonList, PokemonSearch, NavBar },
  computed: {
    ...mapWritableState(usePokemonStore, ["imageUrl", "apiUrl", "isShowDetail"]),
  },

  methods: {
    ...mapActions(usePokemonStore, ["closeDetail"]),
  },
};
</script>

<template>
  <main class="container">
    <NavBar/>
    <h1>POKEMON'S</h1>
    <PokemonSearch />
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

.pagination {
  margin-top: 20px;
  margin-bottom: -20px;
  display: inline-block;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: red;
}

h1 {
  color: whitesmoke;
}
</style>
