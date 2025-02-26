import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { BsThreeDotsVertical } from "react-icons/bs";

const CongratulationsCard = () => {
  const [data, setData] = useState({
    name: "",
    salesIncrease: "",
    activeUsers: "",
  });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.congratulations));
  }, []);

  return (
    <Card className="p-4 flex flex-col items-start relative">
      <div className="flex w-full justify-between items-center">
        <img src="/images/Congratulations.svg" />
        <BsThreeDotsVertical size={32} className="text-neutral-400" />
      </div>

      <p className="oxygen-regular text-[30px] text-gray-600">{data.name},</p>
      <p className="oxygen-light text-[15px] text-gray-500 mt-4">
        You have done <span>{data.salesIncrease} 😎</span> more sales today.
        Check your new raising badge in your profile.
      </p>

      {/* Positioning Active Users to Right */}
      <p className="oxygen-bold text-sm absolute bottom-4 right-4 text-gray-500 mb-2">
        + {data.activeUsers} Active user
      </p>
    </Card>
  );
};

export default CongratulationsCard;
