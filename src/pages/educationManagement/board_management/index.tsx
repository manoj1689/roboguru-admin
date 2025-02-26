"use client";
import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Move,
  Edit,
  File,
  Trash,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

/** Board data shape */
type Board = {
  uuid: string;
  name: string;
  country: string;
  boardCode: string;
  type: string;
  recognizedBy: string;
  gradingSystem: string;
};

/** Default data */
const defaultBoards: Board[] = [
  {
    uuid: "1024-IND",
    name: "CBSC",
    country: "India",
    boardCode: "CBSC",
    type: "National",
    recognizedBy: "Ministry of Education",
    gradingSystem: "CGPA, Percentage",
  },
  {
    uuid: "2048-USA",
    name: "ASQ",
    country: "USA",
    boardCode: "ASQ",
    type: "International",
    recognizedBy: "Govt of USA",
    gradingSystem: "Percentage",
  },
  {
    uuid: "5472-UK",
    name: "AQA",
    country: "UAE",
    boardCode: "AQA",
    type: "International",
    recognizedBy: "Govt. of UAE",
    gradingSystem: "Percentage",
  },
  {
    uuid: "4752-EUP",
    name: "EWS",
    country: "Europe",
    boardCode: "EWS",
    type: "International",
    recognizedBy: "Govt. of EWS",
    gradingSystem: "Percentage",
  },
];

export default function BoardManagement() {
  // Use the default boards here
  const [data, setData] = useState<Board[]>(defaultBoards);

  // Columns
  const columns = useMemo<ColumnDef<Board>[]>(
    () => [
      {
        id: "drag-handle",
        header: "",
        cell: () => <Move size={16} />,
      },
      {
        accessorKey: "uuid",
        header: "ID (UUID)",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "boardCode",
        header: "Board Code",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "recognizedBy",
        header: "Recognized By",
      },
      {
        accessorKey: "gradingSystem",
        header: "Grading System",
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <>
              <button className="text-blue-600 hover:text-blue-800 mr-2">
                <Edit size={16} />
              </button>
              <button className="text-gray-600 hover:text-gray-800 mr-2">
                <File size={16} />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash size={16} />
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  // Reorder rows
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...data];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setData(items);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Board Management</h1>

      <div className="mb-4">
        <button className="text-blue-600 font-medium flex items-center">
          + Add New Board
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="overflow-x-auto border rounded"
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-2 border-b">
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
                  {table.getRowModel().rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(dragProvided) => (
                        <tr
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className="border-b hover:bg-gray-50"
                        >
                          {row.getVisibleCells().map((cell) => {
                            if (cell.column.id === "drag-handle") {
                              return (
                                <td
                                  key={cell.id}
                                  {...dragProvided.dragHandleProps}
                                  style={{ cursor: "move" }}
                                  className="px-4 py-2"
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              );
                            }
                            return (
                              <td key={cell.id} className="px-4 py-2">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span>Items per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[4, 5, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center">
            Page
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="mx-1 w-12 border text-center rounded"
            />
            of {table.getPageCount()}
          </div>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </Layout>
  );
}
