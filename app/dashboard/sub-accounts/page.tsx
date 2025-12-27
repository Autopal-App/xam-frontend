"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2, Mail } from "lucide-react";

export default function SubAccountsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [accountType, setAccountType] = useState<"temp" | "permanent" | null>(null);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const subAccounts = [
    { id: 1, email: "teacher1@example.com", type: "permanent", status: "active" },
    { id: 2, email: "invigilator2@example.com", type: "temp", status: "pending" },
    { id: 3, email: "teacher3@example.com", type: "permanent", status: "active" },
  ];

  const handleCreate = () => {
    if (!accountType || !email) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowCreateModal(false);
      alert(`Invitation sent to ${email} for ${accountType} account`);
      setAccountType(null);
      setEmail("");
    }, 1500);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Sub Accounts</h2>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg">
          A
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Sub Accounts Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Sub Accounts</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Sub Account
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Manage teachers and invigilators for your institution
          </p>

          {/* Sub Accounts Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-900">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-medium">ID</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subAccounts.map((acct) => (
                  <tr key={acct.id} className="border-b border-gray-200">
                    <td className="py-4 px-4">{acct.id}</td>
                    <td className="py-4 px-4">{acct.email}</td>
                    <td className="py-4 px-4 capitalize">{acct.type}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        acct.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {acct.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 flex items-center gap-3">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {subAccounts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-600">
                      No sub accounts yet. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Sub Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create Sub Account</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-8">
              Invite a teacher or invigilator to create a sub account
            </p>

            <div className="space-y-6">
              {/* Account Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setAccountType("temp")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      accountType === "temp" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">Temporary</h4>
                    <p className="text-sm text-gray-600">For short-term access</p>
                  </button>
                  <button
                    onClick={() => setAccountType("permanent")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      accountType === "permanent" ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">Permanent</h4>
                    <p className="text-sm text-gray-600">For ongoing access</p>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="teacher@example.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-10">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={!accountType || !email || isSending}
                onClick={handleCreate}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Invitation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}