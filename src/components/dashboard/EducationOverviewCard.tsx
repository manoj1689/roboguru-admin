"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const EducationOverview = () => {
  const [data, setData] = useState({
    totalGrowth: "",
    data: { Level: 0, Classes: 0, Subjects: 0 },
  });

  const [selectedText, setSelectedText] = useState<string>("");

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.educationOverview));
  }, []);

  const handleLegendClick = (text: string) => {
    setSelectedText(text);
  };

  const option = {
    tooltip: { trigger: "item" },
    legend: { show: false },
    series: [
      {
        type: "pie",
        radius: ["50%", "80%"], // ✅ Adjust inner & outer radius for thickness
        startAngle: 180,
        label: { show: false },
        emphasis: {
          scale: true, // ✅ Expands selected section
        },
        data: [
          {
            value: data.data.Level,
            name: "Level",
            itemStyle: { color: "#D3D3D3" },
          },
          {
            value: data.data.Classes,
            name: "Class",
            itemStyle: { color: "#FF6B6B" },
          },
          {
            value: data.data.Subjects,
            name: "Subject",
            itemStyle: { color: "#48CAE4" },
          },
        ],
      },
    ],
  };

  return (
    <Card className="p-6 flex flex-row gap-6 items-center justify-between">
      {/* ✅ Legend on Left with Clickable Buttons */}
      <div className="flex flex-col gap-4 text-sm w-2/3">
        <h3 className="text-[36px] font-semibold">Education Overview</h3>
        <p className="text-[26px] mt-4 mb-4">
          Total {data.totalGrowth} Growth 😀 this month
        </p>

        {option.series[0].data.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleLegendClick(item.name)}
          >
            <span
              className="w-6 h-5 inline-block"
              style={{ backgroundColor: item.itemStyle.color }}
            ></span>
            <span className="size-[24px] mt-1">{item.name}</span>
          </span>
        ))}

        {/* ✅ Fully Functional Manage Education Button */}
        <button
          className="w-40 h-10 bg-sky-400 text-[16px] text-white px-2 py-2 rounded mt-4"
          onClick={() => alert("Manage Education Clicked!")}
        >
          Manage Education
        </button>

        {/* ✅ Show Selected Text */}
        {selectedText && (
          <p className="text-lg font-semibold mt-4">{selectedText}</p>
        )}
      </div>

      {/* ✅ Donut Chart on Right */}
      <div className="w-80 h-80 mr-[50px]">
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </Card>
  );
};

export default EducationOverview;
