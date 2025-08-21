import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaFolder,
  FaCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/files", label: "File Manager", icon: <FaFolder /> },
    { to: "/departments", label: "Departments", icon: <FaBuilding /> },
    { to: "/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col fixed h-full z-10">
      {/* Logo / Header */}
      <div className="h-[89px] flex justify-center items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">FilDAS</h1>
      </div>

      {/* Main Links */}
      <nav className="flex-1 p-4">
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

      {/* Settings Link at Bottom */}
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
  );
};

export default Sidebar;
