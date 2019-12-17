import React from "react";
import Cookie from "js-cookie";
const axios = require("axios");
const url = "http://localhost:3000/users/login/";

const LoginPage = () => {
  const handleSubmit = event => {
    event.preventDefault();
    let dataa = new FormData(event.target);
    dataa = {
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
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const handleGet = event => {
    const url1 = "http://localhost:3000/users/";
    console.log();

    axios
      .get(url1, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`
        }
      })
      .then(
        response => {
          var response1 = response.data;
          console.log(response1);
        },
        error => {
          var status = error.response.status;
          console.log(status);
        }
      );
  };

  const handleLogout = event => {
    const url1 = "http://localhost:3000/users/logout";

    var config = {
      headers: { Authorization: Cookie.get("token") }
    };

    var bodyParameters = {
      key: "value"
    };

    axios
      .post(url1, bodyParameters, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="password">Enter your Password</label>
        <input id="password" name="password" type="password" />

        <button>Send data!</button>
      </form>
      <button
        onClick={e => {
          handleGet();
        }}
      >
        Get data Of login
      </button>
      <button
        onClick={e => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LoginPage;
