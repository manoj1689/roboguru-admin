import React from "react";
import { useRouter } from "next/router";

interface ClassFormProps {
  cls: {
    name: string;
    tagline: string;
    image_link: string;
    level_id: string; // Passed directly from the parent component
  };
  educationLevels: { id: string; name: string }[]; // Add educationLevels prop to handle the select options
  errors: { [key: string]: string };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Adjusted type to support both inputs and select
  onSubmit: (e: React.FormEvent) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({
  cls,
  educationLevels,
  errors,
  loading,
  onChange,
  onSubmit,
}) => {
  const router= useRouter();
  const toggleCancel=()=>{
    router.push("/admin/education_levels");
  }
  return (
    <form onSubmit={onSubmit}>

      <div className="flex gap-0 md:gap-4 mt-4 flex-col md:flex-row">
       {/* Education Level */}
       <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level_id">
          Education Level
        </label>
        <select
          id="level_id"
          name="level_id"
          disabled
          value={cls.level_id}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Education Level</option>
          {educationLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
        {errors.level_id && <p className="text-red-500 text-xs mt-1">{errors.level_id}</p>}
      </div>
      
      {/* Class Name */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Class Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={cls.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter class name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      </div>

      <div className="flex gap-0 md:gap-4 flex-col md:flex-row">
      {/* Tagline */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          value={cls.tagline}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter tagline"
        />
        {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
      </div>

      {/* Image Link */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_link">
          Image Link
        </label>
        <input
          id="image_link"
          name="image_link"
          type="text"
          value={cls.image_link}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter image link"
        />
        {errors.image_link && (
          <p className="text-red-500 text-xs mt-1">{errors.image_link}</p>
        )}
      </div>
      </div>
     

      {/* Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-1 md:gap-4">
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Class"}
        </button>
        {/* <button onClick={toggleCancel} className="border w-fit px-4 py-2 rounded font-semibold text-gray-700 hover:border-red-500">
          cancel
        </button> */}
      </div>
    </form>
  );
};

export default ClassForm;
