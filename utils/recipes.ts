import { OpenAIModel, Source } from "@/types";
import endent from "endent";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const RecipesResponse = async (prompt: string, model: OpenAIModel, apiKey: string) => {
  prompt = prompt + " ###Following the format below for output. Format: {\"Ingredients\": [{\"text\": \"1 cup uncooked white rice\",\"url\": \"\"}, {\"text\": \"2 tablespoons butter\",\"url\": \"\"}, {\"text\": \"1/2 cup plain yogurt\",\"url\": \"\"}, {\"text\": \"1/4 teaspoon salt\",\"url\": \"\"}], \"Steps\": [\"1. Rinse the rice in a fine mesh strainer and drain well.\", \"2. In a medium saucepan, melt the butter over medium heat. Add the drained rice and stir to coat in the butter.\", \"3. Add 1 3/4 cups of water and 1/4 teaspoon of salt to the pan, and bring to a boil.\"]}";
  
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
  let promises = [];
  let num_ingredients = gpt_output_json.Ingredients.length;
  for (let i = 0; i < num_ingredients; i++) {
    const ingredient_text = gpt_output_json.Ingredients[i]['text'];
    promises.push(fetch("https://api.openai.com/v1/images/generations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      method: "POST",
      body: JSON.stringify({
        "prompt": ingredient_text,
        "n": 1,
        "size": "256x256"
      })
    }).then((res) => res.json()));
  }

  const all_dalle_outputs = await Promise.all(promises);
  for (let i = 0; i < num_ingredients; i++) {
    let dalle_output = all_dalle_outputs[i];
    const ingredient_url = dalle_output.data[0].url;
    gpt_output_json.Ingredients[i]['url'] = ingredient_url;
  }

  return JSON.stringify(gpt_output_json);
};
