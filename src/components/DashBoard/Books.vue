<script>
export default {
  data() {
    return {
      page: 1,
      select: { state: 'Sort by relevance' },
      windowWidth: window.innerWidth,
      items: [
        { state: 'Sort by relevance' },
        { state: 'Price:Low to High' },
        { state: 'Price:High to Low' },
        { state: 'Newest Arrival' }
      ]
    }
  },
  computed: {
    totalVisible() {
      if (this.windowWidth <= 600) {
        return 3
      }

      return 9
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
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
    <v-spacer> </v-spacer>
    <div class="pl-md-2 pr-md-2 d-flex align-center">
      <v-select
        class="mt-5"
        max-width="300"
        v-model="select"
        :items="items"
        item-title="state"
        item-value="abbr"
        label="Select"
        single-line
        variant="outlined"
        density="compact"
      ></v-select>
    </div>
  </div>

  <v-row class="align-center justify-center" no-gutters>
    <v-col
      class="d-flex align-center justify-center"
      cols="12"
      sm="6"
      md="3"
      lg="3"
      v-for="item in 12"
    >
      <v-sheet class="book-card pa-2 ma-2 align-center">
        <div class="u-book">
          <div class="d-flex align-center justify-center u-c-img position-relative">
            <!-- img div -->
            <img height="135" width="110" src="../../assets/Image 11@2x.png" alt="" />
            <div class="u-box position-absolute d-flex align-center justify-center">
              <span><Strong>OUT OF STOCK</Strong></span>
            </div>
          </div>
          <div class="d-flex flex-column pl-5">
            <!-- info div -->
            <span class="pt-1"><strong>Don't Make Me Think</strong></span>
            <span class="u-smalltext">by Steve Krug</span>
            <div class="d-flex align-center">
              <div class="u-rating d-flex justify-center align-center">
                <span class="u-c-rating">4.5</span
                ><v-icon class="u-c-rating" icon="mdi-star"></v-icon>
              </div>
              <span class="u-smalltext pt-1 pl-1">(20)</span>
            </div>
            <div class="d-flex align-center">
              <span><Strong>Rs. 1500</Strong></span>
              <span class="u-smalltext pl-1"><strike>Rs. 2000</strike></span>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
  <div class="text-center mt-8 mb-8">
    <v-pagination v-model="page" :length="18" :total-visible="totalVisible"></v-pagination>
  </div>
</template>

<style>
.book-card:hover {
  box-shadow: 0px 0px 2px 2px #bfb5b5;
}
.u-box {
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  opacity: 0.96;
  bottom: 5px;
  left: 0px;
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
