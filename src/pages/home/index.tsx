import React from 'react';
import Navbar from '@/components/Navbar';

function Home() {
  return (
    <div className="h-full">
      <Navbar />
      <div
        className="relative w-full  min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./admin.webp')", // Update with your actual image path
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen py-32   justify-center items-center text-center text-white space-y-8 px-4  overflow-y-auto">
          {/* Tagline */}
          <h1 className="text-5xl font-bold">
            Welcome to the <span className="text-cyan-500">Admin Dashboard</span>
          </h1>
          <p className="text-xl max-w-3xl">
            "Simplify Education Management. Organize Classes, Subjects, Chapters, and Topics Seamlessly."
          </p>

          {/* Quick Actions */}
          <div className="flex space-x-4">
            {/* Light Cyan Button */}
            <button className="px-6 py-3 bg-[#80DEEA] text-gray-700 rounded-lg shadow-lg hover:bg-[#4DD0E1]">
              Get Started
            </button>

            {/* Dark Cyan Button */}
            <button className="px-6 py-3 bg-[#00838F] text-gray-200 rounded-lg shadow-lg hover:bg-[#006064]">
              Learn More
            </button>
          </div>

          {/* Additional Section: Features */}
          <div className="py-12">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-stone-400 mb-8">What You Can Do Here</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Feature 1 */}
      <div className="bg-stone-200 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-stone-600 mb-4">Manage Courses & Classes</h3>
        <p className="text-gray-500">
          Select courses from a wide range of educational programs, and create classes with specific
          subjects and topics. Efficiently manage each class and customize them according to your 
          educational needs.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-stone-200 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-stone-600 mb-4">Edit, Update, and Delete Content</h3>
        <p className="text-gray-500">
          Seamlessly update and modify class structures, subjects, and topics. You can also delete outdated or 
          unnecessary content, ensuring that your education system remains up-to-date.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-stone-200 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-stone-600 mb-4">Multi-User Management</h3>
        <p className="text-gray-500">
          Manage multiple users with different access roles. Assign and control permissions to various users 
          under your admin dashboard, giving you full control over who can access, update, or delete educational content.
        </p>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default Home;

