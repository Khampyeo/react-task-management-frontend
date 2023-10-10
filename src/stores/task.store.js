import React, { createContext, useState, useEffect } from "react";
import TasksService from "../services/tasks.service";
import { useLocation } from "react-router-dom";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", search: "" });

  const tasksService = new TasksService();

  useEffect(() => {
    const fetchTasks = async () => {
      if (location.pathname !== "/signin" && location.pathname !== "/signup")
        try {
          const result = await tasksService.fetchTasks(filters);
          if (result) {
            setTasks(result.data);
          }
        } catch (error) {
          throw error;
        }
    };
    fetchTasks();
  }, [filters, location.pathname]);

  const resetTasks = () => {
    setTasks([]);
  };

  const createTask = async (title, description) => {
    try {
      const result = await tasksService.createTask(title, description);
      if (result) {
        setTasks([...tasks, result.data]);
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksService.deleteTask(id);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await tasksService.updateTaskStatus(id, status);
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return { ...task, status };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  function updateFilters({ status, search }) {
    const newFilters = { status, search };
    setFilters(newFilters);
  }

  const context = {
    tasks: tasks,
    filters: filters,
    resetTasks,
    createTask,
    deleteTask,
    updateTaskStatus,
    updateFilters,
  };
  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
}

export default TasksContext;
