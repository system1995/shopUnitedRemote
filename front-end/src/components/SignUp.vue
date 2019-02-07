c<template>
  <div class="container">
    <h2>SignUp</h2>
    <form v-on:submit="signUp">
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" id="email" name="email">
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="name" class="form-control" id="name" name="name">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" name="password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm password:</label>
        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword">
      </div>
      <input type="submit" value="Sign Up"/>
    </form>
    <router-link to="/Login" class="btn btn-default">Login </router-link>
  </div>
</template>

<script>
import router from "../router"
import axios from "axios"
import qs from "qs"
export default {
  name: "SignUp",
  methods: {
    signUp: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let name = e.target.elements.name.value
      let password = e.target.elements.password.value
      let confirmPassword = e.target.elements.confirmPassword.value

      let signUp = () => {
        if (email.length === 0) {
          alert("Email required.")
          return
        }
        if (name.length === 0) {
          alert("Name required.")
          return
        }
        if (password.length === 0) {
          alert("Password required.")
          return
        }
        if (password !== confirmPassword) {
          alert("Password must be the same")
          return
        }
        let data = {
          email: email,
          name: name,
          password: password
        }
        axios.post("http://localhost:1337/user/signup", qs.stringify(data))
          .then((response) => {
            localStorage.setItem("user-token", response.data)
            router.push("/shop")
          })
          .catch((errors) => {
            console.log("Cannot SignUp" + errors)
          })
      }
      signUp()
    }
  }
}
</script>
