import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import UpdateProfile from "@/components/Profile/UpdateProfile.vue";
import AddLocation from "@/components/Location/AddLocation.vue";
import ErorrPage from "../views/ErorrPage.vue";
import DeleteLocation from "@/components/DeleteLocation/DeleteLocation.vue";
import DeleteAllLocation from "@/components/DeleteLocation/DeleteAllLocation.vue";
import UpdateLocation from "@/components/DeleteLocation/UpdateLocation.vue";
import Menu from "@/components/Location/Menu.vue";
import ViewCategory from "@/components/ViewCategory/ViewCategory.vue";
import AddCategory from "@/components/AddCategory/AddCategory.vue";
import UpdateCategory from "@/components/Menue/UpdateCategory.vue";
import DeleteCategory from "@/components/Menue/DeleteCategory.vue";
import DeleteAllC from "@/components/Menue/DeleteAllC.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/AddLocation",
    name: "AddLocation",
    component: AddLocation,
  },
  {
    path: "/UpdateProfile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/DeleteLocation/:locationId",
    name: "DeleteLocation",
    component: DeleteLocation,
  },
  {
    path: "/deleteall",
    name: "deleteall",
    component: DeleteAllLocation,
  },
  {
    path: "/UpdateLocation/:locationId",
    name: "UpdateLocation",
    component: UpdateLocation,
  },
  {
    path: "/Menu/locationID/:locationID",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/AddCategory/location/add/:locationID",
    name: "AddCategory",
    component: AddCategory,
  },
  {
    path: "/ViewCategory/location/view/:locationID",
    name: "ViewCategory",
    component: ViewCategory,
  },
  {
    path: "/Menu/Categories/Update/:locationId/:catId",
    name: "UpdateCategory",
    component: UpdateCategory,
  },
  {
    path: "/Menu/Categories/Delete/:locationId/:catId",
    name: "DeleteCategory",
    component: DeleteCategory,
  },
  {
    path: "/DeleteAllC/DeleteAll/:locationId",
    name: "DeleteAllC",
    component: DeleteAllC,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "ErorrPage",
    component: ErorrPage,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log(to); // جاى من
  // console.log(from); // رايح من
  if (to.name != null) {
    if (to.params.pageTitle == undefined) to.params.pageTitle = from.name;
    document.title =
      process.env.VUE_APP_TITLE +
      " |" +
      " " +
      (to.params.pageTitle ? to.params.pageTitle + " |" : "") +
      " " +
      to.name;
  }
  next(); //function
});
export default router;
