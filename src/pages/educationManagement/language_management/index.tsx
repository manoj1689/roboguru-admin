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
import { Edit, Trash, File, Move } from "lucide-react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type Language = {
  id: string;
  board: string;
  languageCode: string;
  languageName: string;
  nativeName: string;
  script: string;
};

const data: Language[] = [
  {
    id: "1024-IND",
    board: "CBSC",
    languageCode: "ENG-HIN",
    languageName: "English-Hindi",
    nativeName: "English-Hindi",
    script: "Devanagari",
  },
  {
    id: "2048-USA",
    board: "ASQ",
    languageCode: "ENG",
    languageName: "English",
    nativeName: "English",
    script: "Latin",
  },
  {
    id: "5472-UK",
    board: "AQA",
    languageCode: "ARB",
    languageName: "Arabic",
    nativeName: "Arabic",
    script: "Latin",
  },
  {
    id: "4752-EUP",
    board: "EWS",
    languageCode: "EU",
    languageName: "English",
    nativeName: "English",
    script: "Latin",
  },
];

const Index = () => {
  // Define columns
  const columns = useMemo<ColumnDef<Language>[]>(
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
        accessorKey: "id",
        header: "ID (UUID)",
      },
      {
        accessorKey: "board",
        header: "Board",
      },
      {
        accessorKey: "languageCode",
        header: "Language Code",
      },
      {
        accessorKey: "languageName",
        header: "Language Name",
      },
      {
        accessorKey: "nativeName",
        header: "Native Name",
      },
      {
        accessorKey: "script",
        header: "Script",
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
        <h1 className="text-3xl font-bold mb-6">Language Management</h1>

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
