import { useState } from "react";
import { Copy, RotateCcw, Sparkles, Check, Palette, Film, Image, Ban, Monitor, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DropdownSelector } from "./DropdownSelector";
import { useSceneGenerator } from "@/hooks/useSceneGenerator";
import { FadeIn } from "./FadeIn";

const STYLES = [
  "Hollywood", "Noir", "Documentary", "Indie", "Netflix", "Art House",
  "Vintage Film", "Cyberpunk", "Minimalist", "Epic Cinematic", "Realistic",
  "Experimental", "Commercial / Ad Style", "Music Video Style", "Slow Cinema",
];

const EMOTIONS = [
  "Intense", "Lonely", "Hopeful", "Calm", "Mysterious", "Melancholic",
  "Nostalgic", "Tense", "Peaceful", "Romantic", "Fearful", "Powerful",
  "Vulnerable", "Dreamy", "Inspiring", "Cold & Distant", "Warm & Human",
];

const CAMERAS = [
  "Wide", "Close-up", "Drone", "Handheld", "Static", "Medium Shot",
  "Extreme Close-up", "Over-the-Shoulder", "POV (First Person)",
  "Tracking Shot", "Dolly In", "Dolly Out", "Crane Shot",
  "Locked-off Tripod", "Slow Push-in",
];

const LIGHTING = [
  "Natural", "Golden Hour", "Low-key", "Neon City", "Soft Diffused Light",
  "High Contrast", "Backlit Silhouette", "Practical Lights Only",
  "Window Light", "Overcast Day", "Indoor Ambient", "Studio Softbox", "Moody Shadows",
];

const PLATFORMS = [
  "YouTube Shorts", "TikTok", "Instagram Reels", "Film",
  "YouTube Long-form", "Ads / Commercial", "Documentary",
  "Cinematic Trailer", "Vertical Story Format", "Horizontal Cinema", "Mobile-first Video",
];

const IMAGE_SIZES = [
  "1024x1024 (Square)", "1920x1080 (Landscape 16:9)", "1080x1920 (Portrait 9:16)",
  "1280x720 (HD 16:9)", "720x1280 (HD 9:16)", "1024x1792 (Tall Portrait)",
  "1792x1024 (Wide Landscape)", "512x512 (Small Square)", "768x768 (Medium Square)",
];

const VARIANT_SUGGESTIONS = [
  "Make it darker",
  "Make it more dramatic",
  "Make it documentary style",
  "Add more mystery",
  "Make it warmer",
];

const OutputCard = ({
  title,
  icon,
  content,
  onCopy,
}: {
  title: string;
  icon?: React.ReactNode;
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
    <div className="rounded-xl border bg-card p-5 sm:p-6 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base sm:text-lg font-bold tracking-tight">{title}</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="rounded-lg gap-1 shrink-0">
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
    imageSize, setImageSize,
    result, isLoading, error,
    generate, reset, copyToClipboard,
  } = useSceneGenerator();

  const handleVariant = (variant: string) => {
    setSceneIdea((prev) => `${prev} — ${variant}`);
    setTimeout(() => generate(), 100);
  };

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

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider mb-4">
                Cinematic Controls
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DropdownSelector label="Cinematic Style" helperText="Defines the overall cinematic language and pacing" options={STYLES} selected={style} onSelect={setStyle} />
                <DropdownSelector label="Emotion" helperText="Controls mood, facial expression, pacing, and emotional tone" options={EMOTIONS} selected={emotion} onSelect={setEmotion} />
                <DropdownSelector label="Camera" helperText="Camera choice affects realism and cinematic depth" options={CAMERAS} selected={camera} onSelect={setCamera} />
                <DropdownSelector label="Lighting" helperText="Sets the visual atmosphere and shadow quality" options={LIGHTING} selected={lighting} onSelect={setLighting} />
                <DropdownSelector label="Platform" helperText="Optimizes framing, pacing, and aspect ratio" options={PLATFORMS} selected={platform} onSelect={setPlatform} />
                <DropdownSelector label="Image Size" helperText="Sets the output image resolution and aspect ratio" options={IMAGE_SIZES} selected={imageSize} onSelect={setImageSize} />
              </div>
            </div>

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
            {/* A. Cinematic Scene Description */}
            <OutputCard
              title="Cinematic Scene Description"
              icon={<Film className="h-5 w-5 text-primary" />}
              content={result.cinematicPrompt}
              onCopy={() => copyToClipboard(result.cinematicPrompt, "Scene description copied!")}
            />

            {/* B. Storyboard */}
            <div className="rounded-xl border bg-card p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">Storyboard (Shot-by-shot)</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg gap-1 shrink-0"
                  onClick={() => {
                    const text = result.storyboard.map(s =>
                      `Shot ${s.shot}: ${s.description}\nType: ${s.shotType} | Camera: ${s.cameraMovement} | Emotion: ${s.emotion} | Duration: ${s.duration}`
                    ).join("\n\n");
                    copyToClipboard(text, "Storyboard copied!");
                  }}
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              <div className="space-y-4">
                {result.storyboard.map((shot) => (
                  <div key={shot.shot} className="rounded-lg border border-border/30 bg-secondary/20 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 py-1 bg-secondary/50 rounded-md">
                        Shot {shot.shot}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground/70 bg-secondary/50 px-2 py-1 rounded-md">
                        {shot.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{shot.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{shot.shotType}</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{shot.cameraMovement}</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{shot.emotion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Image Generation Prompt */}
            <OutputCard
              title="Image Generation Prompt"
              icon={<Image className="h-5 w-5 text-primary" />}
              content={result.imagePrompt}
              onCopy={() => copyToClipboard(result.imagePrompt, "Image prompt copied!")}
            />

            {/* D. Negative Prompt */}
            {result.negativePrompt && (
              <OutputCard
                title="Negative Prompt"
                icon={<Ban className="h-5 w-5 text-destructive" />}
                content={result.negativePrompt}
                onCopy={() => copyToClipboard(result.negativePrompt, "Negative prompt copied!")}
              />
            )}

            {/* E. Platform Optimization */}
            {result.platformOptimization && (
              <div className="rounded-xl border bg-card p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">Platform Optimization</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border/30 bg-secondary/20 p-3 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Best For</p>
                    <p className="text-sm font-medium text-foreground">{result.platformOptimization.bestFor}</p>
                  </div>
                  <div className="rounded-lg border border-border/30 bg-secondary/20 p-3 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Aspect Ratio</p>
                    <p className="text-sm font-medium text-foreground">{result.platformOptimization.aspectRatio}</p>
                  </div>
                  <div className="rounded-lg border border-border/30 bg-secondary/20 p-3 space-y-1 sm:col-span-1 col-span-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Style Tips</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.platformOptimization.styleConsistencyTips}</p>
                  </div>
                </div>
              </div>
            )}

            {/* F. Regenerate Variant */}
            <div className="rounded-xl border bg-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-bold tracking-tight">Regenerate Variant</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {VARIANT_SUGGESTIONS.map((v) => (
                  <Button
                    key={v}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => handleVariant(v)}
                    disabled={isLoading}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

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
