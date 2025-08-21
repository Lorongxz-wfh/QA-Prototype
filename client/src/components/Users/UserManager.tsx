import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Breadcrumbs from "../Layout/Breadcrumbs";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

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
  }, []);

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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200">
      <Breadcrumbs currentPage="User Manager" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Manager</h2>
        <button
          onClick={() => navigate("/users/add")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 transition"
        >
          <FaPlus />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-pulse"
            >
              <div className="flex-1 mb-2 sm:mb-0 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
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
                  onClick={() => navigate(`/users/edit/${u.user_id}`)}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl shadow bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 transition"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.user_id)}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl shadow bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 transition"
                >
                  <FaTrash />
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
