    import { Outlet } from "react-router-dom";
    import Sidebar from "./Sidebar";
    import TopBar from "./Topbar";
    import "react-toastify/dist/ReactToastify.css";

    const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64 min-h-screen">
            <TopBar />
            <div className="p-6 flex-1">
            <Outlet />
            </div>
        </main>
        </div>
    );
    };

    export default MainLayout;
