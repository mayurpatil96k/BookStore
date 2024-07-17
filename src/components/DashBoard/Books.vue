<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { getBooks } from '../../components/Services/Books';
import router from '@/router';
import { useCounterStore } from '@/stores/counter';
import { useCartStore } from '@/stores/counter';

interface Book {
  description: string;
  discountPrice: number;
  bookImage: string | null;
  _id: string;
  admin_user_id: string;
  bookName: string;
  author: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const loading = ref(false);

const counterStore = useCounterStore();
const cartStore = useCartStore();

const search = ref<string>('');
const book = ref<Book[]>([]);
const bookcopy = ref<Book[]>([]);
const page = ref<number>(1);
const itemsPerPage = ref<number>(12);
const select = ref<string>('Sort by relevance');
const windowWidth = ref<number>(window.innerWidth);
const items = ref([
  { state: 'Sort by relevance' },
  { state: 'Price: Low to High' },
  { state: 'Price: High to Low' },
  { state: 'Newest Arrival' }
]);

const totalVisible = computed(() => {
  return windowWidth.value <= 600 ? 3 : 9;
});

const totalPages = computed(() => {
  return Math.ceil(book.value.length / itemsPerPage.value);
});

const sortedBooks = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = page.value * itemsPerPage.value;
  return book.value
    .slice()
    .sort((a, b) => {
      switch (select.value) {
        case 'Price: Low to High':
          return a.discountPrice - b.discountPrice;
        case 'Price: High to Low':
          return b.discountPrice - a.discountPrice;
        case 'Newest Arrival':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    })
    .slice(start, end);
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const fetchBooks = () => {
  loading.value = true;
  getBooks()
    .then((data) => {
      bookcopy.value = data.data.result;
      book.value = data.data.result;
      loading.value = false;
    })
    .catch((err) => console.log(err));
};

const bookdetailpage = (id: string) => {
  console.log('fired');
  cartStore.setCartBookCount(id);
  router.push({ name: 'bookdetail', params: { id } });
};

watch(
  () => counterStore.searchtext,
  (newVal) => {
    if (newVal.length > 2) {
      book.value = bookcopy.value.filter((item) => {
        return item.bookName.toLowerCase().includes(newVal.toLowerCase()) ||
          item.author.toLowerCase().includes(newVal.toLowerCase());
      });
    } else {
      book.value = [...bookcopy.value];
    }
  }
);

onMounted(() => {
  console.log(counterStore.searchtext);
  window.addEventListener('resize', handleResize);
  handleResize();
  fetchBooks();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="d-flex align-center justify-center" v-if="loading">
    <v-progress-circular 
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
   

  <div v-else class="pl-md-2 pr-md-2 d-flex align-center">
    <div class="d-flex align-center">
      <span class="pl-md-2 pr-md-2 text-h5">Books &nbsp</span>
      <span class="text-caption u-dnone">({{sortedBooks.length}} Items)</span>
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
              v-if="item.quantity === 0"
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

<style scoped>
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
