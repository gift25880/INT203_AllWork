<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 h-screen mt-4 gap-4">
      <div class="col-span-2 border-r">
        <div class="mr-10">
          <h1 class="text-3xl font-bold">{{ currentMenu.name }}</h1>
          <p>{{ currentMenu.description }}</p>
        </div>
        <br>
        <img :src="currentMenu.imgSrc" class="w-10/12 h-3/5 max-h-96 object-cover" />
        <div class="flex justify-end mr-20">
          <h3
            class="text-4xl font-semibold bg-yellow-500 text-center rounded-full w-1/6 py-11"
          >
            {{ currentMenu.price + ".-" }}
          </h3>
        </div>
      </div>
      <div>
        <input
          v-model="inputSearch"
          placeholder="What are you finding?"
          class="p-2 bg-white w-full rounded border"
        />
        <div class="max-h-4.5/6 overflow-y-auto">
          <div v-for="m in searchMenu" :key="m.id">
            <menu-block
              :menuImg="m.imgSrc"
              :menuName="m.name"
              :menuPrice="m.price"
              @click="selectedMenu(m)"
              @delete-click="deleteMenu(m.id)"
              @edit-click="openEditModal"
            />
          </div>
        </div>

        <p v-if="notFound" class="text-center text-xl mt-4">
          We can't find the menu <br />that you're looking for...
        </p>
      </div>
    </div>
  </div>
  <modal
    v-if="addClicked"
    @close="changeAddItemClicked"
    formLabel="Add New Menu"
    @save-menu="addNewMenu"
  ></modal>
  <modal
    v-if="editClicked"
    @close="changeEditItemClicked"
    formLabel="Edit Menu"
    :menuImgFromDb="currentMenu.imgSrc"
    :name="currentMenu.name"
    :description="currentMenu.description"
    :price="currentMenu.price"
    @save-menu="editMenu"
  ></modal>
</template>
<script>
import MenuBlock from "../components/MenuBlock";
import Modal from "../components/Modal";
export default {
  emits: ["close-add-modal"],
  props: ["addClicked"],
  components: {
    MenuBlock,
    Modal,
  },
  data() {
    return {
      url: " http://localhost:5000/menu",
      menu: [],
      inputSearch: "",
      notFound: false,
      currentMenu: [],
      editClicked: false,
    };
  },
  methods: {
    changeAddItemClicked(value) {
      this.$emit("close-add-modal", value);
    },
    changeEditItemClicked(value) {
      this.editClicked = !value;
    },
    changeNotFound(value) {
      this.notFound = value;
    },
    async fetchMenu() {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },
    selectedMenu(menu) {
      this.currentMenu = menu;
    },
    async addNewMenu(newMenu) {
      const res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newMenu.name,
          description: newMenu.description,
          price: newMenu.price,
          imgSrc: newMenu.imgSrc,
        }),
      });
      const data = await res.json();
      this.menu = [...this.menu, data];
      this.currentMenu = this.menu[this.menu.length-1];
    },
    async deleteMenu(id) {
      const res = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.menu = this.menu.filter((m) => m.id !== id))
        : alert("Error to delete menu");
      this.currentMenu = this.menu[this.menu.length - 1];
    },
    openEditModal(value) {
      this.editClicked = value;
    },
    async editMenu(editingMenu) {
      const res = await fetch(`${this.url}/${this.currentMenu.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: editingMenu.name,
          description: editingMenu.description,
          price: editingMenu.price,
          imgSrc: editingMenu.imgSrc
        }),
      });
      const data = await res.json();
      this.menu = this.menu.map((m) =>
        m.id === data.id
          ? {
              ...m,
              name: data.name,
              description: data.description,
              price: data.price,
              imgSrc: data.imgSrc
            }
          : m
      );
      this.currentMenu.name = editingMenu.name;
      this.currentMenu.description = editingMenu.description;
      this.currentMenu.price = editingMenu.price;
      this.currentMenu.imgSrc = editingMenu.imgSrc;
    },
  },
  computed: {
    searchMenu() {
      this.changeNotFound(false);
      if (this.inputSearch == "") {
        return this.menu.slice().reverse();
      } else {
        let result = this.menu.filter((n) =>
          n.name.toLowerCase().includes(this.inputSearch.toLowerCase())
        );
        if (result == "") {
          this.changeNotFound(true);
          return;
        }
        return result;
      }
    },
  },
  async created() {
    this.menu = await this.fetchMenu();
    this.currentMenu = await this.menu[0];
  },
};
</script>