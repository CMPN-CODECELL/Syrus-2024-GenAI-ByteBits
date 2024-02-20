import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col align-middle w-60 h-full bg-background border-r border-[#2D2E35] x-50"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
