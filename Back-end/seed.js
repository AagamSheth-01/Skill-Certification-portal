
import mongoose from "mongoose";

import Course from "./model/Course.js"
import { configDotenv } from "dotenv";
mongoose
  .connect("mongodb://localhost:27017/upskill")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error(err));

async function seed() {
  await Course.deleteMany({});

 const course = new Course({
  id: "ai-ml-101",
  title: "AI & Machine Learning Mastery",
  fullDescription: "A comprehensive year-long course to master AI & Machine Learning from basics to advanced topics.",
  category: "AI & ML",
  image: "https://picsum.photos/300/150?random=87",
  instructor: {
    name: "Dr. Hannah Green",
    bio: "AI policy researcher and ML practitioner with 10+ years of experience.",
    avatar: "https://picsum.photos/100/100?random=187",
  },
  curriculum: [
    {
      moduleTitle: "Module 1: Introduction to AI",
      moduleDescription: "Understand AI history, concepts, and applications.",
      lessons: [
        { title: "What is AI?", description: "Overview of Artificial Intelligence.", videos: [{ title: "AI Intro", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }], materials: [{ title: "AI PDF Notes", url: "#" }], quiz: true },
        { title: "History of AI", description: "Learn the evolution of AI.", videos: [{ title: "History Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }], materials: [], quiz: true },
        { title: "AI vs ML vs DL", description: "Differences between AI, Machine Learning, and Deep Learning.", videos: [{ title: "Differences Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }], materials: [], quiz: true },
        { title: "Applications of AI", description: "Real-world applications of AI.", videos: [], materials: [], quiz: true },
        { title: "AI Ethics", description: "Ethical challenges in AI.", videos: [], materials: [], quiz: true },
        { title: "AI in Industry", description: "AI applications in business and technology.", videos: [], materials: [], quiz: true },
        { title: "AI Tools Overview", description: "Introduction to popular AI tools and frameworks.", videos: [], materials: [], quiz: true },
        { title: "Future of AI", description: "Upcoming trends in AI.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 2: Python for AI",
      moduleDescription: "Learn Python programming specifically for AI applications.",
      lessons: [
        { title: "Python Basics", description: "Variables, loops, and functions.", videos: [], materials: [], quiz: true },
        { title: "Data Structures", description: "Lists, dictionaries, tuples, sets.", videos: [], materials: [], quiz: true },
        { title: "NumPy & Pandas", description: "Handling arrays and datasets.", videos: [], materials: [], quiz: true },
        { title: "Data Visualization", description: "Matplotlib, Seaborn basics.", videos: [], materials: [], quiz: true },
        { title: "File Handling", description: "Reading and writing files.", videos: [], materials: [], quiz: true },
        { title: "Python Functions & OOP", description: "Functions, classes, and objects.", videos: [], materials: [], quiz: true },
        { title: "Libraries for AI", description: "Scikit-learn, TensorFlow, PyTorch overview.", videos: [], materials: [], quiz: true },
        { title: "Python Projects", description: "Mini project for hands-on practice.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 3: Math for Machine Learning",
      moduleDescription: "Build a strong foundation in math concepts for ML.",
      lessons: [
        { title: "Linear Algebra Basics", description: "Vectors, matrices, operations.", videos: [], materials: [], quiz: true },
        { title: "Calculus Basics", description: "Derivatives, gradients.", videos: [], materials: [], quiz: true },
        { title: "Probability & Statistics", description: "Probability, distributions, mean, variance.", videos: [], materials: [], quiz: true },
        { title: "Linear Regression Math", description: "Cost function and optimization.", videos: [], materials: [], quiz: true },
        { title: "Matrix Operations in ML", description: "Eigenvalues, eigenvectors, transformations.", videos: [], materials: [], quiz: true },
        { title: "Gradient Descent", description: "Optimization algorithms.", videos: [], materials: [], quiz: true },
        { title: "ML Math Summary", description: "Integrating math with ML algorithms.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 4: Data Preprocessing",
      moduleDescription: "Prepare datasets for machine learning models.",
      lessons: [
        { title: "Data Cleaning", description: "Handling missing values, outliers.", videos: [], materials: [], quiz: true },
        { title: "Feature Scaling", description: "Normalization, standardization.", videos: [], materials: [], quiz: true },
        { title: "Feature Encoding", description: "One-hot, label encoding.", videos: [], materials: [], quiz: true },
        { title: "Train-Test Split", description: "Separating datasets for training.", videos: [], materials: [], quiz: true },
        { title: "Data Augmentation", description: "Expanding datasets.", videos: [], materials: [], quiz: true },
        { title: "Handling Imbalanced Data", description: "Techniques to balance datasets.", videos: [], materials: [], quiz: true },
        { title: "Data Preprocessing Project", description: "Hands-on project.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 5: Supervised Learning",
      moduleDescription: "Learn algorithms where outputs are known.",
      lessons: [
        { title: "Linear Regression", description: "Predict continuous values.", videos: [], materials: [], quiz: true },
        { title: "Logistic Regression", description: "Binary classification.", videos: [], materials: [], quiz: true },
        { title: "Decision Trees", description: "Tree-based models.", videos: [], materials: [], quiz: true },
        { title: "Random Forests", description: "Ensemble of trees.", videos: [], materials: [], quiz: true },
        { title: "Support Vector Machines", description: "Classification boundaries.", videos: [], materials: [], quiz: true },
        { title: "K-Nearest Neighbors", description: "Instance-based learning.", videos: [], materials: [], quiz: true },
        { title: "Supervised Learning Project", description: "End-to-end implementation.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 6: Unsupervised Learning",
      moduleDescription: "Learn algorithms where outputs are not labeled.",
      lessons: [
        { title: "Clustering Basics", description: "K-Means, Hierarchical.", videos: [], materials: [], quiz: true },
        { title: "PCA & Dimensionality Reduction", description: "Reduce dataset complexity.", videos: [], materials: [], quiz: true },
        { title: "Anomaly Detection", description: "Detect outliers.", videos: [], materials: [], quiz: true },
        { title: "Association Rules", description: "Market basket analysis.", videos: [], materials: [], quiz: true },
        { title: "Unsupervised Learning Project", description: "Hands-on clustering project.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 7: Neural Networks",
      moduleDescription: "Introduction to artificial neural networks and deep learning.",
      lessons: [
        { title: "Perceptron", description: "Basic building block of NN.", videos: [], materials: [], quiz: true },
        { title: "Activation Functions", description: "ReLU, Sigmoid, Tanh.", videos: [], materials: [], quiz: true },
        { title: "Forward & Backpropagation", description: "How networks learn.", videos: [], materials: [], quiz: true },
        { title: "Deep Neural Networks", description: "Stacked layers for complex learning.", videos: [], materials: [], quiz: true },
        { title: "Overfitting & Regularization", description: "Prevent overfitting.", videos: [], materials: [], quiz: true },
        { title: "Neural Network Project", description: "Simple NN from scratch.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 8: CNNs & Computer Vision",
      moduleDescription: "Learn convolutional neural networks for image tasks.",
      lessons: [
        { title: "Intro to CNNs", description: "Convolution layers explained.", videos: [], materials: [], quiz: true },
        { title: "Pooling Layers", description: "Max and Average pooling.", videos: [], materials: [], quiz: true },
        { title: "CNN Architectures", description: "LeNet, AlexNet, ResNet.", videos: [], materials: [], quiz: true },
        { title: "Image Classification Project", description: "Build CNN for images.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 9: RNNs & NLP",
      moduleDescription: "Sequence models and natural language processing.",
      lessons: [
        { title: "Intro to RNNs", description: "Recurrent networks basics.", videos: [], materials: [], quiz: true },
        { title: "LSTM & GRU", description: "Advanced sequence models.", videos: [], materials: [], quiz: true },
        { title: "Word Embeddings", description: "Word2Vec, GloVe.", videos: [], materials: [], quiz: true },
        { title: "NLP Project", description: "Text classification project.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 10: Reinforcement Learning",
      moduleDescription: "Learn agents and rewards systems.",
      lessons: [
        { title: "RL Basics", description: "Introduction to agents and environment.", videos: [], materials: [], quiz: true },
        { title: "Markov Decision Processes", description: "Mathematical foundation.", videos: [], materials: [], quiz: true },
        { title: "Q-Learning", description: "Value-based RL algorithm.", videos: [], materials: [], quiz: true },
        { title: "RL Project", description: "Simple agent implementation.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 11: AI Ethics & Deployment",
      moduleDescription: "Responsible AI and production deployment.",
      lessons: [
        { title: "Ethics in AI", description: "Bias, fairness, transparency.", videos: [], materials: [], quiz: true },
        { title: "AI in Industry", description: "Real-world use cases.", videos: [], materials: [], quiz: true },
        { title: "Model Deployment Basics", description: "Flask, FastAPI deployment.", videos: [], materials: [], quiz: true },
        { title: "Monitoring & Maintenance", description: "Keep AI models running safely.", videos: [], materials: [], quiz: true },
      ],
    },
    {
      moduleTitle: "Module 12: Capstone Project",
      moduleDescription: "Apply all knowledge to a full-fledged AI project.",
      lessons: [
        { title: "Project Proposal", description: "Choose topic and scope.", videos: [], materials: [], quiz: true },
        { title: "Data Collection & Preprocessing", description: "Prepare data for project.", videos: [], materials: [], quiz: true },
        { title: "Model Training", description: "Train your models.", videos: [], materials: [], quiz: true },
        { title: "Evaluation & Optimization", description: "Measure performance & improve.", videos: [], materials: [], quiz: true },
        { title: "Final Presentation", description: "Present your AI project.", videos: [], materials: [], quiz: true },
      ],
    },
    ],
    });

  await course.save();
  console.log("AI Ethics course seeded successfully!");
  mongoose.connection.close();
}

seed();
