<template>
  <nav-bar v-if="$route.path === '/'" fixedNav="fixed"></nav-bar>
  <nav-bar v-else bgColor="bg-black" @add-clicked="addButtonClicked"></nav-bar>
  <router-view :addClicked="addItemClicked" @close-add-modal="closeAddModal" />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  font-family: "Quicksand", sans-serif;
  overflow: hidden;
}
</style>
<script>
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      addItemClicked: false,
    };
  },
  methods: {
    addButtonClicked(value) {
      this.addItemClicked = value;
      // console.log("app.vue: " + this.addItemClicked);
    },
    closeAddModal(value) {
      this.addItemClicked = !value;
    },
  },
};
</script>