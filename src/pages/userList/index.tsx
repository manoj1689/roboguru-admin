// pages/admin/users-list.tsx
import React, { useMemo, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getPaginationRowModel } from "@tanstack/react-table";
import Head from "next/head";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Edit,
  Trash,
  File,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  sub: string;
  login: string;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    sub: "Premium",
    login: "Feb 20, 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Active",
    sub: "Free",
    login: "Feb 18, 2025",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    role: "User",
    status: "Pending",
    sub: "Basic",
    login: "Feb 15, 2025",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    role: "User",
    status: "Suspended",
    sub: "Premium",
    login: "Feb 10, 2025",
  },
  {
    id: 5,
    name: "Robert Black",
    email: "robert.black@example.com",
    role: "Admin",
    status: "Active",
    sub: "Enterprise",
    login: "Feb 21, 2025",
  },
  {
    id: 6,
    name: "Laura Green",
    email: "laura.green@example.com",
    role: "User",
    status: "Active",
    sub: "Standard",
    login: "Feb 12, 2025",
  },
  {
    id: 7,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "User",
    status: "Active",
    sub: "Basic",
    login: "Feb 17, 2025",
  },
  {
    id: 8,
    name: "Olivia Blue",
    email: "olivia.blue@example.com",
    role: "Editor",
    status: "Active",
    sub: "Premium",
    login: "Feb 14, 2025",
  },
  {
    id: 9,
    name: "Chris Red",
    email: "chris.red@example.com",
    role: "User",
    status: "Suspended",
    sub: "Free",
    login: "Feb 11, 2025",
  },
  {
    id: 10,
    name: "Sophia Yellow",
    email: "sophia.yellow@example.com",
    role: "Admin",
    status: "Pending",
    sub: "Enterprise",
    login: "Feb 13, 2025",
  },
];
const UsersList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState<User[]>(initialUsers);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    let data = initialUsers;
    if (search) {
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter !== "all") {
      data = data.filter((user) => user.role.toLowerCase() === roleFilter);
    }
    if (statusFilter !== "all") {
      data = data.filter((user) => user.status.toLowerCase() === statusFilter);
    }
    setFilteredData(data);
  }, [search, roleFilter, statusFilter]);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      setIsEditModalOpen(false);
      setEditUser(null);
    }
  };

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "select",
        header: () => <input type="checkbox" />,
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={() => {
              const userId = row.original.id;
              setSelectedRows((prev) =>
                prev.includes(userId)
                  ? prev.filter((id) => id !== userId)
                  : [...prev, userId]
              );
            }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "sub",
        header: "Subscription",
      },
      {
        accessorKey: "login",
        header: "Last Login",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="mr-2 text-blue-600 hover:text-blue-900"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleEdit(user)}
                className="mr-2 text-green-600 hover:text-green-900"
              >
                <File size={16} />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    [selectedRows]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Layout>
      <div className="flex h-screen">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              <i className="fas fa-users mr-2"></i> Users List
            </h2>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <i className="fas fa-envelope mr-2"></i> Email Selected Users
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <i className="fas fa-user-check mr-2"></i> Activate Selected
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <i className="fas fa-user-times mr-2"></i> Suspend Selected
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              <i className="fas fa-file-export mr-2"></i> Export Data
            </button>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 justify-between">
            <input
              type="text"
              placeholder="🔍 Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-1/3 rounded-lg border dark:bg-gray-700 dark:text-white"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b text-left bg-gray-200 dark:bg-gray-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="mr-2">Items per page</span>
              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={20} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="flex items-center">
                <input
                  min={1}
                  max={table.getPageCount()}
                  type="number"
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 p-2 rounded-md border border-gray-300 text-center"
                />
                <span className="ml-1">of {table.getPageCount()}</span>
              </span>
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight size={20} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={20} />
              </button>
            </div>
          </div>

          {isEditModalOpen && editUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) =>
                        setEditUser({ ...editUser, name: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editUser.email}
                      onChange={(e) =>
                        setEditUser({ ...editUser, email: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({ ...editUser, role: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={editUser.status}
                      onChange={(e) =>
                        setEditUser({ ...editUser, status: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subscription
                    </label>
                    <select
                      value={editUser.sub}
                      onChange={(e) =>
                        setEditUser({ ...editUser, sub: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option>Free</option>
                      <option>Basic</option>
                      <option>Premium</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default UsersList;
