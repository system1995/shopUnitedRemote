<template>
  <div class="container">
    <div>
      <div class="float-right">
        <router-link to="/LikedShop">Liked Shop</router-link>
        <router-link to="/shop">Nearby Shop</router-link>
      </div>
      <h2>Nearby Shop</h2>

      <div class="row">
        <div class="col-md-4" v-for="LikedShop in Likedshops" :key="LikedShop.id">
          <div class="thumbnail">
            <img v-bind:src="'http://localhost:1337/'+Likedshops.path " style="width:100%">
            <div class="caption">
              <p>{{ LikedShop.name }} - {{ LikedShop.distance }} KM</p>
              <button v-on:click="removeShop(Likedshops.id)" >Remove</button>
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
  name: "LikedShop",
  data () {
    return {
      Likedshops: []
    }
  },
  methods: {
    getLikedShop: function () {
      let accessToken = localStorage.getItem("user-token")
      axios.get("http://localhost:1337/shop/preferredshops", {headers: {"Authorization": "Bearer " + accessToken}})
        .then((response) => {
          this.Likedshops = response.data
        })
        .catch((errors) => {
          console.log("Cannot list liked shops" + errors)
        })
    },
    removeShop: function (shopId) {
      let accessToken = localStorage.getItem("user-token")
      axios.post("http://localhost:1337/shop/preferredshops/remove", {"removedShop": shopId}, {headers: {"Authorization": "Bearer " + accessToken}})
        .then((response) => {
          this.$forceUpdate()
        })
        .catch((errors) => {
          console.log("Cannot remove shop" + errors)
        })
      this.getShop()
    }
  },
  mounted () {
    if (typeof localStorage.getItem("user-token") !== "undefined") this.getLikedShop()
    else router.push("/login")
  }
}
</script>
