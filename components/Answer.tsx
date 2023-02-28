import { SearchQuery } from "@/types";
import { IconReload } from "@tabler/icons-react";
import { FC } from "react";
import { ImageList } from '@mui/material';
import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import CommentIcon from '@mui/icons-material/Comment';
// import IconButton from '@mui/material/IconButton';

interface AnswerProps {
  searchQuery: SearchQuery;
  answer: string;
  done: boolean;
  onReset: () => void;
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];


export const Answer: FC<AnswerProps> = ({ searchQuery, answer, done, onReset }) => {
  const ans = JSON.parse(answer)
  // if (answer) {
  //   return (
  //     <div className="max-w-[500px] space-y-4 py-16 px-8 sm:px-24 sm:pt-16 pb-32">
  //           <div className="overflow-auto text-2xl sm:text-4xl">{searchQuery.query}</div>

  //           <div className="border-b border-zinc-800 pb-4">
  //             <div className="text-md text-blue-500">Answer</div>

  //             {ans.Ingredients.map((item: { url: string, text: string }) => (
  //               <div key={item.url} className="flex items-center space-x-2 mt-2">
  //                 <img src={item.url} alt={item.text} className="w-20 h-20 rounded-full" />

  //                 <div className="overflow-auto flex-grow">{item.text}</div>
  //               </div>
  //             ))}
  //           </div>


  
  //       {done && (
  //         <>
  //           <div className="border-b border-zinc-800 pb-4">
  //             <div className="text-md text-blue-500">Sources</div>
  
  //             {searchQuery.sourceLinks.map((source, index) => (
  //               <div
  //                 key={index}
  //                 className="mt-1 overflow-auto"
  //               >
  //                 {`[${index + 1}] `}
  //                 <a
  //                   className="hover:cursor-pointer hover:underline"
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   href={source}
  //                 >
  //                   {source.split("//")[1].split("/")[0].replace("www.", "")}
  //                 </a>
  //               </div>
  //             ))}
  //           </div>
  
  //           <button
  //             className="flex h-10 w-52 items-center justify-center rounded-full bg-blue-500 p-2 hover:cursor-pointer hover:bg-blue-600"
  //             onClick={onReset}
  //           >
  //             <IconReload size={18} />
  //             <div className="ml-2">Ask New Question</div>
  //           </button>
  //         </>
  //       )}
  //     </div>
  //   );
  // }


  return (
    <div className="max-w-[800px] space-y-4 py-16 px-8 sm:px-24 sm:pt-16 pb-32">
      <div className="overflow-auto text-2xl sm:text-4xl">{searchQuery.query}</div>

      <div className="border-b border-zinc-800 pb-4">
        <div className="text-md text-blue-500">Answer</div>

        {/* <div className="mt-2 overflow-auto">{replaceSourcesWithLinks(answer, searchQuery.sourceLinks)}</div> */}
        
        <ImageList sx={{ width: '100%' }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">Ingredients</ListSubheader>
          </ImageListItem>
          {ans.Ingredients.map((item: { url: string, text: string }) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}`}
                srcSet={`${item.url}`}
                alt={item.text}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.text}
                subtitle={""}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
 
    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.black' }}>
      {ans.Steps.map((value:string) => (
        <ListItem
          key= ""
          disableGutters
          // secondaryAction={
          //   <IconButton aria-label="comment">
          //     <CommentIcon />
          //   </IconButton>
          // }
        >
          <ListItemText primary={`${value}`} />
        </ListItem>
      ))}
    </List>

      {done && (
        <>
          <div className="border-b border-zinc-800 pb-4">
            <div className="text-md text-blue-500">Sources</div>

            {searchQuery.sourceLinks.map((source, index) => (
              <div
                key={index}
                className="mt-1 overflow-auto"
              >
                {`[${index + 1}] `}
                <a
                  className="hover:cursor-pointer hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={source}
                >
                  {source.split("//")[1].split("/")[0].replace("www.", "")}
                </a>
              </div>
            ))}
          </div>

          <button
            className="flex h-10 w-52 items-center justify-center rounded-full bg-blue-500 p-2 hover:cursor-pointer hover:bg-blue-600"
            onClick={onReset}
          >
            <IconReload size={18} />
            <div className="ml-2">Ask New Question</div>
          </button>
        </>
      )}
    </div>
  );
};

const replaceSourcesWithLinks = (answer: string, sourceLinks: string[]) => {
  const elements = answer.split(/(\[[0-9]+\])/).map((part, index) => {
    if (/\[[0-9]+\]/.test(part)) {
      const link = sourceLinks[parseInt(part.replace(/[\[\]]/g, "")) - 1];

      return (
        <a
          key={index}
          className="hover:cursor-pointer text-blue-500"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    } else {
      return part;
    }
  });

  return elements;
};
