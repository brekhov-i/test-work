<style lang="scss">
.products {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 0 100px;
  margin-bottom: 50px;
  &-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    justify-content: center;
    align-self: center;
    margin-bottom: 50px;
  }
  .btn-next {
    width: 300px;
    height: 50px;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    overflow-anchor: none;
    grid-column: span 2;
  }
}
</style>

<template>
  <section class="products">
    <div class="products-wrapper" v-if="loader === false">
      <div class="products__content" v-if="PRODUCTS.length">
        <Product
          v-for="(product, i) of PRODUCTS"
          :key="product.id"
          :productData="product"
          :index="i"
          @deleteCart="deleteCart"
        />
        <button @click="showNext" class="btn-next">
          {{ loaderBtn ? "Загрузка" : "Show next" }}
        </button>
      </div>
      <div class="undefined-text" v-else>Ничего не найдено</div>
    </div>
    <div class="loader" v-else>Загрузка</div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Product from "../components/v-product";

export default {
  name: "Home",
  data: () => ({
    loader: true,
    loaderBtn: true,
    page: 0,
  }),
  components: { Product },
  computed: {
    ...mapGetters(["PRODUCTS"]),
  },
  methods: {
    async showNext() {
      this.page++;
      this.loaderBtn = true;
      await this.$store.dispatch("getProduct", this.page);
      setTimeout(() => {
        this.loaderBtn = false;
      }, 500);
    },
    deleteCart(data) {
      this.$store.dispatch("deleteProduct", data.id);
    },
  },
  async mounted() {
    await this.showNext();
    setTimeout(() => {
      this.loader = false;
    }, 500);
  },
};
</script>
