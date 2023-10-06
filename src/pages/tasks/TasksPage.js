import React, { useContext } from "react";
import { Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SignOutIcon from "@mui/icons-material/ExitToApp";
import styled from "styled-components";
import Task from "../../components/Task";
import TasksFilters from "../../components/TasksFilters";
import TasksContext from "../../stores/task.store";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../stores/user.store";

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  min-width: 440px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #1976d2;
`;

const Title = styled.h1`
  width: 100%;
  color: white;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const EmptyTasksPlaceholder = styled.p`
  color: white;
  text-align: left;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: white;
    font-size: 32px;
  }
`;

export default function TasksPage({ children }) {
  const tasksStore = useContext(TasksContext);
  const userStore = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    userStore.signout();
    tasksStore.resetTasks();
    navigate("/signin");
  };

  const renderTasks = () => {
    if (!tasksStore.tasks.length) {
      return (
        <EmptyTasksPlaceholder>
          No tasks available. Create one?
        </EmptyTasksPlaceholder>
      );
    }

    return tasksStore.tasks.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    ));
  };

  return (
    <TasksWrapper>
      <TasksHeader>
        <Title>Get things done.</Title>

        <CreateButtonContainer>
          <Fab
            color="primary"
            variant="extended"
            onClick={() => {
              navigate("/tasks/create");
            }}
          >
            <AddIcon />
            Create Task
          </Fab>

          <SignOutIconContainer>
            <IconButton onClick={handleSignOut}>
              <SignOutIcon className="signOutIcon" />
            </IconButton>
          </SignOutIconContainer>
        </CreateButtonContainer>
      </TasksHeader>

      <TasksFilters />
      <TasksContainer>{renderTasks()}</TasksContainer>
    </TasksWrapper>
  );
}
