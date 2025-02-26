import React from "react";
import { useRouter } from "next/router";

interface TopicFormProps {
  topic: {
    name: string;
    tagline: string;
    image_link: string;
    details: string;
    chapter_id: string;
  };
  chapterList:{ id: string; name: string }[]
  errors: { [key: string]: string };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({
  topic,
  chapterList,
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
       <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class_id">
          Chapter
        </label>
        <select
          id="class_id"
          name="class_id"
          value={topic.chapter_id}
          disabled
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Class</option>
          {chapterList.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.name}
            </option>
          ))}
        </select>
        {errors.class_id && <p className="text-red-500 text-xs mt-1">{errors.class_id}</p>}
      </div>

     
      {/* Topic Name */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Topic Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={topic.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter topic name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      </div>

      <div className="flex gap-0 md:gap-4 mt-4 flex-col md:flex-row">
      {/* Topic Tagline */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          value={topic.tagline}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter topic tagline"
        />
        {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
      </div>

      {/* Topic Image Link */}
      <div className="mb-4 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_link">
          Image Link
        </label>
        <input
          id="image_link"
          name="image_link"
          type="text"
          value={topic.image_link}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter topic image link"
        />
        {errors.image_link && <p className="text-red-500 text-xs mt-1">{errors.image_link}</p>}
      </div>
      </div>

      {/* Topic Details */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
          Details
        </label>
        <textarea
          id="details"
          name="details"
          value={topic.details}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter topic details"
        />
        {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-1 md:gap-4">
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Topic"}
        </button>
        {/* <button onClick={toggleCancel} className="border w-fit px-4 py-2 rounded font-semibold text-gray-700 hover:border-red-500">
          cancel
        </button> */}
      </div>
    </form>
  );
};

export default TopicForm;
