import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Layout/Breadcrumbs";
import api from "../../api/axios";
import DepartmentFolder from "./DepartmentFolder";
import FolderView from "./FolderView";

interface Department {
  department_id: number;
  department: string;
}

interface FolderItem {
  id: number;
  name: string;
  type: "file" | "folder";
}

const FileManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Department | null>(null);
  const [folderItems, setFolderItems] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await api.get("/departments");
        setDepartments(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const openFolder = (dept: Department) => {
    setCurrentFolder(dept);
    setFolderItems([
      { id: 1, name: `${dept.department} Subfolder 1`, type: "folder" },
      { id: 2, name: `${dept.department} File 1.pdf`, type: "file" },
      { id: 3, name: `${dept.department} File 2.docx`, type: "file" },
    ]);
  };

  const goBack = () => setCurrentFolder(null);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <Breadcrumbs currentPage="File Manager" />
      <h2 className="text-2xl font-bold mb-4">File Manager</h2>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search files or folders..."
          className="w-full sm:w-1/3 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {currentFolder ? (
        <FolderView items={folderItems} onBack={goBack} />
      ) : loading ? (
        <div className="flex justify-center items-center py-20 col-span-full">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : departments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.department_id}
              className="bg-white/80 rounded-lg shadow-lg p-4 backdrop-blur-sm hover:shadow-xl transition cursor-pointer"
            >
              <DepartmentFolder
                name={dept.department}
                onClick={() => openFolder(dept)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No departments found.
        </p>
      )}
    </div>
  );
};

export default FileManager;
