// components/forms/EducationLevelForm.tsx

import React from "react";
import { useRouter } from "next/router";

interface EducationLevelFormProps {
  educationLevel: { name: string; description: string };
  errors: { [key: string]: string };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EducationLevelForm: React.FC<EducationLevelFormProps> = ({
  educationLevel,
  errors,
  loading,
  onChange,
  onSubmit,
}) => {
  const router=useRouter();
  const toggleCancel=()=>{
    router.push("/admin/education_levels");
  }
  return (
    <form onSubmit={onSubmit}>
      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Education Level 
        </label>
        <input
          type="text"
          name="name"
          value={educationLevel.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter education level name"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={educationLevel.description}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter education level description"
        />
      </div>

      {/*Cancel & Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-1 md:gap-4">
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Education Level"}
        </button>
        {/* <button onClick={toggleCancel} className="border w-fit px-4 py-2 rounded font-semibold text-gray-700 hover:border-red-500">
          cancel
        </button> */}

      </div>

      {/* Error Message */}
      {errors.message && (
        <p className="text-green-500 text-sm mt-4">{errors.message}</p>
      )}
    </form>
  );
};

export default EducationLevelForm;
