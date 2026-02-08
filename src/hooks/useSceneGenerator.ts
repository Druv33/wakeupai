import { useState } from "react";
import { toast } from "sonner";

export interface SceneResult {
  cinematicPrompt: string;
  storyboard: { shot: number; description: string }[];
  imagePrompt: string;
}

export const useSceneGenerator = () => {
  const [sceneIdea, setSceneIdea] = useState("");
  const [style, setStyle] = useState("Hollywood");
  const [emotion, setEmotion] = useState("Intense");
  const [camera, setCamera] = useState("Wide");
  const [lighting, setLighting] = useState("Natural");
  const [platform, setPlatform] = useState("YouTube Shorts");
  const [result, setResult] = useState<SceneResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!sceneIdea.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl) {
        throw new Error("Backend is being configured. Please refresh and try again.");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/generate-scene`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ sceneIdea, style, emotion, camera, lighting, platform }),
      });

      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("Service temporarily unavailable. Please try again later.");
      }
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate scene. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSceneIdea("");
    setStyle("Hollywood");
    setEmotion("Intense");
    setCamera("Wide");
    setLighting("Natural");
    setPlatform("YouTube Shorts");
    setResult(null);
    setError(null);
  };

  const copyToClipboard = async (text: string, successMsg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMsg);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return {
    sceneIdea, setSceneIdea,
    style, setStyle,
    emotion, setEmotion,
    camera, setCamera,
    lighting, setLighting,
    platform, setPlatform,
    result, isLoading, error,
    generate, reset, copyToClipboard,
  };
};
