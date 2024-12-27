import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  BarChart2,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <Home className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Home</span>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <LayoutDashboard className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Dashboard</span>
        </Link>
        <Link
          to="/submit-idea"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <PlusCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Submit Idea</span>
        </Link>
        <Link
          to="/reports"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <BarChart2 className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Reports</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
