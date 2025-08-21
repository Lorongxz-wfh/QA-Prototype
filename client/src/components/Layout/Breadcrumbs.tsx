import React from "react";

interface BreadcrumbsProps {
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage }) => {
  return (
    <nav className="text-sm mb-6">
      <ol className="flex items-center space-x-2 text-gray-500">
        <li>
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
        </li>
        <li>/</li>
        <li className="text-gray-900 font-medium">{currentPage}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
