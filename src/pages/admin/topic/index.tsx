"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTopicsByChapterId,
  updateTopic,
  deleteTopic,
} from "../../../redux/slices/topicSlice"; // Topic actions
import { fetchChaptersBySubjectId } from "../../../redux/slices/chapterSlice";
import { fetchSubjectsByClassId } from "../../../redux/slices/subjectSlice";
import { fetchClassesByLevel } from "../../../redux/slices/classSlice";
import { fetchEducationLevels } from "../../../redux/slices/educationlevelSlice";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { AppDispatch, RootState } from "../../../redux/store";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaArrowsAlt } from "react-icons/fa";
import { MdDelete, MdFileCopy  } from "react-icons/md";
import CreateTopicPage from "./create";

export interface Topic {
  id: string; // Required field
  name: string;
  tagline: string;
  image_link: string;
  details: string;
  chapter_id: string;
}

const TopicsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isTopOpen, setisTopOpen]= useState(false);
  const openTopModal=()=>setisTopOpen(true);
  const closeTopModal=()=>setisTopOpen(false);

  // State for dropdown selections
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );

  // Modal management
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<Topic | null>(null);

  const topics = useSelector((state: RootState) => state.topic.topics || []);
  console.log("topics", topics);
  const chapters = useSelector(
    (state: RootState) => state.chapter.chapters || []
  );
  const subjects = useSelector(
    (state: RootState) => state.subject.subjects || []
  );
  const classes = useSelector((state: RootState) => state.class.classes || []);
  const educationLevels = useSelector(
    (state: RootState) => state.educationLevel.educationLevels || []
  );
  const loading = useSelector((state: RootState) => state.topic.loading);
  const error = useSelector((state: RootState) => state.topic.error);

  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedLevelId !== null) {
      dispatch(fetchClassesByLevel(selectedLevelId));
    }
  }, [dispatch, selectedLevelId]);

  useEffect(() => {
    if (selectedClassId !== null) {
      dispatch(fetchSubjectsByClassId(selectedClassId));
    }
  }, [dispatch, selectedClassId]);

  useEffect(() => {
    if (selectedSubjectId !== null) {
      dispatch(fetchChaptersBySubjectId(selectedSubjectId));
    }
  }, [dispatch, selectedSubjectId]);

  useEffect(() => {
    if (selectedChapterId !== null) {
      dispatch(fetchTopicsByChapterId(selectedChapterId));
    }
  }, [dispatch, selectedChapterId]);

  const handleEdit = (topic: Topic) => {
    setTopicToEdit(topic);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTopicToEdit(null);
  };

  const handleUpdateTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topicToEdit) {
      const payload = {
        topic_id: topicToEdit.id,
        topic: {
          ...topicToEdit,
        },
      };
      dispatch(updateTopic(payload));
      handleCloseEditModal();
    }
  };

  const handleDelete = (topicId: string) => {
    if (confirm("Are you sure you want to delete this topic?")) {
      dispatch(deleteTopic(topicId));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      {/* Dropdowns for filtering */}
      <div className="mb-4">
        <span className="text-xl md:text-2xl font-bold text-neutral-700">Select Education Level</span>
        <select
          className="block w-full mt-2 border border-gray-300 rounded-lg p-2 outline-none"
          value={selectedLevelId || ""}
          onChange={(e) =>
            setSelectedLevelId(e.target.value ? e.target.value : null)
          }
        >
          <option value="">-- Select Education Level --</option>
          {educationLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>
      {selectedLevelId && (
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold text-neutral-700">Select Class</span>
          {classes.length > 0 ? (
            <select
              className="block w-full mt-2 border border-gray-300 rounded-lg p-2 outline-none"
              value={selectedClassId || ""}
              onChange={(e) =>
                setSelectedClassId(e.target.value ? e.target.value : null)
              }
            >
              <option value="">-- Select Class --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <div className="text-red-500">
                Please create class before choosing subject.
              </div>
            </>
          )}
        </div>
      )}
      {classes.length > 0 && selectedClassId && (
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold text-neutral-700">Select Subject</span>
          {subjects.length > 0 ? (
            <select
              className="block w-full mt-2 border border-gray-300 rounded-lg p-2 outline-none"
              value={selectedSubjectId || ""}
              onChange={(e) =>
                setSelectedSubjectId(e.target.value ? e.target.value : null)
              }
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <div className="text-red-500">
                Please create subject before choosing chapter.
              </div>
            </>
          )}
        </div>
      )}
      {classes.length > 0 && subjects.length > 0 && selectedSubjectId && (
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold text-neutral-700">Select Chapter</span>
          {chapters.length > 0 ? (
            <select
              className="block w-full mt-2 border border-gray-300 rounded-lg p-2 outline-none"
              value={selectedChapterId || ""}
              onChange={(e) =>
                setSelectedChapterId(e.target.value ? e.target.value : null)
              }
            >
              <option value="">-- Select Chapter --</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <div className="text-red-500">
                Please create a chapter before choosing topic.
              </div>
            </>
          )}
        </div>
      )}

      {/* Topics Table */}
      {subjects.length > 0 && chapters.length > 0 && selectedChapterId && (
        <>
          <div className="flex flex-col md:flex-row justify-between lg:mt-6 md:mt-4 mt-2 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-700">Topics</h3>
            
              <div className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    onClick={openTopModal}>
                <span className="lg:text-3xl md:text-2xl text-xl group-hover:no-underline font-thin">
                  +
                </span>
                <span className="text-sm md:text-lg cursor-pointer underline font-normal">
                  Create New Topic
                </span>
              </div>
          <CreateTopicPage open={isTopOpen} onClose={closeTopModal}/>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 border-l-0 border-r-0 rounded-lg shadow-md">
              <thead className="border-b border-gray-300">
                <tr className="text-sm">
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                  <th className="py-2 px-4 text-left text-gray-600">Name</th>
                  <th className="py-2 px-4 text-left text-gray-600">Tagline</th>
                  <th className="py-2 px-4 text-left text-gray-600">Details</th>
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(topics) && topics.length > 0 ? (
                  topics.map((topic: Topic, i:number) => (
                    <tr
                      key={topic.id}
                      className={`hover:bg-gray-100 border-b border-gray-200 text-xs ${i%2!==0?'bg-[#F6F9FD]':''}`}
                    >
                      <td className="py-2 pl-4 text-gray-600">
                        <FaArrowsAlt size={15}/>
                      </td>
                      <td className="py-2 px-4 text-gray-800">{topic.name}</td>
                      <td className="py-2 px-4 text-gray-800">
                        {topic.tagline}
                      </td>
                      <td className="py-2 px-4 text-gray-800">
                        {topic.details}
                      </td>
                      <td className="py-2 px-4 flex justify-end gap-4 mr-4">
                        <button
                          onClick={() => handleEdit(topic)}
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button className="text-gray-500 hover:underline">
                          <MdFileCopy  size={20}/>
                        </button>
                        <button
                          onClick={() => handleDelete(topic.id)}
                          className="text-gray-500 hover:underline"
                        >
                          <MdDelete size={20}/>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-600">
                      No topics available for this chapter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

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
        {topicToEdit && (
          <form
            onSubmit={handleUpdateTopic}
            className="md:min-w-[500px] max-w-full mx-auto bg-white rounded-lg "
          >
            {/* Topic Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Topic Name
              </label>
              <input
                id="name"
                type="text"
                value={topicToEdit.name}
                onChange={(e) =>
                  setTopicToEdit({ ...topicToEdit, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter topic name"
              />
            </div>

            {/* Topic Tagline */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tagline"
              >
                Tagline
              </label>
              <input
                id="tagline"
                type="text"
                value={topicToEdit.tagline}
                onChange={(e) =>
                  setTopicToEdit({ ...topicToEdit, tagline: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter topic tagline"
              />
            </div>

            {/* Topic Image Link */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image_link"
              >
                Image Link
              </label>
              <input
                id="image_link"
                type="text"
                value={topicToEdit.image_link}
                onChange={(e) =>
                  setTopicToEdit({ ...topicToEdit, image_link: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter topic image link"
              />
            </div>

            {/* Topic Details */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="details"
              >
                Details
              </label>
              <textarea
                id="details"
                value={topicToEdit.details}
                onChange={(e) =>
                  setTopicToEdit({ ...topicToEdit, details: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter topic details"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="button"
                onClick={handleCloseEditModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
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

export default TopicsPage;
