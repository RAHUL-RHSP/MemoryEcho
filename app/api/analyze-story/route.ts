import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { storyText } = await request.json()

    if (!storyText || storyText.length < 50) {
      return NextResponse.json({
        success: false,
        error: "Story too short for analysis",
      })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Analyze this personal story and generate 3-4 thoughtful questions that would help the writer add more depth, emotion, and detail to their memory. Focus on sensory details, emotions, relationships, and meaningful moments.

Story: "${storyText}"

Generate questions that:
- Ask about specific emotions or feelings
- Encourage sensory details (what they saw, heard, felt, smelled)
- Explore relationships and interactions with others
- Help uncover deeper meaning or lessons learned
- Are warm, encouraging, and personal

Return only the questions, one per line, without numbering.`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const questions = text
      .split("\n")
      .filter((q) => q.trim().length > 0)
      .map((q) => q.replace(/^\d+\.\s*/, "").trim())
      .slice(0, 4)

    return NextResponse.json({
      success: true,
      questions: questions,
      originalStory: storyText,
    })
  } catch (error) {
    console.error("Story analysis error:", error)

    // Fallback questions if AI fails
    const fallbackQuestions = [
      "What emotions were you feeling during this moment?",
      "What specific details do you remember seeing or hearing?",
      "Who else was there with you, and how did they react?",
      "What made this memory so meaningful to you?",
    ]

    return NextResponse.json({
      success: true,
      questions: fallbackQuestions,
      isPlaceholder: true,
    })
  }
}
