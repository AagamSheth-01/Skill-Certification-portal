
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const courses = [
  
     {
    title: "Natural Language Processing with Transformers",
    description: "Master Hugging Face and transformer-based NLP.",
    fullDescription: "Covers tokenization, BERT, GPT, and fine-tuning custom models.",
    category: "AI & ML",
    image: "https://picsum.photos/300/150?random=69",
    curriculum: [
      { title: "Transformer Basics", description: "Attention mechanism and architecture." },
      { title: "Hugging Face", description: "Pre-trained models and tokenizers." },
      { title: "Fine-Tuning", description: "Custom NLP tasks with BERT & GPT." },
    ],
    instructor: {
      name: "Maya Johnson",
      bio: "AI researcher specializing in NLP and transformers.",
      avatar: "https://picsum.photos/100/100?random=169",
    },
  },
  {
    title: "Generative Adversarial Networks (GANs)",
    description: "Build and train GANs for image generation.",
    fullDescription: "Covers GAN architecture, DCGAN, StyleGAN, and CycleGAN.",
    category: "AI & ML",
    image: "https://picsum.photos/300/150?random=70",
    curriculum: [
      { title: "GAN Basics", description: "Discriminator vs Generator networks." },
      { title: "Image GANs", description: "DCGAN, StyleGAN applications." },
      { title: "Advanced GANs", description: "CycleGAN, conditional GANs." },
    ],
    instructor: {
      name: "James Peterson",
      bio: "Deep learning engineer and generative models specialist.",
      avatar: "https://picsum.photos/100/100?random=170",
    },
  },
  {
    title: "MLOps & Model Deployment",
    description: "Take ML models from training to production.",
    fullDescription: "Covers Docker, Kubernetes, MLflow, and monitoring.",
    category: "AI & ML",
    image: "https://picsum.photos/300/150?random=71",
    curriculum: [
      { title: "MLOps Basics", description: "Pipeline automation and versioning." },
      { title: "Deployment", description: "Docker, Kubernetes, REST APIs." },
      { title: "Monitoring", description: "Model drift and retraining." },
    ],
    instructor: {
      name: "Sophia Rivera",
      bio: "MLOps engineer with expertise in production AI systems.",
      avatar: "https://picsum.photos/100/100?random=171",
    },
  },
  {
    title: "Quantum Computing Fundamentals",
    description: "Explore qubits, gates, and algorithms in quantum computing.",
    fullDescription: "Covers Qiskit, superposition, entanglement, and quantum algorithms.",
    category: "Emerging Tech",
    image: "https://picsum.photos/300/150?random=72",
    curriculum: [
      { title: "Qubits & Gates", description: "Superposition, entanglement, measurement." },
      { title: "Qiskit Basics", description: "Quantum circuits and simulators." },
      { title: "Quantum Algorithms", description: "Grover’s and Shor’s algorithm." },
    ],
    instructor: {
      name: "Arjun Patel",
      bio: "Quantum researcher and IBM Qiskit advocate.",
      avatar: "https://picsum.photos/100/100?random=172",
    },
  },
  {
    title: "Edge AI & IoT",
    description: "Run AI models on IoT devices and edge hardware.",
    fullDescription: "Covers TensorFlow Lite, Raspberry Pi, and microcontrollers.",
    category: "IoT & Hardware",
    image: "https://picsum.photos/300/150?random=73",
    curriculum: [
      { title: "IoT Basics", description: "Edge devices and data pipelines." },
      { title: "Edge AI Models", description: "TensorFlow Lite, ONNX models." },
      { title: "Deployment", description: "AI on Raspberry Pi and Arduino." },
    ],
    instructor: {
      name: "Hiroshi Nakamura",
      bio: "IoT innovator integrating AI into real-world devices.",
      avatar: "https://picsum.photos/100/100?random=173",
    },
  },
  {
    title: "Embedded Systems with ARM Cortex",
    description: "Design and program embedded systems using ARM processors.",
    fullDescription: "Covers ARM architecture, RTOS, and hardware interfacing.",
    category: "IoT & Hardware",
    image: "https://picsum.photos/300/150?random=74",
    curriculum: [
      { title: "ARM Basics", description: "Instruction set and architecture." },
      { title: "RTOS", description: "Real-time operating system concepts." },
      { title: "Peripherals", description: "GPIO, UART, SPI, and I2C." },
    ],
    instructor: {
      name: "Chen Wei",
      bio: "Embedded systems engineer with 12+ years of ARM expertise.",
      avatar: "https://picsum.photos/100/100?random=174",
    },
  },
  {
    title: "Robotics with ROS",
    description: "Learn Robot Operating System (ROS) for robotics projects.",
    fullDescription: "Covers navigation, SLAM, and robotic arm control.",
    category: "Robotics",
    image: "https://picsum.photos/300/150?random=75",
    curriculum: [
      { title: "ROS Basics", description: "Nodes, topics, services." },
      { title: "Navigation & SLAM", description: "Path planning and mapping." },
      { title: "Robot Control", description: "Arms, grippers, and sensors." },
    ],
    instructor: {
      name: "Clara Schmidt",
      bio: "Robotics engineer and ROS community contributor.",
      avatar: "https://picsum.photos/100/100?random=175",
    },
  },
  {
    title: "Autonomous Vehicles Engineering",
    description: "Build perception and control systems for self-driving cars.",
    fullDescription: "Covers sensors, computer vision, and path planning.",
    category: "Robotics",
    image: "https://picsum.photos/300/150?random=76",
    curriculum: [
      { title: "Sensors", description: "Lidar, cameras, and radar." },
      { title: "Perception", description: "Computer vision and detection." },
      { title: "Control Systems", description: "Path planning and decision making." },
    ],
    instructor: {
      name: "David Kim",
      bio: "Autonomous vehicle researcher and AI engineer.",
      avatar: "https://picsum.photos/100/100?random=176",
    },
  },
  {
    title: "Game Development with Unity",
    description: "Build 2D and 3D games using Unity.",
    fullDescription: "Covers Unity engine, physics, C# scripting, and multiplayer.",
    category: "Game Dev",
    image: "https://picsum.photos/300/150?random=77",
    curriculum: [
      { title: "Unity Basics", description: "Scenes, assets, physics engine." },
      { title: "C# Scripting", description: "Gameplay programming in C#." },
      { title: "Multiplayer", description: "Networking and online play." },
    ],
    instructor: {
      name: "Lucas Evans",
      bio: "Game developer with 10+ years of Unity experience.",
      avatar: "https://picsum.photos/100/100?random=177",
    },
  },
  {
    title: "Game Development with Unreal Engine",
    description: "Master game design with Unreal Engine and Blueprints.",
    fullDescription: "Covers environment design, gameplay scripting, and VR integration.",
    category: "Game Dev",
    image: "https://picsum.photos/300/150?random=78",
    curriculum: [
      { title: "Unreal Basics", description: "Engine setup and UI." },
      { title: "Blueprints", description: "Visual scripting in Unreal." },
      { title: "VR Games", description: "Immersive VR/AR game development." },
    ],
    instructor: {
      name: "Emma Collins",
      bio: "Unreal Engine specialist and VR game designer.",
      avatar: "https://picsum.photos/100/100?random=178",
    },
  },
  {
    title: "UI/UX Design with Figma",
    description: "Design modern, responsive user interfaces with Figma.",
    fullDescription: "Covers wireframing, prototyping, and design systems.",
    category: "Design",
    image: "https://picsum.photos/300/150?random=79",
    curriculum: [
      { title: "Figma Basics", description: "Wireframes and design tools." },
      { title: "Prototyping", description: "Clickable prototypes and flows." },
      { title: "Design Systems", description: "Reusable components and styles." },
    ],
    instructor: {
      name: "Nora Williams",
      bio: "Product designer focusing on UX/UI for web and apps.",
      avatar: "https://picsum.photos/100/100?random=179",
    },
  },
  {
    title: "Human-Computer Interaction",
    description: "Study how people interact with technology.",
    fullDescription: "Covers usability testing, accessibility, and cognitive models.",
    category: "Design",
    image: "https://picsum.photos/300/150?random=80",
    curriculum: [
      { title: "HCI Basics", description: "User-centered design principles." },
      { title: "Accessibility", description: "Designing for all users." },
      { title: "Usability Testing", description: "Evaluating real user interactions." },
    ],
    instructor: {
      name: "Ahmed Hassan",
      bio: "HCI researcher and UX design consultant.",
      avatar: "https://picsum.photos/100/100?random=180",
    },
  },
  {
    title: "Agile Project Management",
    description: "Manage projects with Agile and Scrum.",
    fullDescription: "Covers sprints, backlog management, and Agile frameworks.",
    category: "Management",
    image: "https://picsum.photos/300/150?random=81",
    curriculum: [
      { title: "Agile Basics", description: "Principles and values." },
      { title: "Scrum Framework", description: "Roles, events, and artifacts." },
      { title: "Scaling Agile", description: "Agile in large organizations." },
    ],
    instructor: {
      name: "Olivia Brown",
      bio: "Certified Scrum Master and project management trainer.",
      avatar: "https://picsum.photos/100/100?random=181",
    },
  },
  {
    title: "Lean Startup & Business Innovation",
    description: "Learn to build innovative businesses with lean startup methods.",
    fullDescription: "Covers MVP, customer validation, and growth strategies.",
    category: "Business",
    image: "https://picsum.photos/300/150?random=82",
    curriculum: [
      { title: "Lean Startup Basics", description: "MVP and validation." },
      { title: "Pivot & Growth", description: "Scaling and market adaptation." },
      { title: "Innovation Models", description: "Blue ocean strategy and disruption." },
    ],
    instructor: {
      name: "Marcus Allen",
      bio: "Startup advisor and innovation strategist.",
      avatar: "https://picsum.photos/100/100?random=182",
    },
  },
  {
    title: "Financial Modeling & Valuation",
    description: "Master financial models for investment decisions.",
    fullDescription: "Covers DCF, comparables, and business valuation.",
    category: "Finance",
    image: "https://picsum.photos/300/150?random=83",
    curriculum: [
      { title: "Modeling Basics", description: "Excel and financial assumptions." },
      { title: "Valuation Methods", description: "DCF, multiples, comparables." },
      { title: "Case Studies", description: "Valuing startups and enterprises." },
    ],
    instructor: {
      name: "Isabel Torres",
      bio: "Investment analyst with expertise in valuation.",
      avatar: "https://picsum.photos/100/100?random=183",
    },
  },
  {
    title: "Supply Chain & Operations Management",
    description: "Optimize supply chains and operations with data-driven methods.",
    fullDescription: "Covers logistics, inventory, and ERP systems.",
    category: "Business",
    image: "https://picsum.photos/300/150?random=84",
    curriculum: [
      { title: "Supply Chain Basics", description: "Logistics and flow management." },
      { title: "Inventory & ERP", description: "SAP, Oracle systems." },
      { title: "Optimization", description: "AI-driven supply chain." },
    ],
    instructor: {
      name: "Ravi Kumar",
      bio: "Operations strategist with 15+ years in global supply chains.",
      avatar: "https://picsum.photos/100/100?random=184",
    },
  },
  {
    title: "Healthcare Data Analytics",
    description: "Analyze and manage healthcare data for better outcomes.",
    fullDescription: "Covers EHR systems, predictive analytics, and privacy compliance.",
    category: "Healthcare Tech",
    image: "https://picsum.photos/300/150?random=85",
    curriculum: [
      { title: "Healthcare Data", description: "EHR, medical records." },
      { title: "Analytics", description: "Predictive models for healthcare." },
      { title: "Privacy", description: "HIPAA, GDPR in healthcare." },
    ],
    instructor: {
      name: "Elena Novak",
      bio: "Healthcare data scientist working with predictive models.",
      avatar: "https://picsum.photos/100/100?random=185",
    },
  },
  {
    title: "AI in Finance & Trading",
    description: "Apply AI techniques in finance, trading, and risk management.",
    fullDescription: "Covers algorithmic trading, risk modeling, and portfolio optimization.",
    category: "Finance",
    image: "https://picsum.photos/300/150?random=86",
    curriculum: [
      { title: "Algo Trading", description: "Backtesting and strategies." },
      { title: "Risk Modeling", description: "Monte Carlo simulations." },
      { title: "Portfolio AI", description: "Optimizing with reinforcement learning." },
    ],
    instructor: {
      name: "Victor Hernandez",
      bio: "Quant researcher specializing in AI-driven trading systems.",
      avatar: "https://picsum.photos/100/100?random=186",
    },
  },
  {
    title: "AI Ethics & Responsible AI",
    description: "Learn ethical challenges and frameworks for responsible AI.",
    fullDescription: "Covers bias, fairness, privacy, and AI governance.",
    category: "AI & ML",
    image: "https://picsum.photos/300/150?random=87",
    curriculum: [
      { title: "AI Bias", description: "Sources and mitigation strategies." },
      { title: "Fairness", description: "Ethical frameworks and fairness metrics." },
      { title: "Governance", description: "AI regulation and responsible design." },
    ],
    instructor: {
      name: "Hannah Green",
      bio: "AI policy researcher focusing on ethics and governance.",
      avatar: "https://picsum.photos/100/100?random=187",
    },
  },
];

export default courses;






