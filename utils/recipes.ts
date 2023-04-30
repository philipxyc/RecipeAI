import endent from "endent";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";


const redis = new Redis({
  url: 'UPSTASH_REDIS_REST_URL',
  token: 'UPSTASH_REDIS_REST_TOKEN',
})

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export const RecipesResponse = async (prompt: string, apiKey: string) => {
  
  if(apiKey=="" && process.env.OPENAI_KEY)
    apiKey=process.env.OPENAI_KEY;
  
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You must give a recipe in any response. Strictly follow the format below for output, do not include any text outside the json. {\"Ingredients\": [{\"text\": \"1 cup uncooked white rice\",\"url\": \"\"}, {\"text\": \"2 tablespoons butter\",\"url\": \"\"}, {\"text\": \"1/2 cup plain yogurt\",\"url\": \"\"}, {\"text\": \"1/4 teaspoon salt\",\"url\": \"\"}], \"Steps\": [\"1. Rinse the rice in a fine mesh strainer and drain well.\", \"2. In a medium saucepan, melt the butter over medium heat. Add the drained rice and stir to coat in the butter.\", \"3. Add 1 3/4 cups of water and 1/4 teaspoon of salt to the pan, and bring to a boil.\"]}"},
        {"role": "user", "content": prompt}],
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
    console.log(await res.json());
    throw new Error("OpenAI API returned an error");
  }

  let gpt_output = await res.json();
  const gpt_output_str = gpt_output.choices[0]['message']['content'];
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
    try{
      const ingredient_url = dalle_output.data[0].url;
      gpt_output_json.Ingredients[i]['url'] = ingredient_url;
    }catch (err) {
      gpt_output_json.Ingredients[i]['url'] = 'http://goo.gl/vyAs27';
      console.log(err)
    }
  }

  return JSON.stringify(gpt_output_json);
};
