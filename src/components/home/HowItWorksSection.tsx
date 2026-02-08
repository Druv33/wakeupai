import { FadeIn } from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Describe Your Scene",
    description: "Type a simple scene idea in plain English. No technical filmmaking knowledge needed.",
  },
  {
    number: "02",
    title: "Choose Your Style",
    description: "Select cinematic style, emotion, camera type, lighting, and target platform.",
  },
  {
    number: "03",
    title: "Get Your Prompt",
    description: "Receive a professionally structured cinematic prompt with storyboard breakdown.",
  },
];

export const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-center mb-12">
          How It Works
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 100}>
            <div className="text-center space-y-3">
              <span className="text-5xl font-extrabold text-muted-foreground/20 block">
                {step.number}
              </span>
              <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
