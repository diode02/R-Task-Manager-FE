import React from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Page = props => {
  let { discription, completed, _id, owner } = props.location.task;

  const handleSubmit = event => {
    event.preventDefault();
    let dataa = new FormData(event.target);

    var bodyParameters = {
      discription: dataa.get("discription"),
      completed: !(dataa.get("completed") == null)
    };
    var config = {
      headers: { Authorization: Cookie.get("token") }
    };
    var url = "http://localhost:3000/tasks/" + _id;
    axios
      .patch(url, bodyParameters, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <a href="/tasks">Back to Tasks</a>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="discription">Task</label>
          <input
            id="discription"
            name="discription"
            type="text"
            defaultValue={discription}
          />

          <label htmlFor="completed">Task Completed</label>
          <input
            id="completed"
            name="completed"
            defaultChecked={completed === true}
            type="checkbox"
          />

          <button>Done</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
