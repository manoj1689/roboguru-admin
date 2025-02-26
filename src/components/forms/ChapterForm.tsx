import React from "react";
import { useRouter } from "next/router";

interface ChapterFormProps {
  chapter: {
    name: string;
    tagline: string;
    image_link: string;
    subject_id: string;
  };
  subjectList: {
    id: string;
    name: string;
  }[];
  errors: { [key: string]: string };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChapterForm: React.FC<ChapterFormProps> = ({
  chapter,
  subjectList,
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
      {/* Subject Dropdown */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject_id">
          Subject
        </label>
        <select
          id="subject_id"
          name="subject_id"
          value={chapter.subject_id} // Set the value to the subject name
          disabled={true} // Disable the dropdown so it cannot be changed
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        >
          {subjectList.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
        {errors.subject_id && <p className="text-red-500 text-xs mt-1">{errors.subject_id}</p>}
      </div>

      {/* Chapter Name */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Chapter Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={chapter.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter chapter name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      </div>

      <div className="flex gap-0 md:gap-4 mt-4 flex-col md:flex-row">
      {/* Chapter Tagline */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          value={chapter.tagline}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter chapter tagline"
        />
        {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
      </div>

      {/* Chapter Image Link */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_link">
          Image Link
        </label>
        <input
          id="image_link"
          name="image_link"
          type="text"
          value={chapter.image_link}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter chapter image link"
        />
        {errors.image_link && <p className="text-red-500 text-xs mt-1">{errors.image_link}</p>}
      </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-1 md:gap-4">
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Chapter"}
        </button>
        {/* <button onClick={toggleCancel} className="border w-fit px-4 py-2 rounded font-semibold text-gray-700 hover:border-red-500">
          cancel
        </button> */}
      </div>
    </form>
  );
};

export default ChapterForm;
