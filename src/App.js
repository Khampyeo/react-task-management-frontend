import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import TasksPage from "./pages/tasks/TasksPage";
import CreateTaskPage from "./pages/create-task/CreateTaskPage";

import { TasksProvider } from "./stores/task.store";
import { UserProvider } from "./stores/user.store";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<SignInPage></SignInPage>} />
            <Route path="/signin" element={<SignInPage></SignInPage>} />
            <Route path="/signup" element={<SignUpPage></SignUpPage>} />
            <Route path="/tasks" element={<TasksPage></TasksPage>} />
            <Route
              path="/tasks/create"
              element={<CreateTaskPage></CreateTaskPage>}
            />
          </Routes>
        </TasksProvider>
      </UserProvider>
    </div>
  );
}

export default App;
