// src/components/Users/UserManager.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import Breadcrumbs from "../Layout/Breadcrumbs";
import { toast } from "react-toastify";

interface Department {
  department_id: number;
  department: string;
}

interface User {
  user_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  department_id: number;
  birth_date: string;
  age: number;
  username: string;
  department?: Department;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Show toast from navigation state (e.g., after adding or editing)
    if (location.state?.toast) {
      if (location.state.toast === "success")
        toast.success(location.state.message);
      else toast.error(location.state.message);

      // Clear state so toast doesn't repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.user_id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Manager</h2>
        <button
          onClick={() => navigate("/users/add")}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Add User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : users.length > 0 ? (
        <div className="flex flex-col gap-4">
          {users.map((u) => (
            <div
              key={u.user_id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-medium">
                  {u.first_name} {u.middle_name} {u.last_name} {u.suffix_name}
                </p>
                <p className="text-gray-500 text-sm">
                  Department: {u.department?.department || "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  Birth Date: {u.birth_date} | Age: {u.age}
                </p>
                <p className="text-gray-500 text-sm">Username: {u.username}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/users/edit/${u.user_id}`, {
                      state: {
                        toast: "success",
                        message: "User updated successfully!",
                      },
                    })
                  }
                  className="bg-indigo-400 hover:bg-indigo-500 text-white px-3 py-1 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.user_id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          No users available.
        </div>
      )}
    </div>
  );
};

export default UserManager;
