import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { Users } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
const ActiveUsersCard = () => {
  const [data, setData] = useState({ count: 0, growth: "" });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.activeUsers));
  }, []);

  return (
    <Card className="p-4 flex flex-col items-start">
      <div className="flex w-full justify-between">
        <div className=" p-4 rounded-full bg-green-500">
        <Users color="white" size={32} />
        </div>
        <div>
        <BsThreeDotsVertical size={32} className="text-neutral-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-600 my-4">Active User</h3>
      <div className="flex gap-2 items-end">
      <p className="text-4xl font-">
        {data.count}
      </p>
      <p className="text-green-500">+{data.growth}</p>
      </div>
     
      <p className="text-sm text-gray-500 my-2">Daily User come</p>
    </Card>
  );
};

export default ActiveUsersCard;
