// pages/admin/notifications.tsx
import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
type Notification = {
  id: number;
  message: string;
  icon: string;
  color: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    message: "System update scheduled for March 1, 2025",
    icon: "fas fa-exclamation-circle",
    color: "text-yellow-500",
    read: false,
  },
  {
    id: 2,
    message: "John Doe sent a new message",
    icon: "fas fa-user",
    color: "text-blue-500",
    read: false,
  },
  {
    id: 3,
    message: "New exam categories added!",
    icon: "fas fa-bullhorn",
    color: "text-green-500",
    read: false,
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [search, setSearch] = useState("");
  const [notificationInput, setNotificationInput] = useState("");

  // Filter notifications based on search input
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) =>
      n.message.toLowerCase().includes(search.toLowerCase())
    );
  }, [notifications, search]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const sendNotification = () => {
    if (notificationInput.trim() === "") return;
    const newNotification: Notification = {
      id: Date.now(),
      message: notificationInput,
      icon: "fas fa-bell", // default icon for new notifications
      color: "text-blue-500",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setNotificationInput("");
  };

  const exportNotifications = (format: string) => {
    alert(`Exporting Notifications as ${format.toUpperCase()}`);
    // Placeholder: Implement export logic if needed
  };

  return (
    <Layout>
       <div className="flex flex-col  p-6">
      <h2 className="text-3xl font-bold mb-6">
        <i className="fas fa-bell mr-2"></i> Notifications
      </h2>

      {/* Create Notification */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">
          <i className="fas fa-plus-circle mr-2"></i> Send New Notification
        </h3>
        <div className="flex">
          <input
            type="text"
            id="notificationInput"
            value={notificationInput}
            onChange={(e) => setNotificationInput(e.target.value)}
            placeholder="Enter notification message..."
            className="px-4 py-2 flex-grow rounded-lg border"
          />
          <button
            onClick={sendNotification}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2"
          >
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </div>
      </div>

      {/* Filters & Export */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-2/3 rounded-lg border"
        />
        <button
          onClick={() => exportNotifications("csv")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <i className="fas fa-file-csv mr-2"></i> Export CSV
        </button>
        <button
          onClick={() => exportNotifications("pdf")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <i className="fas fa-file-pdf mr-2"></i> Export PDF
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          <i className="fas fa-list mr-2"></i> Notification History
        </h3>
        <ul>
          {filteredNotifications.map((n) => (
            <li
              key={n.id}
              id={`notif-${n.id}`}
              className={`p-3 border-b flex justify-between items-center ${n.read ? "bg-gray-300" : ""}`}
            >
              <span>
                <i className={`${n.icon} ${n.color} mr-2`}></i> {n.message}
              </span>
              <div>
                <button onClick={() => markAsRead(n.id)} className="text-green-500 mr-3">
                  <i className="fas fa-check"></i>
                </button>
                <button onClick={() => deleteNotification(n.id)} className="text-red-500">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </Layout>
   
  );
};

export default NotificationsPage;
