<script>
import { computed, watch, ref } from 'vue'
import { getBooks } from '../../components/Services/Books'
import router from '@/router'
import { useCounterStore } from '@/stores/counter'
import { useCartStore } from '@/stores/counter'
export default {
  data() {
    return {
      useCounterStore,
      search: '',
      book: [],
      bookcopy:[],
      page: 1,
      itemsPerPage: 12,
      select: 'Sort by relevance',
      windowWidth: window.innerWidth,
      items: [
        { state: 'Sort by relevance' },
        { state: 'Price:Low to High' },
        { state: 'Price:High to Low' },
        { state: 'Newest Arrival' }
      ]
    }
  },
  created() {
    this.cartStore = useCartStore();
    this.counterStore = useCounterStore();
  },
  updated() {
  this.counterStore.$subscribe((data) => {
    if (data?.events?.target?.searchtext) {
      const searchText = data.events.target.searchtext;
      this.searchString = searchText;
      if (searchText.length > 2) {
        this.book = this.bookcopy.filter((item) => {
          return item?.bookName.toLowerCase().includes(searchText) || item.author.toLowerCase().includes(searchText);
        });
      } else {
        this.book = [...this.bookcopy];
      }
    }
  });
},

  computed: {
    totalVisible() {
      return this.windowWidth <= 600 ? 3 : 9
    },
    totalPages() {
      return Math.ceil(this.book.length / this.itemsPerPage)
    },
    sortedBooks() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = this.page * this.itemsPerPage
      return this.book
        .slice()
        .sort((a, b) => {
          switch (this.select) {
            case 'Price:Low to High':
              return a.discountPrice - b.discountPrice
            case 'Price:High to Low':
              return b.discountPrice - a.discountPrice
            case 'Newest Arrival':
              return new Date(b.arrivalDate) - new Date(a.arrivalDate)
            default:
              return 0
          }
        })
        .slice(start, end)
    }
  },
  created() {
    this.counterStore = useCounterStore()
    this.cartStore = useCartStore();
  },
  mounted() {
    console.log(this.counterStore.searchtext)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.getBooks()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    getBooks() {
      getBooks()
        .then((data) => {
          this.bookcopy = data.data.result;
          this.book = data.data.result;
        })
        .catch((err) => console.log(err))
    },
    bookdetailpage(id) {
      console.log("fired")
      this.cartStore.setCartBookCount(id)
      router.push({ name: 'bookdetail', params: { id } })
    }
  }
}
</script>

<template>
  <div class="pl-md-2 pr-md-2 d-flex align-center">
    <div class="d-flex align-center">
      <span class="pl-md-2 pr-md-2 text-h5">Books &nbsp</span>
      <span class="text-caption u-dnone">(128 Items)</span>
    </div>
    <v-spacer></v-spacer>
    <div class="pl-md-2 pr-md-2 d-flex align-center">
      <v-select
        @change="sortedBooks"
        class="mt-5"
        max-width="300"
        v-model="select"
        :items="items"
        item-title="state"
        item-value="state"
        label="Select"
        single-line
        variant="outlined"
        density="compact"
      ></v-select>
    </div>
  </div>

  <v-row class="" no-gutters>
    <v-col
      class="d-flex align-center justify-center"
      cols="12"
      sm="6"
      md="3"
      lg="3"
      v-for="item in sortedBooks"
      :key="item._id"
    >
      <v-sheet class="pa-2 ma-2 align-center">
        <div class="u-book book-card" @click="bookdetailpage(item._id)">
          <div class="d-flex align-center justify-center u-c-img position-relative">
            <img height="135" width="110" src="../../assets/Image 11@2x.png" alt="" />
            <div
              v-if="item.quantity == 0"
              class="u-box-out position-absolute d-flex align-center justify-center"
            >
              <span><strong>OUT OF STOCK</strong></span>
            </div>
          </div>
          <div class="d-flex flex-column pl-5">
            <span class="pt-1 d-inline-block text-truncate"
              ><strong>{{ item.bookName }}</strong></span
            >
            <span class="u-smalltext">{{ 'by ' + item.author }}</span>
            <div class="d-flex align-center">
              <div class="u-rating d-flex justify-center align-center">
                <span class="u-c-rating">4.5</span>
                <v-icon class="u-c-rating" icon="mdi-star"></v-icon>
              </div>
              <span class="u-smalltext pt-1 pl-1">(20)</span>
            </div>
            <div class="d-flex align-center">
              <span
                ><strong>{{ 'Rs.' + item.discountPrice }}</strong></span
              >
              <span class="u-smalltext pl-1"
                ><strike>{{ 'Rs.' + item.price }}</strike></span
              >
            </div>
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
  <div class="text-center mt-8 mb-8">
    <v-pagination v-model="page" :length="totalPages" :total-visible="totalVisible"></v-pagination>
  </div>
</template>

<style>
.book-card:hover {
  box-shadow: 0px 0px 2px 2px #bfb5b5;
}
.u-box-out {
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  opacity: 0.96;
  bottom: 5px;
  background: white;
  width: 178px;
  height: 37px;
}
.u-smalltext {
  font-size: 0.6em;
  color: #878787;
}
.u-c-rating {
  font-size: 0.7em;
}
.u-rating {
  margin-top: 5px;
  width: 33px;
  height: 16px;
  background: #388e3c;
  color: white;
}
.u-c-img {
  width: 233px;
  height: 172px;
  background: #f5f5f5;
}
.u-book {
  width: 235px;
  height: 275px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  opacity: 1;
}
</style>
