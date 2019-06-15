<template>
  <li>
    <h3>{{ product.name }}</h3>
    <p>{{ product.category }}</p>
    <p v-if="product.discount === 0">{{ product.price | currency }}</p>
    <p v-else><del>{{ product.price | currency }}</del> | {{ product.price - product.discount | currency }}</p>
    <button v-bind:disabled="product.quantityInStock === 0">Add to basket</button>
  </li>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>
