<template>
  <div id="app">
    <ProductListing 
      v-bind:products="products"
      v-on:onAddToBasket="getAddToBasket" />
    <ProductCart/>
  </div>
</template>

<script>
import productsJson from "./data/products.json";
import ProductListing from './components/organisms/ProductListing';
import ProductCart from "./components/organisms/ProductCart";

export default {
  name: 'app',
  components: {
    ProductCart,
    ProductListing
  },
  data() {
    return {
      products: productsJson,
    }
  },
  methods: {
    getAddToBasket(value) {
      this.products[value].quantityInStock += -1;
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: grid;
  grid-template-columns: 1fr 400px;
}
</style>
