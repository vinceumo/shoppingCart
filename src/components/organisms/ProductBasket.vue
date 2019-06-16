<template>
  <section class="product-basket" v-bind:class="(showBasket) ? 'has-basket-open' : ''">
    <div class="basket-toggle">
      <button 
        class="btn is-primary"
        v-on:click="toggleBasket">Basket</button>
    </div>
    <div rel="basketContent" class="product-basket-content">
      <ul class="list-unstyled product-list">
        <li v-for="(item, index) in basketItems" v-bind:key="index + item.id">
          <p><b>{{ item.name }}</b> x {{ item.quantityInBasket }}</p>
          <p>total: {{ item.quantityInBasket * item.price - item.discount | currency }}</p>
          <button class="btn is-danger" v-on:click="removeToBasket(item.id)">Remove Item</button>
        </li>
      </ul>
      <div class="voucher-bar">
        <label for="voucher"><b>Voucher: </b></label>
        <input 
          v-model="voucherInput" 
          type="text" 
          id="voucher">
        <button 
          class="btn is-primary"
          v-bind:disabled="voucherInput === ''"
          v-on:click="submitVoucher()">
          Submit
        </button>
      </div>
      <p class="has-bg-danger-light has-py-2 has-px-3" v-if="voucherErrorMsg">{{ voucherErrorMsg }}</p>
      <div v-if="voucherDiscount > 0">
        <p><b>Discount: </b>{{ voucherDiscount | currency }}</p>
        <p>
          <b>Total: 
            <del>{{ total | currency }}</del> | 
            {{ totalWithVoucherDiscount | currency }}</b>
        </p>
      </div>
      <p v-else><b>Total: {{ total | currency }}</b></p> 
      <button class="btn is-gradient">Checkout</button>
    </div>
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
      voucherDiscount: 0,
      showBasket: false
    }
  },
  methods: {
    toggleBasket() {
      this.showBasket = !this.showBasket;
      //Todo implement inert toggle
    },
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

<style lang="scss" scoped>
$btn-height: 3.75rem;

.product-basket {
  background-color: color-gray(0);
  box-shadow: $box-shadow;
  border-radius: 2rem;
  border-bottom-left-radius: 0; 
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate3D(-50%, calc(100% - 3.75rem), 0);
  width: 100%;
  max-height: 90vh;
  transition: transform 0.3s ease-in-out;

  @include ie11() {
    transform: translateY(100%) translateY(-3.75rem) translateX(-50%);
  }

  @include min(bp(md)) {
    position: sticky;
    top: spacer(2);
    left: auto;
    max-height: 90vh;
    transform: translate3D(0, 0, 0);
  }

  &.has-basket-open {
    transform: translate3D(-50%, 0, 0);

    @include min(bp(md)) {
      transform: translate3D(0, 0, 0);
    }
  }

  .basket-toggle {
    text-align: center;
    padding-bottom: spacer(3);
    padding-top: spacer(3);

    @include min(bp(md)) {
      display: none;
    }
  }

  .product-basket-content {
    padding: spacer(3);
    max-height: calc(100vh - #{$btn-height * 3});
    overflow-y: auto;
  }

  .product-list {
    > li {
      border-bottom: 1px solid color-gray(20);
      padding-bottom: spacer(2);
      margin-bottom: spacer(2);

      > * {
        margin: 0;
        margin-bottom: spacer(2);
      }
    }
  }

  .voucher-bar {
    display: flex;
    align-items: center;

    input {
      width: 100%;
    }
  }
}
</style>
