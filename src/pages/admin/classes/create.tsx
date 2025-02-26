"use client"; // Ensure the component is treated as a client component

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";  // Using next/navigation hook
import { useSearchParams } from "next/navigation"; // To access query params
import { createClass } from "../../../redux/slices/classSlice";
import { fetchEducationLevels } from "../../../redux/slices/educationlevelSlice"; 
import Layout from "../../../components/Layout";
import { RootState, AppDispatch } from "../../../redux/store"; 
import ClassForm from "../../../components/forms/ClassForm"; 
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

interface createClsProps{
  open: boolean;
  onClose:()=>void;
  
}
const CreateClassPage:React.FC<createClsProps> = ({open, onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // Using useSearchParams hook to get query parameters
  const searchParams = useSearchParams();
  const level_id = searchParams ? searchParams.get("level_id") : null;


  // State for the form fields
  const [cls, setCls] = useState({
    name: "",
    tagline: "",
    image_link: "",
    level_id: level_id || null, 
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Select education levels from the Redux store
  const educationLevels = useSelector(
    (state: RootState) => state.educationLevel.educationLevels || []
  );
  const loading = useSelector((state: RootState) => state.educationLevel.loading);
  const error = useSelector((state: RootState) => state.educationLevel.error);

  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
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
    setCls({ ...cls, [name]: name === "level_id" ? parseInt(value, 10) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createClass(cls))
      .unwrap()
      .then(() => {
        router.refresh();
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
          Add Class
        </span>
        <ClassForm
          cls={cls}
          educationLevels={educationLevels}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateClassPage;
