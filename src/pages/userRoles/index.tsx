// pages/admin/user-roles.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Chart from "chart.js/auto";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Edit,
  Trash,
  File,
  Move,
} from "lucide-react";

type UserRole = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const initialUserRoles: UserRole[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "Pending",
  },
  {
    name: "Emily White",
    email: "emily@example.com",
    role: "Guest",
    status: "Suspended",
  },
  {
    name: "Robert Black",
    email: "robert@example.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Robert Black",
    email: "robert@example.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Albert Black",
    email: "alber@example.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Harry Potter",
    email: "harry@example.com",
    role: "User",
    status: "Active",
  },
];

const UserRolesPage: React.FC = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>(initialUserRoles);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredUserRoles, setFilteredUserRoles] =
    useState<UserRole[]>(initialUserRoles);
  const [editUser, setEditUser] = useState<UserRole | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Update filtered data whenever search or filters change
  useEffect(() => {
    let data = userRoles;
    if (search) {
      data = data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter !== "all") {
      data = data.filter((user) => user.role.toLowerCase() === roleFilter);
    }
    if (statusFilter !== "all") {
      data = data.filter((user) => user.status.toLowerCase() === statusFilter);
    }
    setFilteredUserRoles(data);
  }, [search, roleFilter, statusFilter, userRoles]);

  // Define table columns using TanStack React Table
  const columns = useMemo<ColumnDef<UserRole>[]>(
    () => [
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <button
              onClick={() => handleEdit(user)}
              className="mr-2 text-gray-600 hover:text-gray-900"
            >
              <Move size={16} />
            </button>
          );
        },
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
        cell: (info) => (
          <span id={`role-${info.row.original.name}`}>
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "Active" ? "text-green-500" : "text-red-500"
            }
          >
            {info.getValue() as string}
          </span>
        ),
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
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Trash size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // Initialize the table with pagination
  const table = useReactTable({
    data: filteredUserRoles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    initialState: {
      pagination: {
        pageSize: 5, // Default page size
      },
    },
  });

  // Initialize Chart.js for role distribution
  const roleDistributionChartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (roleDistributionChartRef.current) {
      new Chart(roleDistributionChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Admin", "Editor", "User", "Guest"],
          datasets: [
            {
              label: "User Role Distribution",
              data: [5, 15, 50, 30], // Example static data; you could compute this from userRoles
              backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, []);

  // Handle Edit Click
  const handleEdit = (user: UserRole) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  // Save Edited User
  const handleSaveEdit = () => {
    if (editUser) {
      setUserRoles((prev) =>
        prev.map((user) => (user.name === editUser.name ? editUser : user))
      );
      setIsEditModalOpen(false);
      setEditUser(null);
    }
  };

  // Delete user function
  const deleteUser = (userName: string) => {
    if (confirm(`Are you sure you want to remove ${userName}?`)) {
      setUserRoles((prev) => prev.filter((user) => user.name !== userName));
    }
  };

  // Export data as CSV
  const exportData = () => {
    let csvContent = "Name,Email,Role,Status\n";
    userRoles.forEach((user) => {
      csvContent += `${user.name},${user.email},${user.role},${user.status}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user-roles.csv";
    link.click();
  };

  return (
    <Layout>
      <div>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              <i className="fas fa-user-shield mr-2"></i> User Roles &
              Permissions
            </h2>
            <div>
              <button
                onClick={exportData}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <i className="fas fa-file-export mr-2"></i> Export Data
              </button>
            </div>
          </div>

          {/* Role Filters */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search users by name..."
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
              <option value="guest">Guest</option>
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

          {/* User Role Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto mb-6">
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

          {/* Pagination Controls */}
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

          {/* Edit Modal */}
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
                      <option>Guest</option>
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

          {/* Charts & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-chart-pie mr-2"></i> Role Distribution
              </h3>
              <div className="chart-container">
                <canvas
                  ref={roleDistributionChartRef}
                  id="roleDistributionChart"
                ></canvas>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-info-circle mr-2"></i> System Role Insights
              </h3>
              <p>
                <strong>Most Assigned Role:</strong> User
              </p>
              <p>
                <strong>Least Assigned Role:</strong> Guest
              </p>
              <p>
                <strong>Admins:</strong> 5
              </p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default UserRolesPage;
