import React from "react";
import { useRouter } from "next/router";

interface SubjectFormProps {
  subject: {
    name: string;
    tagline: string;
    image_link: string;
    class_id: string; // Passed directly from the parent component
  };
  classList: { id: string; name: string }[]; // List of available classes
  errors: { [key: string]: string };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  subject,
  classList,
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
      {/* Class Dropdown */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class_id">
          Class
        </label>
        <select
          id="class_id"
          name="class_id"
          value={subject.class_id}
          disabled
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Class</option>
          {classList.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        {errors.class_id && <p className="text-red-500 text-xs mt-1">{errors.class_id}</p>}
      </div>

      {/* Subject Name */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject_name">
          Subject Name
        </label>
        <input
          id="subject_name"
          name="name"
          type="text"
          value={subject.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter subject name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      </div>

      <div className="flex gap-0 md:gap-4 mt-4 flex-col md:flex-row">
      {/* Subject Tagline */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          value={subject.tagline}
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
          value={subject.image_link}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter image link"
        />
        {errors.image_link && <p className="text-red-500 text-xs mt-1">{errors.image_link}</p>}
      </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Subject"}
        </button>
        {/* <button onClick={toggleCancel} className="border w-fit px-4 py-2 rounded font-semibold text-gray-700 hover:border-red-500">
          cancel
        </button> */}
      </div>
    </form>
  );
};

export default SubjectForm;
