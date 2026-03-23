import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Using ChimeraGPT as requested
    const CHIMERA_API_KEY = "GUCbQMmH2B";
    const CHIMERA_ENDPOINT = "https://chimeragpt.adventblocks.cc/api/v1/chat/completions";

    let response;
    try {
      response = await fetch(CHIMERA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHIMERA_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.7,
        }),
      });
    } catch (netError) {
      console.error("Chimera Network Error:", netError);
      // Fallback handled below
    }

    if (response && response.ok) {
      const data = await response.json();
      return NextResponse.json({ text: data.choices[0].message.content });
    }

    // FALLBACK TO POLLINATIONS IF CHIMERA FAILS
    console.warn("Chimera failed, falling back to Pollinations...");
    const userMessage = messages.find((m: any) => m.role === "user")?.content || "";
    const systemPrompt = messages.find((m: any) => m.role === "system")?.content || "";
    
    const fallbackResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=${encodeURIComponent(systemPrompt)}&private=true&model=qwen`);
    
    if (fallbackResponse.ok) {
        const text = await fallbackResponse.text();
        return NextResponse.json({ text });
    }

    return NextResponse.json({ error: "All AI services down" }, { status: 500 });
    
  } catch (error) {
    console.error("API Route Critical Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
