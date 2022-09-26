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
            placeholder="Enter Your Name"
            v-model.trim="state.name"
          />
          <span class="text-center error-feedback" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            v-model.trim="state.email"
          />
          <span class="text-center error-feedback" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-model="state.pass"
          />
          <span class="text-center error-feedback" v-if="v$.pass.$error">
            {{ v$.pass.$errors[0].$message }}
          </span>
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
import useValidate from "@vuelidate/core";
import { email, required, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "UpdateProfile-m",
  components: { Navbar },
  setup() {
    const state = reactive({
      pass: "",
      name: "",
      email: "",
      id: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required, maxLength: maxLength(10) },
        name: { required },
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
      // v$: useVuelidate(),
      // name: "",
      // email: "",
      // pass: "",
    };
  },
  // validations() {
  //   return {
  //     name: { required, minLength: minLength(10) },
  //     email: { required, email },
  //     pass: { required, minLength: minLength(10) },
  //   };
  // },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.state.name = JSON.parse(user).name;
      this.state.email = JSON.parse(user).email;
      this.state.pass = JSON.parse(user).pass;
      this.state.id = JSON.parse(user).id;
    } else {
      this.redirectTo({ name: "SignUp" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async updateProfile() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.state.id}`,
          {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
          }
        );
        console.log(result);
        if (result.status == 200 && result.data) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "Profile" });
        } else {
          console.warn("not found");
        }
        console.log("validate");
      } else {
        console.warn("not validate");
      }
    },
  },
};
</script>

<style lang="scss">
.error-feedback {
  color: red;
  font-size: 14px;
}
</style>
