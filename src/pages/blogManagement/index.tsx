"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Edit, Trash, File, Move } from "lucide-react";

import Chart from "chart.js/auto";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type Blog = {
  title: string;
  author: string;
  category: string;
  views: number;
  status: "Published" | "Draft";
};

const initialBlogs: Blog[] = [
  {
    title: "AI in Education",
    author: "John Doe",
    category: "Technology",
    views: 1200,
    status: "Published",
  },
  {
    title: "Quantum Computing Basics",
    author: "Jane Smith",
    category: "Science",
    views: 950,
    status: "Draft",
  },
  {
    title: "Blockchain Revolution",
    author: "Mike Johnson",
    category: "Finance",
    views: 780,
    status: "Published",
  },
  {
    title: "Cloud Computing Trends",
    author: "Emily White",
    category: "Technology",
    views: 1100,
    status: "Published",
  },
  {
    title: "Cybersecurity Essentials",
    author: "Robert Black",
    category: "Technology",
    views: 850,
    status: "Draft",
  },
];

const BlogManagementPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter blogs based on search text and filters
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all"
          ? true
          : blog.category.toLowerCase() === categoryFilter;
      const matchesStatus =
        statusFilter === "all"
          ? true
          : blog.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, search, categoryFilter, statusFilter]);

  // Define table columns using TanStack React Table
  const columns = useMemo<ColumnDef<Blog>[]>(
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
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "views",
        header: "Views",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "Published"
                ? "text-green-500"
                : "text-yellow-500"
            }
          >
            {info.getValue()}
          </span>
        ),
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

  // Create table instance with pagination
  const table = useReactTable({
    data: filteredBlogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Default page size
      },
    },
  });

  // Chart.js: Blog Engagement Analytics Chart
  const blogChartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (blogChartRef.current) {
      new Chart(blogChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "AI in Education",
            "Quantum Computing",
            "Blockchain",
            "Cloud Computing",
            "Cybersecurity",
          ],
          datasets: [
            {
              label: "Views",
              data: [1200, 950, 870, 760, 680],
              backgroundColor: [
                "#4caf50",
                "#2196F3",
                "#FFC107",
                "#FF5722",
                "#9C27B0",
              ],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }, []);

  // Bulk actions and utility functions
  const addBlog = () => {
    alert("Feature to add a new blog is under development.");
  };

  const editBlog = (title: string) => {
    alert(`Editing blog: ${title}`);
  };

  const deleteBlog = (title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      alert(`"${title}" has been deleted.`);
      setBlogs((prev) => prev.filter((blog) => blog.title !== title));
    }
  };

  const exportBlogs = () => {
    const blob = new Blob([JSON.stringify(blogs, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "blog-posts.json";
    link.click();
  };

  return (
    <Layout>
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-white">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-blog mr-2"></i> Blog Management
          </h2>
          {/* Bulk Actions */}
          <div className="mb-4 flex gap-3">
            <button
              onClick={addBlog}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <i className="fas fa-plus-circle mr-2"></i> Add New Blog
            </button>
            <button
              onClick={exportBlogs}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <i className="fas fa-file-export mr-2"></i> Export Blogs
            </button>
          </div>
          {/* Search & Filters */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-1/3 rounded-lg border dark:bg-gray-700 dark:text-white"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="finance">Finance</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          {/* Blog Table using TanStack React Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto mb-6">
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
          </div>
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
            {/* Pagination buttons */}
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
          {/* Blog Analytics Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-chart-bar mr-2"></i> Blog Engagement
              Analytics
            </h3>
            <canvas ref={blogChartRef} id="blogChart"></canvas>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default BlogManagementPage;
