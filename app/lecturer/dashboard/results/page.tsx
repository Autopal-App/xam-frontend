// app/lecturer/results/page.tsx
"use client";

import { useState } from "react";
import { Download, Eye, Users, TrendingUp, Award, FileText } from "lucide-react";

export default function LecturerResultsPage() {
  const [selectedExam, setSelectedExam] = useState("all");

  const exams = [
    { id: 1, title: "BIO 211 Mid-Semester Exam", date: "Nov 15, 2025", students: 120, avgScore: 78 },
    { id: 2, title: "MAT 111 Final Test", date: "Oct 20, 2025", students: 85, avgScore: 82 },
    { id: 3, title: "EEE 121 Quiz", date: "Sep 30, 2025", students: 150, avgScore: 65 },
  ];

  const recentResults = [
    { student: "Adebayo Johnson", score: 92, status: "Top performer" },
    { student: "Chioma Okeke", score: 88, status: "Excellent" },
    { student: "Emeka Nwosu", score: 45, status: "Needs review" },
    { student: "Fatima Ali", score: 76, status: "Good" },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Results</h2>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg">
          A
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Total Submissions</p>
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">355</p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12% this month
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Average Score</p>
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">75%</p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8% improvement
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Top Performers</p>
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-600 mt-2">Scored 90%+</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Pending Review</p>
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-gray-900">7</p>
            <p className="text-sm text-gray-600 mt-2">Manual grading needed</p>
          </div>
        </div>

        {/* Exam Results Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Exam Results Overview</h3>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Exams</option>
              <option value="bio211">BIO 211</option>
              <option value="mat111">MAT 111</option>
              <option value="eee121">EEE 121</option>
            </select>
          </div>

          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{exam.date} • {exam.students} students</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{exam.avgScore}%</p>
                    <p className="text-sm text-gray-600">Average score</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Student Results */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Student Results</h3>
          <div className="space-y-4">
            {recentResults.map((result, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                    {result.student.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{result.student}</p>
                    <p className="text-sm text-gray-600">{result.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{result.score}%</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-purple-700 hover:text-purple-800 font-medium">
              View all results →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}