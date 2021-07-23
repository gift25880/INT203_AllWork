<template>
  <div>
    <video
      autoplay
      muted
      loop
      id="myVideo"
      class="fixed right-0 bottom-0 min-w-full min-h-full -z-99"
    >
      <source src="../assets/steak-bg.mp4" type="video/mp4" />
    </video>

    <div
      class="h-screen w-screen text-center flex justify-center items-center text-white"
    >
      <div>
        <h1 class="text-5xl font-bold">Gift Steak House Manager</h1>
        <h2 class="text-xl mt-2">
          Website for managing Gift Steak House Restaurant
        </h2>
        <br />
        <router-link to="/menu">
          <base-button
            buttonLabel="Browse Menu"
            buttonColor="bg-yellow-500"
            textColor="text-black"
            borderColor="border-transparent"
            class="text-xl"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
