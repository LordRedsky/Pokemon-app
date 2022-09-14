import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
  id: 'PokemonStore',
  state: () => ({
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world',
    apiUrl: 'https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20',
    pokemons: [],
    detilPokemon: {},
    nextUrl: '',
    currentUrl: '',
    pokemonUrl: '',
    isShowDetail: false,
    pokemonCollectionsId: [],
    showDetailCollection: false
  }),

  actions: {
    setPokemonUrl(id) {
      this.pokemonUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`
      this.isShowDetail = true
    },

    closeDetail() {
      this.pokemonUrl = ''
      this.isShowDetail = false
    },

    setCollection(id, name) {
      const collection = {
        id: id, name: name
      }
      this.pokemonCollectionsId.push(collection)
    }
  }
})
