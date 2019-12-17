import React, { Component } from "react";

import axios from "axios";
import Cookie from "js-cookie";

class NewTask extends Component {
  state = {};
  handleSubmit = event => {
    // if (!this.props.handlePatchTask) {
    //   console.log("Patch Request");
    //   return;
    // }

    event.preventDefault();
    let dataa = new FormData(event.target);

    var bodyParameters = {
      discription: dataa.get("discription"),
      completed: !(dataa.get("completed") == null)
    };
    var config = {
      headers: { Authorization: Cookie.get("token") }
    };
    var url = "http://localhost:3000/tasks/";
    // Make a request for a user with a given ID
    // Send a POST request
    axios
      .post(url, bodyParameters, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  render() {
    return (
      <div>
        <a href="/tasks">Back to Tasks</a>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="discription">Enter Task</label>
            <input id="discription" name="discription" type="text" />

            <label htmlFor="completed">Task Completed</label>
            <input id="completed" name="completed" type="checkbox" />

            <button>Add Task!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewTask;
