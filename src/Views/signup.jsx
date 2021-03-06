import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { handleSignup } from "../utils/usersFunc";
const SignupPage = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [signupResponse, setSignupResponse] = useState("");

  const handleSubmit = async event => {
    const res = await handleSignup(event);
    if (res === true) {
      console.log("loogedin");
      setSignupResponse("Succesfully Signed Up");
      setRedirectToReferrer(true);
    } else {
      setSignupResponse("Email already in Use or Server Error");
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
        className="main"
        style={{
          border: "white solid 4px",
          margin: "0 auto",
          width: "85%",
          overflow: "hidden",
          marginTop: "50px"
        }}
      >
        <div
          className="form"
          style={{
            float: "left",
            width: "25%",
            backgroundColor: "white",
            padding: "0px 30px 30px 30px",
            margin: "70px 180px 70px 70px"
          }}
        >
          <p
            style={{
              fontSize: "40px",
              backgroundColor: "rgb(20, 223, 241)",
              color: "white"
            }}
          >
            CREATE AN ACCOUNT
          </p>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              style={{
                fontSize: "20px",
                margin: "7px 0 5px 0"
              }}
            >
              Namae:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              style={{
                border: "deepskyblue 2px solid",
                width: "100%",
                height: "30px",
                paddingLeft: "7px"
              }}
            />
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
            <p>{signupResponse}</p>

            <button>REGISTER NOW!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
