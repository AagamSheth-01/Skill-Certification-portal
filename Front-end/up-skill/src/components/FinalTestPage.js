import React, { useEffect, useState } from "react";

export default function FinalTestPage({ courseId, onPass, onFail }) {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_BACK_END_URL;

  // 🧩 Fetch test from backend
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/tests/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load test");
        const data = await res.json();

        if (!data.questions || data.questions.length === 0) {
          throw new Error("No questions available for this course");
        }

        setTest(data);
      } catch (err) {
        console.error("❌ Error fetching test:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [API_URL, courseId]);

  const handleSelect = (qIndex, optionIndex) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
    }
  };

  // 🧮 Let backend do grading
  const handleSubmit = async () => {
  if (!test) return;

  const formattedAnswers = Object.entries(answers).map(
    ([qIndex, selectedOption]) => ({
      questionId: test.questions[qIndex]._id,
      selectedOption,
    })
  );

  try {
    const res = await fetch(`${API_URL}/api/tests/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ courseId, answers: formattedAnswers }),
    });

    const data = await res.json(); // ✅ now it will be proper JSON
    if (!res.ok) throw new Error(data.message || "Submission failed");

    const percentage = (data.score / data.total) * 100;
    setScore(percentage);
    setSubmitted(true);

    if (percentage >= 60) onPass?.();
    else onFail?.();
  } catch (err) {
    console.error("❌ Error submitting test:", err);
    setError(err.message);
  }
};


  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading test...</p>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        ⚠️ {error}
      </div>
    );

  if (!test)
    return (
      <div className="text-center mt-10 text-gray-500">
        No test found for this course.
      </div>
    );

  const handleGoBack = () => {
    window.history.back(); // or navigate(-1) if using React Router
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🧠 Final Certification Test
      </h1>

      {test.questions.map((q, i) => (
        <div key={i} className="mb-6 border-b pb-4">
          <p className="font-semibold text-lg mb-2 text-gray-700">
            {i + 1}. {q.questionText}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className={`block p-2 rounded-lg border cursor-pointer transition ${
                  answers[i] === idx
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${i}`}
                  className="mr-2"
                  checked={answers[i] === idx}
                  onChange={() => handleSelect(i, idx)}
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
        >
          Submit Test
        </button>
      ) : (
        <div className="text-center mt-6">
          <p className="text-lg">
            You scored <strong>{score.toFixed(1)}%</strong>
          </p>
          {score >= 60 ? (
            <p className="text-green-600 font-semibold mt-2">
              🎉 Congratulations! You passed the test.
            </p>
          ) : (
            <div className="mt-4">
              <p className="text-red-600 font-semibold mb-4">
                ❌ You did not pass. Please try again later.
              </p>
              <button
                onClick={handleGoBack}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                ← Go Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
