
export const siteConfig = {
  name: "AI for Civic Solutions 2026",
  shortName: "AI for Civic Solutions",
  organizer: "CODELOGIX Solutions",
  description:
    "Building practical AI-powered solutions for civic challenges.",
  email: "codelogixsolutions@gmail.com",
  website:
    process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcivicsolutions.tech/",
  social: {
    linkedin: "https://www.linkedin.com/company/codelogix-solutions",
    instagram: "https://www.instagram.com/codelogixsolutions/",
  },
  phone: "+923395858284",
};

export const homeStats = [
  { value: "100+", label: "Aspiring Innovators" },
  { value: "20+", label: "Potential Teams" },
  { value: "10+", label: "Learning Workshops" },
  { value: "6+", label: "Civic Challenge Areas" },
];

export const tracks = [
  {
    title: "AI for Civic Innovation",
    description:
      "Create AI-powered solutions for public challenges, community needs, and civic participation.",
    icon: "landmark",
  },
  {
    title: "Smart Cities",
    description:
      "Explore smarter urban mobility, public infrastructure, and connected city services.",
    icon: "building-2",
  },
  {
    title: "GovTech",
    description:
      "Make public services more accessible, efficient, transparent, and citizen-friendly.",
    icon: "monitor-cog",
  },
  {
    title: "Education",
    description:
      "Build tools that improve access to learning, educational support, and student opportunities.",
    icon: "graduation-cap",
  },
  {
    title: "Healthcare",
    description:
      "Explore responsible technology for health awareness, navigation, and service access.",
    icon: "heart-pulse",
  },
  {
    title: "Environment",
    description:
      "Use technology to address waste, pollution, conservation, and environmental awareness.",
    icon: "leaf",
  },
] as const;

export const allTrackNames = [
  ...tracks.map((track) => track.title),
  "Accessibility",
  "Agriculture",
  "Public Safety",
  "Open Innovation",
] as const;

export const journeySteps = [
  {
    number: "01",
    title: "Register",
    description: "Submit your application and participation details.",
  },
  {
    number: "02",
    title: "Learn",
    description: "Build your skills through hackathon-related workshops.",
  },
  {
    number: "03",
    title: "Ideate",
    description: "Identify a civic challenge and plan your solution.",
  },
  {
    number: "04",
    title: "Build",
    description: "Turn your idea into a working prototype.",
  },
  {
    number: "05",
    title: "Submit",
    description: "Prepare and submit your project for evaluation.",
  },
  {
    number: "06",
    title: "Showcase",
    description: "Present your solution and explain its potential impact.",
  },
] as const;

export const featuredWorkshops = [
  {
    title: "Civic Problem Discovery & Design Thinking",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Identify real problems in Rawalpindi, Islamabad, and local communities, understand who is affected, and turn observations into clear problem statements.",
    image: "/images/workshops/Civic Problem Discovery & Design Thinking.jpg",
  },
  {
    title: "Generative AI for Civic Good",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Learn how AI can support public-service information, citizen queries, complaint categorization, and community support through prompt engineering and a hands-on mini-demo.",
    image: "/images/workshops/Generative AI for Civic Good.jpg",
  },
  {
    title: "Open Data for Public Impact",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Find, clean, and interpret public datasets to create useful insights about education, transport, sanitation, and public services.",
    image: "/images/workshops/Open Data for Public Impact.jpg",
  },
  {
    title: "Build Your First Civic Tech Prototype",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Build a simple responsive web application for a real civic problem, covering UI basics, forms, dashboards, and user testing.",
    image: "/images/workshops/Build Your First Civic Tech Prototype.jpg",
  },
  {
    title: "Build AI Chatbots for Citizens",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Create a basic chatbot for public information, education opportunities, or community services while exploring Urdu and English support and inaccurate answers.",
    image: "/images/workshops/Build AI Chatbots for Citizens.jpg",
  },
  {
    title: "Maps, Geospatial Data & Smart Cities",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Explore how digital maps can identify potholes, waste collection issues, inaccessible facilities, and areas vulnerable to flooding.",
    image: "/images/workshops/Maps, Geospatial Data & Smart Cities.jpg",
  },
  {
    title: "Responsible AI, Privacy & Digital Trust",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Understand bias, hallucinations, personal-data protection, cybersecurity, and responsible AI practices for tools that may affect citizens.",
    image: "/images/workshops/Responsible AI, Privacy & Digital Trust.jpg",
  },
  {
    title: "GitHub, Deployment & Open-Source Collaboration",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Learn repositories, README files, basic version control, and how to deploy a working prototype using accessible free hosting options.",
    image: "/images/workshops/GitHub, Deployment & Open-Source Collaboration.jpg",
  },
  {
    title: "Civic Innovation: Pitching, Impact & Sustainability",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Present the problem, beneficiaries, proposed solution, measurable impact, and long-term sustainability without exaggerating what the product can do.",
    image: "/images/workshops/Civic Innovation Pitching Impact & Sustainability.jpg",
  },
  {
    title: "Build with AI: Rapid Prototyping & Hackathon Preparation",
    date: "To be announced",
    time: "To be announced",
    speaker: "Speaker announcement pending",
    description:
      "Use AI coding tools to develop a small feature, test it, fix errors, and prepare a demo through a mini-project clinic and Q&A.",
    image:
      "/images/workshops/Build with AI Rapid Prototyping & Hackathon Preparation.jpg",
  },
] as const;

