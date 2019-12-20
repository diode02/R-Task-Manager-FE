import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Cookie from "js-cookie";
import axios from "axios";
import FilesUploadComponent from "../components/fileUpload/fileupload";
import NavBarCom from "../components/navbar.component";

import {
  getUserInfo,
  deleteUser,
  logoutAll,
  deleteAvatar
} from "../utils/usersFunc";

const ControlPanal = props => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [changePassword, setChangePassword] = useState("");
  const [changeUserData, setChangeUserData] = useState("");

  const links = [
    { address: "/newTask", text: "Create New Task" },
    { address: "/controlPanel", text: "My Account" }
  ];

  async function handleAvatarDelete() {
    try {
      const { avatar } = await deleteAvatar();
      setAvatar(avatar);
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserData() {
    try {
      const { name, email, avatar } = await getUserInfo();
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    } catch (e) {
      console.log(e);
    }
  }
  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  const handleUserDataChange = event => {
    event.preventDefault();
    let formData = new FormData(event.target);

    var bodyParameters = {
      name: formData.get("name"),
      email: formData.get("email")
    };
    if (bodyParameters.name === name) {
      setChangeUserData("new name can not be same as before");
    } else if (bodyParameters.email === email) {
      setChangeUserData("new email can not be same as before");
    } else {
      clean(bodyParameters);
      var config = {
        headers: { Authorization: Cookie.get("token") }
      };
      var url = "http://localhost:3000/users/me";
      axios
        .patch(url, bodyParameters, config)
        .then(response => {
          setChangeUserData("User Data Changed Succesfully");
          if (bodyParameters.name) setName(bodyParameters.name);
          else if (bodyParameters.email) setEmail(bodyParameters.email);
        })
        .catch(error => {
          setChangeUserData("error in changing your User Data");
        });
    }
  };

  const handleLogOutAll = async event => {
    const res = await logoutAll(event);
    if (res === true) {
      this.setState({ redirectToReferrer: true });
    } else {
      console.log("not logout! some error");
    }
  };

  const handlePasswordChange = async event => {
    event.preventDefault();
    let formData = new FormData(event.target);

    if (formData.get("newpassword1") !== formData.get("newpassword2")) {
      setChangePassword("Confirm Password field not matches");
    } else {
      var bodyParameters = {
        password: formData.get("newpassword2")
      };
      var config = {
        headers: { Authorization: Cookie.get("token") }
      };
      var url = "http://localhost:3000/users/me";
      axios
        .patch(url, bodyParameters, config)
        .then(response => {
          setChangePassword("Password Changed Succesfully");
        })
        .catch(error => {
          setChangePassword(error.response.data);
        });
    }
  };

  return (
    <Container>
      <NavBarCom links={links} />

      <Row>
        <Col>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <input
              id="newpassword1"
              name="newpassword1"
              type="password"
              placeholder="new password"
            />
            <input
              id="newpassword2"
              name="newpassword2"
              type="password"
              placeholder="repeat password"
            />
            <br />
            <p>{changePassword}</p>
            <button>Change</button>
          </form>
        </Col>
        <Col>
          <FilesUploadComponent imgBinary={avatar} getUserData={getUserData} />
        </Col>
        <Col>
          <Button
            className="btn btn-danger"
            onClick={async e => await handleAvatarDelete()}
          >
            Delete My Avatar
          </Button>
          <Button className="btn btn-danger m-2" href="/" onClick={deleteUser}>
            Delete My Account
          </Button>
          <Button
            className="btn btn-danger m-2"
            href="/"
            onClick={handleLogOutAll}
          >
            Logout From All Devices
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Change User Details</h3>
          <form onSubmit={handleUserDataChange}>
            <label htmlFor="name">Name: {name}</label> <br />
            <input id="name" name="name" type="text" placeholder="New Name" />
            <br />
            <label htmlFor="email">Email: {email}</label> <br />
            <input
              id="email"
              name="email"
              type="text"
              placeholder={"Your New Email"}
            />
            <br />
            <p>{changeUserData}</p>
            <button>Change</button>
          </form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ControlPanal;
