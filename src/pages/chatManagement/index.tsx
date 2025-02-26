// pages/admin/chat-management.tsx
import React, { useState } from "react";
import Layout from "@/components/Layout";

const ChatManagementPage: React.FC = () => {
  // State for live chat messages and input value
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "User", text: "Hi, I need help!" },
    { sender: "Admin", text: "Sure, how can I assist?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Function to send a message
  const sendMessage = () => {
    if (chatInput.trim() === "") return;
    // Append a new message as an "Admin" message
    setChatMessages((prev) => [...prev, { sender: "Admin", text: chatInput }]);
    setChatInput("");
  };

  // Function to export chat history
  const exportChat = (format: string) => {
    alert(`Exporting Chat History as ${format.toUpperCase()}`);
    // Placeholder: In a real implementation, prepare and download the file
  };

  return (
    <>
      <Layout>
      <div className="flex flex-col ">
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-comments mr-2"></i> Chat Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Chat Section */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-comment-dots mr-2"></i> Live Chat
              </h3>
              <div id="chatBox" className="h-64 overflow-y-auto p-4 bg-gray-200 rounded-lg">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg mb-2 ${
                      msg.sender === "Admin"
                        ? "bg-blue-500 text-white text-right"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  id="chatInput"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="px-4 py-2 flex-grow rounded-lg border"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2"
                >
                  <i className="fas fa-paper-plane"> send</i>
                </button>
              </div>
            </div>

            {/* Chat History Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-history mr-2"></i> Chat History
              </h3>
              <div className="mb-4 flex justify-between">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="px-4 py-2 w-2/3 rounded-lg border"
                />
                <button
                  onClick={() => exportChat("csv")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <i className="fas fa-file-csv mr-2"></i> Export CSV
                </button>
                <button
                  onClick={() => exportChat("pdf")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <i className="fas fa-file-pdf mr-2"></i> Export PDF
                </button>
              </div>
              <div className="h-48 overflow-y-auto">
                <p className="p-3 border-b">
                  <strong>John Doe:</strong> Can I schedule an exam?
                </p>
                <p className="p-3 border-b">
                  <strong>Admin:</strong> Yes, please visit the exams section.
                </p>
                <p className="p-3 border-b">
                  <strong>Jane Smith:</strong> I forgot my password.
                </p>
                <p className="p-3 border-b">
                  <strong>Admin:</strong> You can reset it via email.
                </p>
                <p className="p-3">
                  <strong>Alex Johnson:</strong> Where can I find past exam reports?
                </p>
              </div>
            </div>
          </div>

          {/* Chat Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">
              <i className="fas fa-bell mr-2"></i> Chat Notifications
            </h3>
            <ul>
              <li className="border-b p-3">
                <i className="fas fa-user text-blue-500 mr-2"></i> New message from John Doe
              </li>
              <li className="border-b p-3">
                <i className="fas fa-user text-green-500 mr-2"></i> Jane Smith responded
              </li>
              <li className="p-3">
                <i className="fas fa-user text-yellow-500 mr-2"></i> Alex Johnson is typing...
              </li>
            </ul>
          </div>
        </main>
      </div>
      </Layout>
    
    </>
  );
};

export default ChatManagementPage;
