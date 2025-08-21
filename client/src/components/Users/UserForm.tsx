// src/components/Users/UserForm.tsx
import React, { useEffect, useState, type ChangeEvent } from "react";
import api from "../../api/axios";


export interface Department {
  department_id: number;
  department: string;
}

export interface UserFormData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  department_id: number;
  birth_date: string;
  username: string;
}

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  submitLabel: string;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  submitLabel,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState<UserFormData>(
    initialData || {
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix_name: "",
      department_id: 0,
      birth_date: "",
      username: "",
    }
  );

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/departments");
        setDepartments(res.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "department_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="First Name"
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Middle Name (optional)
          </label>
          <input
            type="text"
            name="middle_name"
            value={form.middle_name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Middle Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Last Name"
          />
        </div>

        {/* Suffix */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Suffix (optional)
          </label>
          <input
            type="text"
            name="suffix_name"
            value={form.suffix_name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Suffix"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Birth Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Department <span className="text-red-600">*</span>
          </label>
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
          >
            <option value={0} disabled>
              Select Department
            </option>
            {departments.map((d) => (
              <option key={d.department_id} value={d.department_id}>
                {d.department}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 transition cursor-pointer"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
