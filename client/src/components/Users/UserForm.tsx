// src/components/Users/UserForm.tsx
import React, { useEffect, useState } from "react";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
          autoFocus
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="middle_name"
          placeholder="Middle Name (optional)"
          value={form.middle_name || ""}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="suffix_name"
          placeholder="Suffix (optional)"
          value={form.suffix_name || ""}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={0}>Select Department</option>
          {departments.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.department}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="birth_date"
          value={form.birth_date}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 transition"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
