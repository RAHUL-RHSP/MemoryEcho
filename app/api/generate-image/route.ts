import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, storyContext } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key not found, using placeholder image")
      const fallbackImageUrl = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`
      return NextResponse.json({ imageUrl: fallbackImageUrl })
    }

    // Using a placeholder image generation service
    // Replace this with actual AI image generation service like OpenAI DALL-E, Midjourney, or Stable Diffusion
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    })

    if (!response.ok) {
      // Fallback to placeholder if API fails
      const fallbackImageUrl = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`
      return NextResponse.json({ imageUrl: fallbackImageUrl })
    }

    const data = await response.json()
    const imageUrl = data.data[0].url

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Image generation error:", error)

    // Return placeholder image as fallback
    const { prompt } = await request.json()
    const fallbackImageUrl = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`
    return NextResponse.json({ imageUrl: fallbackImageUrl })
  }
}
