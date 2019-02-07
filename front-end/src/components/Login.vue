<template>
  <div class="container">
    <h2>Login</h2>
    <form v-on:submit="login">
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" id="email" name="email" >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" name="password">
      </div>
      <input type="submit" value="Login"/>
    </form>
    <router-link to="/signup" class="btn btn-default">Sign Up </router-link>
  </div>
</template>

<script>
import router from "../router"
import axios from "axios"
export default {
  name: "Login",
  methods: {
    login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        if (email.length === 0) {
          alert("Email required.")
          return
        }
        if (password.length === 0) {
          alert("Password required.")
          return
        }
        let data = {
          email: email,
          password: password
        }
        axios.post("http://localhost:1337/user/login", data)
          .then((response) => {
            localStorage.setItem("user-token", response.data)
            router.push("/shop")
          })
          .catch((errors) => {
            console.log("Cannot log in" + errors)
          })
      }
      login()
    }
  }
}
</script>
