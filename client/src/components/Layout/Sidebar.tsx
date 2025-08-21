import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaFolder,
  FaCog,
  FaBars,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/files", label: "File Manager", icon: <FaFolder /> },
    { to: "/departments", label: "Departments", icon: <FaBuilding /> },
    { to: "/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-200 rounded shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen lg:h-screen bg-white shadow-md z-20 w-64 flex flex-col transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-[89px] flex justify-center items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">FilDAS</h1>
        </div>

        {/* Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-gray-100 border-l-4 border-blue-500 text-blue-600"
                        : "text-gray-700"
                    }`
                  }
                >
                  {link.icon} {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings at bottom */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-gray-100 border-l-4 border-blue-500 text-blue-600"
                  : "text-gray-700"
              }`
            }
          >
            <FaCog /> Settings
          </NavLink>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
