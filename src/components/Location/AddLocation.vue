<template>
  <div class="container">
    <Navbar />
    <div class="model d-flex justi justify-content-center">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary trans"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New Restaurant
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
                Add New Restaurant
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
                      placeholder="Restaurant Name"
                      v-model.trim="state.name"
                    />
                    <span class="error" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <br />
                <div class="row g-3 align-items-center">
                  <div class="col-auto d-block mx-auto">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone Number"
                      v-model.trim="state.phone"
                    />
                    <span class="error" v-if="v$.phone.$error">
                      {{ v$.phone.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <br />
                <div class="row g-3 align-items-center">
                  <div class="col-auto d-block mx-auto">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      v-model.trim="state.address"
                    />
                    <span class="error" v-if="v$.address.$error">
                      {{ v$.address.$errors[0].$message }}
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
                @click="addLocation()"
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
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import Navbar from "../Header/Navbar.vue";
// import axios from "axios";
export default {
  name: "AddLocation",
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      address: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(5) },
        phone: { required, minLength: minLength(10) },
        address: { required, minLength: minLength(5) },
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
      id: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
      // this.redirectTo({val:"home"})
    } else {
      this.id = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async addLocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post(`http://localhost:3000/locations`, {
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          userId: this.id,
        });
        if (result.status == 201) {
          this.errorMessage = "";
          this.successMessage = "";
          this.successMessage = "added new location";
          document.querySelector(".close").click();
          setTimeout(() => {
            this.redirectTo({ val: "home" });
          }, 200);
        } else console.log("err");
      } else {
        this.successMessage = "";
        this.errorMessage = "Youmust fill in all required fields!";
      }
    },
  },
  components: { Navbar },
};
</script>

<style lang="scss" scoped>
.model {
  text-align: left;
  .modal-body {
    display: flex;
    flex-direction: column;
  }
  .error {
    text-align: center !important;
    font-size: 14px;
    display: block;
    color: red;
  }
  .show {
    padding: 0 !important;
  }
  .trans {
    transform: translateX(22px);
  }
}
.alertmeassage {
  margin: 30px auto !important;
}
</style>
