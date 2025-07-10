import React, { useEffect, useRef } from "react";

const greetings = [
  { text: "Hi, I'm", lang: "English" },
  { text: "Hola, soy", lang: "Spanish" },
  { text: "你好，我是", lang: "Chinese" },
  { text: "こんにちは、私は", lang: "Japanese" },
  { text: "Bonjour, je suis", lang: "French" },
  { text: "Hallo, ich bin", lang: "German" },
  { text: "Olá, sou", lang: "Portuguese" },
  { text: "안녕하세요, 저는", lang: "Korean" },
  { text: "नमस्ते, मैं हूं", lang: "Hindi" },
  { text: "Привет, я", lang: "Russian" },
  { text: "مرحبا، أنا", lang: "Arabic" },
];

const TypingAnimation = React.memo(function TypingAnimation() {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const animationRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Only initialize once
    if (animationRef.current) return;
    animationRef.current = true;

    const initializeTypingAnimation = async () => {
      try {
        const { gsap } = await import("gsap");
        const { TextPlugin } = await import("gsap/TextPlugin");

        gsap.registerPlugin(TextPlugin);

        // Cursor blinking animation
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });

        // Function to animate typing for a single text
        const animateText = (text) => {
          return new Promise((resolve) => {
            gsap.to(textRef.current, {
              duration: 1,
              text: {
                value: text,
                delimiter: "",
              },
              ease: "none",
              onComplete: () => {
                // Wait 2 seconds after typing
                setTimeout(() => {
                  // Delete the text from right to left
                  const deleteText = () => {
                    let currentText = textRef.current.textContent;
                    if (currentText.length > 0) {
                      currentText = currentText.slice(0, -1); // Remove last character
                      textRef.current.textContent = currentText;
                      setTimeout(deleteText, 100); // Delete next character after 100ms
                    } else {
                      // Wait 0.5 seconds before next text
                      setTimeout(resolve, 500);
                    }
                  };
                  deleteText();
                }, 2000);
              },
            });
          });
        };

        // Main animation loop
        const runAnimation = async () => {
          for (let i = 0; i < greetings.length; i++) {
            currentIndexRef.current = i;
            await animateText(greetings[i].text);
          }
          // Restart the loop
          runAnimation();
        };

        // Start the animation
        runAnimation();
      } catch (error) {
        console.warn("GSAP TextPlugin not available:", error);
        // Fallback to simple text display
        if (textRef.current) {
          textRef.current.textContent = greetings[0].text;
        }
      }
    };

    initializeTypingAnimation();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current = false;
      }
    };
  }, []);

  return (
    <span className="inline-block min-h-[3rem] flex items-center">
      <span ref={textRef} className="inline-block"></span>
      <span
        ref={cursorRef}
        className="inline-block w-0.5 h-12 bg-blue-400 ml-1"
      />
    </span>
  );
});

export default TypingAnimation;
