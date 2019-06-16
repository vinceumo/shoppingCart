<template>
  <div class="notification-banner">
    <div class="container">
      <h2>Vouchers:</h2>
      <ul class="list-unstyled">
        <li>£5.00 off your order: <b>5off</b></li>
        <li>£10.00 off when you spend over £50.00: <b>10offOver50</b></li>
        <li>£15.00 off when you have bought at least one footwear item and spent over £75.00: <b>15offOver75Footwear</b></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification-banner {
  background-color: color(primary, light);
  padding: spacer(3) 0;
  margin-bottom: spacer(3);

  @include ie11() {
    .container {
      > * {
        max-width: 400px;
      }
    }
  }
  

  h2 {
    margin-top: 0;
  }

  ul {
    margin-bottom: 0;
  }
}
</style>
