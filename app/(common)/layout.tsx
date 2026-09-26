import Navbar from "@/components/home/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <Navbar />

      <main>{children}</main>

      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
