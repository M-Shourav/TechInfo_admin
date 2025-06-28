import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <Loader2 size={30} className=" animate-spin" />
        <p className="text-sm/5 font-semibold">
          Data Loading<span className=" animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
};

export default Loading;
