// pages/admin/settings.tsx
import React, { useState } from "react";
import Layout from "@/components/Layout";
const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState("API-XXXXX");

  const saveSettings = () => {
    alert("Settings Saved Successfully!");
  };

  const generateAPIKey = () => {
    const newKey =
      "API-" + Math.random().toString(36).substr(2, 16).toUpperCase();
    setApiKey(newKey);
  };

  return (
    <Layout>
  <div className="flex flex-col p-6">
      <main className="flex-1">
        <h2 className="text-3xl font-bold mb-6">
          <i className="fas fa-cog mr-2"></i> Settings
        </h2>

        {/* User Account Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-user-cog mr-2"></i> User Account
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 mb-2 rounded-lg border"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 mb-2 rounded-lg border"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-2 rounded-lg border"
          />
          <label className="flex items-center space-x-2">
            <input type="checkbox" /> <span>Enable Two-Factor Authentication</span>
          </label>
          <button
            onClick={saveSettings}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <i className="fas fa-save mr-2"></i> Save Changes
          </button>
        </div>

        {/* Theme & Appearance */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-palette mr-2"></i> Theme & Appearance
          </h3>
          <button
            onClick={() => alert("Toggle Dark Mode (functionality placeholder)")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <i className="fas fa-adjust mr-2"></i> Toggle Dark Mode
          </button>
          <p className="mt-3 text-sm">
            Switch between light and dark themes.
          </p>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-bell mr-2"></i> Notifications
          </h3>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" /> <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" /> <span>SMS Notifications</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" /> <span>Push Notifications</span>
          </label>
          <button
            onClick={saveSettings}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <i className="fas fa-check-circle mr-2"></i> Update Preferences
          </button>
        </div>

        {/* System Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-cogs mr-2"></i> System Preferences
          </h3>
          <select className="w-full p-2 rounded-lg border mb-2">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <select className="w-full p-2 rounded-lg border">
            <option>GMT +0</option>
            <option>GMT +5:30</option>
            <option>GMT -5</option>
          </select>
          <button
            onClick={saveSettings}
            className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            <i className="fas fa-globe mr-2"></i> Save Preferences
          </button>
        </div>

        {/* Security & API Keys */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-shield-alt mr-2"></i> Security & API Keys
          </h3>
          <button
            onClick={generateAPIKey}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <i className="fas fa-key mr-2"></i> Generate API Key
          </button>
          <p className="mt-3 text-sm">Keep your API key confidential.</p>
          <p className="mt-2 text-lg font-bold text-green-400">{apiKey}</p>
        </div>
      </main>
    </div>
    </Layout>
  
  );
};

export default SettingsPage;
