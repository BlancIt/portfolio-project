import {
  RiGraduationCapFill,
  RiHomeFill,
  RiMailFill,
  RiUserFill,
} from "react-icons/ri";

export const infoData = [
  {
    icon: <RiUserFill size={20} />,
    text: "Muhammad Haikal Baihaqi",
  },
  {
    icon: <RiMailFill size={20} />,
    text: "hazama254@gmail.com",
  },
  {
    icon: <RiGraduationCapFill size={20} />,
    text: "Software Engineer",
  },
  {
    icon: <RiHomeFill size={20} />,
    text: "South Tangerang, Indonesia",
  },
];

export const qualificationData = [
  {
    title: "education",
    data: [
      {
        school: "Universitas Indonesia",
        qualification: "Bachelor Degree in Information Systems",
        years: "Sep 2017 - Jan 2022",
      },
      {
        school: "PKS Digital School",
        qualification: "Full Stack Web Development",
        years: "2021",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "PT Solusi Kode Indonesia",
        role: "Software Engineer",
        years: "Mar 2022 - Present",
        location: "South Tangerang, Indonesia",
        description: [
          "Developed and optimized frontend and backend code using Java, JavaScript, and Wavemaker, resulting in improved application performance and user experience.",
          "Provided comprehensive IT support to 12 clients, ensuring minimal downtime and resolving issues promptly.",
          "Collaborated closely with cross-functional internal teams to enhance applications, ensuring seamless and effective communication and workflow.",
        ],
        technologies: [
          "Java",
          "JavaScript",
          "Wavemaker",
          "Java Spring",
        ],
      },
      {
        company: "desktopIP Corporation",
        role: "ERP Consultant Intern",
        years: "Jun 2020 - Nov 2020",
        location: "South Jakarta, Indonesia",
        description: [
          "Consulted with the client to gain insights into their business inquiries and needs.",
          "Assisted the internal team in creating the ERP system proposal.",
          "Worked with other interns to test the ERP system proposal and report any bugs to the internal team.",
          "Documented the proposal in form of manual, video, and presentation for the client's consideration.",
        ],
        technologies: [
          "ERP Systems",
        ],
      },
    ],
  },
];

export const skillsData = [
  {
    title: "skills",
    data: [
      {
        icons: ["JavaScript", "TypeScript", "React", "NextJs"],
      },
      {
        icons: ["HTML", "CSS", "TailwindCSS"],
      },
      {
        icons: ["NodeJS", "Express", "Git"],
      },
      {
        icons: ["Java Spring", "PHP", "Laravel"],
      },
    ],
  },
  {
    title: "tools",
    data: [
      {
        imgPath: "Windows",
      },
      {
        imgPath: "Vscode",
      },
      {
        imgPath: "Jira",
      },
      {
        imgPath: "Notion",
      },
    ],
  },
];
