<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <h1>Delete All Categories #</h1>
          <hr />
          <p class="text-danger">Are You Sure You To Delete All Category?</p>
          <p class="text-danger">
            when Deleting all categories ,thier related menue items will be
            deleted as well ...
          </p>
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <button class="btn btn-info" @click="goback()">Go Back</button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" @click="allCategory()">
            Delete All
          </button>
        </div>
      </div>
      <div
        class="col-auto d-block mx-auto alert alert-success alertmeassage"
        v-if="successMessage.length > 0"
      >
        {{ successMessage }}
      </div>
      <div
        class="col-auto d-block mx-auto alert alert-danger alertmeassage"
        v-if="errorMessage.length > 0"
      >
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "DeleteAllLocation",
  data() {
    return {
      userId: "",
      successMessage: "",
      errorMessage: "",
      allCategryId: [],
    };
  },
  components: { Navbar },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "home" });
    } else {
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/categories?locarionId=${this.$route.params.locationId}`
      );
      let resultData = result.data;
      for (let i = 0; i < resultData.length; i++) {
        this.allCategryId.push(resultData[i].id);
      }
      console.log("allcategory");
      console.log(this.allCategryId);
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goback() {
      this.$router.push({ name: "home" });
    },
    async allCategory() {
      console.log(this.userId);
      for (let i = 0; i < this.allCategryId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/categories/${this.allCategryId[i]}`
        );
        console.log(result);
        if (result.status == 200) {
          this.successMessage = "yoou are delete";
          this.errorMessage = "";
          this.redirectTo({ val: "ViewCategory" });
        } else {
          this.successMessage = "";
          this.errorMessage = "error for delete";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alertmeassage {
  margin: 30px 0 !important;
}
</style>
