// pages/admin/audit-trail.tsx
import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Move } from "lucide-react";
// 1) Import TanStack Table for pagination
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
// 2) Import Lucide icons (or your preferred icon set) for pagination
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

// Define a type for each log entry
type AuditLog = {
  user: string;
  actionIcon: string; // e.g. "fas fa-sign-in-alt text-blue-500"
  actionLabel: string; // e.g. "Logged in"
  ip: string;
  dateTime: string; // e.g. "Feb 21, 2025 14:32"
  status: string; // e.g. "Success" or "Failed"
};

const AuditTrailPage: React.FC = () => {
  // Function to export audit logs (placeholder)
  const exportAuditLogs = (format: string) => {
    alert(`Exporting Audit Logs as ${format.toUpperCase()}`);
  };

  // 3) Convert your static table rows into a stateful array for TanStack Table
  const [logs] = useState<AuditLog[]>([
    {
      user: "John Doe",
      actionIcon: "fas fa-sign-in-alt text-blue-500",
      actionLabel: "Logged in",
      ip: "192.168.1.1",
      dateTime: "Feb 21, 2025 14:32",
      status: "Success",
    },
    {
      user: "Jane Smith",
      actionIcon: "fas fa-user-lock text-red-500",
      actionLabel: "Failed Login Attempt",
      ip: "172.16.0.2",
      dateTime: "Feb 21, 2025 13:45",
      status: "Failed",
    },
    {
      user: "Admin",
      actionIcon: "fas fa-user-edit text-yellow-500",
      actionLabel: "Updated User Role",
      ip: "10.0.0.3",
      dateTime: "Feb 20, 2025 10:15",
      status: "Success",
    },
  ]);

  // 4) Define columns for your table
  const columns = useMemo<ColumnDef<AuditLog>[]>(
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
        accessorKey: "user",
        header: "User",
      },
      {
        // Combine icon + label for the 'Action' column
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          const original = row.original;
          return (
            <span>
              <i className={original.actionIcon}></i> {original.actionLabel}
            </span>
          );
        },
      },
      {
        accessorKey: "ip",
        header: "IP Address",
      },
      {
        accessorKey: "dateTime",
        header: "Date & Time",
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const color =
            status === "Success" ? "text-green-500" : "text-red-500";
          return <span className={color}>{status}</span>;
        },
      },
    ],
    []
  );

  // 5) Create table instance with pagination
  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // default items per page
      },
    },
  });

  return (
    <Layout>
      <div className="flex flex-col p-6">
        <main className="flex-1">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-history mr-2"></i> Audit Trail
          </h2>

          {/* Filters & Export */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search logs..."
              className="px-4 py-2 w-2/3 rounded-lg border"
            />
            <button
              onClick={() => exportAuditLogs("csv")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-file-csv mr-2"></i> Export CSV
            </button>
            <button
              onClick={() => exportAuditLogs("pdf")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <i className="fas fa-file-pdf mr-2"></i> Export PDF
            </button>
          </div>

          {/* Security Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <i className="fas fa-user-shield fa-2x text-red-500"></i>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Failed Logins</h3>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <i className="fas fa-key fa-2x text-yellow-500"></i>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Password Changes</h3>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <i className="fas fa-database fa-2x text-green-500"></i>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">System Updates</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>

          {/* Logs Table (with pagination) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-list mr-2"></i> Audit Logs
            </h3>
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b text-left">
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

            {/* Pagination Controls */}
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
                  {[5, 10, 20, 30].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
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
          </div>

          {/* Security Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-bell mr-2"></i> Security Notifications
            </h3>
            <ul>
              <li className="border-b p-3">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>3
                failed login attempts detected.
              </li>
              <li className="border-b p-3">
                <i className="fas fa-shield-alt text-yellow-500 mr-2"></i>
                System update scheduled for March 1.
              </li>
              <li className="p-3">
                <i className="fas fa-user-check text-blue-500 mr-2"></i>
                2FA enabled for all admins.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AuditTrailPage;
