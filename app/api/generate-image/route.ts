import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { prompt, storyContent } = await req.json()

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      console.error("GOOGLE_API_KEY is missing from environment variables")
      return NextResponse.json(
        {
          error: "API key not configured",
          success: false,
          isPlaceholder: true,
          imageUrl: `/placeholder.svg?height=500&width=700&query=${encodeURIComponent("Story Memory Illustration")}`,
        },
        { status: 500 },
      )
    }

    console.log("Starting Google AI image generation...")
    console.log("Prompt:", prompt.substring(0, 100) + "...")

    const enhancedPrompt = `Create a warm, nostalgic illustration of this memory: "${prompt}". 
    ${storyContent ? `Story context: ${storyContent.substring(0, 300)}. ` : ""}
    
    Style: Soft, heartwarming, family-friendly illustration with warm lighting and emotional depth. 
    Focus on capturing the essence and emotion of this personal memory.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: enhancedPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Google AI response received")

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Convert base64 image data to data URL
          const imageData = part.inlineData.data
          const mimeType = part.inlineData.mimeType || "image/png"
          const imageUrl = `data:${mimeType};base64,${imageData}`

          console.log("Real AI image generated successfully")

          return NextResponse.json({
            success: true,
            imageUrl: imageUrl,
            description: "AI-generated illustration of your memory story",
            isPlaceholder: false,
            message: "Real AI image generated using Google Gemini 2.0 Flash",
          })
        }

        if (part.text) {
          console.log("AI description:", part.text.substring(0, 100) + "...")
        }
      }
    }

    throw new Error("No image data found in Google AI response")
  } catch (err: any) {
    console.error("Google AI image generation error:", err)

    // Create enhanced fallback placeholder
    const fallbackDescription = `Memory illustration: ${prompt?.substring(0, 100) || "personal story"} - A warm, nostalgic scene capturing the essence of this meaningful memory`
    const fallbackImageUrl = `/placeholder.svg?height=500&width=700&query=${encodeURIComponent(fallbackDescription)}`

    return NextResponse.json({
      success: false,
      imageUrl: fallbackImageUrl,
      description: fallbackDescription,
      isPlaceholder: true,
      error: err?.message || "Image generation failed",
      message: "Using enhanced placeholder - Google AI image generation not available",
    })
  }
}
