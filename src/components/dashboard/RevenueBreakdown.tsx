"use client"; // ✅ Ensure this runs on the client side

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "@/components/ui/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueBreakdown = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
      hoverOffset: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => {
        const data = json.revenueBreakdown;
        setChartData({
          labels: data.labels,
          datasets: [
            {
              data: data.data,
              backgroundColor: data.colors,
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        });
      })
      .catch((error) =>
        console.error("Error fetching revenue breakdown:", error)
      );
  }, []);

  return (
    <Card className="p-6 flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Revenue Breakdown</h3>
      <div className="flex justify-center">
        <div style={{ width: "300px", height: "300px" }}>
          {" "}
          {/* ✅ Controls size */}
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default RevenueBreakdown;
