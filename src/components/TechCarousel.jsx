import React, { useEffect, useRef } from "react";

const TechCarousel = () => {
  const carouselRef = useRef(null);

  const techItems = [
    {
      name: "React",
      icon: "/images/tech/react.svg",
      url: "https://reactjs.org/",
    },
    {
      name: "Next.js",
      icon: "/images/tech/next.svg",
      url: "https://nextjs.org/",
    },
    {
      name: "TypeScript",
      icon: "/images/tech/typescript.svg",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "JavaScript",
      icon: "/images/tech/javascript.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "Node.js",
      icon: "/images/tech/nodejs.svg",
      url: "https://nodejs.org/",
    },
    {
      name: "Express.js",
      icon: "/images/tech/express.svg",
      url: "https://expressjs.com/",
    },
    {
      name: "Tailwind CSS",
      icon: "/images/tech/tailwindcss.svg",
      url: "https://tailwindcss.com/",
    },
    {
      name: "PostgreSQL",
      icon: "/images/tech/postgresql.svg",
      url: "https://www.postgresql.org/",
    },
    {
      name: "MongoDB",
      icon: "/images/tech/mongodb.svg",
      url: "https://www.mongodb.com/",
    },
    { name: "Git", icon: "/images/tech/git.svg", url: "https://git-scm.com/" },
    {
      name: "GitHub",
      icon: "/images/tech/github.svg",
      url: "https://github.com/",
    },
    {
      name: "Docker",
      icon: "/images/tech/docker.svg",
      url: "https://www.docker.com/",
    },
    {
      name: "Vercel",
      icon: "/images/tech/vercel.svg",
      url: "https://vercel.com/",
    },
    {
      name: "Astro",
      icon: "/images/tech/astro.svg",
      url: "https://astro.build/",
    },
    {
      name: "Figma",
      icon: "/images/tech/figma.svg",
      url: "https://www.figma.com/",
    },
    {
      name: "ESLint",
      icon: "/images/tech/eslint.svg",
      url: "https://eslint.org/",
    },
    {
      name: "NPM",
      icon: "/images/tech/npm.svg",
      url: "https://www.npmjs.com/",
    },
    { name: "PNPM", icon: "/images/tech/pnpm.svg", url: "https://pnpm.io/" },
    {
      name: "Turborepo",
      icon: "/images/tech/turborepo.svg",
      url: "https://turbo.build/",
    },
    {
      name: "Cloudflare",
      icon: "/images/tech/cloudflare.svg",
      url: "https://www.cloudflare.com/",
    },
    {
      name: "Rust",
      icon: "/images/tech/rust.svg",
      url: "https://www.rust-lang.org/",
    },
    {
      name: "Python",
      icon: "/images/tech/python.svg",
      url: "https://www.python.org/",
    },
    {
      name: "AWS",
      icon: "/images/tech/aws.svg",
      url: "https://aws.amazon.com/",
    },
  ];

  useEffect(() => {
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
                src={tech.icon}
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
};

export default TechCarousel;
