import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

interface DepartmentFormProps {
  departmentId?: number | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8000";
const STORAGE_BASE = `${API_BASE}/storage/`;

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  departmentId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({ department_name: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load department for editing
  useEffect(() => {
    if (departmentId) {
      setIsEditing(true);
      api
        .get(`/departments/${departmentId}`)
        .then((res) => {
          setFormData({ department_name: res.data.department });
          if (res.data.image) {
            setPreview(`${STORAGE_BASE}${res.data.image}`);
          }
        })
        .catch(() => toast.error("Failed to load department details."));
    }
  }, [departmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("department", formData.department_name);
      if (image) payload.append("image", image);
      if (isEditing) payload.append("_method", "PUT");

      const url = isEditing ? `/departments/${departmentId}` : "/departments";
      await api.post(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(
        `✅ Department ${isEditing ? "updated" : "added"} successfully!`
      );
      onSuccess();
    } catch {
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Department" : "Add Department"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Department Name
          </label>
          <input
            type="text"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Image upload & preview */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <div className="mt-2 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
