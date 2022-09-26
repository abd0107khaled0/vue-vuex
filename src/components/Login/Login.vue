<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <h1 class="text-center">Login</h1>
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
          Login</button
        >&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-primary"
          @click="redirectTo({ val: 'SignUp' })"
        >
          SignUp
        </button>
        <!-- <button type="button" class="btn btn-primary" @click="signup()">
          SignUp
        </button> -->
      </div>
      <span
        v-if="loginNotFound.length > 0"
        class="error-feedback text-center"
        >{{ loginNotFound }}</span
      >
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Login-m",
  setup() {
    const state = reactive({
      pass: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required },
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
      loginNotFound: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    signup() {
      this.$router.push({ name: "SignUp" });
    },
    async userSignup() {
      this.v$.$validate();
      // let res = await axios.get("http://localhost:3000/users");
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.state.email}&&pass=${this.state.pass}`
      );
      // console.log(res.data);
      // console.log(result.data);
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.redirectTo({ val: "home" });
      } else this.loginNotFound = "this user not found";
      // for (let i = 0; i < res.data.length; i++) {
      //   if (res.data[i].email == result.data[0].email) {
      //     console.log("hello");
      //     this.redirectTo({ val: "home" });
      //     break;
      //   }
      // }
      // console.log(
      //   `http://localhost:3000/users?email=${this.state.email}pass=${this.state.pass}`
      // );
      // console.log(this.state.email);
      // console.log(this.v$.email.required);
      if (!this.v$.$error) {
        console.log("sucss");
      } else {
        console.log("faild");
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
