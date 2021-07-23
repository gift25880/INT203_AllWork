<template>
  <div
    class="grid grid-cols-4 items-center bg-white rounded-md border border-gray-200 mt-4 hover:border-gray-600 cursor-pointer"
  >
    <div>
      <img :src="menuImg" class="object-cover w-20 h-20 ml-2 my-2" />
    </div>
    <div class="col-span-2">
      <h4 class="font-bold">{{ menuName }}</h4>
      <p>{{ menuPrice + ".-" }}</p>
    </div>
    <div class="ml-auto">
      <button class="bg-green-500 py-2 px-3" @click="editButtonClick">
        <i class="fas fa-pen"></i>
      </button>
      <button class="bg-red-400 py-2 px-3 mx-2" @click="deleteButtonClick">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["delete-click",'edit-click'],
  props: ["menuImg", "menuName", "menuPrice"],
  methods: {
    deleteButtonClick() {
      this.$emit("delete-click", true);
    },
    editButtonClick() {
      this.$emit("edit-click", true);
    }
  },
};
</script>