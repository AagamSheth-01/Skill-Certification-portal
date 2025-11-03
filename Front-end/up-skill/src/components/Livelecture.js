import React, { useState, useEffect } from "react";

export default function LiveLectureSection({ courseId }) {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [lectures, setLectures] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch live lectures for the course
  useEffect(() => {
    fetch(`${host}/api/livelectures/course/${courseId}`)
      .then(res => res.json())
      .then(data => setLectures(data))
      .catch(err => console.error("Error fetching live lectures:", err));
  }, [courseId]);

  // Fetch chat messages for selected lecture
  useEffect(() => {
    if (!selectedLecture) return;
    fetch(`${host}/api/livelectures/${selectedLecture._id}/chat`)
      .then(res => res.json())
      .then(data => setChatMessages(data))
      .catch(err => console.error("Error fetching chat:", err));
  }, [selectedLecture]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedLecture) return;

    const userId = localStorage.getItem("userId"); // or from user context
    const userName = localStorage.getItem("userName");

    const payload = { userId, userName, message: newMessage };

    try {
      const res = await fetch(`${host}/api/livelectures/${selectedLecture._id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setChatMessages(data);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Lectures & Chat</h2>

      {/* Lecture List */}
      <div className="mb-4">
        {lectures.length === 0 && <p>No live lectures scheduled.</p>}
        {lectures.map(lec => (
          <div
            key={lec._id}
            className={`p-3 mb-2 rounded shadow flex justify-between items-center cursor-pointer ${
              selectedLecture?._id === lec._id ? "bg-blue-100" : "bg-white"
            }`}
            onClick={() => setSelectedLecture(lec)}
          >
            <div>
              <p className="font-semibold">{lec.title}</p>
              <p className="text-gray-600 text-sm">
                {new Date(lec.startTime).toLocaleString()} - {new Date(lec.endTime).toLocaleTimeString()}
              </p>
              <p className="text-gray-500 text-sm">Instructor: {lec.instructorId}</p>
            </div>
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Join
            </button>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      {selectedLecture && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Live Chat for "{selectedLecture.title}"</h3>
          <div className="border p-2 h-40 overflow-y-auto bg-white rounded mb-2">
            {chatMessages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet.</p>
            ) : (
              chatMessages.map((msg, idx) => (
                <p key={idx} className="text-sm">
                  <strong>{msg.userName}:</strong> {msg.message}
                </p>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
      )}
    </div>
  );
}
