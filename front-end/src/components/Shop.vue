<template>
  <div class="container">
    <div>
      <div class="float-right">
        <router-link to="/LikedShop">Liked Shop</router-link>
        <router-link to="/shop">Nearby Shop</router-link>
      </div>
      <h2>Nearby Shop</h2>

      <div class="row">
        <div class="col-md-4" v-for="shop in shops" :key="shop.id">
          <div class="thumbnail">
              <img v-bind:src="'http://localhost:1337/'+shop.path " alt="Fjords" style="width:100%">
              <div class="caption">
                <p>{{ shop.name }} - {{ shop.distance }} KM</p>
                <button v-on:click="likeShop(shop.id)" >Like</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router"
export default {
  name: "Login",
  data () {
    return {
      shops: []
    }
  },
  methods: {
    getShop: function () {
      let accessToken = localStorage.getItem("user-token")
      axios.get("http://localhost:1337/shop", {headers: {"Authorization": "Bearer " + accessToken}})
        .then((response) => {
          this.shops = response.data
        })
        .catch((errors) => {
          console.log("Cannot list shop" + errors)
        })
    },
    likeShop: function (shopId) {
      let accessToken = localStorage.getItem("user-token")
      axios.post("http://localhost:1337/shop/like", {"likeShop": shopId}, {headers: {"Authorization": "Bearer " + accessToken}})
        .then((response) => {
          this.$forceUpdate()
        })
        .catch((errors) => {
          console.log("Cannot like shop" + errors)
        })
      this.getShop()
    }
  },
  mounted () {
    if (typeof localStorage.getItem("user-token") !== "undefined") this.getShop()
    else router.push("/login")
  }
}
</script>
