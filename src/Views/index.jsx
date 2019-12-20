import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NavBarCom from "../components/navbar.component";
import { getTasks } from "../utils/getTasks";
import Cookie from "js-cookie";

const Index = props => {
  const [redirectToTasks, setRedirectToTasks] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const tasks = await getTasks();
        console.log("3");

        if (Cookie.get("token")) {
          console.log("1");

          if (tasks !== 401) {
            console.log("2");

            setRedirectToTasks(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  const links = [
    { address: "/login", text: "Login" },
    { address: "/signup", text: "Signup" }
  ];

  if (redirectToTasks === true) {
    return <Redirect to="/protected" />;
  }

  return (
    <div
      style={{
        backgroundColor: "deepSkyBlue",
        height: "650px",
        color: "white"
      }}
    >
      <NavBarCom links={links} />
      <div
        style={{
          height: "30px"
        }}
      ></div>

      <div className="container pt-7 pb-6">
        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-5">
            <span>
              <h1>
                Tasker lets you work more collaboratively and get more done.
              </h1>
            </span>
            <p
              style={{
                fontSize: "25px"
              }}
            >
              Tasker boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </p>
          </div>
          <div className="col-lg-1"> </div>

          <div className="col-lg-6">
            <img
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg"
              width="530"
              className="img-fluid"
              alt=""
            />
          </div>
          <div
            style={{
              border: "50px",
              padding: "25px"
            }}
          >
            <a
              href="/signup"
              data-analytics-event="clickedSignupHeroa"
              className="btn btn-wrap btn-success btn-lg px-4"
            >
              Sign Up – It’s Free!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
