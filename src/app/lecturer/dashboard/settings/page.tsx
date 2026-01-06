// app/lecturer/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Edit2, X, Camera, Trash2 } from "lucide-react";
import LecturerAvatar from "@/components/lecturer/avatar";

export default function LecturerSettingsPage() {
  // Editable fields
  const [fullName, setFullName] = useState("Dr. Adebayo Johnson");
  const [email] = useState("adebayo.johnson@university.edu.ng");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [department, setDepartment] = useState("Computer Science");
  const [faculty, setFaculty] = useState("Faculty of Science");

  // Sub-account type
  const [subAccountType] = useState<"permanent" | "temporary">("permanent");

  const [editing, setEditing] = useState({
    fullName: false,
    phone: false,
    department: false,
    faculty: false,
  });

  // Photo states
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Local preview during upload
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // From backend

  // Fetch photo from backend on mount
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch("/api/lecturer/photo");
        if (res.ok) {
          const data = await res.json();
          setPhotoUrl(data.photoUrl || null);
        }
      } catch (err) {
        console.error("Failed to load profile photo");
      }
    };
    fetchPhoto();
  }, []);

  const startEdit = (field: keyof typeof editing) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to backend
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("/api/lecturer/photo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPhotoUrl(data.photoUrl);
        setPhotoPreview(null); // Clear preview after successful upload
      } else {
        alert("Upload failed");
        setPhotoPreview(null);
      }
    } catch (err) {
      alert("Error uploading photo");
      setPhotoPreview(null);
    }
  };

  const removePhoto = async () => {
    setPhotoPreview(null);
    setPhotoUrl(null);

    try {
      await fetch("/api/lecturer/photo", { method: "DELETE" });
    } catch (err) {
      console.error("Failed to remove photo");
    }
  };

  const avatarLetter = fullName.charAt(0).toUpperCase() + (fullName.split(" ")[1]?.charAt(0) || "").toUpperCase();

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <LecturerAvatar size="small" name={fullName} />
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h3>
          <p className="text-gray-600 mb-8">
            Update your personal details and profile photo
          </p>

          {/* Profile Photo */}
          <div className="flex items-center gap-8 mb-10">
            <div className="relative">
              <LecturerAvatar size="large" name={fullName} />
              {(photoUrl || photoPreview) && (
                <button
                  onClick={removePhoto}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <label htmlFor="lecturer-photo-upload" className="cursor-pointer">
                <div className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 inline-flex">
                  <Camera className="w-4 h-4" />
                  Change photo
                </div>
              </label>
              <input
                id="lecturer-photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">Min 400 x 400px, PNG or JPEG formats</p>
            </div>
          </div>

          {/* Profile Fields - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  {fullName}
                </div>
                <button onClick={() => startEdit("fullName")} className="text-gray-500 hover:text-gray-700">
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  {email}
                </div>
                <Edit2 className="w-5 h-5 text-gray-300" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  {phone}
                </div>
                <button onClick={() => startEdit("phone")} className="text-gray-500 hover:text-gray-700">
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  {department}
                </div>
                <button onClick={() => startEdit("department")} className="text-gray-500 hover:text-gray-700">
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Faculty + Sub-Account Type */}
            <div className="grid grid-cols-2 gap-6 col-span-1 md:col-span-2">
              {/* Faculty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    {faculty}
                  </div>
                  <button onClick={() => startEdit("faculty")} className="text-gray-500 hover:text-gray-700">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sub-Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Account Type</label>
                <div className="px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-500" />
                  <p className="font-medium capitalize">{subAccountType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                •••••••••
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-medium text-lg">Delete Account</p>
              <p className="text-gray-600">Permanently delete your lecturer account and all associated data</p>
            </div>
            <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}