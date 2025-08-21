import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import DepartmentManager from "./components/Departments/DepartmentManager";
import AddDepartment from "./components/Departments/AddDepartment";
import EditDepartment from "./components/Departments/EditDepartment"; // ✅ added
import UserManager from "./components/Users/UserManager";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import FileManager from "./components/FileManager/FileManager";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* File Manager */}
          <Route path="files" element={<FileManager />} />

          {/* Department Routes */}
          <Route path="departments">
            <Route index element={<DepartmentManager />} />
            <Route path="add" element={<AddDepartment />} />
            <Route path="edit/:id" element={<EditDepartment />} />{" "}
            {/* ✅ added */}
          </Route>

          {/* User Routes */}
          <Route path="users">
            <Route index element={<UserManager />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10">404 - Page Not Found</h1>
            }
          />
        </Route>
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
