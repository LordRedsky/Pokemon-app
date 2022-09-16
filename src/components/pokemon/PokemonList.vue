<script>
import { usePokemonStore } from "../../stores/pokemons";
import { mapWritableState, mapActions } from "pinia";
import Spinner from "../spinner/Spinner.vue";

export default {
  name: "PokemonList",
  data: () => {
    return {
      pokemonList: [],
      trigger: false,
      color: "green",
    };
  },
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
    ...mapActions(usePokemonStore, [
      "setPokemonUrl",
      "fetchDataPokemon",
      "scrollTrigger",
      "next",
    ]),
    fetchDataPokemon() {
      let req = new Request(this.currentUrl);
      fetch(req)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data, "<<<<DATA");
          this.nextUrl = data.next;
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.pokemons.push(pokemon);
            // console.log(pokemon, '<<>>');
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollTrigger() {
      const section = document.querySelector(".lists");
      const options = {
        root: null,
        threshhold: 0,
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.next();
            this.trigger = true;
          }
        });
      }, options);
      observer.observe(this.$refs.infinitescrolltrigger);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchDataPokemon();
    },
  },
  created() {
    if (this.pokemons.length === 0) {
      this.currentUrl = this.apiUrl;
      this.showDetailCollection = false;
      this.fetchDataPokemon();
    }
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
      @click.prevent="this.setPokemonUrl(pokemon.id)"
    >
      <img
        class="poke-img"
        :src="`${imageUrl}/${pokemon.id}.svg`"
        :alt="`${pokemon.name}`"
      />
      <h3>{{ pokemon.name }}</h3>
    </article>
  </div>
  <div id="scroll-trigger" ref="infinitescrolltrigger">
    <button v-if="trigger" class="load-more" @click.prevent="next">load more</button>
    <!-- <Spinner v-if="!trigger || pokemons.length === 0" class="spinner" /> -->
  </div>
</template>

<style scoped>
.lists {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 25px;
  width: 100%;
}

.lists article {
  align-items: center;
  height: 150px;
  width: 150px;
  background-color: whitesmoke;
  text-align: center;
  text-transform: capitalize;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

h3 {
  color: #156f99;
}

/* .lists article:hover .poke-img {
  position: absolute;
  margin-left: -76px;
  height: 150px;
  width: 150px;
  margin-bottom: -100px;
  background-color: #ffcb05;
  border-radius: 10px;
  /* box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2); */
/* color: white; */
/* }  */

.poke-img {
  width: 100px;
  height: 100px;
}

.lists h3 {
  margin: 0;
  font-size: 25px;
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
}

.load-more {
  margin-top: 50px;
  margin-bottom: 30px;
  padding: 1em;
  border-radius: 10px;
  font-size: larger;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffcb05;
  color: radial-gradient(#156f99, #0a2e50);
  width: 200px;

  font-size: 25px;
  font-weight: 700;
  text-transform: capitalize;
}

.spinner {
  margin-top: 60px;
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
