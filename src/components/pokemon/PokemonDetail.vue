<script>
import { mapActions, mapWritableState } from "pinia";
import { usePokemonStore } from "../../stores/pokemons";

import Spinner from "../spinner/Spinner.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Pokeball from "../pokeball/Pokeball.vue";

export default {
  name: "PokemonDetail",
  data: () => {
    return {
      show: false,
      detailUrl: "",
      catch_rate: "",
      detailPokemon: {},
      isSpin: false,
    };
  },
  computed: {
    ...mapWritableState(usePokemonStore, [
      "pokemonUrl",
      "imageUrl",
      // "detilPokemon",
      "pokemonCollections",
      "showDetailCollection",
      "isCatch",
      "searchValue",
    ]),
  },
  methods: {
    ...mapActions(usePokemonStore, ["setCollection"]),
    fetcDetailPokemon() {
      console.log(this.searchValue);
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }
        })
        .then((data) => {
          this.catch_rate = data.capture_rate;
          this.detailUrl = data.varieties[0].pokemon.url;
          this.fetchDetail();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Pokemon is not found!",
            footer: 'Please enter the correct name',
          });
          this.searchValue = "";
        });
    },

    fetchDetail() {
      console.log("masuk", "<<><><><>");
      let req = new Request(this.detailUrl);
      console.log("masuk");
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
          console.log("error 02");
          console.log(error);
        });
    },

    collectionHandler() {
      const name = this.detailPokemon.name;
      const id = this.detailPokemon.id;
      // const catch_rate = this.detailPokemon.capture_rate;
      const generate = Math.floor(Math.random() * 255);

      // console.log(this.catch_rate, generate, "<<<<<<");

      if (+this.catch_rate > generate) {
        Swal.fire({
          icon: "success",
          title: `You catch the ${name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.setCollection(id, name);
        this.catch_rate = "";
      } else {
        this.catch_rate = "";
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
  components: { Spinner, Pokeball },
};
</script>

<template>
  <div class="detail">
    <h1>{{ detailPokemon.name }}</h1>
    <div v-if="show" class="detail-view">
      <div v-if="detailPokemon" class="image">
        <img :src="`${imageUrl}/${detailPokemon.id}.svg`" />
      </div>
      <!-- <div v-if="!detailPokemon" class="not-found">
        <h1>The Pokemon Was Not Found!</h1>
      </div> -->

      <div v-if="detailPokemon" class="data">
        <h2 class="poke-name">{{ detailPokemon.name }}</h2>

        <div class="group">
          <p
            class="group-egg"
            v-for="(group, i) of detailPokemon.egg_groups"
            :key="`egg${i}`"
          >
            <span>{{ group.name }}</span>
          </p>
        </div>

        <!-- POKEMON PROPERTIES -->
        <div class="property">
          <div class="left">Base Experience</div>
          <div class="right">{{ detailPokemon.base_experience }} XP</div>
        </div>
        <div class="property">
          <div class="left">Weight</div>
          <div class="right">{{ detailPokemon.weight / 10 }} Kg</div>
        </div>
        <div class="property">
          <div class="left">Height</div>
          <div class="right">{{ detailPokemon.height / 10 }} m</div>
        </div>

        <!-- TYPES -->
        <h2 class="type-brand">Types</h2>
        <div class="types">
          <div class="type" v-for="(type, i) in detailPokemon.types" :key="i">
            {{ type.type.name }}
          </div>
        </div>

        <!-- ABILITIES -->
        <h2 class="ability-brand">Abilities</h2>
        <div class="abilities">
          <div class="ability" v-for="(ability, i) in detailPokemon.abilities" :key="i">
            {{ ability.ability.name }}
          </div>
        </div>

        <!-- MOVES -->
        <!-- <h2 class="move-brand">Moves</h2>
        <div class="moves">
          <div class="move" v-for="(move, i) in detailPokemon.moves" :key="i">
            {{ move.move.name }}
          </div>
        </div> -->
      </div>

      <!-- POKEBALL HERE -->
      <Pokeball v-if="isCatch" @click.prevent="collectionHandler" />
    </div>
    <Spinner v-if="!show" />
    <!-- <Spinner v-if="isSpin" /> -->
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
  height: calc(100% - 50px);
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
  background-color: whitesmoke;
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

.poke-name {
  text-transform: capitalize;
  text-align: center;
  font-size: 35px;
}

/* TYPE */
.type-brand,
.ability-brand,
.move-brand {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  font-size: 20px;
}

.types,
.abilities,
.moves {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90%;
  max-width: 400px;
  gap: 5px;
}

.types .type,
.abilities .ability,
.moves .move {
  /* background-color: #156f99; */
  padding: 0.3em;
  border-radius: 15px;
  margin-top: -10px;
  color: whitesmoke;
  font-size: 15px;
  text-transform: capitalize;
  word-wrap: none;
  word-break: keep-all;
}

.types .type {
  background-color: #0864ba;
}

.abilities .ability {
  background-color: salmon;
  margin-bottom: 20px;
}

.moves .move {
  background-color: rgb(255, 191, 0);
  margin-bottom: 20px;
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
  font-size: 300px;
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
