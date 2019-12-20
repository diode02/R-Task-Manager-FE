import React, { Component } from "react";
import { getTasks, deleteTask } from "../utils/getTasks";
import { logOutUser } from "../utils/usersFunc";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination/pagination";
import { paginate } from "../utils/paginate";
import { Redirect } from "react-router-dom";
import NavBarCom from "../components/navbar.component";

class Tasks extends Component {
  state = {
    tasks: [],
    pageSize: 6,
    currentPage: 1,
    redirectToReferrer: false,
    redirectToLogin: false
  };
  links = [
    { address: "/newTask", text: "Create New Task" },
    { address: "/controlPanel", text: "My Account" }
  ];
  componentDidMount = async () => {
    try {
      const data = await getTasks();
      if (data === 401) {
        this.setState({ redirectToLogin: true });
        return;
      }
      this.setState({ tasks: data });
    } catch (err) {
      console.error(err);
    }
  };

  handleLogOut = async event => {
    const res = await logOutUser(event);
    if (res === true) {
      console.log("logged out");
      this.setState({ redirectToReferrer: true });
    } else {
      console.log("not logout some error");
    }
  };

  render() {
    const count = this.state.tasks.length;
    const { pageSize, tasks: alltasks, currentPage } = this.state;

    if (this.state.redirectToReferrer === true) {
      return <Redirect to="/" />;
    }
    if (this.state.redirectToLogin === true) {
      return <Redirect to="/login" />;
    }

    if (count === 0)
      return (
        <div>
          <NavBarCom links={this.links} />

          <p>
            There Are Currently No tasks in Database Click Link in Navigation
            Bar To Create Your First Task
          </p>
        </div>
      );
    const tasks = paginate(alltasks, currentPage, pageSize);
    return (
      <React.Fragment>
        <NavBarCom links={this.links} />
        <button
          onClick={e => {
            this.handleLogOut();
          }}
          style={{
            float: "right"
          }}
        >
          Logout
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "10px"
          }}
        >
          There Are Currently {this.state.tasks.length} tasks in database
        </p>
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
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.discription}</td>
                <td>{task.completed ? "Completed" : "Not Completed"}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/editTask",
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
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPaginationClick={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  async handleDelete(e) {
    await deleteTask(e.target.value);
    const data = await getTasks();
    this.setState({ tasks: data });
  }
}

export default Tasks;
