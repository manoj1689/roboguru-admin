// pages/admin/exam-management.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Chart from "chart.js/auto";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Edit, Trash, File, Move } from "lucide-react";
// If you're using Lucide icons for pagination, import them:
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

type Exam = {
  title: string;
  subject: string;
  difficulty: string;
  questions: number;
  status: "Active" | "Inactive";
};

const initialExams: Exam[] = [
  {
    title: "Math Test",
    subject: "Mathematics",
    difficulty: "Medium",
    questions: 30,
    status: "Active",
  },
  {
    title: "Physics Quiz",
    subject: "Physics",
    difficulty: "Hard",
    questions: 25,
    status: "Inactive",
  },
];

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Filter exams based on search text and filters
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch = exam.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSubject =
        subjectFilter === "all"
          ? true
          : exam.subject.toLowerCase() === subjectFilter;
      const matchesDifficulty =
        difficultyFilter === "all"
          ? true
          : exam.difficulty.toLowerCase() === difficultyFilter;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [exams, search, subjectFilter, difficultyFilter]);

  // Define table columns for TanStack React Table
  const columns = useMemo<ColumnDef<Exam>[]>(
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
      { accessorKey: "title", header: "Exam Title" },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "difficulty", header: "Difficulty" },
      { accessorKey: "questions", header: "Questions" },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "Active" ? "text-green-500" : "text-red-500"
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
    data: filteredExams,
    columns,
    // 1) Core row model for basic data
    getCoreRowModel: getCoreRowModel(),
    // 2) Pagination row model for pagination
    getPaginationRowModel: getPaginationRowModel(),
    // 3) Default to 5 items per page
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Chart.js: Exam Performance Analytics Chart
  const examChartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (examChartRef.current) {
      new Chart(examChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Math Test",
            "Physics Quiz",
            "Chemistry Exam",
            "Biology Assessment",
          ],
          datasets: [
            {
              label: "Average Scores",
              data: [85, 78, 92, 88],
              backgroundColor: ["#4caf50", "#2196F3", "#FFC107", "#FF5722"],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }, []);

  // Bulk action functions
  const addExam = () => {
    alert("Feature to add a new exam is under development.");
  };

  const editExam = (title: string) => {
    alert(`Editing exam: ${title}`);
  };

  const deleteExam = (title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      alert(`"${title}" has been deleted.`);
      setExams((prev) => prev.filter((exam) => exam.title !== title));
    }
  };

  const exportExams = () => {
    const blob = new Blob([JSON.stringify(exams, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exam-list.json";
    link.click();
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-white">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-file-signature mr-2"></i> Exam Management
          </h2>

          {/* Bulk Actions */}
          <div className="mb-4 flex gap-3">
            <button
              onClick={addExam}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <i className="fas fa-plus-circle mr-2"></i> Add New Exam
            </button>
            <button
              onClick={exportExams}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <i className="fas fa-file-export mr-2"></i> Export Exams
            </button>
          </div>

          {/* Search & Filters */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-1/3 rounded-lg border dark:bg-gray-700 dark:text-white"
            />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Exam Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
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

          {/* Exam Performance Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-chart-bar mr-2"></i> Exam Performance
              Analytics
            </h3>
            <canvas ref={examChartRef} id="examChart" />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ExamListPage;
