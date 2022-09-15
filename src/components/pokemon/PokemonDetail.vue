<script>
import { mapActions, mapWritableState } from "pinia";
import { usePokemonStore } from "../../stores/pokemons";

import Spinner from "../spinner/Spinner.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "PokemonDetail",
  data: () => {
    return {
      show: false,
    };
  },
  computed: {
    ...mapWritableState(usePokemonStore, [
      "pokemonUrl",
      "imageUrl",
      "detailPokemon",
      "pokemonCollections",
      "showDetailCollection",
    ]),
  },
  methods: {
    ...mapActions(usePokemonStore, ["setCollection"]),
    fetcDetailPokemon() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }
        })
        .then((data) => {
          this.detailPokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    collectionHandler() {
      const name = this.detailPokemon.name;
      const id = this.detailPokemon.id;
      const catch_rate = this.detailPokemon.capture_rate;
      const generate = Math.floor(Math.random() * 255);
      
      if (+catch_rate > generate) {
        Swal.fire({
          icon: "success",
          title: `You catch the ${name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.setCollection(id, name);
      } else {
        Swal.fire({
          icon: "error",
          title: `Failled to catch the ${name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },

  created() {
    this.fetcDetailPokemon();
  },
  components: { Spinner },
};
</script>

<template>
  <div class="detail">
    <div class="detail-view" v-if="show">
      <div v-if="detailPokemon" class="image">
        <img :src="`${imageUrl}/${detailPokemon.id}.svg`" />
      </div>
      <div v-if="!detailPokemon" class="not-found">
        <h1>The Pokemon Was Not Found!</h1>
      </div>

      <div v-if="detailPokemon" class="data">
        <h2>{{ detailPokemon.name }}</h2>

        <div class="group">
          <p
            class="group-egg"
            v-for="(group, i) of detailPokemon.egg_groups"
            :key="`egg${i}`"
          >
            <span>{{ group.name }}</span>
          </p>
        </div>

        <div class="property">
          <div class="left">Base Happinese</div>
          <div class="right">{{ detailPokemon.base_happiness }}</div>
        </div>
      </div>

      <div class="image-pokeball" @click.prevent="collectionHandler">
        <img class="ball" src="../../assets/PokeBallSVG.svg" />
      </div>
    </div>
    <Spinner v-else />
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background: rgba(0, 0, 0, 0.7);
}

.detail-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 510px;
  padding: 50px 0 0;
  background-color: whitesmoke;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  top: -100px;
  background-color: #333;
  border-radius: 50%;
  overflow: hidden;
  padding: 1em;
  position: absolute;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.image img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  padding: 0.5em;
}

.image-pokeball {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(109, 109, 109);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}
.image-pokeball .ball {
  position: absolute;
  height: 50px;
  padding: 0.4em;
}

.catch {
  margin-top: -5px;
  font-size: 20px;
}

.image-pokeball .ball:hover {
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.data {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
}

.data .property {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.left {
  float: left;
}

.right {
  float: right;
}

h2 {
  text-transform: capitalize;
  text-align: center;
}

.group {
  display: flex;
  justify-content: center;
  width: 200px;
  margin-top: -25px;
}

.group-egg {
  display: inline-flex;
  margin-left: 10px;
}

.group-egg span {
  background-color: #333;
  color: whitesmoke;
  padding: 0.4em;
  border-radius: 15px;
}

.not-found {
  text-align: center;
  margin-top: -50px;
}

@media screen and (max-width: 428px) {
  .not-found {
    text-align: center;
    margin-top: -50px;
  }
}
</style>
