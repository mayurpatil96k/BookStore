<script>
export default {
  data() {
    return {
      select: { state: 'Sort by relevance' },
      items: [
        { state: 'Sort by relevance' },
        { state: 'Price:Low to High' },
        { state: 'Price:High to Low' },
        { state: 'Newest Arrival' }
      ]
    }
  }
}
</script>

<template>
  <div class="d-flex align-center">
    <div class="d-flex align-center">
      <span class="text-h5">Books &nbsp</span>
      <span class="text-caption u-dnone">(128 Items)</span>
    </div>
    <v-spacer> </v-spacer>
    <div class="d-flex align-center">
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
      md="4"
      lg="3"
      v-for="item in 12"
    >
      <v-sheet class="pa-2 ma-2 align-center">
        <div class="u-book"></div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style>
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
