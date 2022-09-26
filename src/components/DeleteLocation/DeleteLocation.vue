<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <h1>Delete Resturant # {{ deleteLocation }}</h1>
          <hr />
          <p class="text-danger">Are You Sure You To Delete This Location?</p>
          {{ name }} <br />
          {{ phone }} <br />
          {{ address }} <br />
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <button class="btn btn-info" @click="goback()">Go Back</button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" @click="deleteRestaurant()">
            Delete Now
          </button>
        </div>
      </div>
      <div
        class="col-auto d-block mx-auto alert alert-success"
        v-if="successMessage.length > 0"
      >
        {{ successMessage }}
      </div>
      <div
        class="col-auto d-block mx-auto alert alert-danger"
        v-if="errorMessage.length > 0"
      >
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../Header/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "DeleteLocation",
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      userId: "",
      deleteLocation: "",
      locationData: "",
      successMessage: "",
      errorMessage: "",
      allItemsIdIs: [],
      allCatsIdIs: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
    } else {
      this.deleteLocation = this.$route.params.locationId;
      this.userId = JSON.parse(user).id;
      this.canCurrentUserAccess();
      let result = await axios.get(
        `http://localhost:3000/locations/${this.locationId}`
      );
      let resultion = result.data.length;
      for (var i = 0; i < resultion; i++) {
        this.allItemsIdIs.push(result.data[i].id);
      }
      let resultForCategories = await axios.get(
        `http://localhost:3000/categories?locarionId=${this.locationId}`
      );
      let resultCatlen = resultForCategories.data.length;
      for (var c = 0; c < resultCatlen; c++) {
        this.allCatsIdIs.push(resultForCategories.data[c].id);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goback() {
      this.redirectTo({ val: "home" });
    },
    async canCurrentUserAccess() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.deleteLocation}&userId=${this.userId}`
      );
      if (result.status == 200) {
        this.locationData = result.data;
        this.name = this.locationData[0].name;
        this.phone = this.locationData[0].phone;
        this.address = this.locationData[0].address;
        console.log(this.locationData);
      } else {
        this.redirectTo({ val: "home" });
      }
    },
    async deleteRestaurant() {
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.deleteLocation}`
      );
      if (result.status == 200) {
        this.successMessage = "yoou are delete";
        this.errorMessage = "";
        setTimeout(() => {
          this.redirectTo({ val: "home" });
        }, 500);
      } else {
        this.successMessage = "";
        this.errorMessage = "error for delete";
      }
      console.log(result);
    },
  },
  components: { Navbar },
};
</script>

<style lang="scss" scoped>
.alert {
  margin: 30px 0;
}
</style>
