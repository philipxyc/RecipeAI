import { Answer } from "@/components/Answer";
import { Search } from "@/components/Search";
import { SearchQuery } from "@/types";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ query: "", sourceLinks: [] });
  const [answer, setAnswer] = useState<string>("{\"Ingredients\":[{\"text\":\"1\/2 cup uncooked white rice\",\"url\":\"https:\/\/oaidalleapiprodscus.blob.core.windows.net\/private\/org-ABV3oK3aDqqTXbXzdk4DOSEW\/user-pKTYuJQTEjQRoCxKLMngbUny\/img-PkvB0tzjaffcagLrOQOfmRCh.png?st=2023-02-27T20%3A27%3A57Z&se=2023-02-27T22%3A27%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image\/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-27T11%3A10%3A31Z&ske=2023-02-28T11%3A10%3A31Z&sks=b&skv=2021-08-06&sig=Arsdsov4JpfXMlxbRP\/Xz\/FV9VXgmXHsFeBr3zeHtFo%3D\"},{\"text\":\"1 tablespoon butter\",\"url\":\"https:\/\/oaidalleapiprodscus.blob.core.windows.net\/private\/org-ABV3oK3aDqqTXbXzdk4DOSEW\/user-pKTYuJQTEjQRoCxKLMngbUny\/img-d9uiWmqm0hhFB18tllm8gppk.png?st=2023-02-27T20%3A27%3A57Z&se=2023-02-27T22%3A27%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image\/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-27T08%3A54%3A07Z&ske=2023-02-28T08%3A54%3A07Z&sks=b&skv=2021-08-06&sig=xtgiZOAlKmGde9YG6liM\/\/rhI9KWtUURFXU7VtF7PKA%3D\"},{\"text\":\"1\/4 cup diced strawberries\",\"url\":\"https:\/\/oaidalleapiprodscus.blob.core.windows.net\/private\/org-ABV3oK3aDqqTXbXzdk4DOSEW\/user-pKTYuJQTEjQRoCxKLMngbUny\/img-TswkVufdMlDk1KjZ5JEn2ieG.png?st=2023-02-27T20%3A27%3A57Z&se=2023-02-27T22%3A27%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image\/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-26T21%3A47%3A29Z&ske=2023-02-27T21%3A47%3A29Z&sks=b&skv=2021-08-06&sig=a6FgarP7SY7OJB1GUnC8YJe5Y1LpI2uI7FMzf\/\/E\/c8%3D\"},{\"text\":\"1\/4 cup milk\",\"url\":\"https:\/\/oaidalleapiprodscus.blob.core.windows.net\/private\/org-ABV3oK3aDqqTXbXzdk4DOSEW\/user-pKTYuJQTEjQRoCxKLMngbUny\/img-H7oQ62LvqgcfMVWr7AwycixP.png?st=2023-02-27T20%3A27%3A57Z&se=2023-02-27T22%3A27%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image\/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-27T12%3A41%3A08Z&ske=2023-02-28T12%3A41%3A08Z&sks=b&skv=2021-08-06&sig=QQPyGwHkdRwYm9h%2Bi3Gczeo8AefytKBS7NeLCrfr1hs%3D\"},{\"text\":\"1\/4 teaspoon salt\",\"url\":\"https:\/\/oaidalleapiprodscus.blob.core.windows.net\/private\/org-ABV3oK3aDqqTXbXzdk4DOSEW\/user-pKTYuJQTEjQRoCxKLMngbUny\/img-vWlVxRYYypEyeGmCUvpBKazv.png?st=2023-02-27T20%3A27%3A57Z&se=2023-02-27T22%3A27%3A57Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image\/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-27T11%3A13%3A38Z&ske=2023-02-28T11%3A13%3A38Z&sks=b&skv=2021-08-06&sig=dNZp\/lmF0neUGAsTfI4C7EZRkDavqiySw5lP\/2Esecs%3D\"}],\"Steps\":[\"1. Rinse the rice in a fine mesh strainer and drain well.\",\"2. In a medium saucepan, melt the butter over medium heat. Add the drained rice and stir to coat in the butter.\",\"3. Add 1 cup of water, diced strawberries, and 1\/4 teaspoon of salt to the pan, and bring to a boil.\",\"4. Reduce the heat to low, cover the pan with a tight-fitting lid, and simmer for 18-20 minutes, or until the water is absorbed and the rice is tender.\",\"5. Remove the pan from the heat and stir in the milk.\",\"6. Let the pan sit, covered, for 5-10 minutes to steam.\",\"7. Fluff the rice with a fork and serve warm, garnished with fresh herbs or a sprinkle of paprika if desired.\"]}");
  const [done, setDone] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>BlitzAI</title>
        <meta
          name="description"
          content="Recipes powered by AI."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>
      <div className="h-screen overflow-auto bg-[#18181C] text-[#D4D4D8]">
        <a
          className="absolute top-0 right-12 p-4 cursor-pointer"
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter />
        </a>

        <a
          className="absolute top-0 right-2 p-4 cursor-pointer"
          href="https://github.com/blitzat/blitzai"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub />
        </a>

        {answer ? (
          <Answer
            searchQuery={searchQuery}
            answer={answer}
            done={done}
            onReset={() => {
              setAnswer("");
              setSearchQuery({ query: "", sourceLinks: [] });
              setDone(false);
            }}
          />
        ) : (
          <Search
            onSearch={setSearchQuery}
            onAnswerUpdate={(value) => setAnswer((prev) => prev + value)}
            onDone={setDone}
          />
        )}
      </div>
    </>
  );
}
