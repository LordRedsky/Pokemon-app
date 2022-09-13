<script>
import { usePokemonStore } from "../../stores/pokemons";
import { mapWritableState } from "pinia";
export default {
  name: "PokemonList",
  computed: {
    ...mapWritableState(usePokemonStore, ["apiUrl", "imageUrl", "nextUrl", "pokemons"]),
  },

  methods: {
    fetchDataPokemon() {
      let req = new Request(this.apiUrl);
      fetch(req)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          this.nextUrl = data.next;
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.pokemons.push(pokemon);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.fetchDataPokemon();
  },
};
</script>

<template>
  <div class="list">
    <article v-for="(pokemon, i) in pokemons" :key="`poke${i}`">
      <img
        :src="`${imageUrl}/${pokemon.id}.svg`"
        :alt="`${pokemon.name}`"
        width="100"
        height="100"
      />
      <h3>{{ pokemon.name }}</h3>
    </article>
  </div>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
}
</style>
