// src/components/Users/AddUser.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Layout/Breadcrumbs";
import api from "../../api/axios";
import type { UserFormData } from "./UserForm";
import UserForm from "./UserForm";
import { toast } from "react-toastify";

const AddUser: React.FC = () => {
  const navigate = useNavigate();

  const handleAdd = async (data: UserFormData) => {
    try {
      await api.post("/users", data);
      toast.success("User added successfully!");
      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add User</h2>
        <button
          onClick={() => navigate("/users")}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr; Back
        </button>
      </div>
      <UserForm onSubmit={handleAdd} submitLabel="Add User" />
    </div>
  );
};

export default AddUser;
