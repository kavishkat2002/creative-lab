// @deno-types="https://deno.land/std@0.168.0/http/server.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are the AI assistant for Creative Lab, a cutting-edge technology company.
- Be helpful, professional, and concise.
- Answer questions about software development, AI, and digital transformation.
- If asked about specific pricing, suggest contacting the sales team.
- You have a 3D animated avatar that users interact with.
`;

serve(async (req) => {
    // CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
        const body = await req.json();
        const messages = body?.messages;

        if (!Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: "Invalid messages format" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const apiKey = Deno.env.get("OPENAI_API_KEY");
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in Supabase secrets.");
        }

        const isOpenRouter = apiKey.startsWith("sk-or-");

        const baseUrl = isOpenRouter
            ? "https://openrouter.ai/api/v1/chat/completions"
            : "https://api.openai.com/v1/chat/completions";

        const model = isOpenRouter ? "openai/gpt-4o-mini" : "gpt-4o-mini";

        const aiResponse = await fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                ...(isOpenRouter && {
                    "HTTP-Referer": "https://creativelabnexus.com",
                    "X-Title": "Creative Lab Nexus",
                }),
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
                stream: true,
            }),
        });

        if (!aiResponse.ok || !aiResponse.body) {
            const errorText = await aiResponse.text();
            console.error("AI Provider error:", errorText);
            return new Response(
                JSON.stringify({ error: `AI provider error: ${errorText}` }),
                { status: aiResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        return new Response(aiResponse.body, {
            headers: {
                ...corsHeaders,
                "Content-Type": "text/event-stream; charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (err) {
        console.error("Chat error:", err);
        return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});

