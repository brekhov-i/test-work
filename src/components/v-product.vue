<style lang="scss">
.product {
  width: 100%;
  height: auto;
  &__wrapper {
    width: 100%;
    height: 300px;
    display: grid;
    grid-template-rows: 20px 270px;
    grid-template-columns: 150px auto 30px;
    grid-row-gap: 20px;
    grid-column-gap: 10px;
  }
  &__number {
    width: 100%;
    grid-column: 1;
    padding-left: 5px;
  }
  &__img {
    height: 100%;
    object-fit: contain;
    margin-right: 20px;
    grid-column: span 1;
  }
  &__content {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    grid-column: span 2;
  }
  &__name {
    font-size: 28px;
    margin-bottom: 18px;
  }
  &__description {
    font-size: 16px;
    margin-bottom: 10px;
  }
  &__btnEdit {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    border: 1px solid;
    width: 40px;
    height: 25px;
  }
  &__delete {
    width: 40px;
    height: 25px;
    border: 1px solid;
  }
}
</style>

<template>
  <div class="product">
    <div class="product__wrapper">
      <div class="product__number">Карточка №{{ productData.id }}</div>
      <button class="product__btnEdit" @click="edit = !edit">Edit</button>
      <button class="product__delete" @click="deleteCLick">Delete</button>
      <img :src="productData.image_url" alt="" class="product__img" />
      <div class="product__content">
        <h6 class="product__name">{{ name }}</h6>
        <p class="product__description">{{ description }}</p>
        <p class="product__tips">{{ productData.brewers_tips }}</p>
      </div>
    </div>
    <formEdit @update="getNewData" v-show="edit" />
  </div>
</template>

<script>
import formEdit from "./v-formEdit";

export default {
  props: {
    productData: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data: () => ({
    edit: false,
    name: "",
    description: "",
  }),
  components: {
    formEdit,
  },
  methods: {
    getNewData(someData) {
      if (someData.name !== "") {
        this.name = someData.name;
      }
      if (someData.description !== "") {
        this.description = someData.description;
      }
    },
    deleteCLick() {
      let id = this.index;
      this.$emit("deleteCart", {
        id: id,
      });
    },
  },
  async mounted() {
    this.name = this.productData.name;
    this.description = this.productData.description;
  },
};
</script>