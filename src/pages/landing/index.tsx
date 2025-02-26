// pages/admin/landing-page-management.tsx
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/Layout";
const LandingPageManagement: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // Toggle dark mode on/off and store the choice in localStorage
  const toggleDarkMode = () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Load sidebar content from /sidebar.html
  const loadSidebar = () => {
    fetch("/sidebar.html")
      .then((response) => response.text())
      .then((html) => {
        const sidebarContainer = document.getElementById("sidebar-container");
        if (sidebarContainer) {
          sidebarContainer.innerHTML = html;
        }
      })
      .then(() => {
        if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark");
        }
      });
  };

  // Simulate a live preview action
  const previewLandingPage = () => {
    alert("Preview mode enabled - this will open a live preview in production.");
  };

  // Export landing page data as a JSON backup file
  const exportLandingPageData = () => {
    const heroTitle = (document.getElementById("heroTitle") as HTMLInputElement)
      ?.value;
    const heroDescription = (
      document.getElementById("heroDescription") as HTMLTextAreaElement
    )?.value;
    const features = (
      document.getElementById("features") as HTMLTextAreaElement
    )?.value;
    const testimonials = (
      document.getElementById("testimonials") as HTMLTextAreaElement
    )?.value;
    const metaTitle = (document.getElementById("metaTitle") as HTMLInputElement)
      ?.value;
    const metaDescription = (
      document.getElementById("metaDescription") as HTMLTextAreaElement
    )?.value;
    const metaKeywords = (document.getElementById("metaKeywords") as HTMLInputElement)
      ?.value;

    const pageData = {
      heroTitle,
      heroDescription,
      features,
      testimonials,
      metaTitle,
      metaDescription,
      metaKeywords,
    };

    const blob = new Blob([JSON.stringify(pageData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "landing-page-backup.json";
    link.click();
  };

  // Reset the form values
  const resetForm = () => {
    formRef.current?.reset();
    alert("All changes have been reset.");
  };

  useEffect(() => {
    loadSidebar();
    // Initialize CKEditor for selected textareas once the script is loaded
    if (typeof window !== "undefined" && (window as any).CKEDITOR) {
      (window as any).CKEDITOR.replace("heroDescription");
      (window as any).CKEDITOR.replace("features");
      (window as any).CKEDITOR.replace("testimonials");
      (window as any).CKEDITOR.replace("metaDescription");
    }
  }, []);

  return (
    <>
    <Layout>
    <Head>
        <title>Landing Page Management - Admin Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Load CKEditor from CDN */}
      <Script
        src="https://cdn.ckeditor.com/4.18.0/standard/ckeditor.js"
        strategy="beforeInteractive"
      />

      <div className="flex ">
       

        {/* Main Content */}
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-white">
          <h2 className="text-3xl font-bold mb-6">
            <i className="fas fa-file-alt mr-2"></i> Landing Page Management
          </h2>

          {/* Bulk Actions */}
          <div className="mb-4 flex gap-3">
            <button
              onClick={previewLandingPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-eye mr-2"></i> Live Preview
            </button>
            <button
              onClick={exportLandingPageData}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <i className="fas fa-file-export mr-2"></i> Export Backup
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <i className="fas fa-undo-alt mr-2"></i> Reset Changes
            </button>
          </div>

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form id="landingPageForm" ref={formRef}>
              {/* Hero Section */}
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-image mr-2"></i> Hero Section
              </h3>
              <label className="block text-sm font-medium">Hero Title</label>
              <input
                id="heroTitle"
                type="text"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="Welcome to RoboGuru!"
              />

              <label className="block text-sm font-medium">Hero Description</label>
              <textarea
                id="heroDescription"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="AI-powered learning at your fingertips."
              />

              <label className="block text-sm font-medium">Hero Image</label>
              <input
                type="file"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
              />

              {/* Features Section */}
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-star mr-2"></i> Features
              </h3>
              <textarea
                id="features"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="Interactive AI-powered tutoring, instant homework solutions."
              />

              {/* Testimonials Section */}
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-comments mr-2"></i> Testimonials
              </h3>
              <textarea
                id="testimonials"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="&quot;RoboGuru changed the way I study!&quot;"
              />

              {/* SEO Settings */}
              <h3 className="text-xl font-semibold mb-4">
                <i className="fas fa-search mr-2"></i> SEO Settings
              </h3>
              <label className="block text-sm font-medium">Meta Title</label>
              <input
                id="metaTitle"
                type="text"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="RoboGuru - AI Learning Platform"
              />

              <label className="block text-sm font-medium">Meta Description</label>
              <textarea
                id="metaDescription"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="RoboGuru provides AI-powered learning for students worldwide."
              />

              <label className="block text-sm font-medium">Meta Keywords</label>
              <input
                id="metaKeywords"
                type="text"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:text-white mb-4"
                defaultValue="AI, Learning, Education, Homework Helper"
              />

              {/* Save Button */}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <i className="fas fa-save mr-2"></i> Save Changes
              </button>
            </form>
          </div>
       
        </main>
      </div>

    </Layout>
   
    </>
  );
};

export default LandingPageManagement;
