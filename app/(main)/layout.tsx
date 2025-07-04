import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full fixed top-0">
      <Navbar />
      <div className="w-full flex">
        <div className="w-[18%] min-h-screen border-r border-r-gray-300">
          <Sidebar />
        </div>
        <div className="w-[82%] px-5 py-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
