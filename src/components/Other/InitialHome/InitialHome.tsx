import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  RiAddLine,
  RiArrowDownSLine,
  RiCloseLine,
  RiDownloadFill,
  RiMailSendFill,
} from 'react-icons/ri';

import { highlightTechArray } from './syntax-highlighter';

const techStackData = [
  { name: 'Javascript', category: 'frontend', featured: true },
  { name: 'React', category: 'frontend', featured: true },
  { name: 'Vue.js', category: 'frontend', featured: true },
  { name: 'Tailwind', category: 'frontend', featured: true },
  { name: 'Bootstrap', category: 'frontend', featured: true },
  { name: 'Java Spring', category: 'backend', featured: false },
  { name: 'Python', category: 'backend', featured: false },
  { name: 'Node.js', category: 'backend', featured: false },
  { name: 'Laravel', category: 'backend', featured: false },
  { name: 'PostgreSQL', category: 'database', featured: false },
  { name: 'MySQL', category: 'database', featured: false },
  { name: 'Docker', category: 'devops', featured: false },
  { name: 'Git', category: 'tools', featured: false },
  { name: 'GitHub', category: 'tools', featured: false },
  { name: 'GitLab', category: 'tools', featured: false },
  { name: 'Postman', category: 'tools', featured: false },
  { name: 'Wavemaker', category: 'tools', featured: false },
  { name: 'Eclipse', category: 'tools', featured: false },
  { name: 'DBeaver', category: 'tools', featured: false },
];

import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from '@/components/Animations/AdvancedTransition';
import ClientOnly from '@/components/Animations/ClientOnly';
import FloatingElement from '@/components/Animations/FloatingElement';
import DevImg from '@/components/Other/DevImg/DevImg';
import { StackIcon } from '@/components/Other/ProfessionalBadge/Icons';
import ProfessionalBadge from '@/components/Other/ProfessionalBadge/ProfessionalBadge';
import Socials from '@/components/Other/Socials/Socials';
import { Button } from '@/components/Other/UI/button';

