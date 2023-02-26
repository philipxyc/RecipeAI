import { OpenAIModel, Source } from "@/types";
import endent from "endent";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

const createTextDavinciPrompt = (query: string) => {
  return "";
};

export const createPrompt = (query: string, sources: Source[], model: OpenAIModel) => {
  switch (model) {
    case OpenAIModel.DAVINCI_TEXT:
      return createTextDavinciPrompt(query);
  }
};

export const OpenAIStream = async (prompt: string, model: OpenAIModel, apiKey: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      model,
      prompt,
      max_tokens: 3000,
      temperature: 0.0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      stop: ["###"],
      stream: false
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
