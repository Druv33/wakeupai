import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./FadeIn";

const ROTATING_WORDS = ["Video", "Image"];

const TypewriterWord = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, 120);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <span className="inline-block min-w-[3ch]">
      {displayText}
      <span className="animate-blink text-muted-foreground">|</span>
    </span>
  );
};

export const HeroSection = () => {
  const scrollToTool = () => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          AI-Powered Scene Architect
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] max-w-4xl">
          AI <TypewriterWord /> Scene Generator for Cinematic Faceless Videos
        </h1>
      </FadeIn>
      <FadeIn delay={200}>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Transform simple scene ideas into professional cinematic prompts.
          No filmmaking knowledge required. Free, instant, no login.
        </p>
      </FadeIn>
      <FadeIn delay={300}>
        <Button
          onClick={scrollToTool}
          className="mt-8 h-12 px-8 text-base font-bold rounded-xl"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Your First Scene
        </Button>
      </FadeIn>
    </section>
  );
};
