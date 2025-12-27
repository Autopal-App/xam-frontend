// app/lecturer/dashboard/page.tsx
"use client";

import { TrendingUp, Users, Award, CheckCircle2, FileText, BarChart2 } from "lucide-react";

export default function LecturerDashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Lecturer Dashboard</h2>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg">
          A
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Total Exams</p>
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">12</p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +3 this month
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Students</p>
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">342</p>
            <p className="text-sm text-green-600 mt-2">Across all courses</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Avg. Score</p>
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">78%</p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +5% from last term
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Completion Rate</p>
              <BarChart2 className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">94%</p>
            <p className="text-sm text-gray-600 mt-2">Of students finished exams</p>
          </div>
        </div>

        {/* Charts + Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Exam Completion Donut Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Exam Completion Status</h3>
            <div className="relative w-64 h-64 mx-auto">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" strokeWidth="36" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="36"
                  strokeDasharray={`${70 * 5.026} 502.6`}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="36"
                  strokeDasharray={`${20 * 5.026} 502.6`}
                  strokeDashoffset={`-${70 * 5.026}`}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E5E7EB" 
                  strokeWidth="36"
                  strokeDasharray={`${10 * 5.026} 502.6`}
                  strokeDashoffset={`-${90 * 5.026}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900"></p>
                  <p className="text-gray-600"></p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-800" />
                <span className="text-sm text-gray-600">Completed <strong>70%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-600">In Progress <strong>20%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
                <span className="text-sm text-gray-600">Not Started <strong>10%</strong></span>
              </div>
            </div>
          </div>

          {/* Recent Activity  */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="flex-1 space-y-6">
              {[
                { text: "Students completed BIO 211 exam", time: "2h ago" },
                { text: "New results available for MAT 111", time: "5h ago" },
                { text: "85% completion rate for EEE 121", time: "1d ago" },
                { text: "Average score improved in PHY 101", time: "2d ago" },
                { text: "New submissions received for CHM 102", time: "3d ago" },
                { text: "Graded quiz for CSC 201", time: "4d ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-gray-900 text-white p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{item.text}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-purple-700 hover:text-purple-800 font-medium">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}