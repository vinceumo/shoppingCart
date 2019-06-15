<template>
  <section class="product-listing">
    <ul>
      <ProductCard 
        v-for="(product, index) in products" 
        v-bind:key="index"
        v-bind:id="index"
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