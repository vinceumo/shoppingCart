<template>
  <section class="container">
    <ul class="list-unstyled product-listing">
      <ProductCard 
        v-for="(product, index) in products" 
        v-bind:key="index"
        v-bind:index="index"
        v-bind:product="product"
        v-on:onAddToBasket="getAddToBasket"/>
    </ul>
  </section>
</template>

<script>
import ProductCard from "../molecules/ProductCard";

export default {
  components: {
    ProductCard
  },
  props: {
    products: Array
  },
  methods: {
    getAddToBasket(i) {
      this.$emit("onAddToBasket", i);
    }
  }
}
</script>

<style lang="scss" scoped>
// This grid is by default using css grid layout and falback to flexbox in none supported browsers
@supports (display: grid) {
  .product-listing{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: spacer(3);

    @include min(bp(sm)) {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      grid-gap: spacer(4);
    }

    @include min(bp(md)) {
      grid-gap: spacer(5);
    }
  }
}

@mixin movieListingGridFallback() {
  .product-listing{
    display: flex;
    flex-wrap: wrap;
    margin-right: (spacer(3, true) * -1) / 2;
    margin-left: (spacer(3, true) * -1) / 2;

    > li {
      flex: 0 0 percentage(1 / 1);
      max-width: percentage(1 / 1);
      min-width: percentage(1 / 1);
      min-height: 1px;
      padding-right: spacer(3, true) / 2;
      padding-left: spacer(3, true) / 2;
      margin-bottom: spacer(3, true);

      @include min(bp(md)) {
        flex: 0 0 percentage(1 / 2);
        max-width: percentage(1 / 2);
        min-width: percentage(1 / 2);
      }

      @include min(bp(lg)) {
        flex: 0 0 percentage(1 / 3);
        max-width: percentage(1 / 3);
        min-width: percentage(1 / 3);
      }

      @include min(bp(xl)) {
        flex: 0 0 percentage(1 / 4);
        max-width: percentage(1 / 4);
        min-width: percentage(1 / 4);
      }
    }
  }
}

@supports not (display: grid) {
  @supports (display: flex) {
    @include movieListingGridFallback();
  }
}

@include ie11() {
  @include movieListingGridFallback();
}
</style>
