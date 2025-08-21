import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import Breadcrumbs from "../Layout/Breadcrumbs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Department {
  department_id: number;
  department: string;
  is_deleted: number;
}

const DepartmentManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDept, setNewDept] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch departments!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.trim()) return;
    try {
      const res = await api.post("/departments", { department: newDept });
      setDepartments([...departments, res.data]);
      setNewDept("");
      toast.success("Department added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add department!");
    }
  };

  const handleEdit = (dept: Department) => {
    setEditingId(dept.department_id);
    setEditingName(dept.department);
    setExpandedId(dept.department_id);
  };

  const handleSave = async (id: number) => {
    try {
      await api.put(`/departments/${id}`, { department: editingName });
      setDepartments(
        departments.map((d) =>
          d.department_id === id ? { ...d, department: editingName } : d
        )
      );
      setEditingId(null);
      setEditingName("");
      toast.success("Department updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update department!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(departments.filter((d) => d.department_id !== id));
      toast.success("Department deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete department!");
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <Breadcrumbs />
      <h2 className="text-xl font-bold mb-4">Department Manager</h2>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Add Department Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="Enter new department"
          className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Add
        </button>
      </form>

      {/* Departments List / Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : departments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {departments.map((dept) => (
            <div
              key={dept.department_id}
              className="bg-white/80 p-4 rounded-lg shadow-lg backdrop-blur-sm transition"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(dept.department_id)}
              >
                <h3 className="font-semibold text-lg">{dept.department}</h3>
                <span className="text-gray-500">
                  {expandedId === dept.department_id ? "▲" : "▼"}
                </span>
              </div>

              {expandedId === dept.department_id && (
                <div className="mt-3 flex flex-col gap-2">
                  {editingId === dept.department_id ? (
                    <>
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSave(dept.department_id)}
                          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded transition flex-1"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded transition flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="bg-indigo-400 hover:bg-indigo-500 text-white px-3 py-1 rounded transition flex-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dept.department_id)}
                        className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded transition flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 bg-gray-50 rounded shadow">
          No departments available.
        </div>
      )}
    </div>
  );
};

export default DepartmentManager;
