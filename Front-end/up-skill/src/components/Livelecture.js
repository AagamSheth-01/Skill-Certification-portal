// LiveLectureSection.jsx

import React, { useState } from "react";

export default function LiveLectureSection({ courseId }) {
  // Mock live lectures data
  const mockLectures = [
    {
      id: "lec1",
      title: "Live AI Basics",
      schedule: "2025-10-03 10:00 AM",
      instructor: "Dr. Hannah Green",
      link: "#", // Placeholder
    },
    {
      id: "lec2",
      title: "ML Advanced Techniques",
      schedule: "2025-10-05 2:00 PM",
      instructor: "Dr. Hannah Green",
      link: "#",
    },
  ];

  const [lectures, setLectures] = useState(mockLectures);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setChatMessages(prev => [...prev, { user: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Lectures & Chat</h2>

      Live lecture schedule
      <div className="mb-4">
        {lectures.map(lec => (
          <div key={lec.id} className="p-3 mb-2 bg-white rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{lec.title}</p>
              <p className="text-gray-600 text-sm">{lec.schedule}</p>
              <p className="text-gray-500 text-sm">Instructor: {lec.instructor}</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Join
            </button>
          </div>
        ))}
      </div>

      {/* Chat section */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Live Chat</h3>
        <div className="border p-2 h-40 overflow-y-auto bg-white rounded">
          {chatMessages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          ) : (
            chatMessages.map((msg, idx) => (
              <p key={idx} className="text-sm">
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))
          )}
        </div>
        <div className="flex mt-2 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="flex-1 border rounded px-2 py-1"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
