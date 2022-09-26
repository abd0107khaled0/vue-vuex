<template>
  <ul>
    <router-link
      :to="{ name: 'home', params: { pageTitle: 'HomePage' } }"
      tag="li"
      exact
      ><a>Home</a></router-link
    >
    |
    <!-- <router-link :to="{ name: 'about' }" tag="li"><a>About</a></router-link
    >|
    <router-link :to="{ name: 'SignUp' }" tag="li"><a>SignUp</a></router-link
    >|
    <router-link :to="{ name: 'Login' }" tag="li"><a>Login</a></router-link
    >| -->
    <li>
      <a href="#" @click="logMetOut()">Logout</a>
    </li>
  </ul>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Navbar_m",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["redirectTo"]),
    logMetOut() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
      //   location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
$fontColor: darkcyan;
$navColor: #525a5a;
ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 20px 0 50px 0;
  a {
    text-decoration: none;
    font-weight: bold;
    color: $fontColor;
    padding: 10px 10px !important;
    margin: 0 10px;
  }
}
.router-link-exact-active a,
ul a:hover {
  color: $navColor;
  box-shadow: 2px 2px 4px 0 $navColor;
}
</style>
