<script>
import {getBooks} from '../../components/Services/Books'
export default {
  data: () => ({ rating: '', book: null }),
  created(){
    this.getbooks();
  },
  methods: {
    cheackid(elem){
return elem._id==this.$route.params.id;
    },
    getbooks() {
      getBooks()
        .then((data) => {this.book = data.data.result.filter(this.cheackid);console.log(this.book)})
        .catch((err) => console.log(err))
    }
  }
}
</script>

<template>
  <v-breadcrumbs :items="['Home', 'Book(04)']"></v-breadcrumbs>
  <div class="d-flex u-flex-book" v-for="item in book">
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
            <!-- img div -->
            <img height="367" width="282" src="../../assets/Image 11@2x.png" alt="" />
            <div v-if="item.quantity==0" class="u-box-out-b position-absolute d-flex align-center justify-center">
              <span><Strong>OUT OF STOCK</Strong></span>
            </div>
          </div>
        </div>
        <div class="mt-5 d-flex justify-space-between align-center w-100">
          <v-btn class="w-50" max-height="40" max-width="170" color="#A03037">Add to Bag</v-btn>
          <v-btn
            class="w-50"
            max-height="40"
            max-width="170"
            color="#333333"
            prepend-icon="mdi-heart"
            >WishList</v-btn
          >
        </div>
      </div>
    </div>
    <div class="pl-md-10 pl-sm-5 pl-xs-5">
      <div class="d-flex flex-column">
        <!-- info div -->
        <span style="font-size: 1.5em"><strong>{{ item.bookName }}</strong></span>
        <span class="u-smalltext-b">{{"by "+item.author}}</span>
        <div class="d-flex align-center">
          <div class="u-rating-b d-flex justify-center align-center">
            <span class="u-c-rating-b">4.5</span
            ><v-icon class="u-c-rating-b" icon="mdi-star"></v-icon>
          </div>
          <span class="u-smalltext-b pt-3 pl-3">(20)</span>
        </div>
        <div class="d-flex align-center mb-4">
          <span style="font-size: 1.5em"><Strong>{{"Rs. "+item.discountPrice}}</Strong></span>
          <span class="u-smalltext-b pl-3"><strike>{{"Rs. "+item.price}}</strike></span>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex flex-column mt-7">
        <span class="u-smalltext-b"
          ><ul>
            &#8226;Book Detail
          </ul></span
        >
        <span class="u-sm-b pl-2 pb-10 text-justify"
          >{{ item.description }}</span
        >
      </div>
      <v-divider></v-divider>
      <div class="mt-3">
        <span class="text-h6 mb-3">Customer Feedback</span>
        <div class="mt-3">
          <v-card class="mx-auto d-flex flex-column" max-width="605" color="#F5F5F5">
            <v-card-item>
              <v-card-subtitle opacity="1" class="pl-2"> Overall Rating </v-card-subtitle>
              <v-rating color="#FFCE00" v-model="rating" density="comfortable"></v-rating>
            </v-card-item>
            <v-textarea
              max-width="560"
              class="pl-md-6 pr-sm-3"
              rows="3"
              density="compact"
              auto-grow
              placeholder="Write your review"
              variant="solo"
            ></v-textarea>
            <v-btn color="#3371B5" class="align-self-end mr-5 mb-5">Submit</v-btn>
          </v-card>
        </div>
      </div>
      <div class="d-flex mt-8">
        <div>
          <v-avatar color="#F5F5F5" class="border-sm">
            <span style="color: #707070" class="text-h6">MP</span>
          </v-avatar>
        </div>
        <div class="ml-3 mt-2">
          <span><strong>Mayur Patil</strong></span>
          <div>
            <v-rating disabled color="#FFCE00" v-model="rating" density="compact"></v-rating>
          </div>
          <span style="color: #707070" class="text-body-2 text-justify"
            >Good product. Even though the translation could have been better, Chanakya's neeti are
            thought provoking. Chanakya has written on many different topics and his writings are
            succinct.</span
          >
        </div>
      </div>
      <div class="d-flex mt-8 mb-5">
        <div>
          <v-avatar color="#F5F5F5" class="border-sm">
            <span style="color: #707070" class="text-h6">MP</span>
          </v-avatar>
        </div>
        <div class="ml-3 mt-2">
          <span><strong>Mayur Patil</strong></span>
          <div>
            <v-rating disabled color="#FFCE00" density="compact"></v-rating>
          </div>
          <span style="color: #707070" class="text-body-2 text-justify"
            >Good product. Even though the translation could have been better, Chanakya's neeti are
            thought provoking. Chanakya has written on many different topics and his writings are
            succinct.</span
          >
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
