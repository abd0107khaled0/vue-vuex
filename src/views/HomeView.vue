<template>
  <div class="home">
    <Navbar />
    <p class="text-center">
      Welcome {{ userName }}
      <router-link :to="{ name: 'Profile' }">
        <button class="btn btn-info">Profile</button>
      </router-link>
    </p>
    <router-link :to="{ name: 'AddLocation' }">
      <button type="button" class="btn btn-primary">Add New Restaurant</button>
    </router-link>
    <UserLocation :allLocation="listOfLoction" />
  </div>
</template>

<script>
import Navbar from "@/components/Header/Navbar.vue";
import { mapActions } from "vuex";
import UserLocation from "@/components/Location/UseerLocation.vue";
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      userId: "",
      userName: "",
      listOfLoction: [],
    };
  },
  components: {
    Navbar,
    UserLocation,
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
      // this.$router.push({ name: "SignUp" });
    } else {
      this.userName = JSON.parse(localStorage.getItem("user-info")).name;
      this.userId = JSON.parse(localStorage.getItem("user-info")).id;
    }
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      // console.log(result.data);
      this.listOfLoction = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang="scss" scoped>
body {
  min-width: 786px !important;
}
</style>
