import { OpenAIModel, Source } from "@/types";
import endent from "endent";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const RecipesResponse = async (prompt: string, model: OpenAIModel, apiKey: string) => {
  prompt = prompt + " Following the format below for output. Format: {\"Ingredients\": [{\"text\": \"1 cup uncooked white rice\",\"url\": \"\"}, {\"text\": \"2 tablespoons butter\",\"url\": \"\"}, {\"text\": \"1/2 cup plain yogurt\",\"url\": \"\"}, {\"text\": \"1/4 teaspoon salt\",\"url\": \"\"}], \"Steps\": [\"1. Rinse the rice in a fine mesh strainer and drain well.\", \"2. In a medium saucepan, melt the butter over medium heat. Add the drained rice and stir to coat in the butter.\", \"3. Add 1 3/4 cups of water and 1/4 teaspoon of salt to the pan, and bring to a boil.\", \"4. Reduce the heat to low, cover the pan with a tight-fitting lid, and simmer for 18-20 minutes, or until the water is absorbed and the rice is tender.\", \"5. Remove the pan from the heat and let it sit, covered, for 5-10 minutes to steam.\", \"6. Fluff the rice with a fork and stir in the plain yogurt until well combined.\", \"7. Serve the rice warm, garnished with fresh herbs or a sprinkle of paprika if desired.\"]}";
  
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

  let gpt_output = await res.json();
  const gpt_output_str = gpt_output.choices[0]['text'];
  const gpt_output_json = JSON.parse(gpt_output_str);
  
  // Get image from DALL-E api
  // loop through ingredients
  for (let i = 0; i < gpt_output_json.Ingredients.length; i++) {
    const ingredient_text = gpt_output_json.Ingredients[i]['text'];

    const res_dalle = await fetch("https://api.openai.com/v1/images/generations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      method: "POST",
      body: JSON.stringify({
        "prompt": ingredient_text,
        "n": 1,
        "size": "1024x1024"
      })
    });

    if (res_dalle.status !== 200) {
      throw new Error("OpenAI API returned an error");
    }

    let dalle_output = await res_dalle.json();
    const ingredient_url = dalle_output.data[0].url;
    gpt_output_json.Ingredients[i]['url'] = ingredient_url;
  }

  return gpt_output_json;
};
