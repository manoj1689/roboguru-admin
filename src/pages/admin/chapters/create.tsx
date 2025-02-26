"use client"; // Ensure the component is treated as a client component

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Using next/navigation hook
import { useSearchParams } from "next/navigation"; // To access query params
import { createChapter } from "../../../redux/slices/chapterSlice"; // Assuming you have a chapterSlice
import { fetchSubjects } from "@/redux/slices/subjectSlice"; // Assuming you have a fetchSubject action
import Layout from "../../../components/Layout";
import { RootState, AppDispatch } from "../../../redux/store";
import ChapterForm from "../../../components/forms/ChapterForm"; // Adjust the path to your ChapterForm component
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

interface createChapProps{
  open: boolean;
  onClose:()=>void;
  
}
const CreateChapterPage:React.FC<createChapProps> = ({open, onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // Using useSearchParams hook to get query parameters
  const searchParams = useSearchParams();
    const subject_id = searchParams?.get("subject_id") ?? ""; // Ensures it's always a string


  // State for the form fields
  const [chapter, setChapter] = useState({
    name: "",
    description: "",
    tagline: "", // Added tagline
    image_link: "", // Added image_link
    subject_id: subject_id,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Select subject data from Redux store
  const subjectList = useSelector(
    (state: RootState) => state.subject.subjects || null
  );
  console.log("subjectList",subjectList)
  const loading = useSelector((state: RootState) => state.subject.loading);
  const error = useSelector((state: RootState) => state.subject.error);

  useEffect(() => {
     dispatch(fetchSubjects({ limit: 10, name: "" }));
   }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChapter({ ...chapter, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createChapter(chapter))
      .unwrap()
      .then(() => {
        router.refresh(); // Navigate to chapters list after creation
      })
      .catch((error) => {
        const parsedErrors = error.response?.data?.errors || {
          general: "An error occurred",
        };
        setErrors(parsedErrors);
      });
  };

  return (
    <Modal open={open}
          onClose={onClose}
          center
          classNames={{ modal: "w-full rounded-3xl p-0" }}>
      <div className="w-full mx-auto bg-white rounded-lg p-6">
        <span className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Chapter
        </span>
       
          <ChapterForm
            chapter={chapter}
            subjectList={subjectList} // Pass the subject to the form if needed
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        
      </div>
    </Modal>
  );
};

export default CreateChapterPage;
