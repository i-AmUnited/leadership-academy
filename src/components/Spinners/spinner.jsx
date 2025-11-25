import { Loader } from "lucide-react";
import * as React from "react";
const Spinner = ({ loading }) => {
    if (!loading) return null;
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-md">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    </div>
    </div>
  );
};

export default Spinner;
