import React, { useState } from "react";
import { useRouter } from "next/router";
import { HiMenuAlt2 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaTachometerAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaList, FaRegClipboard } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { MdTopic, MdCastForEducation } from "react-icons/md";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaChartLine,
  FaBookReader,
  FaFolderOpen,
  FaUserTag,
  FaUserClock,
  FaShieldAlt,
  FaFileAlt,
  FaFire,
  FaBlog,
  FaQuestionCircle,
  FaFileSignature,
  FaListAlt,
  FaDatabase,
  FaChartBar,
  FaComments,
  FaBell,
  FaHistory,
  FaChartPie,
  FaCog,
  FaFontAwesomeFlag,
} from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <div
        className="lg:hidden p-2 text-black bg-transparent rounded-md fixed top-3 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <CgClose size={15} />
        ) : (
          <HiMenuAlt2 size={15} className="bg-transparent" />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 md:top-20 left-0 w-64 bg-[#F3F3F3] shadow-md overflow-y-auto z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <nav className="space-y-1 p-2 h-full overflow-y-auto">
          {/* Dashboard */}
          <div>
            <div
              className={`w-full p-2 cursor-pointer flex justify-between items-center hover:bg-gray-200 rounded-r-full ${
                currentPath === "/admin"
                  ? "text-white hover:text-stone-800 bg-pink-400 rounded-r-full"
                  : "text-stone-800 bg-[#F3F3F3]"
              }`}
              onClick={() => handleNavigation("/admin")}
            >
              <div className="flex items-center gap-2">
                <FaTachometerAlt size={20} />
                <span className="text-md">Dashboard</span>
              </div>
            </div>
          </div>

          {/* Users Management */}
          <div>
            <div className="p-2 flex items-center hover:bg-gray-200 rounded-r-full text-stone-800 bg-[#F3F3F3]">
              <div className="flex items-center gap-2">
                <FaUsers size={20} />
                <span className="text-md">Users Management</span>
              </div>
            </div>
            <div className=" space-y-1">
              <div
                className={`flex ml-4 p-3 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/userList"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/userList")}
              >
                <FaList size={20} className="mr-3" />
                <span className="text-sm">Users List</span>
              </div>
              <div
                className={`flex ml-4 p-3 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/userProgress"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/userProgress")}
              >
                <FaChartLine size={20} className="mr-3" />
                <span className="text-sm">User Progress</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/userRoles"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/userRoles")}
              >
                <FaUserTag size={20} className="mr-3" />
                <span className="text-sm">User Roles</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/userActivityLog"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/userActivityLog")}
              >
                <FaUserClock size={20} className="mr-3" />
                <span className="text-sm">User Activity Logs</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/roleBasedAccess"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/roleBasedAccess")}
              >
                <FaShieldAlt size={20} className="mr-3" />
                <span className="text-sm">Role-Based Access </span>
              </div>
            </div>
          </div>

          {/* Academy Section */}
          <div>
            <div
              className={`p-2 flex items-center hover:bg-gray-200 rounded-r-full mb-1 ${
                currentPath.startsWith("/admin/education_levels") ||
                currentPath.startsWith("/admin/classes") ||
                currentPath.startsWith("/admin/subjects") ||
                currentPath.startsWith("/admin/chapters") ||
                currentPath.startsWith("/admin/topic")
                  ? "text-white bg-pink-400 rounded-r-full"
                  : "text-stone-800 bg-[#F3F3F3]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaGraduationCap size={20} />
                <span className="text-md">Education Structure</span>
              </div>
            </div>
            <div className="space-y-1">
              <div
                className={`flex ml-4  p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/admin/education_levels"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/admin/education_levels")}
              >
                <SiLevelsdotfyi size={20} className="mr-3" />
                <span className="text-sm">Education Levels</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/admin/classes"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/admin/classes")}
              >
                <FaBookReader size={20} className="mr-3" />
                <span className="text-sm">Classes</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/admin/subjects"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/admin/subjects")}
              >
                <FaBook size={20} className="mr-3" />
                <span className="text-sm">Subjects</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/admin/chapters"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/admin/chapters")}
              >
                <FaFolderOpen size={20} className="mr-3" />
                <span className="text-sm">Chapters</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/admin/topic"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/admin/topic")}
              >
                <FaList size={20} className="mr-3" />
                <span className="text-sm">Topic</span>
              </div>
              {/* Board management */}
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/educationManagement/board_management"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() =>
                  handleNavigation("/educationManagement/board_management")
                }
              >
                <FaRegClipboard size={20} className="mr-3" />
                <span className="text-sm">Board Management</span>
              </div>
              {/* Manage Topics */}
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/educationManagement/manage_topic"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() =>
                  handleNavigation("/educationManagement/manage_topic")
                }
              >
                <MdTopic size={20} className="mr-3" />
                <span className="text-sm">Manage Topics</span>
              </div>
              {/* Language Management */}
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/educationManagement/language_management"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() =>
                  handleNavigation("/educationManagement/language_management")
                }
              >
                <CiGlobe size={20} className="mr-3" />
                <span className="text-sm">Language Management</span>
              </div>
              {/* Country Management */}
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/educationManagement/country_management"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() =>
                  handleNavigation("/educationManagement/country_management")
                }
              >
                <FaFontAwesomeFlag size={20} className="mr-3" />
                <span className="text-sm">Country Management</span>
              </div>
              {/* EducationLevel Management */}
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath ===
                  "/educationManagement/educationlevel_management"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() =>
                  handleNavigation(
                    "/educationManagement/educationlevel_management"
                  )
                }
              >
                <MdCastForEducation size={20} className="mr-3" />
                <span className="text-sm">Education-Level Management</span>
              </div>
            </div>
          </div>

          {/* Content Management */}
          <div>
            <div className="p-2 flex items-center hover:bg-gray-200 rounded-r-full text-stone-800 bg-[#F3F3F3]">
              <div className="flex items-center gap-2">
                <FaFileAlt size={20} />
                <span className="text-md">Content Management</span>
              </div>
            </div>
            <div className="space-y-1">
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/landing"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/landing")}
              >
                <FaHome size={20} className="mr-3" />
                <span className="text-sm">Landing Page</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/trendingTopics"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/trendingTopics")}
              >
                <FaFire size={20} className="mr-3" />
                <span className="text-sm">Trending Topics</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/blogManagement"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/blogManagement")}
              >
                <FaBlog size={20} className="mr-3" />
                <span className="text-sm">Blog Management</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/FAQ"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/FAQ")}
              >
                <FaQuestionCircle size={20} className="mr-3" />
                <span className="text-sm">FAQ</span>
              </div>
            </div>
          </div>

          {/* Exams Management */}
          <div>
            <div className="p-2 flex items-center hover:bg-gray-200 rounded-r-full text-stone-800 bg-[#F3F3F3]">
              <div className="flex items-center gap-2">
                <FaFileSignature size={20} />
                <span className="text-md">Exams Management</span>
              </div>
            </div>
            <div className="space-y-1">
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/examsList"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/examsList")}
              >
                <FaListAlt size={20} className="mr-3" />
                <span className="text-sm">Exams List</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/questionsBank"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/questionsBank")}
              >
                <FaDatabase size={20} className="mr-3" />
                <span className="text-sm">Question Bank</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/examsReport"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/examsReport")}
              >
                <FaChartBar size={20} className="mr-3" />
                <span className="text-sm">Exam Performance Reports</span>
              </div>
            </div>
          </div>

          {/* Chat Management */}
          <div
            className={`p-2 flex cursor-pointer hover:bg-gray-200 rounded-r-full gap-2 ${
              currentPath === "/chatManagement"
                ? "text-white bg-pink-400 rounded-r-full"
                : "text-stone-800 bg-[#F3F3F3]"
            }`}
            onClick={() => handleNavigation("/chatManagement")}
          >
            <FaComments size={20} />
            <span className="text-md">Chat Management</span>
          </div>

          {/* Notifications */}
          <div
            className={`p-2 flex cursor-pointer hover:bg-gray-200 rounded-r-full gap-2 ${
              currentPath === "/notifications"
                ? "text-white bg-pink-400 rounded-r-full"
                : "text-stone-800 bg-[#F3F3F3]"
            }`}
            onClick={() => handleNavigation("/notifications")}
          >
            <FaBell size={20} />
            <span className="text-md">Notifications</span>
          </div>

          {/* Reports & Analytics */}
          <div>
            <div className="p-2 flex items-center hover:bg-gray-200 rounded-r-full text-stone-800 bg-[#F3F3F3]">
              <div className="flex items-center gap-2">
                <FaChartLine size={20} />
                <span className="text-md">Reports & Analytics</span>
              </div>
            </div>
            <div className="space-y-1">
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/reportsOverview"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/reportsOverview")}
              >
                <FaFileAlt size={20} className="mr-3" />
                <span className="text-sm">Reports Overview</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/auditTrail"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/auditTrail")}
              >
                <FaHistory size={20} className="mr-3" />
                <span className="text-sm">Audit Trail</span>
              </div>
              <div
                className={`flex ml-4 p-2 cursor-pointer hover:bg-gray-200 items-center rounded-r-full ${
                  currentPath === "/realTimeAnalytics"
                    ? "text-white bg-pink-400 rounded-r-full"
                    : "text-stone-800 bg-[#F3F3F3]"
                }`}
                onClick={() => handleNavigation("/realTimeAnalytics")}
              >
                <FaChartPie size={20} className="mr-3" />
                <span className="text-sm">Real-Time Analytics</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div
            className={`p-2 flex cursor-pointer hover:bg-gray-200 rounded-r-full gap-4 ${
              currentPath === "/settings"
                ? "text-white bg-pink-400 rounded-r-full"
                : "text-stone-800 bg-[#F3F3F3]"
            }`}
            onClick={() => handleNavigation("/settings")}
          >
            <FaCog size={20} />
            <span>Settings</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
