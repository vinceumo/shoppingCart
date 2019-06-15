<template>
  <section class="product-listing">
    <ul>
      <ProductCard 
        v-for="(product, index) in products" 
        v-bind:key="index"
        v-bind:product="product"/>
    </ul>
  </section>
</template>

<script>
import productsJson from "../../data/products.json";
import ProductCard from "../molecules/ProductCard";

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: productsJson
    }
  },
}
</script>