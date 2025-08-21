import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const crumbs = [{ name: "Dashboard", path: "/" }];

  if (location.pathname.startsWith("/users")) {
    crumbs.push({ name: "Users", path: "/users" });
    if (location.pathname.includes("/add"))
      crumbs.push({ name: "Add User", path: "/users/add" });
    if (location.pathname.includes("/edit"))
      crumbs.push({ name: `Edit User ${params.id}`, path: location.pathname });
  }

  return (
    <nav className="text-sm text-gray-500 mb-4">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          <Link to={crumb.path} className="hover:text-gray-700">
            {crumb.name}
          </Link>
          {index < crumbs.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
