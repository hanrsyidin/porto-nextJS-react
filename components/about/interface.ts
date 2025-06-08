interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
}
interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  description?: string;
}
interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  { year: "2024 - 2025", title: "Web Programming Coursework (I & II)", company: "Informatics Engineering, Sriwijaya University", description: "Completed 2 website development projects using CodeIgniter 4 and Laravel 12." },
  { year: "2025 - 2026", title: "Head of Academic Division", company: "Informatics Student Association Unsri 2024", description: "Leading and managing skill and academic development programs for Informatics Engineering students at Sriwijaya University for the year 2025." },
  { year: "2024 - 2025", title: "Information Technology Development Staff - HMIF 2024", company: "Informatics Student Association Unsri 2024", description: "Organized and participated in the committee for numerous events such as exhibitions, internal events, national events, and coding events." },
  { year: "2023 - 2023", title: "Volunteer IT Lead Srifoton 2023", company: "Informatics Student Association Unsri 2023", description: "Developed the Home Page for the Srifoton 2023 event website." },
];

export const educationItems: EducationItem[] = [
  { year: "2023 - 2027 (Expected)", degree: "Bachelor of Engineering in Informatics", institution: "Sriwijaya University, Palembang", description: "Focusing on software engineering, web development, game development, artificial intelligence, and data structures." },
  { year: "2020 - 2023", degree: "Science Program", institution: "SMA Plus Negeri 17, Palembang", description: "Active in science club and programming competitions." },
];

export const skillsData: SkillCategory[] = [
  { id: "backend", name: "Backend Development", skills: ["Laravel", "CodeIgniter", "PHP", "Node.js", "RESTful APIs", "MySQL", "PostgreSQL", "MongoDB", "Supabase", "Firebase"] },
  { id: "frontend", name: "Frontend Development", skills: ["Next.js", "React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Blade"] },
  { id: "gamedev", name: "Game Development", skills: ["Unity", "C#", "Game Design Principles"] },
  { id: "others", name: "Others", skills: ["Git & GitHub", "Problem Solving", "Leadership", "Project Management (Basic)"] },
];

export type TabKey = 'experience' | 'education' | 'skills';