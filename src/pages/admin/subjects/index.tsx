"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSubjectsByClassId,
  updateSubject,
  deleteSubject,
} from "../../../redux/slices/subjectSlice";
import { fetchEducationLevels } from "@/redux/slices/educationlevelSlice";
import { fetchClasses, fetchClassesByLevel } from "@/redux/slices/classSlice";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { AppDispatch, RootState } from "../../../redux/store";
import { Modal } from "react-responsive-modal"; // Import the Modal component
import "react-responsive-modal/styles.css"; // Modal styles
import { FaArrowsAlt } from "react-icons/fa";
import { MdDelete, MdFileCopy  } from "react-icons/md";
import CreateSubjectPage from "./create";

// Define the subject interface
interface Subject {
  id: string;
  name: string;
  tagline: string;
  image_link: string;
  image_prompt: string,
  class_id: string;
}

const SubjectsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isSubOpen, setisSubOpen]= useState(false);
  const openSub=()=>setisSubOpen(true);
  const closeSub=()=>setisSubOpen(false);

  // State for selected education level and class
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  // State for the edit modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);

  // Fetch data from Redux store
  const subjects = useSelector(
    (state: RootState) => state.subject.subjects || []
  );
  const classes = useSelector(
    (state: RootState) => state.class.classes || []
  );
  const educationLevels = useSelector(
    (state: RootState) => state.educationLevel.educationLevels || []
  );
  const loading = useSelector((state: RootState) => state.subject.loading);
  const error = useSelector((state: RootState) => state.subject.error);

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

  useEffect(() => {
    dispatch(fetchClasses({ limit: 10, name: "" }));
  }, [dispatch]);

  // Fetch subjects when a class is selected
  useEffect(() => {
    if (selectedClassId !== null) {
      dispatch(fetchSubjectsByClassId(selectedClassId));
    }
  }, [dispatch, selectedClassId]);

  // Open the edit modal
  const handleEdit = (subject: Subject) => {
    setSubjectToEdit(subject);
    setEditModalOpen(true);
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSubjectToEdit(null);
  };

  // Handle subject update
  const handleUpdateSubject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subjectToEdit) {
      const payload = {
        class_id: subjectToEdit.class_id,
        subject_id: subjectToEdit.id.toString(), // Convert to string
        subject: {
          name: subjectToEdit.name,
          tagline: subjectToEdit.tagline,
          image_link: subjectToEdit.image_link,
          image_prompt: subjectToEdit.image_prompt,
          class_id: subjectToEdit.class_id,
        },
      };

      dispatch(updateSubject(payload));
      handleCloseEditModal(); // Close modal after updating
    }
  };

  // Handle delete functionality
  const handleDelete = (subjectId: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteSubject(subjectId));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
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
            setSelectedLevelId(
              e.target.value ? e.target.value : null
            )
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
      { selectedLevelId && (
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold text-neutral-700">Select Class</span>
          {classes.length>0? <select
            className="block w-full mt-2 border border-gray-300 rounded-lg p-2 outline-none"
            value={selectedClassId || ""}
            onChange={(e) =>
              setSelectedClassId(
                e.target.value ? e.target.value : null
              )
            }
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>: (
        <div className="text-red-500 mt-4">
          Please create a class before choosing a subject.
        </div>
      )}
         
        </div>
      ) }


      {/* Subject Table */}
      {classes.length>0 && selectedClassId && (
        <>
          <div className="flex flex-col md:flex-row justify-between mt-2 md:mt-4 lg:mt-6 mb-2 md:mb-4">
          <span className="text-xl md:text-2xl font-bold text-neutral-700">Subjects</span>
          
            <div className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                  onClick={openSub}>
            <span className="text-xl md:text-2xl lg:text-3xl group-hover:no-underline font-thin">+</span>
            <span className=" text-lg cursor-pointer underline font-normal">
              Create New Subject
            </span>
            </div>
          <CreateSubjectPage open={isSubOpen} onClose={closeSub}/>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 border-l-0 border-r-0 rounded-lg shadow-md">
              <thead className=" border-b border-gray-300">
                <tr className="text-sm">
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                  <th className="py-2 px-4 text-left text-gray-600">
                    Subject Name
                  </th>
                  <th className="py-2 px-4 text-left text-gray-600">Tagline</th>
                  <th className="py-2 px-4 text-left text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(subjects) && subjects.length > 0 ? (
                  subjects.map((subject: Subject, i:number) => (
                    <tr
                      key={subject.id}
                      className={`hover:bg-gray-100 border-b border-gray-200 text-xs ${i%2!==0?'bg-[#F6F9FD]':''}`}
                    >
                      <td className="py-2 px-4 text-gray-600"><FaArrowsAlt size={15}/></td>
                      <td className="py-2 px-4 text-gray-800">
                        {subject.name}
                      </td>
                      <td className="py-2 px-4 text-gray-800">
                        {subject.tagline}
                      </td>
                      <td className="py-2 px-4 flex justify-end gap-4 mr-4">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button className="text-gray-500 hover:underline">
                          <MdFileCopy  size={20}/>
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id)}
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
                      No subjects available for this class.
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
        <h2 className="text-lg font-bold mb-4">Edit Subject</h2>
        {subjectToEdit && (
          <form onSubmit={handleUpdateSubject} className="md:min-w-[500px] max-w-full mx-auto bg-white rounded-lg ">
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Subject Name</label>
              <input
                type="text"
                value={subjectToEdit.name}
                onChange={(e) =>
                  setSubjectToEdit({ ...subjectToEdit, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Tagline</label>
              <input
                type="text"
                value={subjectToEdit.tagline}
                onChange={(e) =>
                  setSubjectToEdit({
                    ...subjectToEdit,
                    tagline: e.target.value,
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

export default SubjectsPage;
