<template>
<div class="w-screen" :class="[fixedNav,bgColor]">
    <div class="container mx-auto flex items-center py-4 justify-between">
        <h1 class="text-2xl text-white font-medium">
            <router-link to="/">GSH Manager</router-link>
        </h1>
        <div>
            <router-link to="/about" class="text-white hover:text-yellow-500">About Gift Steak House</router-link>
            <base-button buttonLabel="+ Add New Menu" buttonColor="bg-red-400" textColor="text-black" borderColor="border-transparent" v-if="$route.path==='/menu'" @click="changeAddItemClicked"/>
            <router-link to="/menu" v-else>
               <base-button buttonLabel="Browse Menu" buttonColor="bg-yellow-500" textColor="text-black" borderColor="border-transparent"/> 
            </router-link>
            
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['fixedNav','bgColor'],
    emits: ['add-clicked'],
    data() {
        return {
            addItemClicked: false
        }
    },
    methods: {
        changeAddItemClicked() {
            this.addItemClicked = true;
            // console.log("nav: "+this.addItemClicked);
            this.$emit('add-clicked',this.addItemClicked);
            this.addItemClicked = false;
        }
    } 
}
</script>