// pages/admin/real-time-analytics.tsx
import React, { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Chart from "chart.js/auto";

const RealTimeAnalyticsPage: React.FC = () => {
  const liveUsersChartRef = useRef<HTMLCanvasElement>(null);
  const serverHealthChartRef = useRef<HTMLCanvasElement>(null);
  const userMapRef = useRef<HTMLDivElement>(null);

  // Initialize charts using Chart.js
  useEffect(() => {
    if (liveUsersChartRef.current) {
      new Chart(liveUsersChartRef.current, {
        type: "line",
        data: {
          labels: ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50"],
          datasets: [
            {
              label: "Live Users",
              data: [10, 20, 30, 50, 40, 70],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        },
      });
    }
    if (serverHealthChartRef.current) {
      new Chart(serverHealthChartRef.current, {
        type: "bar",
        data: {
          labels: ["CPU", "Memory", "Disk"],
          datasets: [
            {
              label: "Usage (%)",
              data: [60, 75, 50],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
            },
          ],
        },
      });
    }
  }, []);

  // Initialize Google Map using the Google Maps JavaScript API
  useEffect(() => {
    const initMap = () => {
      if (userMapRef.current && window.google) {
        const map = new window.google.maps.Map(userMapRef.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
        });
        new window.google.maps.Marker({
          position: { lat: 40.7128, lng: -74.0060 },
          map,
          title: "New York, USA",
        });
        new window.google.maps.Marker({
          position: { lat: 51.5074, lng: -0.1278 },
          map,
          title: "London, UK",
        });
        new window.google.maps.Marker({
          position: { lat: 35.6895, lng: 139.6917 },
          map,
          title: "Tokyo, Japan",
        });
      }
    };

    if (typeof window !== "undefined") {
      if (window.google && window.google.maps) {
        initMap();
      }
      // Otherwise, the callback below will be invoked once the API loads.
      (window as any).initMap = initMap;
    }
  }, []);

  return (
    <>
   <Layout>
   <div className="flex flex-col  p-6">
        <main className="flex-1">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-chart-pie mr-2"></i> Real-Time Analytics
          </h2>

          {/* Export & Refresh Options */}
          <div className="mb-4 flex justify-between">
            <button
              onClick={() => alert("Exporting Analytics Report as CSV")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-file-csv mr-2"></i> Export CSV
            </button>
            <button
              onClick={() => alert("Exporting Analytics Report as PDF")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <i className="fas fa-file-pdf mr-2"></i> Export PDF
            </button>
            <button
              onClick={() => alert("Refreshing Data")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <i className="fas fa-sync-alt mr-2"></i> Refresh Data
            </button>
          </div>

          {/* Live Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-user-friends mr-2"></i> Live Users
              </h3>
              <canvas ref={liveUsersChartRef} id="liveUsersChart"></canvas>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-server mr-2"></i> Server Health
              </h3>
              <canvas ref={serverHealthChartRef} id="serverHealthChart"></canvas>
            </div>
          </div>

          {/* Global User Heatmap using Google Maps */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-globe mr-2"></i> User Heatmap
            </h3>
            <div id="userMap" ref={userMapRef} className="h-64 w-full"></div>
          </div>

          {/* Security & Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-bell mr-2"></i> Live Security Alerts
            </h3>
            <ul>
              <li className="border-b p-3">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i> Unusual login detected from Russia.
              </li>
              <li className="border-b p-3">
                <i className="fas fa-user-lock text-yellow-500 mr-2"></i> Admin account password changed.
              </li>
              <li className="p-3">
                <i className="fas fa-user-shield text-blue-500 mr-2"></i> 2FA enabled for new users.
              </li>
            </ul>
          </div>
        </main>
      </div>
   </Layout>
   
    </>
  );
};

export default RealTimeAnalyticsPage;

