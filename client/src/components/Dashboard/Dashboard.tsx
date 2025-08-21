import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Layout/Breadcrumbs";
import api from "../../api/axios";

interface User {
  user_id: number;
}

interface Department {
  department_id: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, deptsRes] = await Promise.all([
          api.get("/users"),
          api.get("/departments"),
        ]);
        setUsers(usersRes.data);
        setDepartments(deptsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Page title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white/80 p-4 sm:p-6 rounded-lg shadow-lg text-center backdrop-blur-sm transition hover:shadow-xl">
          <h3 className="font-semibold mb-2 text-lg sm:text-xl">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white/80 p-4 sm:p-6 rounded-lg shadow-lg text-center backdrop-blur-sm transition hover:shadow-xl">
          <h3 className="font-semibold mb-2 text-lg sm:text-xl">Departments</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {departments.length}
          </p>
        </div>
        <div className="bg-white/80 p-4 sm:p-6 rounded-lg shadow-lg text-center backdrop-blur-sm transition hover:shadow-xl">
          <h3 className="font-semibold mb-2 text-lg sm:text-xl">Files</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Optional: future graphs or additional cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Placeholder cards for future expansion */}
      </div>
    </div>
  );
};

export default Dashboard;
