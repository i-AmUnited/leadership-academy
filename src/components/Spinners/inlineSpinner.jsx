import { Loader } from "lucide-react";
import * as React from "react";
const InlineSpinner = () => {
  return (
    <div>
      <Loader className="text-white size-5 animate-spin" />
    </div>
  );
};

export default InlineSpinner;
