import { RecipesResponse } from "@/utils/recipes";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, apiKey } = (await req.json()) as {
      prompt: string;
      model: "text-davinci-003";
      apiKey: string;
    };

    const recipes = await RecipesResponse(prompt, apiKey);

    return new Response(recipes);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