const InitialHome = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const codeBlockRef = useRef<HTMLPreElement>(null);
  const [techStackExpanded, setTechStackExpanded] = useState(false);
  const animationInitializedRef = useRef(false);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = '';

      letters.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        if (letter === ' ') {
          span.style.width = '0.3em';
        }
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        y: 0,
        ease: 'power2.out',
        delay: 0.5,
      });
    }
  }, []);

  // Generate the code text for the animation - memoized to prevent re-creation
  const codeText = useMemo(() => {
    const techByCategory = techStackData.reduce((acc, tech) => {
      if (!acc[tech.category]) acc[tech.category] = [];
      acc[tech.category].push(tech.name);
      return acc;
    }, {} as Record<string, string[]>);

    const skillsObject = {
      frontend: techByCategory.frontend || [],
      backend: techByCategory.backend || [],
      database: techByCategory.database || [],
      devOps: [
        ...(techByCategory.devops || []),
        ...(techByCategory.cloud || []),
        ...(techByCategory['ci-cd'] || []),
      ],
      tools: techByCategory.tools || [],
    };

    return `<span style="color:#6A9955">// Software engineer with diverse skills</span>
<span style="color:#569CD6">const</span> developer = {
  <span style="color:#9CDCFE">name</span>: <span style="color:#CE9178">'Muhammad Haikal Baihaqi'</span>,
  <span style="color:#9CDCFE">skills</span>: {
    <span style="color:#9CDCFE">frontend</span>: ${highlightTechArray(
      skillsObject.frontend,
    )},
    <span style="color:#9CDCFE">backend</span>: ${highlightTechArray(
      skillsObject.backend,
    )},
    <span style="color:#9CDCFE">database</span>: ${highlightTechArray(
      skillsObject.database,
    )},
    <span style="color:#9CDCFE">devOps</span>: ${highlightTechArray(
      skillsObject.devOps,
    )},
    <span style="color:#9CDCFE">tools</span>: ${highlightTechArray(
      skillsObject.tools,
    )}
  },
  <span style="color:#9CDCFE">createSolution</span>: (<span style="color:#4FC1FF">problem</span>) <span style="color:#569CD6">=></span> {
    <span style="color:#569CD6">return</span> <span style="color:#4EC9B0">robustAndScalableSolution</span>;
  }
};`;
  }, []);

  // Simple and reliable animation initialization
  useEffect(() => {
    // Only run on client and once
    if (typeof window === 'undefined' || animationInitializedRef.current)
      return;

    // Add minimal required styles
    const addStyles = () => {
      const styleId = 'code-animation-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .code-block {
            transition: color 0.3s ease;
          }
        `;
        document.head.appendChild(style);
      }
    };

    addStyles();

    // Use a single timeout with adequate delay
    const animationTimeout = setTimeout(() => {
      if (codeBlockRef.current) {
        try {
          // Initialize with a safer animation configuration
          gsap.to(
            {},
            {
              duration: 6,
              ease: 'power1.inOut',
              onUpdate: function (this: { progress: () => number }) {
                // Simple fallback in case setupCodeTypingAnimation fails
                try {
                  // Manually implement the typing animation to avoid issues
                  if (codeBlockRef.current) {
                    const progress = this.progress();
                    const textLength = codeText.replace(/<[^>]*>/g, '').length;
                    const currentLength = Math.floor(progress * textLength);

                    // Create simplified typing effect
                    let plainTextCount = 0;
                    let displayHTML = '';
                    let inTag = false;
                    let currentTag = '';

                    for (let i = 0; i < codeText.length; i++) {
                      const char = codeText[i];

                      if (char === '<') {
                        inTag = true;
                        currentTag += char;
                      } else if (char === '>') {
                        inTag = false;
                        currentTag += char;
                        displayHTML += currentTag;
                        currentTag = '';
                      } else if (inTag) {
                        currentTag += char;
                      } else {
                        displayHTML += char;
                        plainTextCount++;

                        if (plainTextCount >= currentLength) {
                          break;
                        }
                      }
                    }

                    codeBlockRef.current.innerHTML = displayHTML;
                  }
                } catch (err) {
                  console.warn('Animation step error, using fallback:', err);
                  if (codeBlockRef.current && !codeBlockRef.current.innerHTML) {
                    codeBlockRef.current.innerHTML = codeText;
                  }
                }
              },
              onComplete: function () {
                // Make sure the final state is set
                if (codeBlockRef.current) {
                  codeBlockRef.current.innerHTML = codeText;
                }
              },
            },
          );

          // Mark as initialized to prevent re-runs
          animationInitializedRef.current = true;
        } catch (error) {
          console.error('Animation error:', error);

          // Simple fallback if animation fails
          if (codeBlockRef.current) {
            codeBlockRef.current.innerHTML = codeText;
          }
        }
      }
    }, 800);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [codeText]);

  useEffect(() => {
    if (techStackExpanded) {
      const badges = document.querySelectorAll('.tech-badge');
      gsap.fromTo(
        badges,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'power2.out',
          duration: 0.4,
        },
      );
    }
  }, [techStackExpanded]);

  return (
    <section className="pt-12 md:pt-24 xl:py-24 xl:pt-0 mb-10 xl:mb-[250px] relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-16 left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col xl:flex-row justify-between gap-x-8 items-center"
        >
          <motion.div
            variants={fadeInDown}
            className="flex max-w-[600px] flex-col justify-center
            mx-auto xl:mx-0 text-center xl:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="text-sm uppercase font-semibold
              mb-6 text-primary tracking-[4px] flex justify-center xl:justify-start"
            >
              <ProfessionalBadge
                text="Software Engineer"
                icon={<StackIcon size={14} />}
                animated={true}
                gradient={true}
              />
            </motion.div>

            <h1
              ref={titleRef}
              className="text-[28px] sm:text-[36px] xl:text-[50px] font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text whitespace-nowrap"
            >
              MUHAMMAD HAIKAL BAIHAQI
            </h1>

            <motion.p
              variants={fadeInDown}
              className="max-w-[500px] mx-auto xl:mx-0 text-sm mb-5 leading-relaxed text-justify"
            >
              <span className="text-primary font-semibold">Software Engineer</span>{' '}
              with 4 years of experience delivering frontend and backend solutions
              for enterprise clients across multiple industries. Proficient in{' '}
              <span className="text-primary font-semibold">JavaScript</span>,{' '}
              <span className="text-primary font-semibold">Java Spring</span>, and{' '}
              <span className="text-primary font-semibold">REST API development</span>, with hands-on involvement in production
              deployments and incident resolution. Proven ability to collaborate
              cross-functionally with QA, Product, and Engineering teams and
              consistently deliver features on schedule in Agile environments.
            </motion.p>

            <motion.div
              variants={fadeInDown}
              className="flex flex-col gap-y-3 md:flex-row gap-x-3
              mx-auto xl:mx-0 mb-8"
            >
              <Link href="https://mail.google.com/mail/?view=cm&to=hazama254@gmail.com" target="_blank" aria-label="contact">
                <Button className="gap-x-2 group">
                  Contact me{' '}
                  <RiMailSendFill
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link
                target="_blank"
                href="/CV_MuhammadHaikalBaihaqi.pdf"
                aria-label="cv"
              >
                <Button variant="secondary" className="gap-x-2 group">
                  Download CV
                  <RiDownloadFill
                    size={18}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeInRight} className="hidden md:block mb-8">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-xs uppercase tracking-wider mb-2">
                  Tech Stack:
                </div>
                {techStackExpanded && (
                  <button
                    onClick={() => setTechStackExpanded(false)}
                    className="flex items-center justify-center p-2 rounded-full bg-white/10 transition-all duration-300 ease-in-out hover:bg-white/20 mb-2 hover:rotate-90"
                    aria-label="Collapse tech stack"
                  >
                    <RiCloseLine className="text-xs" />
                  </button>
                )}
              </div>

              <div
                className={`flex flex-wrap gap-x-3 gap-y-2 transition-all duration-500 ease-in-out ${
                  techStackExpanded
                    ? 'max-h-[500px] opacity-100 transform-gpu'
                    : 'max-h-[38px] overflow-hidden'
                }`}
              >
                {techStackData
                  .filter((tech) => tech.featured)
                  .map((tech, index) => (
                    <span
                      key={`featured-${tech.name}-${index}`}
                      className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs tech-badge"
                    >
                      {tech.name}
                    </span>
                  ))}

                {!techStackExpanded && (
                  <button
                    onClick={() => setTechStackExpanded(true)}
                    className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-primary hover:bg-white/10 transition-all duration-300 ease-in-out flex items-center gap-x-1 cursor-pointer"
                    aria-label="Show more technologies"
                  >
                    <span>
                      +{techStackData.filter((tech) => !tech.featured).length}{' '}
                      more
                    </span>
                    <RiAddLine className="text-xs" />
                  </button>
                )}

                {techStackExpanded &&
                  techStackData
                    .filter((tech) => !tech.featured)
                    .map((tech, index) => (
                      <span
                        key={`additional-${tech.name}-${index}`}
                        className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs tech-badge"
                      >
                        {tech.name}
                      </span>
                    ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <Socials
                containerStyles="flex gap-x-6 mx-auto xl:mx-0"
                iconsStyles="text-foreground text-[22px] hover:text-primary transition-all"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInLeft} className="hidden xl:flex relative">
            <FloatingElement
              className="w-full overflow-hidden"
              duration={10}
              distance={50}
            >
              <DevImg
                alt="initial image"
                priority
                containerStyles="w-[510px] h-[520px] relative flex items-start"
                containerStylesImage="w-full h-auto -mt-24"
                imgSrc="/people/face-haikal.png"
              />
            </FloatingElement>

            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-[24%] -left-[5rem]"
            >
              <Badge
                containerStyles="animate-up-down-3"
                icon={<RiBriefcase4Fill />}
                endCountNum={new Date().getFullYear() - 2022}
                badgeText="anos de experiência"
              />
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-[80%] -left-[1rem]"
            >
              <Badge
                containerStyles="animate-up-down-2"
                icon={<RiTodoFill />}
                endCountNum={32}
                badgeText="Projetos finalizados"
              />
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute top-[55%] -right-8"
            >
              <Badge
                containerStyles="animate-up-down-1"
                icon={<RiTeamFill />}
                endCountNum={12}
                badgeText="Clientes satisfeitos"
              />
            </motion.div> */}

            {/* Code block */}
            <div className="absolute -left-20 bottom-[-220px] z-30 ">
              <div className="h-[310px] w-[550px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl ms-10">
                <div className="flex items-center gap-x-4 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <ClientOnly
                  fallback={
                    <div className="h-[260px] w-full flex items-center justify-center text-xs text-white/50 font-mono">
                      Loading code block...
                    </div>
                  }
                >
                  <div className="code-container relative h-[260px]">
                    <pre
                      ref={codeBlockRef}
                      className="text-xs text-white font-mono overflow-x-auto whitespace-pre-wrap h-full w-full"
                      style={{ willChange: 'contents' }}
                    ></pre>
                  </div>
                </ClientOnly>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll down button */}
        <motion.div
          variants={fadeInUp}
          className="hidden xl:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce"
        >
          <RiArrowDownSLine
            className="text-3xl text-primary cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              })
            }
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InitialHome;
