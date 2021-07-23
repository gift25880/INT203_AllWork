<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      >
        <form @submit.prevent="checkForm">
          <div class="bg-white px-4 pt-5 pb-4">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-2xl font-medium text-gray-900" id="modal-title">
                {{ formLabel }}
              </h3>
              <div class="mt-4">
                <div class="grid grid-cols-3 gap-6">
                  <div>
                    <img
                      :src="menuImage"
                      class="object-cover w-48 h-48 border"
                    />
                    <br />
                    <div class="relative overflow-hidden inline-block">
                      <base-button
                        buttonLabel="Upload Image"
                        buttonColor="bg-grey-300"
                        textColor="text-black"
                        borderColor="border-black"
                      >
                      </base-button>
                      <input
                        id="file-input"
                        type="file"
                        @change="uploadPhoto"
                        class="absolute top-0 left-0 opacity-0 h-10"
                      />
                    </div>
                  </div>
                  <div class="col-span-2">
                    <div>
                      <label for="menuName" class="text-lg font-medium"
                        >Menu Name</label
                      >
                      <br />
                      <input
                        type="text"
                        id="menuName"
                        v-model="menuName"
                        name="menuName"
                        class="border w-11/12 mt-2 rounded h-8 text-md"
                      />
                      <br>
                      <i class="text-sm text-red-500" v-if="errors">
                        {{ errors.menuName }}</i
                      >
                    </div>
                    <div class="mt-4">
                      <label for="menuDescript" class="text-lg font-medium"
                        >Menu Description
                        <span class="italic text-sm text-gray-400"
                          >(optional)</span
                        ></label
                      >
                      <br />
                      <textarea
                        rows="5"
                        cols="50"
                        id="menuDescript"
                        v-model="menuDescript"
                        name="menuDescript"
                        class="border w-11/12 mt-2 rounded text-mg"
                      />
                    </div>
                    <div class="mt-2">
                      <label for="menuPrice" class="text-lg font-medium"
                        >Price</label
                      >
                      <br />
                      <input
                        type="number"
                        id="menuPrice"
                        v-model="menuPrice"
                        name="menuPrice"
                        class="border w-1/5 mt-2 rounded h-8 text-md"
                      />
                      <br>
                      <i class="text-sm text-red-500" v-if="errors">
                        {{ errors.menuPrice }}</i
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <base-button
              buttonLabel="Save"
              buttonColor="bg-green-500"
              textColor="text-white"
              borderColor="border-transparent"
              buttonType="submit"
            />
            <base-button
              buttonLabel="Cancel"
              buttonColor="bg-white"
              textColor="text-black"
              borderColor="border-grey-400"
              @click="closeCurrentModal"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import menuImage from "../assets/placeholder.png";

const constraints = {
  menuName: {
    presence: true,
  },
  menuPrice: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
    },
  },
};

export default {
  props: ["formLabel", "menuImgFromDb", "name", "description", "price"],
  emits: ["close", "save-menu"],
  data() {
    return {
      menuImage: this.menuImgFromDb ? this.menuImgFromDb : menuImage,
      menuName: this.name,
      menuDescript: this.description,
      menuPrice: this.price,
      errors: null,
    };
  },
  methods: {
    closeCurrentModal() {
      this.$emit("close", true);
    },
    uploadPhoto(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.menuImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    checkForm() {
      console.log("he");
      var validate = require("validate.js");
      this.errors = validate(
        {
          menuName: this.menuName,
          menuDescript: this.menuDescript,
          menuPrice: this.menuPrice,
        },
        constraints
      );
      if (this.errors) {
        console.log(this.errors);
      } else {
        // console.log(this.menuName)
        // console.log(this.menuDescript);
        // console.log(this.menuPrice);
        this.saveMenuInfo();
        this.closeCurrentModal();
      }
    },
    saveMenuInfo() {
      let menu = {
        name: this.menuName,
        description: this.menuDescript,
        price: this.menuPrice,
        imgSrc: this.menuImage
      };
      this.$emit("save-menu", menu);
    },
  },
};
</script>