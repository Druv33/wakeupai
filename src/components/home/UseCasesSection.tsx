import { Youtube, Film, Megaphone, Clapperboard, Wand2 } from "lucide-react";
import { FadeIn } from "./FadeIn";

const useCases = [
  {
    icon: Youtube,
    title: "Faceless YouTube Channels",
    description: "Create compelling scene prompts for AI-generated faceless content that keeps viewers engaged.",
  },
  {
    icon: Film,
    title: "Short-Form Creators",
    description: "Generate viral-ready scenes for TikTok, Reels, and Shorts with cinematic quality.",
  },
  {
    icon: Megaphone,
    title: "Marketing Agencies",
    description: "Produce cinematic ad concepts without a production budget or filmmaking expertise.",
  },
  {
    icon: Clapperboard,
    title: "Indie Filmmakers",
    description: "Pre-visualize scenes with AI-generated storyboards and detailed shot descriptions.",
  },
  {
    icon: Wand2,
    title: "AI Video Creators",
    description: "Get the most out of Runway, Pika, Sora, and other AI video tools with optimized prompts.",
  },
];

export const UseCasesSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-center mb-4">
          Built For Creators
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Whether you're running a faceless channel or directing your next short film, WakeupAI speaks your creative language.
        </p>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((item, i) => (
          <FadeIn key={item.title} delay={i * 80}>
            <div className="p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
              <item.icon className="h-5 w-5 mb-3 text-foreground" />
              <h3 className="font-bold tracking-tight mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
