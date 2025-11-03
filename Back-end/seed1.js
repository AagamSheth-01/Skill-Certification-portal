// ===============================
// 🌱 Skill Certification Portal Seeder (With Pexels API Integration)
// ===============================

import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Course from "./model/Course.js";

// Load environment variables
dotenv.config();

// Fetch a random image from Pexels API based on keyword
async function getPexelsImage(query) {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 1,
      },
    });

    if (response.data.photos.length > 0) {
      return response.data.photos[0].src.large;
    } else {
      return "https://via.placeholder.com/600x400?text=Course+Image";
    }
  } catch (error) {
    console.error(`⚠️ Error fetching image for ${query}:`, error.message);
    return "https://via.placeholder.com/600x400?text=Course+Image";
  }
}

async function seed() {
  try {
    

    // =============================
    // 1️⃣ AI & Machine Learning
    // =============================
    const courseAI = new Course({
      title: "AI for Decision Making and Predictive Analytics",
      fullDescription:
        "This advanced course dives into how artificial intelligence is transforming industries through predictive analytics, automation, and optimization. Students will explore machine learning algorithms, model evaluation, natural language processing, and reinforcement learning. You’ll build AI-driven solutions for finance, healthcare, and business analytics while learning model deployment using Python and cloud-based AI tools.",
      category: "AI & Machine Learning",
      image: await getPexelsImage("artificial intelligence"),
      instructor: {
        name: "Elena Martinez",
        bio: "Senior AI Researcher specializing in predictive analytics, neural networks, and deep learning systems for business automation.",
        avatar: await getPexelsImage("female data scientist portrait"),
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Predictive Analytics Essentials",
          moduleDescription: "Understand supervised learning and model evaluation for business forecasting.",
          lessons: [
            {
              title: "Machine Learning in Business",
              description: "Learn how to leverage data-driven AI systems to make smarter business decisions.",
              videos: [
                { title: "ML Basics", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "Predictive Analytics Notes", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "Regression Models in Practice",
              description: "Dive into linear, logistic, and ridge regression models with real-world datasets.",
              videos: [
                { title: "Regression Explained", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "Regression Models PDF", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
          ],
        },
        {
          moduleTitle: "Module 2: AI Systems and Ethics",
          moduleDescription: "Learn the deployment and ethical considerations in modern AI systems.",
          lessons: [
            {
              title: "AI Deployment Strategies",
              description: "Learn how to deploy AI models on cloud and edge devices efficiently.",
              videos: [
                { title: "Deploying AI", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "AI Deployment Guide", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "Ethical AI and Bias Reduction",
              description: "Understand fairness, transparency, and accountability in machine learning systems.",
              videos: [
                { title: "Ethical AI", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "Ethical AI Notes", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
          ],
        },
      ],
    });
    await courseAI.save();

    // =============================
    // 2️⃣ Cloud & DevOps
    // =============================
    const courseCloud = new Course({
      title: "Cloud Infrastructure Automation with AWS and Docker",
      fullDescription:
        "Learn how to build, automate, and scale infrastructure using AWS, Docker, and Terraform. This course covers containerization, orchestration, and infrastructure as code (IaC). Students will master CI/CD pipelines, system monitoring, and secure cloud deployments that form the backbone of modern DevOps culture.",
      category: "Cloud & DevOps",
      image: await getPexelsImage("cloud computing"),
      instructor: {
        name: "Ravi Mehta",
        bio: "Cloud Solutions Engineer with 10 years of experience in AWS, Docker, and DevOps automation for large-scale enterprises.",
        avatar: await getPexelsImage("male cloud engineer portrait"),
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Containerization & Deployment",
          moduleDescription: "Master Docker, images, and container orchestration using AWS ECS.",
          lessons: [
            {
              title: "Introduction to Containers",
              description: "Understand Docker architecture, images, and how containers revolutionize software deployment.",
              videos: [
                { title: "Docker Fundamentals", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "Docker Handbook", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "Deploying Containers on AWS ECS",
              description: "Hands-on guide to deploying and managing containerized applications in the cloud.",
              videos: [
                { title: "AWS ECS Demo", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "ECS Deployment Notes", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
          ],
        },
        {
          moduleTitle: "Module 2: Infrastructure as Code",
          moduleDescription: "Learn how to automate cloud resources using Terraform and AWS CloudFormation.",
          lessons: [
            {
              title: "Terraform Essentials",
              description: "Build repeatable infrastructure using Terraform configurations and modules.",
              videos: [
                { title: "Terraform Basics", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "Terraform Guide", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "CI/CD in Cloud Environments",
              description: "Implement continuous integration and delivery pipelines using AWS CodePipeline and GitHub Actions.",
              videos: [
                { title: "CI/CD Overview", url: "https://skill-certification-portal.onrender.com/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "CI/CD Workflow Notes", url: "https://skill-certification-portal.onrender.com/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
          ],
        },
      ],
    });
    await courseCloud.save();

    // You can repeat this same richer structure for the remaining 4 categories:
    // 3️⃣ Web Development
    // 4️⃣ Frontend
    // 5️⃣ Programming
    // 6️⃣ Design

    console.log("✅ AI & Cloud courses seeded with Pexels integration!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
}

// ===============================
// 🚀 MAIN EXECUTION
// ===============================
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
    await seed();
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

main();
