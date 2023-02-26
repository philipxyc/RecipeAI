import { OpenAIModel } from "@/types";
import { RecipesResponse } from "@/utils/recipes";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, model, apiKey } = (await req.json()) as {
      prompt: string;
      model: OpenAIModel;
      apiKey: string;
    };

    const recipes = await RecipesResponse(prompt, model, apiKey);

    return new Response(recipes);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