export const benefits = [
  {
    title: "Practical learning",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "brain",
  },
  {
    title: "Expert workshops",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "graduation-cap",
  },
  {
    title: "Mentorship",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "messages-square",
  },
  {
    title: "Networking",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "users",
  },
  {
    title: "Certificates",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "award",
  },
  {
    title: "Prizes",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "trophy",
  },
  {
    title: "Internship opportunities",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "briefcase-business",
  },
  {
    title: "Portfolio projects",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "folder-code",
  },
  {
    title: "Industry exposure",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "building-2",
  },
  {
    title: "Community access",
    description:
      "Build confidence, connections and a portfolio while solving a real civic challenge.",
    icon: "heart-handshake",
  },
] as const;

export const sponsorTiers = [
  {
    title: "Platinum Partner",
    description:
      "Explore a leading partnership supporting the hackathon's overall experience.",
    tier: "Platinum",
  },
  {
    title: "Gold Partner",
    description:
      "Support learning, innovation, and the development of civic technology projects.",
    tier: "Gold",
  },
  {
    title: "Silver Partner",
    description:
      "Contribute resources or opportunities that help participants build their ideas.",
    tier: "Silver",
  },
  {
    title: "Community Partner",
    description:
      "Help connect communities, educators, organizations, and emerging innovators.",
    tier: "Community Partner",
  },
] as const;

export const featuredSpeakers = [
  {
    name: "Speaker Announcement Pending",
    role: "Guest Speaker",
    organization: "To be announced",
    session: "Session details to be announced",
    email: "",
    linkedin: "",
    image: "/images/speakers/speaker-01.jpg",
  },
  {
    name: "Speaker Announcement Pending",
    role: "Guest Speaker",
    organization: "To be announced",
    session: "Session details to be announced",
    email: "",
    linkedin: "",
    image: "/images/speakers/speaker-02.jpg",
  },
  {
    name: "Speaker Announcement Pending",
    role: "Guest Speaker",
    organization: "To be announced",
    session: "Session details to be announced",
    email: "",
    linkedin: "",
    image: "/images/speakers/speaker-03.jpg",
  },
  {
    name: "Speaker Announcement Pending",
    role: "Guest Speaker",
    organization: "To be announced",
    session: "Session details to be announced",
    email: "",
    linkedin: "",
    image: "/images/speakers/speaker-04.jpg",
  },
] as const;

export const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Tracks", href: "/tracks" },
  { label: "Workshops", href: "/workshops" },
  { label: "Timeline", href: "/timeline" },
  { label: "Benefits", href: "/benefits" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Speakers", href: "/speakers" },
  { label: "Rules", href: "/rules" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
