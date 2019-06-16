<template>
  <li>
    <h3>{{ product.name }}</h3>
    <p>{{ product.category }}</p>
    <p v-if="product.discount === 0">{{ product.price | currency }}</p>
    <p v-else><del>{{ product.price | currency }}</del> | {{ product.price - product.discount | currency }}</p>
    <p>Quantity: {{ product.quantityInStock }}</p>
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
