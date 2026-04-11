import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const AESTHETICS_KNOWLEDGE = {
  primaryGoal: "Book a consultation",
  keyInfo:
    "New or existing client, treatment of interest (Botox, fillers, laser, chemical peel, microneedling, body contouring), area of concern, any previous treatments, preferred date/time, contact name and phone number",
  scenarios:
    "New client wanting a consultation, existing client booking a follow-up or repeat treatment, questions about specific treatments (Botox, Juvederm, Restylane, laser hair removal, IPL, microneedling, chemical peels, body contouring), pricing inquiries, recovery time questions, pre/post treatment instructions, package or membership inquiries",
  pricingBehavior:
    'Say "our treatment pricing varies based on the area and amount of product needed — we offer complimentary consultations where our provider will create a personalized treatment plan with transparent pricing"',
  schedulingNotes:
    "Differentiate between initial consultations (longer, includes assessment) and repeat treatment appointments (shorter). Ask about their goals and areas of concern to route to the right provider",
};

interface CreateDemoRequest {
  practiceName: string;
  phoneNumber: string;
  goal: string;
  voiceGender?: "female" | "male";
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateDemoRequest = await request.json();

    // Validate input
    if (!body.practiceName?.trim()) {
      return NextResponse.json(
        { error: "Practice name is required" },
        { status: 400 }
      );
    }

    const phoneDigits = (body.phoneNumber || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { error: "A valid phone number is required" },
        { status: 400 }
      );
    }

    if (!body.goal?.trim()) {
      return NextResponse.json(
        { error: "Goal is required" },
        { status: 400 }
      );
    }

    const voiceId = body.voiceGender === "male"
      ? "iP95p4xoKVk53GoZ742B"
      : "paula";

    // Step 1: Generate custom aesthetics receptionist system prompt with Claude
    const claudeResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an expert at creating AI receptionist system prompts for aesthetics clinics. Generate a custom system prompt for this aesthetics clinic:

Aesthetics Clinic Name: "${body.practiceName}"
Primary Goal: "${body.goal}"

This receptionist answers phone calls for this aesthetics clinic. Here is what you need to know:

Primary goal: ${AESTHETICS_KNOWLEDGE.primaryGoal}
Information to gather from callers: ${AESTHETICS_KNOWLEDGE.keyInfo}
Common caller scenarios to handle: ${AESTHETICS_KNOWLEDGE.scenarios}
How to handle pricing questions: ${AESTHETICS_KNOWLEDGE.pricingBehavior}
Scheduling notes: ${AESTHETICS_KNOWLEDGE.schedulingNotes}

The system prompt you generate must:

1. Greet callers warmly using the clinic name: "${body.practiceName}"
2. Sound like a real human aesthetics receptionist — use contractions, casual phrasing, and a friendly, reassuring tone
3. Follow the aesthetics-specific booking flow above — ask the right questions in a natural conversational order, not all at once
4. Ask ONE question at a time, wait for the answer, then ask the next
5. Always work toward the primary goal: booking a consultation — prioritize this above all else in every conversation
6. Handle the common aesthetics scenarios listed above naturally — be especially empathetic with clients with treatment concerns or urgent consultations
7. Use the pricing guidance above when pricing comes up — never make up specific prices
8. Keep every response to 1-3 sentences max — this is a phone call, not an email
9. If the caller asks something outside your knowledge, say "Let me have someone from our team get back to you on that — can I grab your name and number?"
10. Always capture the caller's name and callback number before ending the call
11. Never mention being AI unless directly asked
12. Never fabricate information about the clinic — don't make up provider names, office hours, or specific services not mentioned
13. Match the caller's energy — if they're upbeat, be upbeat back; if they're calm and serious, mirror that
14. Use natural filler words sparingly (e.g. "Oh absolutely", "Yeah for sure", "Hmm let me think")
15. Show genuine enthusiasm when a caller expresses interest in a treatment — a little wit goes a long way
16. Occasionally use subtle emotion tags like [laughs], [sighs], [chuckles] to feel more human and expressive

Return ONLY the system prompt text. No markdown formatting, no explanations, no quotation marks wrapping it.`,
        },
      ],
    });

    const systemPrompt =
      claudeResponse.content[0].type === "text"
        ? claudeResponse.content[0].text
        : "";

    if (!systemPrompt) {
      throw new Error("Failed to generate system prompt");
    }

    // Step 2: Create Vapi assistant with the custom aesthetics prompt
    const vapiResponse = await fetch("https://api.vapi.ai/assistant", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Demo - ${body.practiceName}`.slice(0, 40),
        model: {
          provider: "anthropic",
          model: "claude-sonnet-4-5-20250929",
          systemPrompt: systemPrompt,
          temperature: 0.7,
          maxTokens: 300,
        },
        voice: {
          provider: "11labs",
          voiceId,
          model: "eleven_v3",
          stability: 0.25,
          similarityBoost: 0.88,
          style: 0.8,
          useSpeakerBoost: true,
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
          keywords: [
            "Botox:2",
            "filler:2",
            "Juvederm:2",
            "Restylane:2",
            "laser:2",
            "microneedling:2",
            "chemical:2",
            "peel:2",
            "IPL:2",
            "contouring:2",
            "CoolSculpting:2",
            "Kybella:2",
            "PRP:2",
            "lip:2",
            "antiaging:2",
            "wrinkle:2",
            "collagen:2",
            "tightening:2",
            "hydrafacial:2",
            "dermaplaning:2",
            "consultation:2",
            "injection:2",
            "unit:2",
            "syringe:2",
            "recovery:2",
            "downtime:2",
            "provider:2",
          ],
        },
        firstMessage: `Thanks for calling ${body.practiceName}, how can I help you today?`,
        firstMessageMode: "assistant-speaks-first",
      }),
    });

    if (!vapiResponse.ok) {
      const vapiError = await vapiResponse.json().catch(() => ({}));
      console.error("Vapi API error:", vapiError);
      const errorMessage = vapiError?.message || vapiError?.error || JSON.stringify(vapiError);
      throw new Error(`Failed to create AI assistant: ${errorMessage}`);
    }

    const assistant = await vapiResponse.json();

    return NextResponse.json({
      assistantId: assistant.id,
      practiceName: body.practiceName,
    });
  } catch (error) {
    console.error("Create demo error:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: `AI service error: ${error.message}`,
        },
        { status: error.status || 503 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We hit a snag building your receptionist. Please try again.",
      },
      { status: 500 }
    );
  }
}
