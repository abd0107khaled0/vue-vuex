<template>
  <div class="container">
    <Navbar />
    <router-link
      :to="{
        name: 'AddCategory',
        params: { locationId: locationId },
      }"
    >
      <button type="button" class="float-start btn btn-success">
        Add Categories
      </button>
    </router-link>
    <router-link
      :to="{
        name: 'Menu',
        params: { locationId: locationId },
      }"
    >
      <button type="button" class="float-end btn btn-success">
        Back to Menu
      </button>
    </router-link>
    <div class="clearfix"></div>
    <h1 class="mb">{{ locName }}</h1>
    <p class="text-muted">{{ locAddress }}</p>
    <div>
      <table class="table caption-top text-start" v-if="numOfCategories > 0">
        <caption>
          List Of Categories ((
          {{
            numOfCategories
          }}))
          <span class="float-end">
            <router-link
              :to="{
                name: 'DeleteAllC',
                params: { locationId: locationId },
              }"
            >
              <button class="btn btn-danger">Delete All</button>
            </router-link>
          </span>
        </caption>
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-start">Name</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, i) in listOfCategories" :key="i">
            <th scope="row">{{ cat.name }}</th>
            <td class="text-end">
              <router-link
                :to="{
                  name: 'DeleteCategory',
                  params: {
                    catId: cat.id,
                    params: {
                      catId: cat.id,
                      locationId: cat.locarionId,
                    },
                  },
                }"
              >
                <button class="btn btn-danger">Delete</button>
              </router-link>
              &nbsp;&nbsp;&nbsp;
              <router-link
                :to="{
                  name: 'UpdateCategory',
                  params: {
                    catId: cat.id,
                    locationId: cat.locarionId,
                  },
                }"
              >
                <button class="btn btn-info">Updata</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-warning mt15" role="alert" v-else>
        No CAtegories Added Yet
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "ViewCategory",
  components: { Navbar },
  data() {
    return {
      locationId: this.$route.params.locationId,
      userId: "",
      locAddress: "",
      locName: "",
      name: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
      // this.$router.push({ name: "SignUp" });
    } else {
      this.userName = JSON.parse(localStorage.getItem("user-info")).name;
      this.userId = JSON.parse(localStorage.getItem("user-info")).id;
      this.canUserAccessThisLocation({
        userIdIs: this.userId,
        locationIdIs: this.locationId,
        redirectToPage: "home",
      });
      // this.canUserAccessThisCateory({
      //   userIdIs: this.userId,
      //   locationIdIs: this.locationId,
      //   redirectToPage: "home",
      // });
      this.displayAllCategory({
        userIdIs: this.userId,
        locationIdIs: this.locationId,
      });
      this.getLocationInfoIs(this.userId, this.locationId);
    }
  },
  computed: {
    ...mapState([
      "isUserLoggenIn",
      "loggedInUserId",
      "numOfCategories",
      "listOfCategories",
      "listOfLocations",
    ]),
  },
  methods: {
    ...mapMutations([
      "isLoggedInUser",
      "displayAllCategory",
      "canUserAccessThisLocation",
      "canUserAccessThisCateory",
    ]),
    ...mapActions(["redirectTo"]),
    async getLocationInfoIs(userIdi, locId) {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${userIdi}&id=${locId}`
      );
      let Bdata = [];
      if (result.status == 200) {
        Bdata = result.data;
        this.locName = Bdata[0].name;
        this.locAddress = Bdata[0].address;
      } else {
        console.log("errrrrr");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
