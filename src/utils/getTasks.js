import axios from "axios";
import Cookie from "js-cookie";
async function getTasksApi() {
  const url = "http://localhost:3000/tasks/";
  const data = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`
      }
    })
    .then(
      response => {
        const data = Object.values(response.data);

        return data;
      },
      error => {
        var status = error.response.status;
        if (status === 401) {
          return status;
        }
        console.log(status);
      }
    );
  return data;
}
async function deleteTaskFromDatabase(id) {
  const url = "http://localhost:3000/tasks/" + id;
  console.log(url);

  const data = await axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${Cookie.get("token")}`
      }
    })
    .then(
      response => {
        return response;
      },
      error => {
        var status = error.response.status;
        console.log(status);
      }
    );
  // console.log(data);

  return data;
}

export async function deleteTask(id) {
  const data = await deleteTaskFromDatabase(id);
  return data;
}

export async function getTasks() {
  const data = await getTasksApi();
  return data;
}
