import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Layout/Breadcrumbs";
import api from "../../api/axios";
import { FaUsers, FaBuilding, FaFolder } from "react-icons/fa";

interface User {
  user_id: number;
}

interface Department {
  department_id: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, deptsRes] = await Promise.all([
          api.get("/users"),
          api.get("/departments"),
        ]);
        setUsers(usersRes.data);
        setDepartments(deptsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <FaUsers className="text-3xl text-blue-500" />,
    },
    {
      title: "Departments",
      value: departments.length,
      icon: <FaBuilding className="text-3xl text-green-500" />,
    },
    {
      title: "Files",
      value: 0,
      icon: <FaFolder className="text-3xl text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Breadcrumbs */}
      <Breadcrumbs currentPage="Dashboard" />

      {/* Page title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard</h2>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full sm:w-1/3 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Stats cards or loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20 col-span-full">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white/80 p-4 sm:p-6 rounded-lg shadow-lg text-center backdrop-blur-sm transition hover:shadow-xl flex flex-col items-center justify-center"
            >
              <div className="mb-2">{stat.icon}</div>
              <h3 className="font-semibold mb-1 text-lg sm:text-xl">
                {stat.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Optional: Future graphs or additional cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Add future charts or stats here */}
      </div>
    </div>
  );
};

export default Dashboard;
