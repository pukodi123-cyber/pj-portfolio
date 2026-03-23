import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Using ChimeraGPT as requested
    const CHIMERA_API_KEY = "GUCbQMmH2B";
    const CHIMERA_ENDPOINT = "https://chimeragpt.adventblocks.cc/api/v1/chat/completions";

    const response = await fetch(CHIMERA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHIMERA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or any model supported by Chimera
        messages: messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Chimera Error:", errorData);
        return NextResponse.json({ error: "AI Service Error" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.choices[0].message.content });
    
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
