// TopicProgressForm.tsx
import React from "react";

interface TopicProgressFormProps {
  progress: { topic_id: string; user_id: string; progress: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
}

const TopicProgressForm: React.FC<TopicProgressFormProps> = ({
  progress,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topic_id"
        >
          Topic ID
        </label>
        <input
          id="topic_id"
          name="topic_id"
          type="text"
          value={progress.topic_id}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter topic ID"
        />
        {errors.topic_id && (
          <p className="text-red-500 text-xs mt-1">{errors.topic_id}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="user_id"
        >
          User ID
        </label>
        <input
          id="user_id"
          name="user_id"
          type="text"
          value={progress.user_id}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter user ID"
        />
        {errors.user_id && (
          <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="progress"
        >
          Progress
        </label>
        <input
          id="progress"
          name="progress"
          type="text"
          value={progress.progress}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter progress details"
        />
        {errors.progress && (
          <p className="text-red-500 text-xs mt-1">{errors.progress}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Progress
        </button>
      </div>
    </form>
  );
};

export default TopicProgressForm;
