<template>
  <div class="container">
    <Navbar />
    <div>
      <router-link
        :to="{
          name: 'ViewCategory',
          params: { locationId: locationId },
        }"
      >
        <button type="button" class="float-start btn btn-success">
          Back To Categories
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
    </div>
    <br />

    <div class="model d-flex justi justify-content-center">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary trans"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Update New Category
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update New Category
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @click.prevent>
                <div class="row g-3 align-items-center">
                  <div class="col-auto d-block mx-auto">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add Categry Name"
                      v-model.trim="state.name"
                    />
                    <span class="error" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <br />
                <div class="row g-3 align-items-center">
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
                </div>
                <br />
              </form>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <!-- <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="cons()"
                >
                  Add Now
                </button> -->
              <button
                type="button"
                class="btn btn-primary"
                @click="updateategory()"
                id="b"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Header/Navbar.vue";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "UpdateCategory",
  components: { Navbar },
  setup() {
    const state = reactive({
      name: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(5) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      locationId: this.$route.params.locationId,
      catId: this.$route.params.catId,
      locName: "",
      name: "",
      locAddress: "",
      userId: "",
      successMessage: "",
      errorMessage: "",
      listOfUserCategries: [],
      categoryName: [],
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
      this.canUserAccessThisCateory({
        userIdIs: this.userId,
        catIdIs: this.catId,
        locationIdIs: this.locationId,
        redirectToPage: "home",
      });
      this.getLocationInfo(this.userId, this.locationId);
      this.displayUserCategories(this.userId, this.locationId);
      this.getCategoryName(this.userId, this.locationId, this.catId);
    }
  },
  computed: {
    ...mapState([
      "isUserLoggenIn",
      "loggedInUserId",
      "numOfCategories",
      "listOfCategories",
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
    async displayUserCategories(userId, locId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&locarionId=${locId}`
      );
      if (result.status == 200) {
        this.listOfUserCategries = result.data;
      } else {
        console.log("errrrrr");
      }
    },
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
    async getCategoryName(userId, locId, catId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&locarionId=${locId}&id=${catId}`
      );
      if (result.status == 200) {
        this.categoryName = result.data;
        if (this.categoryName.length > 0) {
          this.state.name = this.categoryName[0].name;
        }
      }
    },
    async updateategory() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let filtercategories = this.listOfUserCategries.filter((e) => {
          return (
            e.name.toLocaleLowerCase() == this.state.name.toLocaleLowerCase()
          );
        });
        console.table(this.listOfUserCategries);
        if (filtercategories.length > 0) {
          console.log("yes");
        } else {
          let result = await axios.put(
            `http://localhost:3000/categories/${this.catId}`,
            {
              name: this.state.name,
              userId: this.userId,
              locarionId: this.locationId,
            }
          );
          if (result.status == 200) {
            this.errorMessage = "";
            this.successMessage = "";
            this.successMessage = "Update Categpry";
            document.querySelector(".close").click();
            setTimeout(() => {
              this.$router.push({
                name: "ViewCategory",
                params: { locationId: this.locationId },
              });
            }, 200);
          } else {
            this.successMessage = "";
            this.errorMessage = "something is rong !";
          }
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Youmust fill in all required fields!";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
