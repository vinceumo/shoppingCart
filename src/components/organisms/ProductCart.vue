<template>
  <section>
    <ul>
      <li v-for="(item, index) in basketItems" v-bind:key="index + item.id">
        {{ item.name }} | quantity: {{ item.quantityInBasket }} | total: {{ item.quantityInBasket * item.price - item.discount | currency }}
        <button v-on:click="removeToBasket(item.id)">Remove Item</button>
      </li>
    </ul>
    <hr>
    <div>
      <label for="voucher">Voucher: </label>
      <input 
        v-model="voucherInput" 
        type="text" 
        id="voucher">
      <button 
        v-bind:disabled="voucherInput === ''"
        v-on:click="submitVoucher()">
        Submit
      </button>
    </div>
    <p v-if="voucherErrorMsg">{{ voucherErrorMsg }}</p>
    <div v-if="voucherDiscount > 0">
      <p>Discount: {{ voucherDiscount | currency }}</p>
      <p>
        <b>Total: 
          <del>{{ total | currency }}</del> | 
          {{ totalWithVoucherDiscount | currency }}</b>
      </p>
    </div>
    <p v-else><b>Total: {{ total | currency }}</b></p> 
  </section>
</template>

<script>
export default {
  props: {
    basketItems: Array
  },
  data() {
    return {
      voucherInput: "",
      submitedVoucher: "",
      voucherErrorMsg: "",
      voucherDiscount: 0
    }
  },
  methods: {
    removeToBasket(id) {
      this.$emit("onRemoveToBasket", id);
    },
    submitVoucher() {
      this.submitedVoucher = this.voucherInput;
      this.getVoucherDiscount();
    },
    getVoucherDiscount() {
      switch (this.submitedVoucher) {
        case "5off":
          this.voucherDiscount = 5;
          break;
        case "10offOver50":
          if (this.total >= 50) {
            this.voucherDiscount = 10;
            this.voucherErrorMsg = "";
          } else {
            this.voucherDiscount = 0;
            this.voucherErrorMsg = "You need to spend over £50.00 to use this voucher";
          }
          break;
        case "15offOver75Footwear": {
          const footwareItem = this.basketItems.filter(product => product.category === "Women’s Footwear" || product.category === "Men’s Footwear");
          if (this.total >= 75 && footwareItem.length) {
            this.voucherDiscount = 15;
            this.voucherErrorMsg = "";
          } else if (this.total < 75 && footwareItem.length) {
            this.voucherDiscount = 0;
            this.voucherErrorMsg = "You need to spend over £75.00 to use this voucher";
          } else if (this.total >= 75 && footwareItem.length === 0){
            this.voucherDiscount = 0;
            this.voucherErrorMsg = "You need at least one footwear item to use this voucher";
          } else {
            this.voucherDiscount = 0;
            this.voucherErrorMsg = "You need at least one footwear item and to spend over £75.00, to use this voucher";
          }
          break;
        }
        default:
          this.voucherDiscount = 0;
          this.voucherErrorMsg = `${this.submitedVoucher} is not a valid voucher code`;
          break;
      }
    }
  },
  computed: {
    total() {
      let total = 0;

      for (let item of this.basketItems) {
        total += item.quantityInBasket * item.price - item.discount;
      }

      return total;
    },
    totalWithVoucherDiscount() {
      return this.total - this.voucherDiscount;
    }
  },
  watch: {
    basketItems() {
      if(this.submitedVoucher) {
        this.getVoucherDiscount();
      }
    }
  },
}
</script>