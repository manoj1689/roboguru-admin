"use client"; // Ensure the component is treated as a client component

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Using next/navigation hook
import { useSearchParams } from "next/navigation"; // To access query params
import { createTopic } from "../../../redux/slices/topicSlice"; // Assuming you have a topicSlice
import Layout from "../../../components/Layout";
import { RootState, AppDispatch } from "../../../redux/store";
import TopicForm from "../../../components/forms/TopicForm"; // Adjust the path to your TopicForm component
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

interface createTopProps{
  open: boolean;
  onClose:()=>void;
  
}
const CreateTopicPage:React.FC<createTopProps> = ({open, onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // Using useSearchParams hook to get query parameters
  const searchParams = useSearchParams();
  const chapter_id = searchParams?.get("chapter_id") ?? "";


  // State for the form fields
  const [topic, setTopic] = useState({
    name: "",
    tagline: "",
    image_link: "",
    details: "",
    chapter_id: chapter_id,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Select chapter data from Redux store
  const chapterList = useSelector(
    (state: RootState) => state.chapter.chapters || null
  );
  const loading = useSelector((state: RootState) => state.chapter.loading);
  const error = useSelector((state: RootState) => state.chapter.error);

 
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
    setTopic({ ...topic, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTopic(topic))
      .unwrap()
      .then(() => {
        router.refresh(); // Navigate to topics list after creation
      })
      .catch((error) => {
        const parsedErrors = error.response?.data?.errors || {
          general: "An error occurred",
        };
        setErrors(parsedErrors);
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{ modal: "w-full rounded-3xl p-0" }}>
      <div className="w-full mx-auto bg-white rounded-lg p-6">
        <span className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Topic
        </span>
        <TopicForm
          topic={topic}
          chapterList={chapterList} // Pass the chapters to the form if needed
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateTopicPage;
