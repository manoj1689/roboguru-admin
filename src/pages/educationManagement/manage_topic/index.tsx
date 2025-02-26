"use client";
import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Edit,
  Trash,
  Move,
  File,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

type Topic = {
  id: string;
  name: string;
  chapter: string;
  subject: string;
  class: string;
  order: number;
  trending: boolean;
};

// --------------------- AddTopicForm EXAMPLE ---------------------
/** You mentioned you already have an AddTopicForm, so this is just a quick example. */
const AddTopicForm: React.FC<{
  onClose: () => void;
  onAdd: (topic: Topic) => void;
}> = ({ onClose, onAdd }) => {
  const [newTopic, setNewTopic] = useState<Topic>({
    id: "",
    name: "",
    chapter: "",
    subject: "",
    class: "",
    order: 0,
    trending: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Typically you'd POST to your API
      const response = await axios.post(
        "https://67bbff36ed4861e07b38cf4f.mockapi.io/api/v1/manage-topics",
        newTopic
      );
      onAdd(response.data); // Add new topic to table
      onClose();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Topic</h2>
        <input
          required
          placeholder="Name"
          className="block w-full mb-3 border p-2"
          value={newTopic.name}
          onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
        />
        <input
          placeholder="Chapter"
          className="block w-full mb-3 border p-2"
          value={newTopic.chapter}
          onChange={(e) =>
            setNewTopic({ ...newTopic, chapter: e.target.value })
          }
        />
        <input
          placeholder="Subject"
          className="block w-full mb-3 border p-2"
          value={newTopic.subject}
          onChange={(e) =>
            setNewTopic({ ...newTopic, subject: e.target.value })
          }
        />
        <input
          placeholder="Class"
          className="block w-full mb-3 border p-2"
          value={newTopic.class}
          onChange={(e) => setNewTopic({ ...newTopic, class: e.target.value })}
        />
        <input
          type="number"
          placeholder="Order"
          className="block w-full mb-3 border p-2"
          value={newTopic.order}
          onChange={(e) =>
            setNewTopic({ ...newTopic, order: parseInt(e.target.value) || 0 })
          }
        />
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={newTopic.trending}
            onChange={(e) =>
              setNewTopic({ ...newTopic, trending: e.target.checked })
            }
          />
          <span className="ml-2">Trending</span>
        </label>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 px-3 py-2">
            Cancel
          </button>
          <button type="submit" className="px-3 py-2 bg-blue-600 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// --------------------- EditTopicForm ---------------------
const EditTopicForm: React.FC<{
  topic: Topic;
  onClose: () => void;
  onUpdate: (updated: Topic) => void;
}> = ({ topic, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Topic>(topic);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Example PUT request to update
      const response = await axios.put(
        `https://67bbff36ed4861e07b38cf4f.mockapi.io/api/v1/manage-topics/${formData.id}`,
        formData
      );
      onUpdate(response.data); // Merge changes into the table data
      onClose();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Topic (ID: {topic.id})</h2>
        <input
          required
          placeholder="Name"
          className="block w-full mb-3 border p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          placeholder="Chapter"
          className="block w-full mb-3 border p-2"
          value={formData.chapter}
          onChange={(e) =>
            setFormData({ ...formData, chapter: e.target.value })
          }
        />
        <input
          placeholder="Subject"
          className="block w-full mb-3 border p-2"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
        />
        <input
          placeholder="Class"
          className="block w-full mb-3 border p-2"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        />
        <input
          type="number"
          placeholder="Order"
          className="block w-full mb-3 border p-2"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
          }
        />
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={formData.trending}
            onChange={(e) =>
              setFormData({ ...formData, trending: e.target.checked })
            }
          />
          <span className="ml-2">Trending</span>
        </label>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 px-3 py-2">
            Cancel
          </button>
          <button type="submit" className="px-3 py-2 bg-blue-600 text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

// --------------------- ViewTopicModal ---------------------
const ViewTopicModal: React.FC<{
  topic: Topic;
  onClose: () => void;
}> = ({ topic, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">View Topic (ID: {topic.id})</h2>
        <p className="mb-2">
          <strong>Name:</strong> {topic.name}
        </p>
        <p className="mb-2">
          <strong>Chapter:</strong> {topic.chapter}
        </p>
        <p className="mb-2">
          <strong>Subject:</strong> {topic.subject}
        </p>
        <p className="mb-2">
          <strong>Class:</strong> {topic.class}
        </p>
        <p className="mb-2">
          <strong>Order:</strong> {topic.order}
        </p>
        <p className="mb-2">
          <strong>Trending:</strong> {topic.trending ? "Yes" : "No"}
        </p>

        <div className="flex justify-end">
          <button onClick={onClose} className="px-3 py-2 bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [data, setData] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // Show/hide forms or modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Keep track of which topic is selected for edit or view
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://67bbff36ed4861e07b38cf4f.mockapi.io/api/v1/manage-topics"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Table columns
  const columns = useMemo<ColumnDef<Topic>[]>(
    () => [
      {
        id: "drag-handle",
        header: "",
        cell: () => <Move size={16} />,
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "chapter",
        header: "Chapter",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "class",
        header: "Class",
      },
      {
        accessorKey: "order",
        header: "Order",
      },
      {
        accessorKey: "trending",
        header: "Trending",
        cell: (info) => {
          const val = info.getValue<boolean>();
          return (
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                val ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {val ? "Yes" : "No"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <>
            <button
              onClick={() => handleEdit(row.original.id)} // Call handleEdit
              className="mr-2 text-blue-600 hover:text-blue-900"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleView(row.original.id)} // Call handleView
              className="mr-2 text-green-600 hover:text-green-900"
            >
              <File size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash size={16} />
            </button>
          </>
        ),
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
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Drag/Drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setData(items);
  };

  // Add new
  const handleAddTopic = (newTopic: Topic) => {
    setData([...data, newTopic]);
  };

  // Edit
  // Edit button handler
  const handleEdit = (id: string) => {
    console.log("Edit button clicked for ID:", id); // Debugging
    const topicToEdit = data.find((t) => t.id === id);
    if (topicToEdit) {
      setSelectedTopic(topicToEdit);
      setShowEditForm(true); // Show the edit form
      console.log("TopicToEditwORKING");
    }
  };

  // View button handler
  const handleView = (id: string) => {
    console.log("View button clicked for ID:", id); // Debugging
    const topicToView = data.find((t) => t.id === id);
    if (topicToView) {
      setSelectedTopic(topicToView);
      setShowViewModal(true); // Show the view modal
    }
  };

  // Render the Edit and View modals conditionally

  // Delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://67bbff36ed4861e07b38cf4f.mockapi.io/api/v1/manage-topics/${id}`
      );
      setData((prev) => prev.filter((topic) => topic.id !== id));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Topics</h1>

        <button
          onClick={() => setShowAddForm(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Topic
        </button>

        {showAddForm && (
          <AddTopicForm
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddTopic}
          />
        )}

        {showEditForm && selectedTopic && (
          <EditTopicForm
            topic={selectedTopic}
            onClose={() => setShowEditForm(false)}
            onUpdate={handleUpdateTopic}
          />
        )}

        {showViewModal && selectedTopic && (
          <ViewTopicModal
            topic={selectedTopic}
            onClose={() => setShowViewModal(false)}
          />
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="topics">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto mb-6"
              >
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
                    {table.getRowModel().rows.map((row, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={row.original.id}
                        index={index}
                      >
                        {(dragProvided) => (
                          <tr
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {row.getVisibleCells().map((cell) => {
                              if (cell.column.id === "drag-handle") {
                                return (
                                  <td
                                    key={cell.id}
                                    className="p-3 cursor-move"
                                    {...dragProvided.dragHandleProps}
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                );
                              }
                              return (
                                <td key={cell.id} className="p-3">
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

        {/* Pagination controls */}
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
              <ChevronsLeft size={20} />
            </button>
            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
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
      </div>
    </Layout>
  );
};

export default Index;
