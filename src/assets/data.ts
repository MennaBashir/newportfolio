import { ASSETS } from "./assets";

export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Tech Stack", path: "/tech-stack" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Achievements", path: "/achievements" },
  { label: "Contact", path: "/contact" },
] as const;

export const TYPING_WORDS = ["Fast Mobile Apps", "Smooth Web UIs"];

export const HERO_BADGES = [
  "B.Sc. Information Technology",
  "GitLab Contributor",
  "AboutCode Contributor",
  "NASA Space Apps Winner",
];

export const TECH_STACK = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Expo", color: "#FFFFFF" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "Framer Motion", color: "#FF0055" },
  { name: "Node.js", color: "#5FA04E" },
  { name: "Ruby on Rails", color: "#CC0000" },
  { name: "GraphQL", color: "#E10098" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#A259FF" },
];

export const TECH_GROUPS = [
  {
    id: "main",
    label: "Main Stack",
    badge: "Core Engineering",
    accentColor: "#22d3ee",
    gridArea: "main",
    techs: [
      { name: "React", color: "#61dafb" },
      { name: "Next.js", color: "#FFFFFF" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    badge: "Foundation",
    accentColor: "#60a5fa",
    gridArea: "languages",
    techs: [
      { name: "TypeScript", color: "#60a5fa" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "C++", color: "#00599C" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    badge: "Platform",
    accentColor: "#a78bfa",
    gridArea: "mobile",
    techs: [
      { name: "React Native", color: "#61dafb" },
      { name: "Expo", color: "#FFFFFF" },
    ],
  },
  {
    id: "state",
    label: "State Management",
    badge: "Complex Data Flow",
    accentColor: "#764ABC",
    gridArea: "state",
    techs: [
      { name: "Redux Toolkit", color: "#764ABC" },
      { name: "Zustand", color: "#a78bfa" },
      { name: "Recoil", color: "#3578E5" },
    ],
  },
  {
    id: "design",
    label: "Design Systems & UI",
    badge: "User Experience",
    accentColor: "#f472b6",
    gridArea: "design",
    techs: [
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Framer Motion", color: "#FF0055" },
      { name: "Shadcn/UI", color: "#FFFFFF" },
      { name: "Material UI", color: "#007FFF" },
      // { name: "Bootstrap", color: "#7952B3" },
    ],
  },
  {
    id: "tools",
    label: "Platform & Tools",
    badge: "Infrastructure",
    accentColor: "#f87171",
    gridArea: "tools",
    techs: [
      { name: "Docker", color: "#2496ED" },
      { name: "Git", color: "#F05032" },
      { name: "GitHub", color: "#ffffff" },
      { name: "GitLab", color: "#FC6D26" },
    ],
  },
];

export const PROJECTS = [
  {
    title: "Bosla",
    description:
      "A cutting-edge AI-powered learning platform designed to revolutionize the way students approach programming education. Bosla leverages advanced machine learning algorithms to analyze individual learning styles, strengths, and weaknesses, providing personalized learning paths and resources tailored to each student's unique needs. With an intuitive interface and interactive features, Bosla empowers students to master programming concepts efficiently and effectively, fostering a deeper understanding and accelerating their learning journey.",
    category: "React/Next.js",
    tech: [
      "React",
      "React Query",
      "Tailwind CSS",
      "Framer Motion",
      "AI Integration",
    ],
    featured: true,
    status: "in-progress" as const,
    image: ASSETS.bosla,
    github: "not available",
    demo: "https://front.bosla.almiraj.xyz/",
  },
  {
    title: "Jawamk",
    description:
      "A modern website for Jawamk, a company specializing in graphic design, digital marketing and web development, site showcasing their projects and services, a blog for news and articles, an about us section detailing company , and a testimonials section displaying customer reviews and feedback.",
    category: "React/Next.js",
    tech: [
      "React",
      "Shadcn/UI",
      "Framer Motion",
      "React Hook Form",
      "Zod Validation",
      "SEO Optimization",
    ],
    featured: false,
    status: "freelance" as const,
    image: ASSETS.free2,
    github: "not available",
    demo: "https://jawamk.com/",
  },

  {
    title: "Skyra",
    description:
      "An AI-powered weather assistant to help users plan outdoor activities safely using real-time API evaluation and AI-powered suggestions for smarter scheduling.",
    category: "React/Next.js",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "AI Integration",
    ],
    featured: true,
    status: "featured" as const,
    image: ASSETS.skyra,
    github: "https://github.com/Skyra-nasa/skyra",
    demo: "https://skyra-iota.vercel.app/",
  },
  {
    title: "Mohdmimy",
    description:
      "A modern website for a graphic designer, showcasing his work and services, to easily display his portfolio and attract potential clients.",
    category: "React/Next.js",
    tech: ["React", "TypeScript", "Tailwind CSS", "SEO Optimization"],
    featured: false,
    status: "freelance" as const,
    image: ASSETS.free1,
    github: "not available",
    demo: "https://mohdmimy.com/",
  },
  {
    title: "Admin Dashboard",
    description:
      "A sleek and intuitive admin dashboard built with React and Tailwind CSS, designed to provide seamless data management and insightful analytics for businesses. The dashboard features a responsive layout, interactive charts, and customizable widgets, allowing administrators to efficiently monitor key performance indicators, manage user accounts, and visualize data trends in real-time. With its user-friendly interface and powerful functionality, this admin dashboard empowers businesses to make informed decisions and optimize their operations effectively.",
    category: "React/Next.js",
    tech: ["React", "TypeScript", "Material UI", "Recharts"],
    featured: false,
    status: "featured" as const,
    image: ASSETS.dash,
    github: "https://github.com/MennaBashir/Admin-Dashboard",
    demo: "https://admin-dashboard-menna.netlify.app/",
  },
  {
    title: "Matger Electronics",
    description:
      "A modern website for Matger Electronics, a company specializing in selling electronic devices, site showcasing their products and services, a blog for news and articles, an about us section detailing company , and a testimonials section displaying customer reviews and feedback.",
    category: "React/Next.js",
    tech: ["React", "Shadcn/UI", "Framer Motion", "SEO Optimization"],
    featured: false,
    status: "" as const,
    image: ASSETS.ecom1,
    github: "https://github.com/MennaBashir/ITI-Project",
    demo: "https://matgaar.netlify.app/",
  },
  {
    title: "Sidra",
    description:
      "Application Sidra, a comprehensive Islamic app that offers a wide range of features to enhance the spiritual journey of its users. The app provides access to the Quran with translations and tafsir, a collection of authentic hadiths, a radio feature for listening to Islamic lectures and recitations, and a qibla direction tool to help users find the direction of prayer. With its user-friendly interface and rich content, Sidra aims to be a valuable resource for Muslims seeking knowledge and connection with their faith.",
    category: "React Native",
    tech: ["React Native", "Expo", "TypeScript", "Tailwind CSS"],
    featured: false,
    status: "in-progress" as const,
    image: ASSETS.sidra,
    github: "https://github.com/MennaBashir/sidra",
    demo: "not available",
  },
  {
    title: "News App",
    description:
      "A modern news application built with React Native and Expo, designed to provide users with a seamless and engaging news reading experience. The app features a clean and intuitive interface, allowing users to easily browse through various news categories, read articles, and stay updated with the latest headlines. With its responsive design and offline capabilities, this news app ensures that users can access their favorite news content anytime, anywhere.",
    category: "React Native",
    tech: ["React Native", "Expo", "TypeScript", "Tailwind CSS"],
    featured: false,
    status: "" as const,
    image: ASSETS.news,
    github: "https://github.com/MennaBashir/my-expo-app",
    demo: "not available",
  },
  {
    title: "Old Portfolio",
    description:
      "My old portfolio website, built with React and Tailwind CSS, showcasing my projects and experience at that time.",
    category: "React/Next.js",
    tech: ["React", "Tailwind CSS"],
    featured: false,
    status: "" as const,
    image: ASSETS.port,
    github: "https://github.com/MennaBashir/Portfolio",
    demo: "https://mennabashir.github.io/Portfolio/",
  },
  {
    title: "Sirx",
    description:
      "A modern website for Sirx, a company specializing in cryptocurrency news and updates, site showcasing their services, a blog for news and articles, an about us section detailing company , and a testimonials section displaying customer reviews and feedback.",
    category: "React/Next.js",
    tech: ["React", "JavaScript", "Bootstrap", "Cryptocurrency"],
    featured: false,
    status: "" as const,
    image: ASSETS.sirx,
    github: "https://github.com/MennaBashir/Cryptocurrency",
    demo: "https://sirxmenna.netlify.app/",
  },
  {
    title: "Arab Accountant Blog",
    description:
      "A website for Arab Accountant, a company specializing in accounting and financial services, site showcasing their services, a blog for news and articles, an about us section detailing company , and a testimonials section displaying customer reviews and feedback.",
    category: "React/Next.js",
    tech: ["React", "Bootstrap", "SEO Optimization"],
    featured: false,
    status: "" as const,
    image: ASSETS.account,
    github: "https://github.com/MennaBashir/Arab_Accountant",
    demo: "https://arab-accountant.netlify.app/",
  },
  {
    title: "Food Delivery",
    description:
      "A food delivery web application built with React and Tailwind CSS, designed to provide users with a seamless and engaging ordering experience.",
    category: "React/Next.js",
    tech: ["React", "JavaScript", "UI"],
    featured: false,
    status: "" as const,
    image: ASSETS.food,
    github: "https://github.com/MennaBashir/FoodDelivery",
    demo: "https://food-delivery-menna.netlify.app/",
  },
  {
    title: "Healthcare",
    description:
      "A healthcare web application built with React and Tailwind CSS, designed to provide users with a seamless and engaging experience for managing their health and wellness.",
    category: "React/Next.js",
    tech: ["React", "JavaScript", "UI"],
    featured: false,
    status: "" as const,
    image: ASSETS.hosipital,
    github: "https://github.com/MennaBashir/Hospital",
    demo: "https://clinic-menna.netlify.app/",
  },
  {
    title: "E-commerce",
    description:
      "An e-commerce web application built with React and Tailwind CSS, designed to provide users with a seamless and engaging shopping experience.",
    category: "React/Next.js",
    tech: ["React", "JavaScript", "UI"],
    featured: false,
    status: "" as const,
    image: ASSETS.ecom2,
    github: "https://github.com/MennaBashir/E-Commerce",
    demo: "https://ecommerce-menna.netlify.app/",
  },
];

export const EXPERIENCES = [
  {
    role: "Frontend Developer",
    company: "Wladet Helm",
    period: "Feb 2025 -- Present",
    duration: "1 yr 2 mo",
    type: "Full-time",
    description: [
      "Collaborating with cross-functional teams to architect and develop a scalable, high-performance web application.",
      "Participating in code reviews, agile ceremonies, and contributing to technical design discussions to continuously improve the codebase and development processes.",
    ],
    tech: ["React", "ShadCN/UI", "Tailwind CSS", "React Query", "REST APIs"],
    color: "sky",
  },
  {
    role: "Frontend Trainee",
    company: "Huma-volve",
    period: "Jun 2025 -- Jul 2025",
    duration: "1 mo",
    type: "Training Program",
    description: [
      "Collaborated with a team of interns to develop a responsive web application using React and Tailwind CSS, following agile methodologies ",
      "Implemented key features and UI components based on provided designs, while adhering to best practices and coding standards.",
    ],
    tech: ["React", "TypeScript", "Zustand", "SASS"],
    color: "violet",
  },
  {
    role: "Frontend Trainee",
    company: "ITI -- Information Technology Institute",
    period: "Sep 2024 -- Oct 2024",
    duration: "2 mo",
    type: "Training Program",
    description: [
      "Completed intensive training on frontend technologies including HTML5, CSS3, JavaScript ES6, and React.js.",
      "Gained a solid foundation in frontend development principles and best practices, preparing for real-world application development and collaboration.",
    ],
    tech: ["React", "JavaScript", "Bootstrap", "HTML5", "CSS3"],
    color: "emerald",
  },
  {
    role: "Developer Mentee",
    company: "Mentoor.io",
    period: "Jun 2024 -- Sep 2024",
    duration: "4 mo",
    type: "Mentorship",
    description: [
      "Mentored by experienced developers, I gained hands-on experience in frontend development through real-world projects and code reviews.",
      "Received personalized feedback and guidance that helped me refine my coding practices, problem-solving abilities, and understanding of software development workflows.",
    ],
    tech: ["TypeScript", "React", "Problem Solving", "Git", "GitHub"],
    color: "amber",
  },
];

export const ACHIEVEMENTS = [
  {
    id: "nasa",
    type: "Award",
    title: "NASA Space Apps Challenge",
    subtitle: "2025 Winner",
    description:
      "Developed an intelligent, weather-aware activity assistant that helps users plan outdoor activities safely using real-time API evaluation and AI-powered suggestions for smarter scheduling.",
    tags: ["React", "AI", "Weather APIs", "UX"],
    color: "sky",
  },
  {
    id: "gitlab",
    type: "Open Source",
    title: "GitLab",
    subtitle: "Core Contributor",
    description:
      "Contributed critical UI fixes to the GitLab Web IDE (VS Code version) that improved accessibility and resolved keyboard navigation bugs affecting over 1 million daily active users.",
    tags: ["Vue.js", "Accessibility", "VS Code API"],
    color: "orange",
  },
  {
    id: "aboutcode",
    type: "Open Source",
    title: "AboutCode",
    subtitle: "Core Contributor",
    description:
      "Engineered significant frontend performance optimizations for the ScanCode Workbench UI and implemented new filtering capabilities for improved developer workflow and experience.",
    tags: ["React", "Electron", "Performance"],
    color: "emerald",
  },
];

export const SOCIAL_LINKS = [
  {
    platform: "GitHub",
    handle: "@MennaBashir",
    url: "https://github.com/MennaBashir",
  },
  {
    platform: "LinkedIn",
    handle: "linkedin.com/in/menna-bashir",
    url: "https://www.linkedin.com/in/menna-bashir/",
  },
  {
    platform: "GitLab",
    handle: "@MennaBashir",
    url: "https://gitlab.com/MennaBashir",
  },
  {
    platform: "Email",
    handle: "mennabashir00@gmail.com",
    url: "mailto:mennabashir00@gmail.com",
  },
];
