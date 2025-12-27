// app/lecturer/exams/page.tsx
"use client";

import { useState } from "react";
import { UploadCloud, X, Plus, FileText, Clock, Calendar, Users, Hash, Eye } from "lucide-react";

export default function LecturerExamsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Form state
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [examType, setExamType] = useState<"examination" | "test">("examination");
  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const [createdExams, setCreatedExams] = useState<any[]>([]); // Will hold created exams

  const isFormValid =
    uploadedFiles.length > 0 &&
    courseName.trim().length > 0 &&
    courseCode.trim().length > 0 &&
    examTitle.trim().length > 0 &&
    durationHours.trim().length > 0 && parseInt(durationHours) >= 0 &&
    durationMinutes.trim().length > 0 && parseInt(durationMinutes) >= 0 && parseInt(durationMinutes) <= 59 &&
    numQuestions.trim().length > 0 && parseInt(numQuestions) > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateExam = () => {
    if (!isFormValid) return;

    const totalMinutes = parseInt(durationHours) * 60 + parseInt(durationMinutes);

    const newExam = {
      id: createdExams.length + 1,
      title: examTitle,
      course: `${courseCode} - ${courseName}`,
      type: examType,
      duration: `${durationHours}h ${durationMinutes}min`,
      questions: parseInt(numQuestions),
      dateCreated: new Date().toLocaleDateString(),
      status: "Draft",
    };

    setCreatedExams([newExam, ...createdExams]);

    alert("Exam created successfully!");

    // Reset form
    setUploadedFiles([]);
    setCourseName("");
    setCourseCode("");
    setExamTitle("");
    setDurationHours("");
    setDurationMinutes("");
    setNumQuestions("");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Exams</h2>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg">
          A
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Create Exam Form - Always Visible */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Exam</h3>

          <div className="space-y-8">
            {/* Upload PDF Section */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Upload Lecture Notes (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">
                <UploadCloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-3">Drag & drop your lecture notes here</p>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="pdf-upload-main"
                />
                <label
                  htmlFor="pdf-upload-main"
                  className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-lg font-medium"
                >
                  <Plus className="w-6 h-6" />
                  Choose PDF Files
                </label>
                <p className="text-sm text-gray-500 mt-4">Multiple files supported • Up to 50MB each</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-4">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-5">
                        <div className="flex items-center gap-4">
                          <FileText className="w-10 h-10 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Exam Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900">Exam Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Introduction to Biology"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. BIO 101"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="e.g. Mid-Semester Examination"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="examType"
                        value="examination"
                        checked={examType === "examination"}
                        onChange={() => setExamType("examination")}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Examination</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="examType"
                        value="test"
                        checked={examType === "test"}
                        onChange={() => setExamType("test")}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Test</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                        placeholder="0"
                        className="w-32 px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">h</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                        placeholder="00"
                        className="w-32 px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">min</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    placeholder="e.g. 50"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                disabled={!isFormValid}
                onClick={handleCreateExam}
                className="px-10 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-lg font-medium"
              >
                Create Exam
              </button>
            </div>
          </div>

          {/* Created Exams List */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Created Exams</h3>

            {createdExams.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No exams created yet</p>
                <p className="text-gray-400 mt-2">Fill the form above to create your first exam</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdExams.map((exam) => (
                  <div key={exam.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 text-lg">{exam.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === "Draft" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                      }`}>
                        {exam.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{exam.course}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {exam.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        {exam.questions} questions
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Created {exam.dateCreated}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                        Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}