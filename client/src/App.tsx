import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import DepartmentManager from "./components/Departments/DepartmentManager";
import UserManager from "./components/Users/UserManager";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import FileManager from "./components/FileManager/FileManager";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="files" element={<FileManager />} />
        <Route path="departments" element={<DepartmentManager />} />
        <Route path="users" element={<UserManager />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;
