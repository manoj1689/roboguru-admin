"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { createSubject } from "../../../redux/slices/subjectSlice";
import { fetchClasses } from "@/redux/slices/classSlice";
import Layout from "../../../components/Layout";
import { RootState, AppDispatch } from "../../../redux/store";
import SubjectForm from "../../../components/forms/SubjectForm";
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

interface createSubProps{
  open: boolean;
  onClose:()=>void;
  
}
const CreateSubjectPage:React.FC<createSubProps> = ({open, onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const class_id = searchParams?.get("class_id") ?? ""; // Ensures it's always a string


  const [subject, setSubject] = useState({
    name: "",
    tagline: "",
    image_link: "",
    image_prompt: "",
    class_id: class_id, // Now it's always a string
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const classList = useSelector(
    (state: RootState) => state.class.classes || []
  );
  const loading = useSelector((state: RootState) => state.class.loading);
  const error = useSelector((state: RootState) => state.class.error);

  useEffect(() => {
    dispatch(fetchClasses({ limit: 10, name: "" }));
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createSubject(subject)).unwrap();
      router.refresh();
    } catch (error: any) {
      setErrors(error.response?.data?.errors || { general: "An error occurred" });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{ modal: "w-full rounded-3xl p-0" }}>
      <div className="w-full mx-auto bg-white rounded-lg p-6">
        <span className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Subject
        </span>
        <SubjectForm
          subject={subject}
          classList={classList}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateSubjectPage;

