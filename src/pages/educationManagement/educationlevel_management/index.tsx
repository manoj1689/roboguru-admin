"use client";
import React, { useMemo } from "react";
import Layout from "@/components/Layout";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Move, Edit, File, Trash } from "lucide-react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type EducationLevel = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  order: number;
};

const data: EducationLevel[] = [
  {
    id: "1024-IND",
    name: "Primary",
    shortName: "PRE",
    description: "Basic Education",
    order: 1,
  },
  {
    id: "2048-USA",
    name: "Secondary",
    shortName: "SCE",
    description: "Middle school",
    order: 2,
  },
  {
    id: "5472-UK",
    name: "Higher Secondary",
    shortName: "HSC",
    description: "Pre-University",
    order: 3,
  },
  {
    id: "4752-EUP",
    name: "Undergraduate",
    shortName: "UG",
    description: "Bachelor's degree",
    order: 4,
  },
];

const Index = () => {
  // Define columns
  const columns = useMemo<ColumnDef<EducationLevel>[]>(
    () => [
      {
        id: "file", // Add an id for this column
        accessorKey: "",
        header: "",
        cell: () => (
          <>
            <button className="text-gray-600 hover:text-red-900">
              {" "}
              <Move size={16} />{" "}
            </button>
          </>
        ),
      },
      {
        id: "id",
        accessorKey: "id",
        header: "ID (IUID)",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "shortName",
        accessorKey: "shortName",
        header: "Short Name",
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
      },
      {
        id: "order",
        accessorKey: "order",
        header: "Order",
      },
      {
        id: "actions",
        header: "Action",
        cell: () => (
          <>
            <button className="mr-2 text-blue-600 hover:text-blue-900">
              <Edit size={16} />
            </button>

            <button className="mr-2 text-green-600 hover:text-green-900">
              <File size={16} />
            </button>

            <button className="text-red-600 hover:text-red-900">
              {" "}
              <Trash size={16} />{" "}
            </button>
          </>
        ),
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data,
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
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Education Level Management</h1>

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b text-left bg-gray-200"
                >
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3">
                      {flexRender(
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
                <tr key={row.id} className="border-b hover:bg-gray-100">
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
      </div>
    </Layout>
  );
};

export default Index;
