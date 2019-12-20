import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const FilesUploadComponent = props => {
  const [profileImg, setProfileImg] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    var config = {
      headers: { Authorization: Cookie.get("token") }
    };
    formData.append("upload", profileImg);
    axios
      .post("http://localhost:3000/users/me/avatar", formData, config)
      .then(res => {
        console.log(res);
        props.getUserData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onFileChange = e => {
    setProfileImg(e.target.files[0]);
  };
  let imgData = "data:image/jpg;base64,";
  imgData += props.imgBinary;

  return (
    <div className="container">
      <div className="row">
        <h3>Profile Photo Upload</h3>
        <img src={imgData} alt="avatar of user"></img>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilesUploadComponent;
