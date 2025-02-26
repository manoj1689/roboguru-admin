import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "@/components/ui/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const QuizExamStatistics = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => {
        const stats = json.quizExamStatistics;
        setData({
          labels: stats.labels,
          datasets: Object.keys(stats.data).map((year, index) => ({
            label: year,
            data: stats.data[year],
            borderColor: ["#7289DA", "#FF6B6B", "#29ABE2"][index],
            backgroundColor: "rgba(0,0,0,0.1)",
            fill: true,
          })),
        });
      })
      .catch((error) =>
        console.error("Error fetching quiz exam statistics:", error)
      );
  }, []);

  return (
    <Card className="p-6 flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Quiz & Exam Statistics</h3>
      <Line data={data} />
    </Card>
  );
};

export default QuizExamStatistics;
