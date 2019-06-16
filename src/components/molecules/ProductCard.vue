<template>
  <li class="product-card">
    <h3>{{ product.name }}</h3>
    <p class="category">{{ product.category }}</p>
    <p v-if="product.discount === 0"><b>{{ product.price | currency }}</b></p>
    <p v-else><b><del>{{ product.price | currency }}</del> | {{ product.price - product.discount | currency }}</b></p>
    <p>Quantity left: {{ product.quantityInStock }}</p>
    <button 
      class="btn is-gradient"
      v-bind:disabled="product.quantityInStock === 0"
      v-on:click="addToBasket(index)">
      Add to basket
    </button>
  </li>
</template>

<script>
export default {
  props: {
    index: Number,
    product: Object
  },
  methods: {
    addToBasket(i) {
      this.$emit("onAddToBasket", i);
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  background-color: color-gray(0);
  box-shadow: $box-shadow;
  padding: spacer(3);
  border-radius: 2rem;
  border-bottom-left-radius: 0; 

  > * {
    margin-bottom: spacer(2);
    margin-top: 0;
  }

  h3 {
    margin-top: 0; 
  }

  .category {
    display: inline-block;
    padding: spacer(1) spacer(2);
    background-color: color(secondary, light);
  }
}
</style>
