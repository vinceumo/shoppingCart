<template>
  <div id="app">
    <div class="container">
      <h1>Shopping: </h1>
    </div>
    <NotificationBanner/>
    <div class="container">
      <h2>Products:</h2>
      <main id="main-content" v-bind:class="(basketItems.length) ? 'has-basket' : ''">
        <ProductListing 
          v-bind:products="products"
          v-on:onAddToBasket="getAddToBasket" />
        <ProductBasket 
          v-if="basketItems.length"
          v-bind:basketItems="basketItems"
          v-on:onRemoveToBasket="getRemoveToBasket"/>
      </main>
    </div>
  </div>
</template>

<script>
import productsJson from "./data/products.json";
import NotificationBanner from './components/organisms/NotificationBanner';
import ProductListing from './components/organisms/ProductListing';
import ProductBasket from "./components/organisms/ProductBasket";
import cssVars from "css-vars-ponyfill";

export default {
  name: 'app',
  components: {
    NotificationBanner,
    ProductBasket,
    ProductListing
  },
  data() {
    return {
      products: productsJson,
      basketItems: [],
      mobileBasketIsOpen: false,
    }
  },
  created() {
    // Add product ids
    this.products.forEach((product, index) => {
      product.id = `p${index}`;
    });
  },
  mounted: function() {
    cssVars();
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,400i,900&display=swap');

body {
  background-color: color-gray(10);
}

#main-content {
  padding-bottom: spacer(6);

  &.has-basket {
    @include min(bp(md)) {
      display: grid;
      align-items: flex-start;
      grid-gap: spacer(3);
      grid-template-columns: 1fr 400px;
    }
  }
}
</style>
