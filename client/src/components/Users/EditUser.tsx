import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Layout/Breadcrumbs";
import api from "../../api/axios";
import type { UserFormData } from "./UserForm";
import UserForm from "./UserForm";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/${id}`);
        setInitialData(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (data: UserFormData) => {
    try {
      await api.put(`/users/${id}`, data);
      navigate("/users");
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!initialData)
    return <div className="text-center py-10">User not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <Breadcrumbs currentPage="Edit User" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Edit User: {initialData.first_name} {initialData.last_name}
        </h2>
        <button
          onClick={() => navigate("/users")}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr; Back
        </button>
      </div>
      <UserForm
        initialData={initialData}
        onSubmit={handleUpdate}
        submitLabel="Update User"
      />
    </div>
  );
};

export default EditUser;
