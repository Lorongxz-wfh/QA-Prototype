import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { departmentAPI } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDepartment: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await departmentAPI.create({ department: name, image });
      toast.success("Department added successfully!");
      navigate("/departments");
    } catch {
      toast.error("Failed to add department!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Add Department</h2>
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
            Save
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

export default AddDepartment;
