import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [privacy, setPrivacy] = useState({ showEmail: true, showPhone: false });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setTwoFactor(data.twoFactorEnabled || false);
        setEmailNotify(data.emailNotifications ?? true);
        setPrivacy({
          showEmail: data.showEmail ?? true,
          showPhone: data.showPhone ?? false,
        });
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleTwoFactor = () => setTwoFactor((prev) => !prev);
  const toggleEmailNotify = () => setEmailNotify((prev) => !prev);
  const togglePrivacy = (field) => setPrivacy((prev) => ({ ...prev, [field]: !prev[field] }));

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center md:text-left w-full md:w-1/3 gap-4">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-600">
            {privacy.showEmail ? user.email : "Email hidden"}
          </p>
          <p className="text-gray-600">
            {privacy.showPhone ? user.phone || "Not set" : "Phone hidden"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Settings & Security */}
        <div className="flex-1 flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Settings & Security</h3>

          <SettingCard
            title="Two-Factor Authentication"
            enabled={twoFactor}
            onToggle={toggleTwoFactor}
          />
          <SettingCard
            title="Email Notifications"
            enabled={emailNotify}
            onToggle={toggleEmailNotify}
          />
          <SettingCard
            title="Show Email"
            enabled={privacy.showEmail}
            onToggle={() => togglePrivacy("showEmail")}
          />
          <SettingCard
            title="Show Phone"
            enabled={privacy.showPhone}
            onToggle={() => togglePrivacy("showPhone")}
          />

          {user.recentActivity?.length > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-gray-100 shadow-inner">
              <h4 className="text-gray-700 font-semibold mb-2">Recent Activity</h4>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                {user.recentActivity.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingCard({ title, enabled, onToggle }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-gray-100 shadow-sm">
      <span className="text-gray-700 font-medium">{title}</span>
      <button
        onClick={onToggle}
        className={`w-14 h-7 rounded-full p-1 flex items-center duration-300 transition ${
          enabled ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
      </button>
    </div>
  );
}
