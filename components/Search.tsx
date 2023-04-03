import { SearchQuery, Source } from "@/types";
import { createPrompt } from "@/utils/answer";
import { IconArrowRight, IconBolt, IconSearch } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

interface SearchProps {
  onSearch: (searchResult: SearchQuery) => void;
  onAnswerUpdate: (answer: string) => void;
  onDone: (done: boolean) => void;
}

export const Search: FC<SearchProps> = ({ onSearch, onAnswerUpdate, onDone }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [trial, setTrial] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a query");
      return;
    }

    setLoading(true);
    // const sources = await fetchSources();
    const sources: Source[] = [{ url: "", text: "" }];
    await handleStream(sources);
  };

  const handleStream = async (sources: Source[]) => {
    try {
      let prompt = createPrompt(query, sources);
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, apiKey })
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      setLoading(false);
      onSearch({ query, sourceLinks: sources.map((source) => source.url) });

      const data = await response.json();

      onAnswerUpdate(JSON.stringify(data));
    } catch (err) {
      onAnswerUpdate("Error");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSave = () => {
    if (apiKey.length !== 51) {
      alert("Please enter a valid API key.");
      return;
    }

    localStorage.setItem("CLARITY_KEY", apiKey);
    setShowSettings(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    localStorage.removeItem("CLARITY_KEY");
    localStorage.removeItem("CLARITY_MODEL");

    setApiKey("");
  };

  useEffect(() => {
    const CLARITY_KEY = localStorage.getItem("CLARITY_KEY");
    const CLARITY_MODEL = localStorage.getItem("CLARITY_MODEL");

    if (CLARITY_KEY) {
      setApiKey(CLARITY_KEY);
    } else {
      setShowSettings(true);
    }
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-64 sm:pt-72 flex-col">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <div className="mt-8 text-2xl">Getting answer...</div>
        </div>
      ) : (
        <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center space-y-6 px-3 pt-32 sm:pt-64">
          <div className="flex items-center">
            <IconBolt size={36} />
            <div className="ml-1 text-center text-4xl">Recipe AI</div>
          </div>
          {(apiKey.length === 51 || trial) ? (
            <div className="relative w-full">
              <IconSearch className="text=[#D4D4D8] absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

              <input
                ref={inputRef}
                className="h-12 w-full rounded-full border border-zinc-600 bg-[#2A2A31] pr-12 pl-11 focus:border-zinc-800 focus:bg-[#18181C] focus:outline-none focus:ring-2 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
                type="text"
                placeholder="I only have beef; chicken dish with 25 hands-on minute..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button>
                <IconArrowRight
                  onClick={handleSearch}
                  className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
                />
              </button>
            </div>
          ) : (
            <div className="text-center text-[#D4D4D8]">Please select `Free Tial`, or enter your OpenAI API key. </div>
          )}

          <FormGroup>
            <FormControlLabel control={<Switch onClick={() => setTrial(!trial)} />} label="Free Trial" />
            <Box sx={{ m: 2 }} />
            <button
              className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm text-[#D4D4D8] hover:text-white"
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? "Hide" : "Show"} API Settings
            </button>
          </FormGroup>

          {showSettings && (
            <>

              <input
                type="password"
                className="max-w-[400px] block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);

                  if (e.target.value.length !== 51) {
                    setShowSettings(true);
                  }
                }}
              />

              <div className="flex space-x-2">
                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </div>

                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  onClick={handleClear}
                >
                  Clear
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
