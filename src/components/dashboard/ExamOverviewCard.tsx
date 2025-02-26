import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";
import clsx from "clsx";

interface ExamStat {
  label: string;
  value: number;
  image: string;
  bgColor: string;
}

const ExamOverviewCard = () => {
  const [data, setData] = useState<{
    title: string;
    description: string;
    stats: ExamStat[];
  }>({
    title: "",
    description: "",
    stats: [],
  });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.examOverview))
      .catch((error) => console.error("Error fetching exam overview:", error));
  }, []);

  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-[36px] font-semibold">{data.title}</h3>
      <p className="text-[20px] text-gray-600">{data.description}</p>

      <div className="flex gap-6 mt-4">
        {data.stats.map((stat, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-row items-end justify-between p-6 rounded-lg text-white w-1/3",
              stat.bgColor || "bg-gray-200"
            )}
          >
            <div className="flex flex-col">
              <p className="text-[26px] oxygen-light">{stat.label}</p>
              <p className="text-[82px] oxygen-light">
                {stat.value.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="relative w-[120px] h-[108px] flex items-center justify-center">
              <Image
                src={stat.image}
                width={100}
                height={100}
                alt={stat.label}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExamOverviewCard;
