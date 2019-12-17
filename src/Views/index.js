import React, { Component } from "react";

// styles
import "../assets/css/bootstrap.min.css";
import "../assets/css/now-ui-kit.css";
// import "assets/css/now-ui-kit.min.css";
// import "assets/css/now-ui-kit.css.map";
import "../assets/demo/demo.css";
import NavBarCom from "../components/navbar.component";

class Index extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBarCom />
        <a href="/protected">My Tasks</a>
      </div>
    );
  }
}

export default Index;
