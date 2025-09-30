import React from "react";

export default function CertificationsPage() {
  const certifications = [
    { id: 1, title: "React Certification", description: "Prove your React skills", image: "https://picsum.photos/300/150?cert=1" },
    { id: 2, title: "Python Certification", description: "Validate your Python knowledge", image: "https://picsum.photos/300/150?cert=2" },
    { id: 3, title: "Data Science Certification", description: "Showcase your data skills", image: "https://picsum.photos/300/150?cert=3" },
  ];

  return (
    <div className="font-sans">
      <section className="certifications py-16 bg-gray-100 text-center">
        <h3 className="text-3xl font-bold mb-12">Certifications</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map(cert => (
            <div key={cert.id} className="course-card">
              <img src={cert.image} alt={cert.title} className="course-img" />
              <div className="course-content">
                <h4 className="text-xl font-semibold mb-2">{cert.title}</h4>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <button className="btn-primary">Get Certified</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
