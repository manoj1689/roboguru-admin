import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";

const UserSummary = () => {
  const [data, setData] = useState({
    registrations: 215,
    lastMonth: 572,
    totalUsers: "18,756",
  });

  useEffect(() => {
    fetch("/data/userSummary.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Card className="p-6  mx-auto shadow-md rounded-lg bg-white">
      {/* Title Section */}
      <p className="text-[36px] font-bold">User Summary</p>
      <p className="text-[26px] text-gray-600">
        Total <span className="font-semibold">48.5% Increase</span> New account
        😎 this session
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* New Registrations */}
        <div className="flex items-center space-x-3">
          <Image
            src="/icons/registration.svg"
            width={37.5}
            height={37.5}
            alt="New Registrations"
          />
          <div>
            <p className="text-gray-500 text-[16px]">New Registrations</p>
            <p className="text-[32px] font-semibold">{data.registrations}</p>
          </div>
        </div>

        {/* Last Month */}
        <div className="flex items-center space-x-3">
          <Image
            src="/icons/calendar.svg"
            width={39}
            height={39}
            alt="Last Month"
          />
          <div>
            <p className="text-gray-500 text-[16px]">Last Month</p>
            <p className="text-[32px] font-semibold">{data.lastMonth}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="flex items-center space-x-3">
          <Image
            src="/icons/total.svg"
            width={38}
            height={38}
            alt="Total Users"
          />
          <div>
            <p className="text-gray-500 text-[16px]">Total User's</p>
            <p className="text-[32px] font-semibold">{data.totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Manage ALL Link */}
      <div className="mt-4">
        <a href="#" className="text-blue-500 font-semibold hover:underline">
          Manage ALL
        </a>
      </div>
    </Card>
  );
};

export default UserSummary;
