"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/slices/userSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import UserForm from "../../components/forms/UserForm";
import Layout from "../login";
import { AppDispatch } from "../../redux/store"; // Import the correct type for dispatch

const CreateUserPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(user))
      .unwrap()
      .then(() => {
        router.push("/users");
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
          Create User
        </span>
        <UserForm
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateUserPage;
