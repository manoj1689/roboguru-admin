"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserProgress } from "../../../redux/slices/userProgressSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import UserProgressForm from "../../../components/forms/UserProgressForm";
import Layout from "../login";
import { AppDispatch } from "../../../redux/store"; // Import the correct type for dispatch

const CreateUserProgressPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [progress, setProgress] = useState({
    user_id: "",
    chapter_id: "",
    progress: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUserProgress(progress))
      .unwrap()
      .then(() => {
        router.push("/user_progress");
      })
      .catch((error: any) => {
        if (error instanceof Error) {
          setErrors({ form: error.message });
        } else {
          setErrors({ form: "An unknown error occurred." });
        }
      });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <span className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create User Progress
        </span>
        <UserProgressForm
          progress={progress}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateUserProgressPage;
