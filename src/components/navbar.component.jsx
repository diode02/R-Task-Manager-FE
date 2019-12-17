import React from "react";
import { Navbar } from "react-bootstrap";

const NavBarCom = props => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Tasker</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <div>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
      </div>
    </Navbar>
  );
};

export default NavBarCom;
