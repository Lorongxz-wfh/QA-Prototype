import axios from "axios";

// -------------------
// Base URL
// -------------------
const API_BASE_URL = "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// -------------------
// Type Definitions
// -------------------

// Department
export interface Department {
  department_id: number;
  department: string;
  is_deleted: boolean;
  image?: string; // Optional image path
  created_at: string;
  updated_at: string;
}

// Create / Update Department data
export interface CreateDepartmentData {
  department: string;
  image?: File | null;
}

export interface UpdateDepartmentData {
  department: string;
  image?: File | null;
}

// User
export interface User {
  user_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  department_id: number;
  birth_date: string;
  age: number;
  username: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  department?: Department;
}

export interface CreateUserData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  department_id: number;
  birth_date: string;
  age: number;
  username: string;
  password: string;
}

export interface UpdateUserData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix_name?: string;
  department_id: number;
  birth_date: string;
  age: number;
  username: string;
  password?: string;
}

// -------------------
// Department API
// -------------------
export const departmentAPI = {
  getAll: () => api.get<Department[]>("/departments"),
  getById: (id: number) => api.get<Department>(`/departments/${id}`),

  create: (data: CreateDepartmentData) => {
    const formData = new FormData();
    formData.append("department", data.department);
    if (data.image) formData.append("image", data.image);

    return api.post<Department>("/departments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update: (id: number, data: UpdateDepartmentData) => {
    const formData = new FormData();
    formData.append("department", data.department);
    if (data.image) formData.append("image", data.image);

    // Laravel expects _method for PUT with multipart
    formData.append("_method", "PUT");

    return api.post<Department>(`/departments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: (id: number) => api.delete(`/departments/${id}`),
};

// -------------------
// User API
// -------------------
export const userAPI = {
  getAll: () => api.get<User[]>("/users"),
  create: (data: CreateUserData) => api.post<User>("/users", data),
  update: (id: number, data: UpdateUserData) =>
    api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};
