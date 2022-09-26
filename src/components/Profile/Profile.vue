<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Update Your Profile</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            disabled
            placeholder="Enter Your Name"
            v-model.trim="name"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            disabled
            placeholder="Enter Your Email"
            v-model.trim="email"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            disabled
            placeholder="Enter Your Password"
            v-model="pass"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            class="btn btn-primary"
            @click="updateProfile()"
          >
            Update Profile Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "ProfileForm-m",
  components: { Navbar },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    } else {
      this.redirectTo({ name: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    updateProfile() {
      this.redirectTo({ val: "UpdateProfile" });
    },
  },
};
</script>

<style></style>
