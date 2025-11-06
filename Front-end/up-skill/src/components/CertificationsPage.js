import React, { useEffect, useState } from "react";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_BACK_END_URL;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/certificates`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error("❌ Error fetching certificates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [API_URL]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading certificates...</p>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        ⚠️ {error}
      </div>
    );

  if (!certificates.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        You have not earned any certificates yet.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎓 My Certificates</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert._id}
            className="border rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden bg-white"
          >
            {/* Preview box */}
            <div className="bg-yellow-50 p-4 flex flex-col items-center justify-center h-48">
              <h2 className="font-bold text-lg mb-2 text-center">
                {cert.course?.title || "Unknown Course"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Issued: {new Date(cert.dateIssued).toLocaleDateString()}
              </p>
              <div className="w-full h-24 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 text-sm">
                Certificate Preview
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 text-center">
              {cert.certificateUrl ? (
                <a
                  href={`${API_URL}${cert.certificateUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View / Download
                </a>
              ) : (
                <span className="text-red-500">Certificate file not available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
