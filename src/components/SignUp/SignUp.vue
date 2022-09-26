<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <h1 class="text-center">SignUp</h1>
      <div class="col-auto d-block mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
          v-model="state.name"
        />
        <span class="error-feedback" v-if="v$.name.$error">
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
          v-model="state.email"
        />
        <span class="error-feedback" v-if="v$.email.$error">
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
        <span class="error-feedback" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" class="btn btn-primary" @click="userSignup()">
          SignUp Now</button
        >&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-primary"
          @click="redirectTo({ val: 'Login' })"
        >
          Login
        </button>
        <!-- <button type="button" class="btn btn-primary" @click="login()">
          Login
        </button> -->
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
// import { useVuelidate } from "@vuelidate/core";
export default {
  name: "SignUpForm",
  setup() {
    const state = reactive({
      pass: "",
      name: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required },
        name: { required, minLength: minLength(10) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {};
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    login() {
      this.$router.push({ name: "Login" });
    },
    async userSignup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/users", {
          name: this.state.name,
          email: this.state.email,
          pass: this.state.pass,
        });
        if (result.status == 201) {
          console.log(result.data);
          console.log("success");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "home" });
        } else {
          this.redirectTo({ val: "SignUp" });
        }
      } else {
        this.redirectTo({ val: "SignUp" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-feedback {
  color: red;
  font-size: 14px;
}
</style>
