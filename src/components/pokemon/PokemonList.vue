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
      "showDetailCollection",
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
          if (entry.intersectionRatio > 0 || this.pokemons.length >= 10) {
            this.next();
          }
          // if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
          //   this.next()
          // }
          e;
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
    this.showDetailCollection = false;
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
        class="poke-img"
        :src="`${imageUrl}/${pokemon.id}.svg`"
        :alt="`${pokemon.name}`"
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 40px;
  width: 100%;
}

.lists article {
  align-items: center;
  height: 300px;
  width: 200px;
  background-color: whitesmoke;
  text-align: center;
  text-transform: capitalize;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.poke-img {
  width: 200px;
  height: 200px;
}

.lists h3 {
  margin: 0;
  font-size: 30px;
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 428px) {
  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .lists article {
    height: 150px;
    width: 150px;
    align-items: center;
    background-color: whitesmoke;
    text-align: center;
    text-transform: capitalize;
    border-radius: 10px;
  }

  .poke-img {
    width: 100px;
    height: 100px;
  }

  .lists h3 {
    margin: 0;
    font-size: 20px;
  }
}

</style>
