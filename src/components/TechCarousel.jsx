import React, { useEffect, useRef } from "react";

// Import all tech images
import reactIcon from "../images/tech/react.svg";
import nextIcon from "../images/tech/next.svg";
import typescriptIcon from "../images/tech/typescript.svg";
import javascriptIcon from "../images/tech/javascript.svg";
import nodejsIcon from "../images/tech/nodejs.svg";
import expressIcon from "../images/tech/express.svg";
import tailwindcssIcon from "../images/tech/tailwindcss.svg";
import postgresqlIcon from "../images/tech/postgresql.svg";
import mongodbIcon from "../images/tech/mongodb.svg";
import gitIcon from "../images/tech/git.svg";
import githubIcon from "../images/tech/github.svg";
import dockerIcon from "../images/tech/docker.svg";
import vercelIcon from "../images/tech/vercel.svg";
import astroIcon from "../images/tech/astro.svg";
import figmaIcon from "../images/tech/figma.svg";
import eslintIcon from "../images/tech/eslint.svg";
import npmIcon from "../images/tech/npm.svg";
import pnpmIcon from "../images/tech/pnpm.svg";
import turborepoIcon from "../images/tech/turborepo.svg";
import cloudflareIcon from "../images/tech/cloudflare.svg";
import rustIcon from "../images/tech/rust.svg";
import pythonIcon from "../images/tech/python.svg";
import awsIcon from "../images/tech/aws.svg";

// Create a singleton for tech items to prevent recreation
const techItems = [
  {
    name: "React",
    icon: reactIcon,
    url: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    icon: nextIcon,
    url: "https://nextjs.org/",
  },
  {
    name: "TypeScript",
    icon: typescriptIcon,
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "JavaScript",
    icon: javascriptIcon,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Node.js",
    icon: nodejsIcon,
    url: "https://nodejs.org/",
  },
  {
    name: "Express.js",
    icon: expressIcon,
    url: "https://expressjs.com/",
  },
  {
    name: "Tailwind CSS",
    icon: tailwindcssIcon,
    url: "https://tailwindcss.com/",
  },
  {
    name: "PostgreSQL",
    icon: postgresqlIcon,
    url: "https://www.postgresql.org/",
  },
  {
    name: "MongoDB",
    icon: mongodbIcon,
    url: "https://www.mongodb.com/",
  },
  { name: "Git", icon: gitIcon, url: "https://git-scm.com/" },
  {
    name: "GitHub",
    icon: githubIcon,
    url: "https://github.com/",
  },
  {
    name: "Docker",
    icon: dockerIcon,
    url: "https://www.docker.com/",
  },
  {
    name: "Vercel",
    icon: vercelIcon,
    url: "https://vercel.com/",
  },
  {
    name: "Astro",
    icon: astroIcon,
    url: "https://astro.build/",
  },
  {
    name: "Figma",
    icon: figmaIcon,
    url: "https://www.figma.com/",
  },
  {
    name: "ESLint",
    icon: eslintIcon,
    url: "https://eslint.org/",
  },
  {
    name: "NPM",
    icon: npmIcon,
    url: "https://www.npmjs.com/",
  },
  { name: "PNPM", icon: pnpmIcon, url: "https://pnpm.io/" },
  {
    name: "Turborepo",
    icon: turborepoIcon,
    url: "https://turbo.build/",
  },
  {
    name: "Cloudflare",
    icon: cloudflareIcon,
    url: "https://www.cloudflare.com/",
  },
  {
    name: "Rust",
    icon: rustIcon,
    url: "https://www.rust-lang.org/",
  },
  {
    name: "Python",
    icon: pythonIcon,
    url: "https://www.python.org/",
  },
  {
    name: "AWS",
    icon: awsIcon,
    url: "https://aws.amazon.com/",
  },
];

// Global flag to prevent multiple initializations
let isInitialized = false;

const TechCarousel = React.memo(() => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Prevent multiple initializations globally
    if (isInitialized) return;
    isInitialized = true;

    const loadGSAP = async () => {
      const { gsap } = await import("gsap");

      const carousel = carouselRef.current;
      if (!carousel) return;

      // Clone items for seamless loop
      const items = carousel.querySelectorAll(".tech-item");
      const clonedItems = Array.from(items).map((item) => item.cloneNode(true));

      clonedItems.forEach((item) => {
        carousel.appendChild(item);
      });

      // Create the animation
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(carousel, {
        x: `-${carousel.scrollWidth / 2}`,
        duration: 100,
        ease: "none",
      });

      // Pause on hover
      carousel.addEventListener("mouseenter", () => tl.pause());
      carousel.addEventListener("mouseleave", () => tl.resume());

      return () => {
        tl.kill();
      };
    };

    loadGSAP();
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          Technologies I Work With
        </h3>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-8 items-center"
        style={{ width: "max-content" }}
      >
        {techItems.map((tech, index) => (
          <a
            key={index}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-item flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer no-underline"
          >
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center p-2 transition-all duration-300 group-hover:bg-gray-700 group-hover:scale-110">
              <img
                src={tech.icon.src}
                alt={tech.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xs text-gray-400 text-center font-medium group-hover:text-white transition-colors duration-300">
              {tech.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
});

export default TechCarousel;
