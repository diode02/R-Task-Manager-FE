import React, { Component } from "react";
import { getTasks, deleteTask } from "../utils/getTasks";
import { Link } from "react-router-dom";
class Tasks extends Component {
  state = {
    tasks: [],
    pageSize: 4,
    currentPage: 1
  };
  componentDidMount = async () => {
    try {
      const data = await getTasks();
      console.log(data);
      if (data === 401) {
        return;
      }
      this.setState({ tasks: data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const count = this.state.tasks.length;
    const { pageSize, tasks: alltasks, currentPage } = this.state;

    if (count === 0)
      return (
        <div>
          <p>
            There Are Currently No tasks in Database Click Below Link To Create
            Your First Task
          </p>
          <a href="/newTask">Create New Task</a>
        </div>
      );
    // const tasks = paginate(alltasks, currentPage, pageSize);
    return (
      <React.Fragment>
        <a href="/newTask">Create New Task</a>
        <p>There Are Currently {this.state.tasks.length} tasks in database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="">Task</th>
              <th scope="">Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(task => (
              <tr key={task._id}>
                <td>{task.discription}</td>
                <td>
                  {task.completed === true ? "Complted" : "Not Completed"}
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/page",
                      task
                    }}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    value={task._id}
                    className="btn btn-danger btn-sm"
                    onClick={e => this.handleDelete(e)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
  async handleDelete(e) {
    const res = await deleteTask(e.target.value);
    const data = await getTasks();
    this.setState({ tasks: data });
  }
  async handleEdit(e) {}
}

export default Tasks;
