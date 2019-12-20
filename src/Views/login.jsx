import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { logInUser } from "../utils/usersFunc";

const LoginPage = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");

  const handleSubmit = async event => {
    const res = await logInUser(event);
    if (res === true) {
      console.log("loogedin");
      setRedirectToReferrer(true);
    } else {
      setLoginResponse("Unable to Login");
      console.log("not loggedin");
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to="/protected" />;
  }

  return (
    <div
      style={{
        backgroundColor: "blue",
        fontFamily: "Franklin Gothic Medium"
      }}
    >
      <div
        style={{
          border: "deepskyblue solid 4px",
          margin: "0 auto",
          width: "95%",
          height: "100%",
          overflow: "hidden",
          marginTop: "50px"
        }}
      >
        <div
          style={{
            float: "left",
            width: "25%",
            backgroundColor: "white",
            padding: "20px 20px 20px 20px",
            margin: "120px 90px 120px 150px"
          }}
        >
          <p
            style={{
              fontSize: "40px",
              backgroundColor: "deepskyblue",
              color: "white"
            }}
          >
            LOGIN PAGE{" "}
          </p>
          <form
            action=""
            style={{
              display: "block"
            }}
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              style={{
                fontSize: "20px",
                margin: "7px 0 5px 0"
              }}
            >
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="wwwww@gmail.com"
              style={{
                border: "deepskyblue 2px solid",
                width: "100%",
                height: "30px",
                paddingLeft: "7px"
              }}
            />
            <label
              htmlFor="password"
              style={{
                fontSize: "20px",
                margin: "7px 0 5px 0"
              }}
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              style={{
                border: "deepskyblue 2px solid",
                width: "100%",
                height: "30px",
                paddingLeft: "7px"
              }}
            />
            <br />
            <p>{loginResponse}</p>

            <button
              style={{
                marginTop: "10px",
                marginLeft: "3px",
                color: "white",
                backgroundColor: "deepskyblue",
                display: "block",
                fontWeight: "700",
                fontSize: "1.3em",
                height: "40px"
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "blue",
          height: "100%"
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
