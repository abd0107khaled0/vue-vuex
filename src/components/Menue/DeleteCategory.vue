<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <h1>Delete Category # {{ catId }}</h1>
          <h1>Category Name: # {{ name }}</h1>
          <hr />
          <p class="text-danger">Are You Sure You To Delete This Category?</p>
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <button class="btn btn-info" @click="goback()">Go Back</button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" @click="deleteCategory()">
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
import { mapActions, mapMutations } from "vuex";
export default {
  name: "DeleteCategory",
  data() {
    return {
      locationId: this.$route.params.locationId,
      catId: this.$route.params.catId,
      userId: "",
      deleteLocation: "",
      locationData: "",
      successMessage: "",
      errorMessage: "",
      name: "",
      allItemsId: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
      // this.$router.push({ name: "SignUp" });
    } else {
      this.userName = JSON.parse(localStorage.getItem("user-info")).name;
      this.userId = JSON.parse(localStorage.getItem("user-info")).id;
      // this.canCurrentUserAccessThisLocation();
      this.canUserAccessThisCateory({
        userIdIs: this.userId,
        catIdIs: this.catId,
        locationIdIs: this.locationId,
        redirectToPage: "home",
      });
      this.getCategoryName(this.userId, this.locationId, this.catId);
    }
    let result = await axios.get(
      `http://localhost:3000/items?catId=${this.catId}`
    );
    if (result.status == 200) {
      console.log(result);
      let resulition = result.data.length;
      for (var i = 0; i < resulition; i++) {
        this.allItemsId.push(result.data[i].id);
      }
    }
  },
  methods: {
    ...mapMutations(["canUserAccessThisCateory"]),
    ...mapActions(["redirectTo"]),
    goback() {
      this.$router.push({
        name: "ViewCategory",
        params: { locationId: this.locationId },
      });
    },
    async getCategoryName(userId, locId, catId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&locarionId=${locId}&id=${catId}`
      );
      if (result.status == 200) {
        this.categoryName = result.data;
        if (this.categoryName.length > 0) {
          this.name = this.categoryName[0].name;
        }
      }
    },
    // async canCurrentUserAccessThisLocation() {
    //   let result = await axios.get(
    //     `http://localhost:3000/categories?id=${this.deleteLocation}&userId=${this.userId}`
    //   );
    //   if (result.status == 200) {
    //     this.locationData = result.data;
    //     this.name = this.locationData[0].name;
    //     this.phone = this.locationData[0].phone;
    //     this.address = this.locationData[0].address;
    //     console.log(this.locationData);
    //   } else {
    //     this.redirectTo({ val: "home" });
    //   }
    // },
    async deleteCategory() {
      let result = await axios.delete(
        `http://localhost:3000/categories/${this.catId}`
      );
      let allResults = [];
      for (var i = 0; i < this.allItemsId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allItemsId[i]}`
        );
        if (result.status == 200) {
          allResults.push(true);
        } else {
          allResults.push(false);
        }
      }
      if (result.status == 200 && !allResults.includes(false)) {
        this.successMessage = "yoou are delete";
        this.errorMessage = "";
        this.$router.push({ name: "ViewCategory" });
      } else {
        this.successMessage = "";
        this.errorMessage = "error for delete";
      }
      this.$router.push({ name: "ViewCategory" });
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
