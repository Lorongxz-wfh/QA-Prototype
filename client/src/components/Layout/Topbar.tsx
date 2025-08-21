import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface TopBarProps {
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ actions }) => {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  // Get the last part of the path
  const currentPage =
    location.pathname === "/" || location.pathname === ""
      ? "Dashboard"
      : location.pathname.split("/").filter(Boolean).slice(-1)[0];

  // Capitalize first letter
  const pageLabel = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="bg-white shadow p-2.5 pr-10 border-b border-gray-200 flex items-center justify-between rounded-t">
      {/* Page Title */}
      <div className="text-gray-700 text-xl font-bold">{pageLabel}</div>

      {/* Actions + Profile */}
      <div className="flex items-center gap-4 relative">
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition min-w-[120px] cursor-pointer"
          >
            <FaUserCircle className="text-xl text-gray-700" />
            <span className="font-medium text-gray-700">John Doe</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-20">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  setProfileOpen(false);
                  alert("View account clicked");
                }}
              >
                View Account
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logging out...");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
