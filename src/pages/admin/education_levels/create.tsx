"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createEducationLevel } from "../../../redux/slices/educationlevelSlice"; // Update to correct action
import Layout from "../../../components/Layout";
import { AppDispatch } from "../../../redux/store"; // Import AppDispatch
import EducationLevelForm from "../../../components/forms/EducationLevelForm"; // Import EducationLevelForm
import {Modal} from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

interface createEduProps{
  open: boolean;
  onClose:()=>void;
  
}

const CreateEducationLevelPage:React.FC<createEduProps> = ({open, onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // State to manage form inputs
  const [educationLevel, setEducationLevel] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducationLevel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    try {
      await dispatch(createEducationLevel(educationLevel)).unwrap(); // Unwrap to handle promise
      router.refresh(); // Redirect to education levels page
    } catch (error) {
      if (error instanceof Error) {
        console.log("error in handle submit")
        setErrors({ message: error.message });
      } else {
        setErrors({ message: "An unknown error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{ modal: "w-full rounded-3xl p-0" }}>
      <div className="w-full mx-auto bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 ">
          Add Education Level
        </h1>
        <EducationLevelForm
          educationLevel={educationLevel}
          errors={errors}
          loading={loading}
          onChange={handleChange} // Handles input changes
          onSubmit={handleSubmit} // Handles form submission
        />
      </div>
    </Modal>
  );
};

export default CreateEducationLevelPage;
