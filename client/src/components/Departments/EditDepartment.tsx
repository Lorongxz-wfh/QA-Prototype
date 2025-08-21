import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { departmentAPI } from "../../services/api";
import type { Department } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8000";
const STORAGE_BASE = `${API_BASE}/storage/`;

const getDepartmentImage = (
  dep: Department | { image?: string | null }
): string | null => {
  if (!dep.image) return null;
  return dep.image.startsWith("http")
    ? dep.image
    : `${STORAGE_BASE}${dep.image.replace(/^\/+/, "")}`;
};

const EditDepartment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        if (!id) return;
        const res = await departmentAPI.getById(Number(id));
        const dep = res.data;

        setName(dep.department || "");
        const imgUrl = getDepartmentImage(dep);
        if (imgUrl) setPreview(imgUrl);
      } catch {
        toast.error("Failed to load department");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await departmentAPI.update(Number(id), { department: name, image });
      toast.success("Department updated successfully!");
      navigate("/departments");
    } catch {
      toast.error("Failed to update department!");
    }
  };

  if (loading) {
    // Skeleton while fetching
    return (
      <div className="p-6 max-w-md mx-auto mt-6 animate-pulse bg-white rounded-lg shadow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        <div className="h-40 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-20"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Edit Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex flex-col items-center">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded mt-2"
            />
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/departments")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
