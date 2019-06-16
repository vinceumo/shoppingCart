<template>
  <div id="app">
    <NotificationBanner/>
    <main>
      <ProductListing 
        v-bind:products="products"
        v-on:onAddToBasket="getAddToBasket" />
      <ProductCart 
        v-if="basketItems.length"
        v-bind:basketItems="basketItems"
        v-on:onRemoveToBasket="getRemoveToBasket"/>
    </main>
  </div>
</template>

<script>
import productsJson from "./data/products.json";
import NotificationBanner from './components/organisms/NotificationBanner';
import ProductListing from './components/organisms/ProductListing';
import ProductCart from "./components/organisms/ProductCart";

export default {
  name: 'app',
  components: {
    NotificationBanner,
    ProductCart,
    ProductListing
  },
  data() {
    return {
      products: productsJson,
      basketItems: []
    }
  },
  created() {
    // Add product ids
    this.products.forEach((product, index) => {
      product.id = `p${index}`;
    });
  },
  methods: {
    getAddToBasket(i) {
      this.products[i].quantityInStock--;

      (this.products[i].quantityInBasket) ? this.products[i].quantityInBasket++ : this.products[i].quantityInBasket = 1;

      this.updtateBasketItems();
    },
    getRemoveToBasket(id) {
      const index = this.products.findIndex(product => product.id === id);

      this.products[index].quantityInStock++;
      this.products[index].quantityInBasket--;
      this.updtateBasketItems();
    },
    updtateBasketItems() {
      this.basketItems = this.products.filter(product => product.quantityInBasket > 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:400,400i,900&display=swap');
main {
  display: grid;
  grid-template-columns: 1fr 400px;
}
</style>
