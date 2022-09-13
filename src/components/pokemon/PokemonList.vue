<script>
import { usePokemonStore } from "../../stores/pokemons";
import { mapWritableState, mapActions } from "pinia";

import Spinner from "../spinner/Spinner.vue";

export default {
  name: "PokemonList",
  computed: {
    ...mapWritableState(usePokemonStore, [
      "apiUrl",
      "imageUrl",
      "nextUrl",
      "pokemons",
      "currentUrl",
    ]),
  },
  methods: {
    ...mapActions(usePokemonStore, ["setPokemonUrl"]),
    fetchDataPokemon() {
      let req = new Request(this.currentUrl);
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
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchDataPokemon();
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchDataPokemon();
  },
  mounted() {
    this.scrollTrigger();
  },
  components: { Spinner },
};
</script>

<template>
  <div class="lists">
    <article
      v-for="(pokemon, i) in pokemons"
      :key="`poke${i}`"
      @click.prevent="setPokemonUrl(pokemon.id)"
    >
      <img
        :src="`${imageUrl}/${pokemon.id}.svg`"
        :alt="`${pokemon.name}`"
        width="100"
        height="100"
      />
      <h3>{{ pokemon.name }}</h3>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <Spinner />
    </div>
  </div>
</template>

<style scoped>
.lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
}

.lists article {
  height: 150px;
  background-color: whitesmoke;
  text-align: center;
  text-transform: capitalize;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.lists h3 {
  margin: 0;
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
