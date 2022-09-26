<template>
  <div class="container">
    <table class="table caption-top" v-if="allLocation.length > 0">
      <caption>
        List Of Locations ((
        {{
          allLocation.length
        }}))
        <span class="float-end">
          <router-link
            :to="{
              name: 'deleteall',
              params: { DeleteAllLocation: allLocation },
            }"
          >
            <button class="btn btn-danger">Delete All</button>
          </router-link>
        </span>
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loc, i) in allLocation" :key="i">
          <th scope="row">{{ loc.name }}</th>
          <td>{{ loc.phone }}</td>
          <td>{{ loc.address }}</td>
          <td>
            <router-link
              :to="{ name: 'DeleteLocation', params: { locationId: loc.id } }"
            >
              <button class="btn btn-danger">Delete</button>
            </router-link>
            &nbsp;&nbsp;&nbsp;
            <router-link
              :to="{ name: 'UpdateLocation', params: { locationId: loc.id } }"
            >
              <button class="btn btn-info">Updata</button>
            </router-link>
            &nbsp;&nbsp;&nbsp;
            <router-link :to="{ name: 'Menu', params: { locationID: loc.id } }">
              <button class="btn btn-success">Menu</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-warning alertmeassage" role="alert" v-else>
      No Location Added Yet
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLocation",
  props: ["allLocation"],
  mounted() {},
};
</script>

<style lang="scss" scoped>
.alertmeassage {
  margin: 30px 0 !important;
}
</style>
