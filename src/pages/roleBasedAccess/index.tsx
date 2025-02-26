// pages/admin/rbac.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import Chart from "chart.js/auto";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Edit, Trash, Move, File } from "lucide-react";

type Role = {
  name: string;
  users: number;
  permissions: string[];
};

const initialRoles: Role[] = [
  {
    name: "Admin",
    users: 10,
    permissions: ["Manage Users", "Edit Content", "View Reports"],
  },
  {
    name: "Editor",
    users: 20,
    permissions: ["Edit Content", "Publish Articles"],
  },
  {
    name: "User",
    users: 40,
    permissions: ["View Content", "Comment"],
  },
  {
    name: "Guest",
    users: 30,
    permissions: ["View Public Content"],
  },
];

const RBACPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Define table columns using TanStack React Table
  const columns = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const role = row.original;
          return (
            <button
              onClick={() => handleEdit(role)}
              className="mr-2 text-gray-600 hover:text-gray-900"
            >
              <Move size={16} />
            </button>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Role",
      },
      {
        accessorKey: "users",
        header: "Users",
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
        cell: (info) => (info.getValue() as string[]).join(", "),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(role)}
                className="mr-2 text-blue-600 hover:text-blue-900"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleEdit(role)}
                className="mr-2 text-green-600 hover:text-green-900"
              >
                <File size={16} />
              </button>
              <button
                onClick={() => handleDelete(role.name)}
                className="text-red-600 hover:text-red-900"
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

  // Initialize the table
  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Chart.js: Role Distribution Chart
  const roleChartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (roleChartRef.current) {
      new Chart(roleChartRef.current, {
        type: "pie",
        data: {
          labels: ["Admin", "Editor", "User", "Guest"],
          datasets: [
            {
              label: "Role Distribution",
              data: [10, 20, 40, 30],
              backgroundColor: ["#4caf50", "#2196F3", "#FFC107", "#FF5722"],
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
  const handleEdit = (role: Role) => {
    setEditRole(role);
    setIsEditModalOpen(true);
  };

  // Save Edited Role
  const handleSaveEdit = () => {
    if (editRole) {
      setRoles((prev) =>
        prev.map((role) => (role.name === editRole.name ? editRole : role))
      );
      setIsEditModalOpen(false);
      setEditRole(null);
    }
  };

  // Handle Delete Click
  const handleDelete = (roleName: string) => {
    if (confirm(`Are you sure you want to delete the ${roleName} role?`)) {
      setRoles((prev) => prev.filter((role) => role.name !== roleName));
    }
  };

  // Export roles data as CSV
  const exportRolesData = () => {
    let csvContent = "Role,Users,Permissions\n";
    roles.forEach((role) => {
      csvContent += `${role.name},${role.users},${role.permissions.join(
        "; "
      )}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "roles-data.csv";
    link.click();
  };

  return (
    <Layout>
      <div>
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-white">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-user-shield mr-2"></i> Role-Based Access
            Control (RBAC)
          </h2>
          {/* Bulk Actions */}
          <div className="mb-4 flex gap-3">
            <button
              onClick={exportRolesData}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <i className="fas fa-file-export mr-2"></i> Export Roles Data
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <i className="fas fa-plus-circle mr-2"></i> Add New Role
            </button>
          </div>
          {/* Role Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-users-cog mr-2"></i> Manage Roles
            </h3>
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

          {/* Edit Modal */}
          {isEditModalOpen && editRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Role</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={editRole.name}
                      onChange={(e) =>
                        setEditRole({ ...editRole, name: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Permissions
                    </label>
                    <input
                      type="text"
                      value={editRole.permissions.join(", ")}
                      onChange={(e) =>
                        setEditRole({
                          ...editRole,
                          permissions: e.target.value
                            .split(",")
                            .map((p) => p.trim()),
                        })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-chart-pie mr-2"></i> Role Distribution
              </h3>
              <div className="w-full h-64">
                <canvas ref={roleChartRef} id="roleChart"></canvas>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-lock mr-2"></i> Permission Overview
              </h3>
              <ul>
                <li className="border-b p-3">
                  <i className="fas fa-cogs text-blue-500 mr-2"></i> Admins can
                  manage everything
                </li>
                <li className="border-b p-3">
                  <i className="fas fa-edit text-green-500 mr-2"></i> Editors
                  can modify content but not users
                </li>
                <li className="border-b p-3">
                  <i className="fas fa-eye text-yellow-500 mr-2"></i> Users can
                  view and interact with content
                </li>
                <li className="p-3">
                  <i className="fas fa-user-secret text-red-500 mr-2"></i>{" "}
                  Guests have limited access
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default RBACPage;
