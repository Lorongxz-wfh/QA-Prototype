import React from "react";

interface Props {
  name: string;
  onClick: () => void;
}

const DepartmentFolder: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 p-4 rounded hover:shadow cursor-pointer text-center"
    >
      <div className="text-6xl text-yellow-400 mb-2">📁</div>
      <p className="truncate font-medium">{name}</p>
    </div>
  );
};

export default DepartmentFolder;
    