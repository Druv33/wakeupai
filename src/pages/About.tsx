import { FadeIn } from "@/components/home/FadeIn";

const About = () => (
  <div className="py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-6">About WakeupAI</h1>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            WakeupAI is an AI-powered cinematic scene architect designed to help video creators
            produce professional-quality content without needing a film school degree.
          </p>
          <p>
            We believe that every creator deserves access to the language of cinema. Whether you're
            building a faceless YouTube channel, creating content for social media, or pre-visualizing
            scenes for an indie film — our tool bridges the gap between your creative vision and the
            technical prompts that AI video generators need.
          </p>

          <h2 className="text-xl font-bold text-foreground tracking-tight pt-4">Our Mission</h2>
          <p>
            To democratize cinematic storytelling by giving every creator the tools to think and
            communicate like a professional filmmaker — instantly, freely, and without barriers.
          </p>

          <h2 className="text-xl font-bold text-foreground tracking-tight pt-4">How We're Different</h2>
          <p>
            Most AI prompt tools are generic. WakeupAI is purpose-built for video. We understand
            that a great cinematic prompt isn't just a description — it's a blueprint that includes
            camera movement, lighting direction, emotional tone, and visual rhythm. Our AI has been
            trained to think like a cinematographer.
          </p>

          <h2 className="text-xl font-bold text-foreground tracking-tight pt-4">The Team</h2>
          <p>
            WakeupAI is built by a small team of AI enthusiasts, filmmakers, and developers who are
            passionate about the intersection of artificial intelligence and visual storytelling.
          </p>

          <h2 className="text-xl font-bold text-foreground tracking-tight pt-4">Contact</h2>
          <p>
            Have questions, feedback, or partnership inquiries? Reach out to us at{" "}
            <a
              href="mailto:hello@wakeupai.in"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              hello@wakeupai.in
            </a>
          </p>
        </div>
      </FadeIn>
    </div>
  </div>
);

export default About;
