// pages/admin/user-progress.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel, // Add pagination row model
} from "@tanstack/react-table";
import {
  Edit,
  Trash,
  File,
  Move,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type UserProgress = {
  name: string;
  course: string;
  progress: string; // e.g., "85%"
  activity: string;
};

const initialUserProgress: UserProgress[] = [
  {
    name: "John Doe",
    course: "Math",
    progress: "85%",
    activity: "Feb 20, 2025",
  },
  {
    name: "Jane Smith",
    course: "Science",
    progress: "60%",
    activity: "Feb 18, 2025",
  },
  {
    name: "Mike Johnson",
    course: "English",
    progress: "45%",
    activity: "Feb 15, 2025",
  },
  {
    name: "Emily White",
    course: "History",
    progress: "30%",
    activity: "Feb 10, 2025",
  },
  {
    name: "Robert Black",
    course: "Programming",
    progress: "95%",
    activity: "Feb 21, 2025",
  },
  {
    name: "Laura Green",
    course: "Math",
    progress: "70%",
    activity: "Feb 22, 2025",
  },
  {
    name: "David Brown",
    course: "Science",
    progress: "55%",
    activity: "Feb 23, 2025",
  },
  {
    name: "Olivia Blue",
    course: "English",
    progress: "40%",
    activity: "Feb 24, 2025",
  },
  {
    name: "Chris Red",
    course: "History",
    progress: "25%",
    activity: "Feb 25, 2025",
  },
  {
    name: "Sophia Yellow",
    course: "Programming",
    progress: "90%",
    activity: "Feb 26, 2025",
  },
];

const UserProgressPage: React.FC = () => {
  const [userProgressData, setUserProgressData] =
    useState<UserProgress[]>(initialUserProgress);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [editData, setEditData] = useState<UserProgress | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [newUserProgress, setNewUserProgress] = useState({
    name: "",
    course: "",
    progress: "",
    activity: "",
  });

  // Chart.js references
  const progressChartRef = useRef<HTMLCanvasElement>(null);
  const courseCompletionChartRef = useRef<HTMLCanvasElement>(null);

  // Initialize charts on mount
  useEffect(() => {
    if (progressChartRef.current) {
      new Chart(progressChartRef.current, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Avg Completion Rate (%)",
              data: [50, 65, 75, 90],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: { responsive: true },
      });
    }
    if (courseCompletionChartRef.current) {
      new Chart(courseCompletionChartRef.current, {
        type: "bar",
        data: {
          labels: ["Math", "Science", "English", "History", "Programming"],
          datasets: [
            {
              label: "Completion %",
              data: [80, 60, 75, 50, 95],
              backgroundColor: [
                "#4caf50",
                "#ff9800",
                "#f44336",
                "#2196f3",
                "#9c27b0",
              ],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }, []);

  // Define columns for TanStack React Table
  const columns = useMemo<ColumnDef<UserProgress>[]>(
    () => [
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <button className="mr-2 text-Gray-600 hover:text-Gray-900">
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
        accessorKey: "course",
        header: "Course",
      },
      {
        accessorKey: "progress",
        header: "Progress",
        cell: (info) => {
          const progressValue = parseInt(info.getValue() as string, 10);
          return (
            <div className="flex items-center">
              <progress
                value={progressValue}
                max="100"
                className="w-20 mr-2"
              ></progress>
              <span>{info.getValue()}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "activity",
        header: "Last Activity",
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
                onClick={() => handleDelete(user)}
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

  const filteredData = useMemo(() => {
    if (!searchQuery) return userProgressData;
    const lowerSearch = searchQuery.toLowerCase();
    return userProgressData.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.course.toLowerCase().includes(lowerSearch) ||
        user.progress.toLowerCase().includes(lowerSearch) ||
        user.activity.toLowerCase().includes(lowerSearch)
    );
  }, [searchQuery, userProgressData]);

  // Table instance with pagination
  const table = useReactTable({
    data: filteredData, // Use filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Default page size
      },
    },
  });

  // Edit and Delete Handlers
  const handleEdit = (user: UserProgress) => {
    setEditData(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: UserProgress) => {
    const updatedData = userProgressData.filter(
      (item) => item.name !== user.name
    );
    setUserProgressData(updatedData);
  };

  const handleSaveEdit = () => {
    if (editData) {
      const updatedData = userProgressData.map((item) =>
        item.name === editData.name ? editData : item
      );
      setUserProgressData(updatedData);
      setIsEditModalOpen(false);
    }
  };

  const handleInsert = () => {
    const newUserProgressWithId = { ...newUserProgress };
    setUserProgressData([...userProgressData, newUserProgressWithId]);
    setIsInsertModalOpen(false);
    setNewUserProgress({ name: "", course: "", progress: "", activity: "" });
  };

  // Export data as CSV using file-saver
  const exportData = () => {
    let csvContent = "Name,Course,Progress,Last Activity\n";
    userProgressData.forEach((user) => {
      csvContent += `${user.name},${user.course},${user.progress},${user.activity}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "user-progress.csv");
  };

  return (
    <>
      <Layout>
        <div className="flex h-screen">
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                <i className="fas fa-chart-line mr-2"></i>
              </h2>

              <div>
                <button
                  onClick={() => setIsInsertModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                >
                  <Plus size={16} className="inline-block mr-2" />
                  Add User Progress
                </button>
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  <i className="fas fa-file-export mr-2"></i> Export Data
                </button>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-4 justify-between">
              <input
                type="text"
                placeholder="🔍 Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-1/3 rounded-lg border dark:bg-gray-700 dark:text-white"
              />
            </div>
            {/* User Progress Table using TanStack React Table */}
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

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  <i className="fas fa-chart-line mr-2"></i> Average User
                  Progress
                </h3>
                <canvas ref={progressChartRef} id="progressChart"></canvas>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  <i className="fas fa-chart-bar mr-2"></i> Course Completion
                  Rates
                </h3>
                <canvas
                  ref={courseCompletionChartRef}
                  id="courseCompletionChart"
                ></canvas>
              </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editData && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Edit User Progress</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Course
                      </label>
                      <input
                        type="text"
                        value={editData.course}
                        onChange={(e) =>
                          setEditData({ ...editData, course: e.target.value })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Progress
                      </label>
                      <input
                        type="text"
                        value={editData.progress}
                        onChange={(e) =>
                          setEditData({ ...editData, progress: e.target.value })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Activity
                      </label>
                      <input
                        type="text"
                        value={editData.activity}
                        onChange={(e) =>
                          setEditData({ ...editData, activity: e.target.value })
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

            {/* Insert Modal */}
            {isInsertModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">
                    Add New User Progress
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newUserProgress.name}
                        onChange={(e) =>
                          setNewUserProgress({
                            ...newUserProgress,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Course
                      </label>
                      <input
                        type="text"
                        value={newUserProgress.course}
                        onChange={(e) =>
                          setNewUserProgress({
                            ...newUserProgress,
                            course: e.target.value,
                          })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Progress
                      </label>
                      <input
                        type="text"
                        value={newUserProgress.progress}
                        onChange={(e) =>
                          setNewUserProgress({
                            ...newUserProgress,
                            progress: e.target.value,
                          })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Activity
                      </label>
                      <input
                        type="text"
                        value={newUserProgress.activity}
                        onChange={(e) =>
                          setNewUserProgress({
                            ...newUserProgress,
                            activity: e.target.value,
                          })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div></div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => setIsInsertModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInsert}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </Layout>
    </>
  );
};

export default UserProgressPage;
