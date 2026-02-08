import { useState } from "react";
import { Copy, RotateCcw, Sparkles, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DropdownSelector } from "./DropdownSelector";
import { useSceneGenerator } from "@/hooks/useSceneGenerator";
import { FadeIn } from "./FadeIn";

// Expanded option lists
const STYLES = [
  "Hollywood",
  "Noir",
  "Documentary",
  "Indie",
  "Netflix",
  "Art House",
  "Vintage Film",
  "Cyberpunk",
  "Minimalist",
  "Epic Cinematic",
  "Realistic",
  "Experimental",
  "Commercial / Ad Style",
  "Music Video Style",
  "Slow Cinema",
];

const EMOTIONS = [
  "Intense",
  "Lonely",
  "Hopeful",
  "Calm",
  "Mysterious",
  "Melancholic",
  "Nostalgic",
  "Tense",
  "Peaceful",
  "Romantic",
  "Fearful",
  "Powerful",
  "Vulnerable",
  "Dreamy",
  "Inspiring",
  "Cold & Distant",
  "Warm & Human",
];

const CAMERAS = [
  "Wide",
  "Close-up",
  "Drone",
  "Handheld",
  "Static",
  "Medium Shot",
  "Extreme Close-up",
  "Over-the-Shoulder",
  "POV (First Person)",
  "Tracking Shot",
  "Dolly In",
  "Dolly Out",
  "Crane Shot",
  "Locked-off Tripod",
  "Slow Push-in",
];

const LIGHTING = [
  "Natural",
  "Golden Hour",
  "Low-key",
  "Neon City",
  "Soft Diffused Light",
  "High Contrast",
  "Backlit Silhouette",
  "Practical Lights Only",
  "Window Light",
  "Overcast Day",
  "Indoor Ambient",
  "Studio Softbox",
  "Moody Shadows",
];

const PLATFORMS = [
  "YouTube Shorts",
  "TikTok",
  "Instagram Reels",
  "Film",
  "YouTube Long-form",
  "Ads / Commercial",
  "Documentary",
  "Cinematic Trailer",
  "Vertical Story Format",
  "Horizontal Cinema",
  "Mobile-first Video",
];

const OutputCard = ({
  title,
  content,
  onCopy,
}: {
  title: string;
  content: string;
  onCopy: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border bg-card p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="rounded-lg gap-1">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export const ToolSection = () => {
  const {
    sceneIdea, setSceneIdea,
    style, setStyle,
    emotion, setEmotion,
    camera, setCamera,
    lighting, setLighting,
    platform, setPlatform,
    result, isLoading, error,
    generate, reset, copyToClipboard,
  } = useSceneGenerator();

  return (
    <section id="tool" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-center mb-3">
            Describe Your Scene
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-md mx-auto">
            Enter your scene idea and fine-tune the cinematic parameters below
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-8">
            {/* Scene Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Scene Idea
              </label>
              <Textarea
                placeholder="A man walking alone in rain at midnight..."
                value={sceneIdea}
                onChange={(e) => setSceneIdea(e.target.value)}
                className="min-h-[120px] text-base resize-none border-border/30 bg-secondary/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
            </div>

            {/* Cinematic Controls Grid */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-4">
                Cinematic Controls
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DropdownSelector
                  label="Cinematic Style"
                  helperText="Defines the overall cinematic language and pacing"
                  options={STYLES}
                  selected={style}
                  onSelect={setStyle}
                />

                <DropdownSelector
                  label="Emotion"
                  helperText="Controls mood, facial expression, pacing, and emotional tone"
                  options={EMOTIONS}
                  selected={emotion}
                  onSelect={setEmotion}
                />

                <DropdownSelector
                  label="Camera"
                  helperText="Camera choice affects realism and cinematic depth"
                  options={CAMERAS}
                  selected={camera}
                  onSelect={setCamera}
                />

                <DropdownSelector
                  label="Lighting"
                  helperText="Sets the visual atmosphere and shadow quality"
                  options={LIGHTING}
                  selected={lighting}
                  onSelect={setLighting}
                />

                <div className="sm:col-span-2">
                  <DropdownSelector
                    label="Platform"
                    helperText="Optimizes framing, pacing, and aspect ratio"
                    options={PLATFORMS}
                    selected={platform}
                    onSelect={setPlatform}
                  />
                </div>
              </div>
            </div>

            {/* Generate Button - Sticky on mobile */}
            <div className="sticky bottom-4 z-40 pt-4">
              <Button
                onClick={generate}
                disabled={isLoading || !sceneIdea.trim()}
                className="w-full h-14 text-base font-bold rounded-2xl transition-all shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Scene
                  </span>
                )}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </div>
        </FadeIn>

        {result && (
          <FadeIn className="mt-12 space-y-6">
            <OutputCard
              title="Cinematic Prompt"
              content={result.cinematicPrompt}
              onCopy={() => copyToClipboard(result.cinematicPrompt, "Prompt copied!")}
            />

            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-lg font-bold tracking-tight">Storyboard</h3>
              <div className="space-y-4">
                {result.storyboard.map((shot) => (
                  <div key={shot.shot} className="flex gap-4 items-start">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1 shrink-0 min-w-[3.5rem] px-2 py-1 bg-secondary/50 rounded-md text-center">
                      Shot {shot.shot}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{shot.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <OutputCard
              title="Image Generation Prompt"
              content={result.imagePrompt}
              onCopy={() => copyToClipboard(result.imagePrompt, "Image prompt copied!")}
            />

            <Button variant="outline" onClick={reset} className="w-full rounded-xl h-12">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset & Start Over
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
