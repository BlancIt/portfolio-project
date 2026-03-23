import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import {
  RiCodeSSlashLine,
  RiLayout2Line,
  RiMagicLine,
  RiPaintBrushLine,
  RiSmartphoneLine,
  RiSpeedLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import { setupCodeTypingAnimation } from "@/components/Other/InitialHome/syntax-highlighter";

type FrontendCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
};

const FrontendCard = ({
  icon,
  title,
  description,
  delay = 0,
}: FrontendCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:bg-white/10 transition-all hover:scale-105"
    >
      <div className="text-secondary text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.div>
  );
};

const FrontendExpertise = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const animationRef = useRef<HTMLDivElement | null>(null);
  const codeRef = useRef<HTMLPreElement | null>(null);
  const animationInitializedRef = useRef(false);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  // Memoized code text to prevent recreation on re-renders
  const codeText = useMemo(() => {
    return `<span style="color:#569CD6">export default function</span> <span style="color:#DCDCAA">AnimatedComponent</span>() {
  <span style="color:#569CD6">const</span> [<span style="color:#4FC1FF">isVisible</span>, <span style="color:#DCDCAA">setIsVisible</span>] = <span style="color:#DCDCAA">useState</span>(<span style="color:#569CD6">false</span>);
  <span style="color:#569CD6">const</span> <span style="color:#4FC1FF">controls</span> = <span style="color:#DCDCAA">useAnimationControls</span>();
  <span style="color:#569CD6">const</span> <span style="color:#9CDCFE">variants</span> = {
    <span style="color:#9CDCFE">hidden</span>: { <span style="color:#9CDCFE">opacity</span>: 0, <span style="color:#9CDCFE">y</span>: 20 },
    <span style="color:#9CDCFE">visible</span>: {
      <span style="color:#9CDCFE">opacity</span>: 1,
      <span style="color:#9CDCFE">y</span>: 0,
      <span style="color:#9CDCFE">transition</span>: {
        <span style="color:#9CDCFE">duration</span>: 0.6,
        <span style="color:#9CDCFE">staggerChildren</span>: 0.1
      }
    }
  };

  <span style="color:#569CD6">const</span> <span style="color:#9CDCFE">itemVariants</span> = {
    <span style="color:#9CDCFE">hidden</span>: { <span style="color:#9CDCFE">opacity</span>: 0, <span style="color:#9CDCFE">y</span>: 20 },
    <span style="color:#9CDCFE">visible</span>: { <span style="color:#9CDCFE">opacity</span>: 1, <span style="color:#9CDCFE">y</span>: 0 }
  };

  <span style="color:#6A9955">// Custom hook for intersection observer</span>
  <span style="color:#569CD6">const</span> <span style="color:#DCDCAA">useInViewAnimation</span> = (<span style="color:#9CDCFE">threshold</span> = 0.1) => {
    <span style="color:#569CD6">const</span> [<span style="color:#4FC1FF">ref</span>, <span style="color:#4FC1FF">inView</span>] = <span style="color:#DCDCAA">useInView</span>({ <span style="color:#9CDCFE">threshold</span> });

    <span style="color:#DCDCAA">useEffect</span>(() => {
      <span style="color:#569CD6">if</span> (<span style="color:#4FC1FF">inView</span>) {
        <span style="color:#DCDCAA">controls.start</span>(<span style="color:#CE9178">'visible'</span>);
        <span style="color:#DCDCAA">setIsVisible</span>(<span style="color:#569CD6">true</span>);
      }
    }, [<span style="color:#4FC1FF">inView</span>, <span style="color:#4FC1FF">controls</span>]);

    <span style="color:#569CD6">return</span> <span style="color:#4FC1FF">ref</span>;
  };

  <span style="color:#569CD6">const</span> <span style="color:#4FC1FF">sectionRef</span> = <span style="color:#DCDCAA">useInViewAnimation</span>(0.25);

  <span style="color:#569CD6">return</span> (
    <motion.section
      <span style="color:#9CDCFE">ref</span>={<span style="color:#4FC1FF">sectionRef</span>}
      <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">variants</span>}
      <span style="color:#9CDCFE">initial</span>="hidden"
      <span style="color:#9CDCFE">animate</span>={<span style="color:#4FC1FF">controls</span>}
      <span style="color:#9CDCFE">className</span>="<span style="color:#CE9178">animated-container</span>"
    >
      <motion.h1 <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">itemVariants</span>}>
        Amazing animations with React!
      </motion.h1>
      <motion.p <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">itemVariants</span>}>
        Creating modern and interactive interfaces
      </motion.p>
    </motion.section>
  );
}`;
  }, []);

  useEffect(() => {
    if (codeRef.current && inView && !animationInitializedRef.current) {
      const code = codeRef.current;

      // Use the syntax highlighting function for animation
      gsap.to(
        {},
        {
          ...setupCodeTypingAnimation(codeRef, codeText, 5, 1),
        }
      );

      // Mark as initialized to avoid duplicate rendering
      animationInitializedRef.current = true;
    }

    // Animation for the demonstration element
    if (animationRef.current) {
      const element = animationRef.current;

      // Configure advanced GSAP animations
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(element, {
        boxShadow: "0 0 20px 5px rgba(122, 144, 255, 0.5)",
        duration: 1.2,
        ease: "power2.inOut",
      })
        .to(element, {
          boxShadow: "0 0 10px 2px rgba(122, 144, 255, 0.3)",
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(element, {
          scale: 1.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
        .to(element, {
          scale: 1,
          duration: 0.6,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: 10,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: -10,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
    }
  }, [inView, codeText]);

  return (
    <section className="lg:py-5 relative overflow-visible">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto relative">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={controls}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
          >
            Frontend Expertise
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg">
            Building modern, responsive interfaces with JavaScript frameworks
            and utility-first styling
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative">
          <FrontendCard
            icon={<RiCodeSSlashLine />}
            title="JavaScript"
            description="Core expertise in modern JavaScript (ES6+), DOM manipulation, async programming, and building dynamic web interfaces."
            delay={0.1}
          />

          <FrontendCard
            icon={<RiLayout2Line />}
            title="React"
            description="Building component-based UIs with React, managing state, hooks, and creating reusable, maintainable frontend architectures."
            delay={0.2}
          />

          <FrontendCard
            icon={<RiMagicLine />}
            title="Vue.js"
            description="Developing reactive single-page applications with Vue.js, leveraging its ecosystem for efficient frontend development."
            delay={0.3}
          />

          <FrontendCard
            icon={<RiPaintBrushLine />}
            title="Tailwind CSS"
            description="Rapid UI development with utility-first CSS, creating responsive and consistent designs with Tailwind CSS."
            delay={0.4}
          />

          <FrontendCard
            icon={<RiSmartphoneLine />}
            title="Bootstrap"
            description="Building responsive, mobile-first layouts with Bootstrap's grid system and pre-built components."
            delay={0.5}
          />

          <FrontendCard
            icon={<RiSpeedLine />}
            title="Wavemaker"
            description="Enterprise low-code development with Wavemaker, building full-featured web applications with rapid delivery."
            delay={0.6}
          />
        </div>

        {/* Impactful Visual Experience section hidden */}
      </div>
    </section>
  );
};

export default FrontendExpertise;
