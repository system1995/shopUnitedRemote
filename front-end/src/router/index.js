import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import SignUp from "@/components/SignUp"
import Shop from "@/components/Shop"
import LikedShop from "@/components/LikedShop"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/shop",
      name: "Shop",
      component: Shop
    },
    {
      path: "/likedShop",
      name: "LikedShop",
      component: LikedShop
    }
  ]
})
