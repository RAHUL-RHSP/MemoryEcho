// app/api/images/generate/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";



export const runtime = "nodejs"; // 

export async function POST(req: Request) {
  try {
    const { prompt, width = 1024, height = 1024 } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_API_KEY missing" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // 按官方“Native image generation”调用
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt.trim() }],
        },
      ],
      // 关键：告诉模型我们要图像输出
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        // 宽高可选：有些配额/区域可能不支持，会忽略或报错；不需要可以删掉这段
        // 新版 SDK 这里接受 imageGenerationConfig（有地区还在灰度中）
        // @ts-ignore
        imageGenerationConfig: {
          numberOfImages: 1,
          width,
          height,
        },
      },
    });

    const cand = response.candidates?.[0];
    const parts = cand?.content?.parts || [];

    // 找到图片数据（inlineData.data 为 base64）
    const imagePart: any = parts.find((p: any) => p.inlineData?.data);
    const textPart: any = parts.find((p: any) => p.text);

    if (!imagePart?.inlineData?.data) {
      const msg = textPart?.text || "No image returned";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const b64 = imagePart.inlineData.data;
    const dataUrl = `data:image/png;base64,${b64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (err: any) {
    // 更友好的错误信息，便于你定位
    return NextResponse.json(
      { error: err?.message || "Image generation failed" },
      { status: 500 }
    );
  }
}