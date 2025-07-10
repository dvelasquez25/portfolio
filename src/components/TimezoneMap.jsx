import React, { useState, useEffect, useRef } from "react";

const TIMEZONES = [
  {
    city: "San José, Costa Rica",
    timezone: "America/Costa_Rica",
    flag: "🇨🇷",
    description: "My hometown",
  },
  {
    city: "New York",
    timezone: "America/New_York",
    flag: "🇺🇸",
    description: "East Coast",
  },
  {
    city: "Los Angeles",
    timezone: "America/Los_Angeles",
    flag: "🇺🇸",
    description: "West Coast",
  },
  {
    city: "Chicago",
    timezone: "America/Chicago",
    flag: "🇺🇸",
    description: "Central",
  },
];

function TimeCard({ city, timezone, flag, description, isCostaRica, index }) {
  const [time, setTime] = useState(new Date());
  const cityRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timezone) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date);
    } catch (error) {
      return "Error";
    }
  };

  const formatDate = (date, timezone) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date);
    } catch (error) {
      return "Error";
    }
  };

  return (
    <div
      className={`timezone-card relative flex items-center justify-between p-6 bg-gray-800 rounded-2xl border border-gray-700 transition-all duration-200 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/50 ${
        isCostaRica
          ? "border-blue-500/50 bg-gray-800/80 hover:border-blue-400/70"
          : ""
      }`}
      data-index={index}
    >
      <div className="flex items-center space-x-4">
        <span className="text-2xl">{flag}</span>
        <div>
          <div className="flex items-center gap-2">
            <h3
              ref={cityRef}
              className={`text-lg font-semibold m-0 ${
                isCostaRica ? "text-blue-400" : "text-white"
              }`}
            >
              {city}
            </h3>
          </div>
          <p className="text-sm text-gray-400 mt-0.5 mb-0">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`text-2xl font-bold font-mono ${
            isCostaRica ? "text-blue-400" : "text-blue-300"
          }`}
        >
          {formatTime(time, timezone)}
        </div>
        <div className="text-sm text-gray-400 font-medium">
          {formatDate(time, timezone)}
        </div>
      </div>
      {isCostaRica && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}

export default function TimezoneDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP animations for timezone cards
  useEffect(() => {
    const initializeAnimations = async () => {
      // Dynamically import GSAP to avoid SSR issues
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrambleTextPlugin } = await import("gsap/ScrambleTextPlugin");

      // Register plugins
      gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

      // Set initial state for timezone cards
      gsap.set(".timezone-card", {
        x: -100,
        opacity: 0,
      });

      // Create horizontal slide-in animation for each card
      gsap.to(".timezone-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Trigger scramble text animations when section enters viewport
            const cityElements = document.querySelectorAll(".timezone-card h3");
            cityElements.forEach((element, index) => {
              const city = element.textContent;
              const delay = index * 200; // 200ms stagger between each city

              setTimeout(() => {
                gsap.fromTo(
                  element,
                  {
                    scrambleText: {
                      text: city,
                      chars:
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                      speed: 0.1,
                      newClass: "scrambled-text",
                    },
                  },
                  {
                    duration: 2,
                    scrambleText: {
                      text: city,
                      chars:
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                      speed: 0.1,
                      newClass: "scrambled-text",
                    },
                    ease: "power2.out",
                  }
                );
              }, delay);
            });
          },
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    };

    // Initialize animations when component mounts
    initializeAnimations();

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers when component unmounts
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  // Sort timezones by current time
  const sortedTimezones = [...TIMEZONES].sort((a, b) => {
    const timeA = new Date(
      currentTime.toLocaleString("en-US", { timeZone: a.timezone })
    );
    const timeB = new Date(
      currentTime.toLocaleString("en-US", { timeZone: b.timezone })
    );
    return timeA.getTime() - timeB.getTime();
  });

  return (
    <div className="w-full max-w-3xl mx-auto" ref={containerRef}>
      <div className="space-y-4 relative">
        {sortedTimezones.map((tz, index) => {
          const isCostaRica = tz.city === "San José, Costa Rica";
          return (
            <div key={index} className="relative">
              <TimeCard
                city={tz.city}
                timezone={tz.timezone}
                flag={tz.flag}
                description={tz.description}
                isCostaRica={isCostaRica}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
