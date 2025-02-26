import { AppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Layout from "../../components/Layout";
import React, { useEffect } from "react";

const UsersPage: React.FC = () => {
  // Use AppDispatch to type the dispatch function correctly
  const dispatch: AppDispatch = useDispatch();

  const users = useSelector((state: any) => state.user.users || []);
  const loading = useSelector((state: any) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <span className="text-2xl font-bold mb-4">Users</span>
      <Link href="/users/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New User
        </span>
      </Link>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id}>
              {user.username} - {user.email} -{" "}
              <Link href={`/users/${user.id}`} passHref>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Edit
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default UsersPage;
