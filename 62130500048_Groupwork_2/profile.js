const app = {
    data() {
        return {
            firstname: "Pathinya",
            lastname: "Thonguam",
            job: "Full-stack Developer",
            article: 40,
            followers: "120M",
            ratings: 5.0,
            profile: "./images/gift.jpg",
            width: 200
        }
    }
}
const mountedApp = Vue.createApp(app).mount('#app');