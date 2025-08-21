import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type Department = {
  department_id: number;
  department: string;
  description?: string | null;
  image?: string | null;
};

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8000";
const STORAGE_BASE = `${API_BASE}/storage/`;

const getDepartmentImage = (d: Department): string | null => {
  if (d.image) {
    return `${STORAGE_BASE}${d.image.replace(/^\/+/, "")}`;
  }
  return null;
};

const DepartmentManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      setDepartments((prev) => prev.filter((d) => d.department_id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Department Manager</h1>
        <Link
          to="/departments/add"
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white shadow
                     bg-sky-600 hover:bg-sky-700 active:bg-sky-800 transition"
        >
          <FaPlus />
          <span>Add Department</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show 6 skeleton cards while loading
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-40 w-full bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="flex justify-end gap-3 mt-2">
                  <div className="h-8 w-16 bg-gray-200 rounded" />
                  <div className="h-8 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : departments.length === 0 ? (
          // Empty state
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 bg-white col-span-full">
            No departments yet. Click{" "}
            <span className="font-medium">Add Department</span> to create one.
          </div>
        ) : (
          // Actual department cards
          departments.map((department) => {
            const img = getDepartmentImage(department);
            return (
              <div
                key={department.department_id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {img ? (
                  <img
                    src={img}
                    alt={department.department}
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {department.department}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {department.description?.trim() ||
                      "No description available... For now..."}
                  </p>

                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/departments/edit/${department.department_id}`}
                      className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl shadow
                                   bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 transition"
                    >
                      <FaEdit />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(department.department_id)}
                      className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl shadow
                                   bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 transition"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DepartmentManager;
