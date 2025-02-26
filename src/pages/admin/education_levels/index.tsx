"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import {
  fetchEducationLevels,
  updateEducationLevel,
  deleteEducationLevel,
} from "../../../redux/slices/educationlevelSlice";
import Layout from "../../../components/Layout";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Edit, Trash, Move, File } from "lucide-react";
import CreateEducationLevelPage from "./create";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

type EduUser = {
  id: string;
  name: string;
};

type EducationLevel = {
  id: number;
  name: string;
  description: string;
};

const eduUser: EduUser[] = [
  { id: "E01", name: "John Doe" },
  { id: "E02", name: "Alisha" },
  { id: "E03", name: "Adam" },
  { id: "E04", name: "Alisha" },
  { id: "E05", name: "John Doe" },
  { id: "E06", name: "Alisha" },
  { id: "E07", name: "Adam" },
  { id: "E08", name: "Alisha" },
];

const EducationLevelsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isEduOpen, setisEduOpen] = useState(false);
  const openEdu = () => setisEduOpen(true);
  const closeEdu = () => setisEduOpen(false);

  const [isName, setisName] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEducationLevels({ limit: 10, name: "" }));
  }, [dispatch]);

  const educationLevels = useSelector(
    (state: RootState) => state.educationLevel.educationLevels || []
  );
  const loading = useSelector(
    (state: RootState) => state.educationLevel.loading
  );
  const error = useSelector((state: RootState) => state.educationLevel.error);

  // Define columns for the table
  const columns = useMemo<ColumnDef<EducationLevel>[]>(
    () => [
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            onClick={() => handleOpenModal(info.row.original)}
            className="text-gray-500 hover:underline font-semibold"
          >
            <Move size={16} />
          </button>
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => eduUser[info.row.index]?.id || "N/A",
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => eduUser[info.row.index]?.name || "N/A",
      },
      {
        accessorKey: "educationLevel",
        header: "Education Level",
        cell: (info) => info.row.original.name,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => info.row.original.description,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex  gap-3">
            <button
              onClick={() => handleView(info.row.original)}
              className="mr-2 text-blue-500 hover:cursor-pointer"
            >
              <Edit size={16} />
            </button>

            <button
              onClick={() => handleView(info.row.original)}
              className="mr-2 text-green-500 hover:cursor-pointer"
            >
              <File size={16} />
            </button>
            <button
              onClick={() => handleDelete(info.row.original.id)}
              className="text-red-500 hover:underline"
            >
              <Trash size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data: educationLevels,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleOpenModal = (level: EducationLevel) => {
    setSelectedLevel(level);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLevel(null);
  };

  const handleUpdate = () => {
    if (selectedLevel) {
      dispatch(
        updateEducationLevel({
          levelId: selectedLevel.id,
          educationLevel: {
            name: selectedLevel.name,
            description: selectedLevel.description,
          },
        })
      );
      handleCloseModal();
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this education level?")) {
      dispatch(deleteEducationLevel(id));
    }
  };

  const handleView = (level: EducationLevel) => {
    setSelectedLevel(level);
    setIsViewModalOpen(true);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <div className="flex-1 p-6 ">
        <h1 className="text-3xl font-bold mb-6">Education Levels</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-1/3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Table */}
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
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="mr-2">Items per page</span>
            <select
              className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 dark:bg-gray-700 dark:text-white"
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
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
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
                className="w-16 p-2 rounded-md border border-gray-300 text-center dark:bg-gray-700 dark:text-white"
              />
              <span className="ml-1">of {table.getPageCount()}</span>
            </span>
            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={20} />
            </button>
            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        </div>

        {/* Modals */}
        <CreateEducationLevelPage open={isEduOpen} onClose={closeEdu} />
      </div>
    </Layout>
  );
};

export default EducationLevelsPage;
