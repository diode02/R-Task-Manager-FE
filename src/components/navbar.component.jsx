import React from "react";
import { Navbar } from "react-bootstrap";

const NavBarCom = props => {
  let { links } = props;

  if (!links) {
    links = [];
  }
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Tasker</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <div>
        {links.map((link, index) => (
          <a
            className="m-1"
            href={link.address}
            style={{
              color: "#fff"
            }}
            key={index}
          >
            {link.text}
          </a>
        ))}
      </div>
    </Navbar>
  );
};

export default NavBarCom;
