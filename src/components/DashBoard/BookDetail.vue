<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBooks, getFeedback, setFeedback } from '../../components/Services/Books';
import Cart from '../DashBoard/Cart.vue';
import { addWishlist } from '../Services/Wishlist';
import { useRoute } from 'vue-router';

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

interface Feedback {
  user_id: {
    fullName: string;
  };
  comment: string;
  rating: string;
}

export default defineComponent({
  components: {
    Cart,
  },
  setup() {
    const route = useRoute();
    const desc = ref<string>('');
    const rating = ref<number | null>(null);
    const book = ref<Book[]>([]);
    const feedback = ref<Feedback[]>([]);

    const cheackid = (elem: Book) => {
      return elem._id == route.params.id;
    };

    const getbooks = () => {
      getBooks()
        .then((data) => {
          book.value = data.data.result.filter(cheackid);
          console.log(book.value);
        })
        .catch((err) => console.log(err));
    };

    const getFeedbacks = () => {
      getFeedback(route.params.id as string)
        .then((data) => {
          feedback.value = data.data.result.reverse();
          console.log(feedback.value);
        })
        .catch((err) => console.log(err));
    };

    const wish = (id: string) => {
      addWishlist(id);
    };

    const givefeedback = () => {
      if (desc.value === '' || rating.value === null || desc.value.length < 2) return;
      const feedbackobj = {
        comment: desc.value,
        rating: rating.value,
      };
      desc.value = '';
      rating.value = null;
      setFeedback(route.params.id as string, feedbackobj)
        .then((data) => {
          console.log(data);
          getFeedbacks();
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      getbooks();
      getFeedbacks();
    });

    return {
      desc,
      rating,
      book,
      feedback,
      cheackid,
      getbooks,
      getFeedbacks,
      wish,
      givefeedback,
    };
  },
});
</script>

<template>
  <v-breadcrumbs :items="['Home', 'Book(04)']"></v-breadcrumbs>
  <div class="d-flex u-flex-book" v-for="item in book" :key="item._id">
    <div class="d-flex ml-md-5">
      <div>
        <div class="u-smbox d-flex align-center justify-center">
          <img height="44" width="34" src="../../assets/Image 11@2x.png" alt="" />
        </div>
        <div class="u-smbox d-flex align-center justify-center">
          <img height="44" width="34" src="../../assets/Image 11@2x.png" alt="" />
        </div>
      </div>

      <div>
        <div class="u-book-b">
          <div class="d-flex align-center justify-center u-c-img-b position-relative">
            <img height="367" width="282" src="../../assets/Image 11@2x.png" alt="" />
            <div v-if="item.quantity == 0" class="u-box-out-b position-absolute d-flex align-center justify-center">
              <span><strong>OUT OF STOCK</strong></span>
            </div>
          </div>
        </div>
        <div class="mt-5 d-flex justify-space-between align-center w-100">
          <div class="w-50" max-width="170" max-height="40">
            <Cart />
          </div>
          <v-btn @click="wish(item._id)" class="w-50" max-height="40" max-width="170" color="#333333" prepend-icon="mdi-heart">
            WishList
          </v-btn>
        </div>
      </div>
    </div>
    <div style="width: 100% !important" class="pl-md-10 pl-sm-5 pl-xs-5">
      <div class="d-flex flex-column">
        <span style="font-size: 1.5em"><strong>{{ item.bookName }}</strong></span>
        <span class="u-smalltext-b">{{ 'by ' + item.author }}</span>
        <div class="d-flex align-center">
          <div class="u-rating-b d-flex justify-center align-center">
            <span class="u-c-rating-b">4.5</span><v-icon class="u-c-rating-b" icon="mdi-star"></v-icon>
          </div>
          <span class="u-smalltext-b pt-3 pl-3">(20)</span>
        </div>
        <div class="d-flex align-center mb-4">
          <span style="font-size: 1.5em"><strong>{{ 'Rs. ' + item.discountPrice }}</strong></span>
          <span class="u-smalltext-b pl-3"><strike>{{ 'Rs. ' + item.price }}</strike></span>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex flex-column mt-7">
        <span class="u-smalltext-b">
          <ul>
            &#8226;Book Detail
          </ul>
        </span>
        <span class="u-sm-b pl-2 pb-10 text-justify">{{ item.description }}</span>
      </div>
      <v-divider></v-divider>
      <div class="mt-3">
        <span class="text-h6 mb-3">Customer Feedback</span>
        <div class="mt-3">
          <v-card class="mx-auto d-flex flex-column" width="100%" color="#F5F5F5">
            <v-card-item>
              <v-card-subtitle opacity="1" class="pl-2"> Overall Rating </v-card-subtitle>
              <v-rating half-increments active-color="#FFCE00" v-model="rating" density="comfortable"></v-rating>
            </v-card-item>
            <div class="pl-md-6 pr-sm-3 d-flex align-center justify-center">
              <v-textarea v-model="desc" style="background-color: white" max-width="560" class="" auto-grow rows="2" density="compact" variant="plain" placeholder="Write your review"></v-textarea>
            </div>
            <v-btn color="#3371B5" @click="givefeedback" class="align-self-end mr-5 mb-5 mt-2">Submit</v-btn>
          </v-card>
        </div>
      </div>
      <div class="d-flex mt-8" v-for="feed in feedback" :key="feed.user_id.fullName">
        <div>
          <v-avatar color="#F5F5F5" class="border-sm">
            <span style="color: #707070" class="text-h6">MP</span>
          </v-avatar>
        </div>
        <div class="ml-3 mt-2">
          <span><strong>{{ feed.user_id.fullName }}</strong></span>
          <div>
            <v-rating disabled :model-value="feed.rating" active-color="#FFCE00" density="compact"></v-rating>
          </div>
          <span style="color: #707070" class="text-body-2 text-justify">{{ feed.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.u-sm-b {
  font-size: 0.8em;
  color: #373434;
}
.u-smalltext-b {
  font-size: 1em;
  color: #878787;
}
.u-c-rating-b {
  font-size: 1.1em;
}
.u-rating-b {
  margin-top: 5px;
  width: 55px;
  height: 25px;
  background: #388e3c;
  color: white;
}
.u-smbox {
  width: 44px;
  height: 54px;
  background: #ffe7e9 0% 0% no-repeat padding-box;
  border: 1px solid #7c1e1e;
  border-radius: 1px 1px 1px 0px;
  opacity: 1;
}
.u-book-b {
  width: 361px;
  height: 413px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  opacity: 1;
}
.u-box-out-b {
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  opacity: 0.96;
  background: white;
  width: 178px;
  height: 37px;
}
.u-c-img-b {
  width: 361px !important;
  height: 413px !important;
}
@media only screen and (max-width: 600px) {
  .u-flex-book {
    flex-direction: column;
  }
}
</style>
