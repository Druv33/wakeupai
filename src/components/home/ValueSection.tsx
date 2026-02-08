import { AlertTriangle, Languages, Zap } from "lucide-react";
import { FadeIn } from "./FadeIn";

const values = [
  {
    icon: AlertTriangle,
    title: "Why Prompts Fail",
    description:
      "Generic descriptions produce generic videos. AI video tools need specific cinematic language — shot types, lighting cues, emotional direction — that most creators don't know.",
  },
  {
    icon: Languages,
    title: "Cinematic Language Matters",
    description:
      "Professional filmmakers think in shots, transitions, and mood. This tool translates your simple ideas into the precise visual language that AI video generators understand.",
  },
  {
    icon: Zap,
    title: "Instant, Free, No Signup",
    description:
      "Get production-quality prompts in seconds. No account needed, no subscription required. Just describe your scene and let the AI architect handle the rest.",
  },
];

export const ValueSection = () => (
  <section className="py-20 px-4 bg-secondary/50">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-center mb-12">
          Why This Tool Exists
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {values.map((item, i) => (
          <FadeIn key={item.title} delay={i * 80}>
            <div className="p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors h-full">
              <item.icon className="h-5 w-5 mb-3 text-foreground" />
              <h3 className="font-bold tracking-tight mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
