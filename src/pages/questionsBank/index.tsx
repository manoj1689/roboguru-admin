// pages/admin/question-bank.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Chart from "chart.js/auto";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel, // <-- import for pagination
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

type Question = {
  question: string;
  subject: string;
  difficulty: string;
  type: string;
};

const initialQuestions: Question[] = [
  {
    question: "What is 5 + 3?",
    subject: "Mathematics",
    difficulty: "Easy",
    type: "MCQ",
  },
  {
    question: "Explain Newton's 2nd Law",
    subject: "Physics",
    difficulty: "Hard",
    type: "Descriptive",
  },
];

const QuestionBankPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Filter questions based on search text and filter selections
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.question
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSubject =
        subjectFilter === "all"
          ? true
          : q.subject.toLowerCase() === subjectFilter;
      const matchesDifficulty =
        difficultyFilter === "all"
          ? true
          : q.difficulty.toLowerCase() === difficultyFilter;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [questions, search, subjectFilter, difficultyFilter]);

  // Define table columns using TanStack React Table
  const columns = useMemo<ColumnDef<Question>[]>(
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
        accessorKey: "question",
        header: "Question",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
      },
      {
        accessorKey: "type",
        header: "Type",
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

  // 1) Set up table with pagination
  const table = useReactTable({
    data: filteredQuestions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // <-- for pagination
    initialState: {
      pagination: {
        pageSize: 5, // Default items per page
      },
    },
  });

  // Chart.js: Question Analysis Chart
  const questionChartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (questionChartRef.current) {
      new Chart(questionChartRef.current, {
        type: "bar",
        data: {
          labels: ["Math", "Physics", "Chemistry", "Biology"],
          datasets: [
            {
              label: "Total Questions",
              data: [120, 90, 80, 110],
              backgroundColor: ["#4caf50", "#2196F3", "#FFC107", "#FF5722"],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }, []);

  // Action handlers
  const addQuestion = () => {
    alert("Feature to add a new question is under development.");
  };

  const editQuestion = (questionText: string) => {
    alert(`Editing question: ${questionText}`);
  };

  const deleteQuestion = (questionText: string) => {
    if (confirm(`Are you sure you want to delete "${questionText}"?`)) {
      alert(`"${questionText}" has been deleted.`);
      setQuestions((prev) => prev.filter((q) => q.question !== questionText));
    }
  };

  const exportQuestions = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "question-bank.json";
    link.click();
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-file-alt mr-2"></i> Question Bank
          </h2>

          {/* Bulk Actions */}
          <div className="mb-4 flex gap-3">
            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <i className="fas fa-plus-circle mr-2"></i> Add New Question
            </button>
            <button
              onClick={exportQuestions}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <i className="fas fa-file-export mr-2"></i> Export Questions
            </button>
          </div>

          {/* Search & Filters */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-1/3 rounded-lg border"
            />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Question Table */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
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

          {/* Question Analysis Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-chart-bar mr-2"></i> Question Analysis
            </h3>
            <canvas ref={questionChartRef} id="questionChart"></canvas>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default QuestionBankPage;
