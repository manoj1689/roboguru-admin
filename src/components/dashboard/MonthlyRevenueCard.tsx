import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const MonthlyRevenueCard = () => {
  const [data, setData] = useState({ amount: 0, growth: "" });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.monthlyRevenue));
  }, []);

  return (
    <Card className="p-4 flex flex-col items-start">
      <div className="flex w-full justify-between">
        <div className=" p-4 rounded-full bg-sky-400">
          <FaHandHoldingDollar color="white" size={32} />
        </div>
        <div>
          <BsThreeDotsVertical size={32} className="text-neutral-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-neutral-600 my-4">Monthly revenue</h3>
      <div className="flex items-end gap-2">
      <p className="text-4xl ">
        {data.amount}
      </p>
      <p className="text-blue-500">+{data.growth}</p>
      </div>
  
      <p className="text-sm text-gray-500 my-2">Revenue Increase</p>
    </Card>
  );
};

export default MonthlyRevenueCard;

