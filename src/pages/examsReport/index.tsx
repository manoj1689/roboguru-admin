// pages/admin/export-reports.tsx

import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { saveAs } from "file-saver";
import { Move } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// For pagination icons (if desired)
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

// 1) Define a type for each row in "Report Preview"
type ReportRow = {
  date: string;
  user: string;
  action: string;
  status: string;
};

const ExportReportsPage: React.FC = () => {
  // 2) Provide some initial data for "Report Preview"
  const [reportData] = useState<ReportRow[]>([
    {
      date: "2025-02-21",
      user: "John Doe",
      action: "Logged In",
      status: "Success",
    },
    {
      date: "2025-02-21",
      user: "Jane Smith",
      action: "Password Reset",
      status: "Pending",
    },
    {
      date: "2025-02-21",
      user: "Alex Johnson",
      action: "Exam Submitted",
      status: "Success",
    },
  ]);

  // 3) Define columns for React Table
  const columns = useMemo<ColumnDef<ReportRow>[]>(
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
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "user",
        header: "User",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue<string>();
          if (value === "Success") {
            return <span className="text-green-500">{value}</span>;
          }
          if (value === "Pending") {
            return <span className="text-yellow-500">{value}</span>;
          }
          return value;
        },
      },
    ],
    []
  );

  // 4) Create the React Table instance with pagination
  const table = useReactTable({
    data: reportData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Items per page initially
      },
    },
  });

  // 5) Export report function (unchanged)
  const exportReport = (format: string) => {
    alert(`Exporting Report as ${format.toUpperCase()}`);
    const data =
      "Sample Report Data\nDate, User, Action\n2025-02-21, John Doe, Logged In";
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `report.${format}`);
  };

  return (
    <Layout>
      <div className="flex flex-col ">
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-file-export mr-2"></i> Export Reports
          </h2>

          {/* Filters & Export Options */}
          <div className="mb-4 flex flex-wrap justify-between gap-3">
            <select className="px-4 py-2 rounded-lg border">
              <option value="all">All Reports</option>
              <option value="user-activity">User Activity</option>
              <option value="transactions">Transactions</option>
              <option value="exam-performance">Exam Performance</option>
            </select>
            <input type="date" className="px-4 py-2 rounded-lg border" />
            <input type="date" className="px-4 py-2 rounded-lg border" />
            <button
              onClick={() => exportReport("csv")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-file-csv mr-2"></i> Export CSV
            </button>
            <button
              onClick={() => exportReport("pdf")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <i className="fas fa-file-pdf mr-2"></i> Export PDF
            </button>
            <button
              onClick={() => exportReport("xlsx")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <i className="fas fa-file-excel mr-2"></i> Export Excel
            </button>
          </div>

          {/* Report Preview (now uses React Table) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-table mr-2"></i> Report Preview
            </h3>
            <table className="min-w-full border-collapse text-left">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 text-left">
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
                      <td key={cell.id} className="p-3 text-left">
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

          {/* Pagination Controls (TanStack Table) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
            {/* Items per page dropdown */}
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="mr-2">Items per page</span>
              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Page navigation */}
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

          {/* System Logs */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-shield-alt mr-2"></i> Security Log
            </h3>
            <ul>
              <li className="border-b p-3">
                <i className="fas fa-lock text-yellow-500 mr-2"></i>{" "}
                Unauthorized access attempt detected.
              </li>
              <li className="border-b p-3">
                <i className="fas fa-key text-red-500 mr-2"></i> System
                generated new API key.
              </li>
              <li className="p-3">
                <i className="fas fa-user-shield text-blue-500 mr-2"></i> Admin
                account privileges updated.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ExportReportsPage;
