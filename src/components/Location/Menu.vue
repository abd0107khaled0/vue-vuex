<template>
  <div class="container">
    <Navbar />
    <div>
      <router-link
        :to="{
          name: 'ViewCategory',
          params: {
            locationId: locationId,
            loc: 'loc',
            locName: locName,
            locAddress: locAddress,
          },
        }"
      >
        <button type="button" class="float-start btn btn-success">
          view Categories
        </button>
      </router-link>
      <button
        type="button"
        class="float-end btn btn-success"
        @click="addMenue()"
        v-if="numOfCategories > 0"
      >
        Add New Items
      </button>
    </div>
    <div class="clearfix"></div>
    <div class="text-center">
      <h1 class="mb">{{ locName }}</h1>
      <p class="text-muted">{{ locAddress }}</p>
    </div>
    <!-- <div>
      Is User Logged In ? {{ isUserLoggenIn }} <br />
      user Id is? 
      {{ loggedInUserId }}<br />
      Num of Categries?{{ numOfCategories }}<br />
      Categories Array? {{ listOfCategories }}
    </div> -->
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Menu-m",
  components: { Navbar },
  data() {
    return {
      userId: "",
      userName: "",
      listOfLoction: "",
      locationId: this.$route.params.locationID,
      locName: "",
      locAddress: "",
    };
  },
  computed: {
    ...mapState([
      "isUserLoggenIn",
      "loggedInUserId",
      "numOfCategories",
      "listOfCategories",
    ]),
  },
  async mounted() {
    // document.addEventListener("keypress", function (e) {
    //   console.log(e.key);
    // });
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
      // this.$router.push({ name: "SignUp" });
    } else {
      this.userName = JSON.parse(localStorage.getItem("user-info")).name;
      this.userId = JSON.parse(localStorage.getItem("user-info")).id;
      this.isLoggedInUser();
      this.locationId = this.$route.params.locationID;
      this.displayAllCategory({
        userIdIs: this.userId,
        locationIdIs: this.locationId,
      });
      this.canUserAccessThisLocation({
        userIdIs: this.userId,
        locationIdIs: this.locationId,
        redirectToPage: "home",
      });
      // console.log(this.locationId);
    }
    this.getLocationInfo(this.userId, this.locationId);
  },
  methods: {
    ...mapMutations([
      "isLoggedInUser",
      "displayAllCategory",
      "canUserAccessThisLocation",
    ]),
    ...mapActions(["redirectTo"]),
    async getLocationInfo(userId, locId) {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${userId}&id=${locId}`
      );
      if (result.status == 200) {
        this.locName = result.data[0].name;
        this.locAddress = result.data[0].address;
      } else {
        console.log("errrrrr");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mb {
  margin-bottom: 0;
}
</style>
