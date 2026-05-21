export const runtime = 'nodejs';

const MIMO_API_URL = 'https://token-plan-sgp.xiaomimimo.com/v1/chat/completions';
const MIMO_MODEL = 'mimo-v2.5-pro';

export async function POST(request: Request) {
  const { prompt, messages } = await request.json();

  const apiKey = process.env.MIMO_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'MIMO_API_KEY not configured' }, { status: 500 });
  }

  const systemMessage = {
    role: 'system',
    content: `You are BuildBro, an expert AI full-stack code generator. You generate complete, production-ready code based on user descriptions.

When a user describes an application:
1. Generate ALL necessary files with complete, working code
2. Use modern best practices (TypeScript, proper error handling, validation)
3. Wrap each file in a code block with the filename as a comment or using the filename="..." syntax
4. Explain what you've built and how the files connect together
5. Use popular, well-maintained libraries and frameworks

Format your response as:
1. A brief description of what you're building
2. Each file in its own code block, like:
\`\`\`tsx filename="src/app/page.tsx"
// code here
\`\`\`

\`\`\`ts filename="src/lib/utils.ts"
// code here  
\`\`\`

3. Brief setup instructions at the end

Be thorough. Generate complete, runnable code — not placeholders or "// rest of code here" comments.`,
  };

  const apiMessages = [systemMessage, ...messages.map((m: { role: string; content: string }) => ({
    role: m.role,
    content: m.content,
  }))];

  try {
    const response = await fetch(MIMO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages: apiMessages,
        stream: true,
        max_tokens: 16384,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('MiMo API error:', response.status, errText);
      return Response.json(
        { error: `MiMo API error: ${response.status}`, details: errText },
        { status: response.status }
      );
    }

    // Stream the response through
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return Response.json(
      { error: 'Failed to connect to MiMo API' },
      { status: 500 }
    );
  }
}
