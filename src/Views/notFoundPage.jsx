import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../assets/img/404.png";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <img
          style={{
            width: "1300px",
            height: "600px",
            display: "block",
            margin: "0 auto"
          }}
          src={PageNotFound}
          alt="404 page"
        />
        <p style={{ textAlign: "center", fontSize: "50px" }}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    );
  }
}
export default NotFoundPage;
