import React from "react";
import Cookie from "js-cookie";
const axios = require("axios");
const url = "http://localhost:3000/users/";

const SignupPage = () => {
  const handleSignup = event => {
    event.preventDefault();
    let dataa = new FormData(event.target);
    dataa = {
      name: dataa.get("name"),
      email: dataa.get("email"),
      password: dataa.get("password")
    };

    // Make a request for a user with a given ID
    // Send a POST request
    axios({
      method: "post",
      url: url,
      data: dataa
    })
      .then(response => {
        Cookie.set("token", response.data.token);
        console.log(Cookie.get("name") + response.data.data.name);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <label htmlFor="name">Enter Name</label>
        <input id="name" name="name" type="text" />

        <label htmlFor="email">Enter Email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="password">Enter your Password</label>
        <input id="password" name="password" type="password" />

        <button>Send data!</button>
      </form>
    </div>
  );
};

export default SignupPage;
