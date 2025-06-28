import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-[200px] md:w-[250px]  min-h-screen border-r border-r-gray-300">
          <Sidebar />
        </div>
        <div className="flex-1 px-5 py-5">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
