<script>
import { mapActions, mapWritableState } from "pinia";
import { usePokemonStore } from "../../stores/pokemons";
import Spinner from "../spinner/Spinner.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import PokemonDetail from "./PokemonDetail.vue";

export default {
  name: "CollectionPage",
  computed: {
    ...mapWritableState(usePokemonStore, [
      "pokemonCollectionsId",
      "imageUrl",
      "showDetailCollection",
      "isShowDetail",
      "pokemons",
    ]),
  },
  components: { Spinner, PokemonDetail },
  methods: {
    ...mapActions(usePokemonStore, ["setPokemonUrl", "closeDetail"]),
    releaseHandler(id) {
      Swal.fire({
        icon: "success",
        title: `See you friend`,
        showConfirmButton: false,
        timer: 1500,
      });
      const array = this.pokemonCollectionsId;
      const newArray = [];
      for (let index = 0; index < array.length; index++) {
        if (id !== index) {
          newArray.push(array[index]);
        }
      }
      this.pokemonCollectionsId = newArray;
    },

    openDetailHandler(id) {
      this.setPokemonUrl(id);
      this.showDetailCollection = true;
      console.log(this.showDetailCollection);
    },
  },
  created() {
    this.showDetailCollection = false;
  },
};
</script>

<template>
  <h1 class="title">Collection</h1>
  <div class="collection">
    <article
      v-if="pokemonCollectionsId"
      v-for="(pokemon, i) of pokemonCollectionsId"
      :key="`poke${i}`"
    >
      <div @click.prevent="openDetailHandler(pokemon.id)">
        <img
          class="poke-img"
          :src="`${imageUrl}/${pokemon.id}.svg`"
          :alt="`${pokemon.name}`"
          width="100"
          height="100"
        />
        <h3 class="poke-name">{{ pokemon.name }}</h3>
      </div>
      <div class="image-pokeball" @click.prevent="releaseHandler(i)">
        <img class="ball" src="../../assets/PokeBallSVG.svg" />
        <span class="catch">RELEASE</span>
      </div>
    </article>
    <div v-if="pokemonCollectionsId.length === 0">
      <h1>You have no collection</h1>
    </div>
    <div>
      <PokemonDetail v-if="isShowDetail === true" @click.prevent="closeDetail" />
    </div>
  </div>
</template>

<style scoped>
.collection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  width: calc(100% - 20px);
  min-height: calc(100vh - 20px);
  background: radial-gradient(#156f99, #0a2e50);
  gap: 7px;

  font-family: "Acme", sans-serif;
  font-size: 1rem;
  font-weight: normal;
}

h1 {
  color: whitesmoke;
}

.poke-img {
  width: 200px;
  height: 200px;
}

.poke-name {
  margin: 0;
  font-size: 30px;
}

.collection article {
  align-items: center;
  height: 300px;
  width: 200px;
  background-color: whitesmoke;
  text-align: center;
  text-transform: capitalize;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.image-pokeball {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 37px;
}
.image-pokeball .ball {
  height: 50px;
  padding: 0.4em;
}

span {
  color: whitesmoke;
}

@media screen and (max-width: 490px) {
  .collection article {
    align-items: center;
    height: 150px;
    width: 150px;
    background-color: whitesmoke;
    text-align: center;
    text-transform: capitalize;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  }

  .poke-img {
    width: 100px;
    height: 100px;
  }

  .poke-name {
    margin: 0;
    font-size: 20px;
  }

  .image-pokeball {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1px;
  }
}
</style>
