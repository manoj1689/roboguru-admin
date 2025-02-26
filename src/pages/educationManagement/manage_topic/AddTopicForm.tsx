import React, { useState } from "react";
import axios from "axios";

const AddTopicForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    chapter: "",
    subject: "",
    class: "",
    order: 0,
    trending: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://67bbff36ed4861e07b38cf4f.mockapi.io/api/v1/manage-topics",
        formData
      );
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Topic</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="chapter"
              placeholder="Chapter"
              value={formData.chapter}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="order"
              placeholder="Order"
              value={formData.order}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Trending</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTopicForm;
