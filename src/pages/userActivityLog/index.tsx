import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Chart from "chart.js/auto";
import {
  Eye,
  UserX,
  CheckCircle,
  FileText,
  Edit,
  Trash,
  File,
  Move,
} from "lucide-react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const initialActivities = [
  { id: 1, user: "John Doe", action: "Logged in", date: "Feb 21, 2025" },
  {
    id: 2,
    user: "Jane Smith",
    action: "Completed an Exam",
    date: "Feb 20, 2025",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Updated Profile",
    date: "Feb 19, 2025",
  },
  {
    id: 4,
    user: "Emily White",
    action: "Sent a Message",
    date: "Feb 18, 2025",
  },
  {
    id: 5,
    user: "Robert Black",
    action: "Changed Password",
    date: "Feb 17, 2025",
  },
];

const UserActivityDashboard = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialActivities);
  const [editActivity, setEditActivity] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "User Activity",
              data: [20, 35, 50, 45, 60, 75, 80],
              backgroundColor: "#4caf50",
            },
          ],
        },
      });
    }
  }, []);

  useEffect(() => {
    let data = initialActivities;
    if (search) {
      data = data.filter((activity) =>
        activity.user.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(data);
  }, [search]);

  const handleEdit = (activity) => {
    setEditActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editActivity) {
      setActivities(
        activities.map((a) => (a.id === editActivity.id ? editActivity : a))
      );
      setIsEditModalOpen(false);
      setEditActivity(null);
    }
  };

  const handleDelete = (activityId) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter((a) => a.id !== activityId));
    }
  };

  const columns = useMemo<ColumnDef<(typeof activities)[0]>[]>(
    () => [
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          return (
            <button className="text-gray-600 hover:text-gray-900">
              <Move size={16} />
            </button>
          );
        },
      },
      { accessorKey: "user", header: "User" },
      { accessorKey: "action", header: "Action" },
      { accessorKey: "date", header: "Date" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const activity = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(activity)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleEdit(activity)}
                className="text-green-600 hover:text-green-900"
              >
                <File size={16} />
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
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
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FileText className="mr-2" /> User Activity Logs
        </h2>
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">
            Export Logs
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Apply Filters
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 mb-4 w-1/3 rounded-lg border"
        />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b text-left bg-gray-200"
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
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
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

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Weekly User Activity</h3>
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Real-Time Activity Feed
            </h3>
            <ul>
              <li className="border-b p-3">John Doe logged in.</li>
              <li className="border-b p-3">Jane Smith completed an exam.</li>
              <li className="p-3">Mike Johnson sent a message.</li>
            </ul>
          </div>
        </div>

        {isEditModalOpen && editActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Activity</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User
                  </label>
                  <input
                    type="text"
                    value={editActivity.user}
                    onChange={(e) =>
                      setEditActivity({ ...editActivity, user: e.target.value })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Action
                  </label>
                  <input
                    type="text"
                    value={editActivity.action}
                    onChange={(e) =>
                      setEditActivity({
                        ...editActivity,
                        action: e.target.value,
                      })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editActivity.date}
                    onChange={(e) =>
                      setEditActivity({ ...editActivity, date: e.target.value })
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
      </div>
    </Layout>
  );
};

export default UserActivityDashboard;
