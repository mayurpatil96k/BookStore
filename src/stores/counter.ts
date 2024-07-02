import { ref, computed } from 'vue'
// src/stores/counter.js
import { defineStore } from 'pinia'



export const useCounterStore = defineStore('counter', {
  state: () => ({
    searchtext: '',
  }),
  actions: {
    setSearchText(newText:string) {
      this.searchtext = newText;
    }
  },
  getters: {
    getSearchText(state) {
      return state.searchtext;
    }
  }
})
