import React, { useState } from "react";

interface FolderItem {
  id: number;
  name: string;
  type: "file" | "folder";
}

interface Props {
  items: FolderItem[];
  onBack: () => void;
}

const FolderView: React.FC<Props> = ({ items, onBack }) => {
  const [folderItems, setFolderItems] = useState(items);
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: FolderItem = {
      id: folderItems.length + 1, // simple ID generation
      name: newFolderName,
      type: "folder",
    };

    setFolderItems([...folderItems, newFolder]);
    setNewFolderName("");
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        &larr; Back
      </button>

      {/* Create Subfolder / Upload File */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="New subfolder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddFolder}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Folder
        </button>
        <button
          onClick={() => alert("Upload functionality not implemented yet")}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload File
        </button>
      </div>

      {/* Folder Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {folderItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded hover:shadow cursor-pointer text-center"
          >
            <div className="text-6xl mb-2">
              {item.type === "folder" ? "📁" : "📄"}
            </div>
            <p className="truncate font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderView;
