<style lang="scss">
.product__formEdit {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .formEdit {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &__group {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        height: 30px;
        border-radius: 10px;
        border: 1px solid;
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    button {
      width: 150px;
      height: 30px;
      border: 1px solid;
    }
  }
}
</style>

<template>
  <transition name="fade">
    <div class="product__formEdit">
      <h1>Редактирование карточки</h1>
      <form action="#" class="formEdit">
        <div class="formEdit__group">
          <label for="name">Название</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="formEdit__group">
          <label for="description">Описание</label>
          <input type="text" id="description" v-model="description" />
        </div>
        <button type="submit" @click.prevent="Edit">Edit</button>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["formData"],
  data: () => ({
    name: "",
    description: "",
  }),
  methods: {
    Edit() {
      this.$emit("update", {
        name: this.name,
        description: this.description,
      });

      this.name = "";
      this.description = "";
    },
  },
};
</script>