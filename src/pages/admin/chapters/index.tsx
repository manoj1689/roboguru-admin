"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChaptersBySubjectId,
  updateChapter,
  deleteChapter,
} from "../../../redux/slices/chapterSlice";
import { fetchSubjectsByClassId } from "../../../redux/slices/subjectSlice";
import { fetchClassesByLevel } from "../../../redux/slices/classSlice";
import { fetchEducationLevels } from "../../../redux/slices/educationlevelSlice";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { AppDispatch, RootState } from "../../../redux/store";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaArrowsAlt } from "react-icons/fa";
import { MdDelete, MdFileCopy  } from "react-icons/md";
import CreateChapterPage from "./create";

// Define Chapter and ChapterState
export interface Chapter {
  id: string; // Required field
  name: string;
  tagline: string;
  image_link: string;
  subject_id: string;
}
const ChaptersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isChapOpen, setisChapOpen]= useState(false);
  const openChap=()=>setisChapOpen(true);
  const closeChap=()=>setisChapOpen(false);

  // State for selected dropdown values
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );

  // State for the edit modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [chapterToEdit, setChapterToEdit] = useState<Chapter | null>(null);

  // Fetch data from Redux store
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
  const loading = useSelector((state: RootState) => state.chapter.loading);
  const error = useSelector((state: RootState) => state.chapter.error);

  // Fetch education levels on mount
  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
  }, [dispatch]);

  // Fetch classes when a level is selected
  useEffect(() => {
    if (selectedLevelId !== null) {
      dispatch(fetchClassesByLevel(selectedLevelId));
    }
  }, [dispatch, selectedLevelId]);

  // Fetch subjects when a class is selected
  useEffect(() => {
    if (selectedClassId !== null) {
      dispatch(fetchSubjectsByClassId(selectedClassId));
    }
  }, [dispatch, selectedClassId]);

  // Fetch chapters when a subject is selected
  useEffect(() => {
    if (selectedSubjectId !== null) {
      dispatch(fetchChaptersBySubjectId(selectedSubjectId));
    }
  }, [dispatch, selectedSubjectId]);

  // Open the edit modal
  const handleEdit = (chapter: Chapter) => {
    setChapterToEdit(chapter);
    setEditModalOpen(true);
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setChapterToEdit(null);
  };

  // Handle chapter update
  const handleUpdateChapter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chapterToEdit) {
      const payload = {
        subject_id: chapterToEdit.subject_id,
        chapter_id: chapterToEdit.id, // Convert to string
        chapter: {
          name: chapterToEdit.name,
          tagline: chapterToEdit.tagline,
          image_link: chapterToEdit.image_link,
          subject_id: chapterToEdit.subject_id,
        },
      };

      dispatch(updateChapter(payload));
      handleCloseEditModal(); // Close modal after updating
    }
  };

  // Handle delete functionality
  const handleDelete = (chapterId: string) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(chapterId));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <Layout>
      {/* Education Level Dropdown */}
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

      {/* Class Dropdown */}
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
              <div className="text-red-500 my-4">
                Please create class before choosing a Subject.
              </div>
            </>
          )}
        </div>
      )}

      {/* Subject Dropdown */}
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
              <div className="text-red-500 my-4">
                Please create a subject before choosing a chapter.
              </div>
            </>
          )}
        </div>
      )}

      {/* Chapter Table */}
      {classes.length > 0 && subjects.length > 0 && selectedSubjectId && (
        <>
          <div className="flex flex-col md:flex-row justify-between mt-2 md:mt-4 lg:mt-6 mb-4">
            <span className="text-xl md:text-2xl font-bold text-neutral-700">Chapters</span>
            
              <div className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    onClick={openChap}>
                <span className="text-xl md:text-2xl lg:text-3xl group-hover:no-underline font-thin">
                  +
                </span>
                <span className="text-sm md:text-lg cursor-pointer underline font-normal">
                  Create New Chapter
                </span>
              </div>
            <CreateChapterPage open={isChapOpen} onClose={closeChap}/>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 border-l-0 border-r-0 rounded-lg shadow-md">
              <thead className="border-b border-gray-300">
                <tr className="text-sm">
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                  <th className="py-2 px-4 text-left text-gray-600">
                    Chapter Name
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600">
                    Description
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(chapters) && chapters.length > 0 ? (
                  chapters.map((chapter: Chapter, i:number) => (
                    <tr
                      key={chapter.id}
                      className={`hover:bg-gray-100 border-b border-gray-200 text-xs ${i%2!==0?'bg-[#F6F9FD]':''}`}
                    >
                      <td className="py-2 pl-4 text-gray-600">
                        <FaArrowsAlt size={15}/>
                      </td>
                      <td className="py-2 px-4 text-gray-800">
                        {chapter.name}
                      </td>
                      <td className="py-2 px-4 text-gray-800">
                        {chapter.tagline}
                      </td>
                      <td className="py-2 px-4 flex justify-end gap-4 mr-4">
                        <button
                          onClick={() => handleEdit(chapter)}
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button className="text-gray-500 hover:underline">
                          <MdFileCopy  size={20}/>
                        </button>
                        <button
                          onClick={() => handleDelete(chapter.id)}
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
                      No chapters available for this subject.
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
        <h2 className="text-lg font-bold mb-4">Edit Chapter</h2>
        {chapterToEdit && (
          <form
            onSubmit={handleUpdateChapter}
            className="md:min-w-[500px] max-w-full mx-auto bg-white rounded-lg "
          >
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Chapter Name</label>
              <input
                type="text"
                value={chapterToEdit.name}
                onChange={(e) =>
                  setChapterToEdit({
                    ...chapterToEdit,
                    name: e.target.value,
                  })
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

export default ChaptersPage;
