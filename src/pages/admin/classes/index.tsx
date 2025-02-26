import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClassesByLevel,
  updateClass,
  deleteClass,
  createClass,
} from "../../../redux/slices/classSlice";
import { fetchEducationLevels } from "@/redux/slices/educationlevelSlice";
import Layout from "../../../components/Layout";
import { AppDispatch, RootState } from "../../../redux/store";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaArrowsAlt } from "react-icons/fa";
import { MdDelete, MdFileCopy } from "react-icons/md";

interface Class {
  id: string;
  name: string;
  tagline: string;
  image_link: string;
  level_id: string;
}

interface EducationLevel {
  id: string;
  name: string;
}

const ClassesPage = () => {
  const dispatch: AppDispatch = useDispatch();

  // Select items from Redux
  const classes = useSelector((state: RootState) => state.class.classes || []);
  const educationLevels = useSelector(
    (state: RootState) => state.educationLevel.educationLevels || []
  );

  // Track selected level for filtering
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  // Add-Class Modal
  const [isClsOpen, setIsClsOpen] = useState(false);
  const openCls = () => setIsClsOpen(true);
  const closeCls = () => setIsClsOpen(false);

  // Edit-Class Modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState<Class | null>(null);

  // Fetch education levels on mount
  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
  }, [dispatch]);

  // Fetch classes whenever selectedLevelId changes
  useEffect(() => {
    if (selectedLevelId !== null) {
      dispatch(fetchClassesByLevel(selectedLevelId));
    }
  }, [dispatch, selectedLevelId]);

  // Helper function to get education level name by level_id
  const getEducationLevelName = (levelId: string) => {
    const level = educationLevels.find((level) => level.id === levelId);
    return level ? level.name : "Unknown Level";
  };

  // ----- Edit -----
  const handleEdit = (cls: Class) => {
    setClassToEdit(cls);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setClassToEdit(null);
  };

  const handleUpdateClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (classToEdit) {
      const payload = {
        class_id: classToEdit.id,
        cls: {
          name: classToEdit.name,
          tagline: classToEdit.tagline,
          image_link: classToEdit.image_link,
          level_id: classToEdit.level_id,
        },
      };
      dispatch(updateClass(payload));
      handleCloseEditModal();
    }
  };

  // ----- Delete -----
  const handleDelete = (classId: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      dispatch(deleteClass(classId));
    }
  };

  // Create Class Modal Component
  const CreateClassPage = ({
    open,
    onClose,
    levelId,
  }: {
    open: boolean;
    onClose: () => void;
    levelId: string | null;
  }) => {
    const [className, setClassName] = useState("");
    const [tagline, setTagline] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [error, setError] = useState<string | null>(null);

    const educationLevels = useSelector(
      (state: RootState) => state.educationLevel.educationLevels || []
    );

    // Get the selected education level name
    const selectedLevel = educationLevels.find((level) => level.id === levelId);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!levelId) {
        setError("Please select an education level.");
        return;
      }

      const payload = {
        name: className,
        tagline: tagline,
        image_link: imageLink,
        level_id: levelId,
      };

      try {
        await dispatch(createClass(payload)).unwrap();
        onClose(); // Close the modal on success
        setClassName("");
        setTagline("");
        setImageLink("");
        setError(null);
      } catch (error) {
        console.error("Error creating class:", error);
        setError(
          "Failed to create class. Please check the data and try again."
        );
      }
    };

    return (
      <Modal open={open} onClose={onClose} center>
        <h2 className="text-lg font-bold mb-4">Create New Class</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="md:min-w-[500px] max-w-full mx-auto bg-white rounded-lg"
        >
          {/* Education Level (Disabled Select Input) */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Education Level</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            >
              <option value={levelId || ""}>
                {selectedLevel ? selectedLevel.name : "No level selected"}
              </option>
            </select>
          </div>

          {/* Class Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter class name"
              required
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter tagline"
              required
            />
          </div>

          {/* Image Link */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Image Link</label>
            <input
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter image link"
            />
          </div>

          {/* Buttons */}
          <div className="text-right">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Create Class
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <Layout>
      <div className="mb-4">
        <span className="text-2xl text-neutral-700 font-bold">
          Select Education Level
        </span>
        <select
          className="block w-full mt-2 border border-gray-300 outline-none rounded-lg p-2"
          value={selectedLevelId || ""}
          onChange={(e) =>
            setSelectedLevelId(e.target.value ? e.target.value : null)
          }
        >
          <option value="">-- Select Education Level --</option>
          {educationLevels.map((level: EducationLevel) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLevelId && (
        <>
          <div className="flex flex-col md:flex-row justify-between mt-2 md:mt-4 lg:mt-6 mb-4">
            <span className="text-xl md:text-2xl font-bold text-neutral-700">
              Classes
            </span>
            <div
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={openCls}
            >
              <span className="text-xl md:text-2xl lg:text-3xl font-thin">
                +
              </span>
              <span className="text-sm md:text-lg underline font-normal">
                Create New Class
              </span>
            </div>
          </div>

          {/* Pass the selected level ID down to CreateClassPage */}
          <CreateClassPage
            open={isClsOpen}
            onClose={closeCls}
            levelId={selectedLevelId}
          />

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 border-l-0 border-r-0 rounded-lg shadow-md">
              <thead className="border-b border-gray-300">
                <tr className="text-sm">
                  <th className="py-2 pl-4 text-left text-gray-600"></th>
                  <th className="py-2 pr-2 text-left text-gray-600">Code</th>
                  <th className="py-2 px-4 text-left text-gray-600">Class</th>
                  <th className="py-2 px-4 text-left text-gray-600">
                    Educational Level
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600">Tagline</th>
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(classes) && classes.length > 0 ? (
                  classes.map((cls: Class, i: number) => (
                    <tr
                      key={cls.id}
                      className={`hover:bg-gray-100 border-b border-gray-200 text-xs ${
                        i % 2 !== 0 ? "bg-[#F6F9FD]" : ""
                      }`}
                    >
                      <td className="py-2 pl-4 text-gray-600">
                        <FaArrowsAlt size={15} />
                      </td>
                      <td className="py-2 px-4 text-gray-800"></td>
                      <td className="py-2 px-4 text-gray-800">{cls.name}</td>
                      <td className="py-2 px-4 text-gray-800">
                        {getEducationLevelName(cls.level_id)}{" "}
                        {/* Display education level name */}
                      </td>
                      <td className="py-2 px-4 text-gray-800">{cls.tagline}</td>
                      <td className="py-2 px-4 flex justify-end gap-4 mr-4">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button className="text-gray-500 hover:underline">
                          <MdFileCopy size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(cls.id)}
                          className="text-gray-500 hover:underline"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-600">
                      No classes available for this level.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        center
        styles={{
          modal: {
            borderRadius: "10px",
          },
        }}
      >
        <h2 className="text-lg font-bold mb-4">Edit Class</h2>
        {classToEdit && (
          <form
            onSubmit={handleUpdateClass}
            className="md:min-w-[500px] max-w-full mx-auto bg-white rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Class Name</label>
              <input
                type="text"
                value={classToEdit.name}
                onChange={(e) =>
                  setClassToEdit({ ...classToEdit, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Tagline</label>
              <input
                type="text"
                value={classToEdit.tagline}
                onChange={(e) =>
                  setClassToEdit({ ...classToEdit, tagline: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleCloseEditModal}
                className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </Layout>
  );
};

export default ClassesPage;
