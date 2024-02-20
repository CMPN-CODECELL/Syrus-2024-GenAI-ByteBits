import { Navbar } from "../_components/navbar";
import SideNav from "../_components/sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <SideNav />
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
