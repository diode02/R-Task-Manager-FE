import React, { useState } from "react";

import axios from "axios";
import Cookie from "js-cookie";

function NewTask(props) {
  const [editResponse, setEditResponse] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData(event.target);

    var bodyParameters = {
      discription: formData.get("discription"),
      completed: !(formData.get("completed") == null)
    };
    var config = {
      headers: { Authorization: Cookie.get("token") }
    };
    var url = "http://localhost:3000/tasks/";
    axios
      .post(url, bodyParameters, config)
      .then(response => {
        setEditResponse("Added to List");
      })
      .catch(error => {
        setEditResponse(error.response.data.message);
      });
  };
  return (
    <div>
      <a href="/protected">Back to Tasks</a>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="discription">Enter Task</label>
          <input id="discription" name="discription" type="text" />

          <label htmlFor="completed">Task Completed</label>
          <input id="completed" name="completed" type="checkbox" />

          <p>{editResponse}</p>

          <button>Add Task!</button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
