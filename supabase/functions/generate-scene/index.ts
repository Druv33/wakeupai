import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory IP-based rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Allowed values for dropdown parameters
const VALID_STYLES = ["Hollywood", "Indie", "Documentary", "Film Noir", "Netflix Modern", "Anime", "Horror", "Sci-Fi", "Fantasy", "Vintage"];
const VALID_EMOTIONS = ["Intense", "Calm", "Mysterious", "Romantic", "Thrilling", "Melancholic", "Joyful", "Dark", "Hopeful", "Nostalgic"];
const VALID_CAMERAS = ["Wide", "Close-up", "Medium", "Tracking", "Aerial", "POV", "Dutch Angle", "Over-the-Shoulder", "Bird's Eye", "Low Angle"];
const VALID_LIGHTING = ["Natural", "Golden Hour", "Neon", "Low Key", "High Key", "Backlit", "Silhouette", "Moonlight", "Studio", "Candlelight"];
const VALID_PLATFORMS = ["YouTube Shorts", "TikTok", "Instagram Reels", "YouTube", "Film", "Thumbnail", "Poster"];
const VALID_IMAGE_SIZES = ["1024x1024 (Square)", "1792x1024 (Landscape 16:9)", "1024x1792 (Portrait 9:16)", "1536x1024 (Landscape 3:2)", "1024x1536 (Portrait 2:3)"];
const MAX_SCENE_IDEA_LENGTH = 1000;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { sceneIdea, style, emotion, camera, lighting, platform, imageSize } = body;

    // Validate sceneIdea
    if (!sceneIdea || typeof sceneIdea !== "string" || sceneIdea.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a scene idea." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (sceneIdea.length > MAX_SCENE_IDEA_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Scene idea too long (max ${MAX_SCENE_IDEA_LENGTH} characters).` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate enum parameters - use defaults if invalid
    const safeStyle = VALID_STYLES.includes(style) ? style : "Hollywood";
    const safeEmotion = VALID_EMOTIONS.includes(emotion) ? emotion : "Intense";
    const safeCamera = VALID_CAMERAS.includes(camera) ? camera : "Wide";
    const safeLighting = VALID_LIGHTING.includes(lighting) ? lighting : "Natural";
    const safePlatform = VALID_PLATFORMS.includes(platform) ? platform : "YouTube Shorts";
    const safeImageSize = VALID_IMAGE_SIZES.includes(imageSize) ? imageSize : "1024x1024 (Square)";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a professional cinematographer and AI video prompt architect. Your job is to transform simple scene ideas into detailed, cinematic prompts optimized for AI video generation tools like Runway, Pika, Sora, and Kling.

Given a scene idea and creative parameters, you MUST call the generate_scene tool with a structured cinematic output.

Guidelines:
- Write prompts in present tense, descriptive, visual language
- Include specific camera movements, lighting details, and atmospheric elements
- The cinematic prompt should be 3-5 sentences of rich visual description
- Each storyboard shot should describe a specific moment with camera angle, movement, emotion/intensity, and suggested duration
- The image prompt should be optimized for AI image generators (Midjourney, DALL-E style)
- The negative prompt should list things to AVOID for best AI image quality (e.g., blurry, low quality, deformed, etc.)
- Platform optimization should include best-for usage, aspect ratio, and style consistency tips
- Match the selected cinematic style, emotion, camera type, lighting, and platform
- For short-form platforms (YouTube Shorts, TikTok, Reels), keep shots punchy and dynamic
- For Film, allow more contemplative pacing and longer compositions`;

    const userPrompt = `Scene idea: "${sceneIdea.trim()}"
Cinematic Style: ${safeStyle}
Emotion: ${safeEmotion}
Camera Type: ${safeCamera}
Lighting: ${safeLighting}
Platform: ${safePlatform}
Image Size: ${safeImageSize}

Generate a professional cinematic scene based on these parameters.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_scene",
              description: "Generate a structured cinematic scene with prompt, storyboard, image prompt, negative prompt, and platform optimization.",
              parameters: {
                type: "object",
                properties: {
                  cinematicPrompt: {
                    type: "string",
                    description: "A detailed 3-5 sentence cinematic prompt optimized for AI video generation.",
                  },
                  storyboard: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        shot: { type: "number", description: "Shot number" },
                        shotType: { type: "string", description: "Type of shot (e.g., Wide, Close-up, Medium)" },
                        cameraMovement: { type: "string", description: "Camera movement (e.g., Slow pan left, Static, Dolly in)" },
                        emotion: { type: "string", description: "Emotion/intensity of the shot" },
                        duration: { type: "string", description: "Suggested duration (e.g., 2-3s)" },
                        description: { type: "string", description: "Detailed shot description." },
                      },
                      required: ["shot", "shotType", "cameraMovement", "emotion", "duration", "description"],
                      additionalProperties: false,
                    },
                    description: "A 3-4 shot storyboard breakdown.",
                  },
                  imagePrompt: {
                    type: "string",
                    description: "Optimized, clean, AI-ready prompt for image generation.",
                  },
                  negativePrompt: {
                    type: "string",
                    description: "Things to avoid for best AI image quality. E.g.: blurry, low quality, deformed hands, extra fingers, watermark, text, logo, bad anatomy, cropped, worst quality, jpeg artifacts, duplicate.",
                  },
                  platformOptimization: {
                    type: "object",
                    properties: {
                      bestFor: { type: "string", description: "Best platform usage (e.g., YouTube Shorts, Thumbnail, Poster)" },
                      aspectRatio: { type: "string", description: "Recommended aspect ratio (e.g., 9:16, 16:9, 1:1)" },
                      styleConsistencyTips: { type: "string", description: "Tips for maintaining visual style consistency across content." },
                    },
                    required: ["bestFor", "aspectRatio", "styleConsistencyTips"],
                    additionalProperties: false,
                  },
                },
                required: ["cinematicPrompt", "storyboard", "imagePrompt", "negativePrompt", "platformOptimization"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_scene" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate scene. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("Unexpected AI response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Unexpected response from AI. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sceneResult = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(sceneResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-scene error:", e);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
