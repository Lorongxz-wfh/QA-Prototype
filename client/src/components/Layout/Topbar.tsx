import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface TopBarProps {
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ actions }) => {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const currentPage =
    location.pathname === "/" || location.pathname === ""
      ? "Dashboard"
      : location.pathname.split("/").filter(Boolean).slice(-1)[0];
  const pageLabel = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="bg-white shadow p-5.5 lg:px-6 border-b border-gray-200 flex items-center justify-between">
      <div className="text-gray-700 text-lg lg:text-xl font-bold truncate">
        {pageLabel}
      </div>

      <div className="flex items-center gap-2 lg:gap-4 relative">
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition min-w-[120px] cursor-pointer"
          >
            <FaUserCircle className="text-xl text-gray-700" />
            <span className="font-medium text-gray-700 truncate">Lorongxz</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-20">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => {
                  setProfileOpen(false);
                  alert("View account clicked");
                }}
              >
                View Account
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
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
