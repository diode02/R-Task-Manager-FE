import axios from "axios";
import Cookie from "js-cookie";
async function handleLogout(event) {
  const url = "http://localhost:3000/users/logout";

  var config = {
    headers: { Authorization: Cookie.get("token") }
  };

  var bodyParameters = {
    key: "value"
  };

  const data = axios
    .post(url, bodyParameters, config)
    .then(response => {
      Cookie.remove("token");
      console.log(response);
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return data;
}

async function handleLogin(event) {
  event.preventDefault();
  let dataa = new FormData(event.target);
  dataa = {
    email: dataa.get("email"),
    password: dataa.get("password")
  };
  const data = await axios({
    method: "post",
    url: "http://localhost:3000/users/login/",
    data: dataa
  })
    .then(response => {
      Cookie.set("token", response.data.token);
      return true;
    })
    .catch(error => {
      console.log(error.response);
      return false;
    });
  return data;
}

export async function logoutAll(event) {
  const url = "http://localhost:3000/users/logoutAll";

  var config = {
    headers: { Authorization: Cookie.get("token") }
  };

  var bodyParameters = {
    key: "value"
  };

  const data = await axios
    .post(url, bodyParameters, config)
    .then(response => {
      Cookie.remove("token");
      console.log(response);
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
  return data;
}

export async function getUserInfo() {
  const url1 = "http://localhost:3000/users/";
  const data = await axios
    .get(url1, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`
      }
    })
    .then(
      response => {
        var response1 = response.data;
        console.log(response1);
        return response.data;
      },
      error => {
        console.log(error.response.status);
        return error.response.status;
      }
    );
  return data;
}

export async function deleteUser() {
  const url1 = "http://localhost:3000/users/me";
  const data = await axios
    .delete(url1, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`
      }
    })
    .then(
      response => {
        console.log(response.data);
        Cookie.remove("token");
        return response.data;
      },
      error => {
        console.log(error.response.status);
        return error.response.status;
      }
    );
  return data;
}

export async function handleSignup(event) {
  event.preventDefault();
  let dataa = new FormData(event.target);
  dataa = {
    name: dataa.get("name"),
    email: dataa.get("email"),
    password: dataa.get("password")
  };
  const data = await axios({
    method: "post",
    url: "http://localhost:3000/users/",
    data: dataa
  })
    .then(response => {
      Cookie.set("token", response.data.token);
      console.log("success" + response.data.data.name);
      return true;
    })
    .catch(error => {
      console.log(error.response);
      return false;
    });
  return data;
}
export async function logOutUser(id) {
  const data = await handleLogout(id);
  console.log(data);

  return data;
}
export async function logInUser(event) {
  const data = await handleLogin(event);
  console.log(data);

  return data;
}

export async function deleteAvatar(event) {
  const url = "http://localhost:3000/users/me/avatar";

  const data = await axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`
      }
    })
    .then(response => {
      console.log("111" + response);
      return true;
    })
    .catch(error => {
      console.log("222" + error);
      console.log(error);
      return false;
    });
  return data;
}
