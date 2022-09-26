<template>
  <div class="error-page">
    <img src="../assets/download.jpeg" alt="" class="riunded mx-auto d-block" />
    <router-link :to="{ name: 'home' }">
      <button class="btn btn-info">Visit Home Page</button>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Error-page",
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Login" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  img {
    width: 500px;
    margin: 30px auto;
  }
  .btn {
    font-size: 18px;
    font-weight: normal;
  }
}
</style>
