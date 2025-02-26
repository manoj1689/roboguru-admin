import ActiveUsersCard from "@/components/dashboard/ActiveUsersCard";
import MonthlyRevenueCard from "@/components/dashboard/MonthlyRevenueCard";
import CongratulationsCard from "@/components/dashboard/CongratulationsCard";
import AdminProfile from "@/components/dashboard/AdminProfile";
import UserSummaryCard from "@/components/dashboard/UserSummaryCard";
import EducationOverviewCard from "@/components/dashboard/EducationOverviewCard";
import ChatActivityCard from "@/components/dashboard/ChatActivityCard";
import ExamOverviewCard from "@/components/dashboard/ExamOverviewCard";
import RevenueBreakdown from "@/components/dashboard/RevenueBreakdown";
import QuizExamStatistics from "@/components/dashboard/QuizExamStatistics";

export default function Dashboard() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Section: Active Users, Revenue, Congratulations */}
      <ActiveUsersCard />
      <MonthlyRevenueCard />
      <CongratulationsCard />

      {/* Admin Profile: Full Width */}
      <div className="col-span-3">
        <AdminProfile />
      </div>

      {/* User Summary & Education Overview: Two Columns on Larger Screens */}
      <div className="col-span-3">
        <UserSummaryCard />
      </div>
      <div className="col-span-3">
        <EducationOverviewCard />
      </div>

      <div className="col-span-3">
        <ChatActivityCard />
      </div>

      <div className="col-span-3">
        <ExamOverviewCard />
      </div>

      <div className="col-span-3">
        <div className="p-8 grid grid-cols-2 gap-4">
          <RevenueBreakdown />
          <QuizExamStatistics />
        </div>
      </div>
    </div>
  );
}
