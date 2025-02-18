import { FileX2 } from "lucide-react";
import React from "react";

export default function NoForms() {
  return (
    <div className="w-full mx-auto p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
        <FileX2 className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No forms found
        </h3>
        <p className="text-gray-500">
          There are currently no forms. Create one or use a template
        </p>
      </div>
    </div>
  );
}
