export interface Project {
  id: string | number;
  title: string;
  category: 'web' | 'mobile' | 'game';
  description: string;
  technologies: string[];
  image: string;
  liveLink?: string;
  githubLink?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "LinkCookie - E-commerce Coockie (Under Development)",
    category: 'web',
    description: "Modern e-commerce platform for coockie sales, built with Next.js and Tailwind CSS for an optimal user experience.",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/web1.png",
    liveLink: "#",
    githubLink: "#",
  },
  // {
  //   id: 2,
  //   title: "Kids Educational Mobile App",
  //   category: 'mobile',
  //   description: "Interactive mobile application for early childhood learning, equipped with gamification.",
  //   technologies: ["React Native", "Firebase"],
  //   image: "/projects/mobile-edu.jpg",
  //   liveLink: "#",
  //   githubLink: "#",
  // },
  {
    id: 3,
    title: "7 Minutes Runner (Under Development)",
    category: 'game',
    description: "An engaging 2D space adventure game developed with Unity, featuring various levels and challenges.",
    technologies: ["Unity", "C#"],
    image: "/game1.png",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    category: 'web',
    description: "The personal portfolio website you are currently viewing, built to showcase my projects and skills.",
    technologies: ["React Native", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/web2.png",
    githubLink: "https://github.com/hanrsyidin/porto-nextJS-react",
  },
  // {
  //   id: 5,
  //   title: "Words of Affirmation",
  //   category: 'mobile',
  //   description: "A mobile app integrated with Gemini AI to generate supportive words that will boost mood. This application also provides notes and to-do-list features.",
  //   technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  //   image: "/projects/portfolio-website.jpg",
  //   githubLink: "https://github.com/hanrsyidin/portfolio-next",
  // }
  {
    id: 6,
    title: "Silab",
    category: 'web',
    description: "SILAB (Laboratory Information System) is a web-based application designed to simplify laboratory management within a faculty environment. Its main features include account login (manually created by the admin), checking laboratory schedules, and booking laboratory rooms. The system is built using Laravel (Blade + Livewire) and uses MySQL as its database.",
    technologies: ["Laravel 12", "Breeze", "PHP", "Blade", "Tailwind CSS", "JavaScript"],
    image: "/web3.png",
    githubLink: "https://github.com/hanrsyidin/porto-nextJS-react",
  },
    {
    id: 7,
    title: "IslamPedia",
    category: 'web',
    description: "Islam Pedia is a web-based platform that provides Islamic content and information, such as articles, prayers, teachings, and history, aimed at educating and inspiring users about Islam.",
    technologies: ["CodeIgniter 4", "PHP", "CSS", "JavaScript"],
    image: "/web4.png",
    githubLink: "https://github.com/hanrsyidin/porto-nextJS-react",
  },
    {
    id: 8,
    title: "Donutopia (Coming Soon)",
    category: 'game',
    description: "A relaxing game where you make donuts based on incoming orders. The game features cute pixel art graphics that add charm to the experience.",
    technologies: ["Unity", "C#", "Aseprite"],
    image: "/game2.png",
    githubLink: "#",
  },
];

export const categories: { key: Project['category']; label: string }[] = [
  { key: 'web', label: 'Web Development' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'game', label: 'Game Projects' },
];
