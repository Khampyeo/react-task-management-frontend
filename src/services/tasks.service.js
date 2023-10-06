import BaseHttpService from "./base-http.service";

export default class TasksService extends BaseHttpService {
  fetchTasks({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
      queryObj.search = search;
    }
    let queryStr = null;

    if (Object.keys(queryObj).length !== 0)
      queryStr = Object.keys(queryObj)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`
        )
        .join("&");
    return this.get("tasks" + (queryStr ? `?${queryStr}` : ""));
  }

  async deleteTask(id) {
    await this.delete(`tasks/${id}`);
  }

  updateTaskStatus(id, status) {
    return this.patch(`tasks/${id}/status`, { status });
  }

  createTask(title, description) {
    return this.post(`tasks`, { title, description });
  }
}
