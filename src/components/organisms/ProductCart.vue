<template>
  <section>
    <ul>
      <li v-for="(item, index) in basketItems" v-bind:key="index + item.id">
        {{ item.name }} | quantity: {{ item.quantityInBasket }} | total: {{ item.quantityInBasket * item.price - item.discount | currency  }}
        <button v-on:click="removeToBasket(item.id)">Remove Item</button>
      </li>
    </ul>
    <hr>
    <p><b>Total: {{ total | currency }}</b></p>
  </section>
</template>

<script>
export default {
  props: {
    basketItems: Array
  },
  methods: {
    removeToBasket(id) {
      this.$emit("onRemoveToBasket", id);
    },
  },
  computed: {
    total() {
      let total = 0;

      for (let item of this.basketItems) {
        total += item.quantityInBasket * item.price - item.discount;
      }

      return total;
    },
  },
}
</script>