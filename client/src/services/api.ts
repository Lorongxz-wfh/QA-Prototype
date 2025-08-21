import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Types
export interface Department {
  department_id: number;
  department: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

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

export interface CreateDepartmentData {
  department: string;
}

export interface UpdateDepartmentData {
  department: string;
}


// Department API functions
export const departmentAPI = {
  getAll: () => api.get<Department[]>('/departments'),
  create: (data: CreateDepartmentData) => api.post<Department>('/departments', data),
  update: (id: number, data: CreateDepartmentData) => api.put<Department>(`/departments/${id}`, data),
  delete: (id: number) => api.delete(`/departments/${id}`),
};

// User API functions
export const userAPI = {
  getAll: () => api.get<User[]>('/users'),
  create: (data: CreateUserData) => api.post<User>('/users', data),
  update: (id: number, data: UpdateUserData) => api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

