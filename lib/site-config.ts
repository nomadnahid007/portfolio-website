import type { CertificationItem, ContactLink, NavigationItem, SectionNavItem, SkillGroup, TimelineItem } from "@/lib/types";

export const siteConfig = {
  name: "Nahid Hassan",
  title: "Product Intern at Pathao building student-facing systems, applied AI work, and clear product thinking",
  description:
    "Nahid Hassan's portfolio featuring product work at Pathao, technical projects, applied NLP interests, and writing shaped by tutoring and communication.",
  location: "Dhaka, Bangladesh",
  email: "nahidhassan6100@gmail.com",
  accent: "Terracotta",
  social: {
    github: "https://github.com/nomadnahid007",
    linkedin: "https://www.linkedin.com/in/nahid-hassan6100",
    facebook: "https://www.facebook.com/nahid.hassan.35110"
  }
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const sectionNavigation: SectionNavItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];

export const experience: TimelineItem[] = [
  {
    company: "Pathao Ltd. (Rides Team)",
    role: "Product Management Intern",
    period: "Jan 2026 - Present",
    location: "Dhaka, Bangladesh",
    summary: "Contributing to ride-product planning, feedback-driven improvements, and feature execution for Pathao's Rides platform.",
    points: [
      "Worked on features including Intercity Ride Visibility, CNG Pricing Fix, and a corrective system informed by ongoing and post-trip feedback.",
      "Collaborated with engineering and design teams in Jira and Figma to define user flows, write user stories, and track implementation progress.",
      "Analyzed user behavior with SQL and Firebase to identify issues and support product decisions with real usage data."
    ]
  },
  {
    company: "BRAC University",
    role: "Undergraduate Teaching Assistant / Student Tutor",
    period: "Jun 2024 - Sep 2025",
    location: "Dhaka, Bangladesh",
    summary: "Supported students in Discrete Mathematics and Numerical Methods through tutoring, assessment feedback, and close faculty coordination.",
    points: [
      "Guided 500+ students across four consecutive semesters in CSE230 and CSE330.",
      "Helped reduce learning gaps by explaining technical concepts clearly and reinforcing problem-solving habits.",
      "Assisted instructors in checking quizzes and assignments while giving constructive feedback to students."
    ]
  },
  {
    company: "BracU Express",
    role: "Contributing Writer and Journalist",
    period: "Mar 2024 - Jun 2025",
    location: "BRAC University",
    summary: "Covered campus stories, wrote feature pieces, and developed a stronger voice for audience-focused storytelling.",
    points: [
      "Produced articles and opinion pieces read by more than 1,000 students across BracU platforms.",
      "Used interviews with students and faculty to build well-grounded stories with clear human context.",
      "Strengthened editorial clarity and consistency through repeated publication and feedback cycles."
    ]
  },
  {
    company: "BracU Esports Club",
    role: "Assistant Secretary of Marketing and Communications",
    period: "Sep 2024 - Jun 2025",
    location: "BRAC University",
    summary: "Led content coordination and promotional communication for events, tournaments, and community initiatives.",
    points: [
      "Created promotional content for tournaments and online events to improve engagement.",
      "Coordinated a 20+ member content team to keep communication consistent and timely.",
      "Balanced audience engagement goals with fast-moving event deadlines."
    ]
  },
  {
    company: "ATZ Technologies",
    role: "Content Writer",
    period: "Jul 2021 - Oct 2021",
    location: "Dhaka, Bangladesh",
    summary: "Wrote SEO-focused web content and helped strengthen the company's digital presence.",
    points: [
      "Created SEO-friendly blog posts and web content using keyword research and WordPress.",
      "Contributed to a 15% increase in website traffic during the internship period.",
      "Learned how to write with both search intent and readability in mind."
    ]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Product and Analysis",
    description: "Turning user feedback, metrics, and requirements into clearer product decisions.",
    items: ["Product Management", "Requirement Gathering", "User Stories", "Roadmapping", "Jira", "Figma", "SQL", "Firebase"]
  },
  {
    title: "Software and ML",
    description: "Building academic and product-facing systems across web, data, and machine learning workflows.",
    items: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "MongoDB",
      "Laravel",
      "SQLite",
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Java",
      "C"
    ]
  },
  {
    title: "Writing and Communication",
    description: "Explaining technical ideas clearly through tutoring, journalism, and structured content work.",
    items: [
      "Technical Writing",
      "Content Writing",
      "SEO Writing",
      "Tutoring",
      "Public Communication",
      "Leadership",
      "Canva",
      "WordPress",
      "Power BI",
      "Trello"
    ]
  }
];

export const certifications: CertificationItem[] = [
  {
    title: "The Science of Well-Being",
    issuer: "Yale University",
    note: "A foundational course on behavior, habit design, and personal effectiveness."
  },
  {
    title: "Essential Career Soft Skills",
    issuer: "LinkedIn Learning",
    note: "Focused on communication, professionalism, and practical workplace judgment."
  },
  {
    title: "AI Engineer for Data Scientists Associate",
    issuer: "DataCamp",
    note: "Built around applied machine learning workflows and AI implementation skills."
  },
  {
    title: "Strategic Thinking",
    issuer: "LinkedIn Learning",
    note: "Structured approaches to prioritization, decision-making, and long-range planning."
  },
  {
    title: "Elevate Your Public Speaking",
    issuer: "LinkedIn Learning",
    note: "Training in presentation clarity, confidence, and audience-oriented delivery."
  }
];

export const contactLinks: ContactLink[] = [
  {
    icon: "email",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
    note: "Primary contact for internships, collaborations, and project conversations."
  },
  {
    icon: "github",
    label: "GitHub",
    href: siteConfig.social.github,
    value: "@nomadnahid007",
    note: "Repositories, academic builds, and experiments."
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    value: "nahid-hassan6100",
    note: "Professional profile, experience, and certifications."
  },
  {
    icon: "facebook",
    label: "Facebook",
    href: siteConfig.social.facebook,
    value: "nahid.hassan.35110",
    note: "Social presence and direct message access."
  }
];
