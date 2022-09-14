<script>
import { mapWritableState, mapActions } from "pinia";
import { usePokemonStore } from "../../stores/pokemons";
export default {
  name: "PokemonAearch",
  computed: {
    ...mapWritableState(usePokemonStore, ["searchValue"]),
  },
  methods: {
    ...mapActions(usePokemonStore, ["setPokemonUrl"]),

    searchHandler() {
      if (this.searchValue !== "") {
        this.setPokemonUrl(this.searchValue);
      }

      this.searchValue = "";
    },
  },
};
</script>

<template>
  <div class="searchBar">
    <form @submit.prevent="searchHandler">
      <input type="text" v-model="searchValue" placeholder="Search pokemon" />
    </form>
    <fa class="search-icon" icon="magnifying-glass" @click.prevent="searchHandler" />
  </div>
</template>

<style scoped>
.searchBar {
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relatife;
  width: 100%;
  max-width: 510px;
  padding-bottom: 20px;
}

.searchBar input {
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px 40px 10px 10px;
  width: calc(100vh - 50px);
  font-size: 1rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  color: rgb(255, 188, 4);
}

.searchBar .search-icon {
  margin-left: -30px;
  font-size: 1.25rem;
  color: rgb(255, 188, 4);
  cursor: pointer;
}

@media screen and (max-width: 660px) {
  .searchBar input {
    width: calc(100% - 50px);
  }
}
</style>
