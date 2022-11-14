//Todo: Read data and display all the information in a nice way

import { Dispatch, SetStateAction, useState } from "react";
import type { Collection, SpotifyData } from "../utils/dataHandler";

interface IProps {
  data: SpotifyData[];
  collection: Collection | null;
  setCollection: Dispatch<SetStateAction<Collection | null>>;
}

const DataInfo: React.FC<IProps> = ({ data, collection, setCollection }) => {
  const [popRange, setPopRange] = useState<number[]>([]);
  const [durRange, setDurRange] = useState<number[]>([]);
  const [tempoRange, setTempoRange] = useState<number[]>([]);
  const [genreSelect, setGenreSelect] = useState<number[]>([]);
  const superFilter = (d: SpotifyData[]) => {
    return d.filter((d) => d.popularity > 50 && d.popularity < 60);
  };
  // return (
  //   <div className="flex flex-col">
  //     <div className="flex flex-row">
  //       <div className="flex w-1/2 flex-col">
  //         <p>track: {data.track_name}</p>
  //         <p>artist: {data.artists?.join(", ")}</p>
  //         <p>popularity: {data.popularity}</p>
  //         <p>duration_s: {data.duration_ms / 1000}</p>
  //         <p>explicit: {data.explicit}</p>
  //         <p>key: {data.key}</p>
  //         <p>mode: {data.mode}</p>
  //         <p>time_signature: {data.time_signature}</p>
  //       </div>
  //       <div className="flex w-1/2 flex-col">
  //         <p>acousticness: {data.acousticness}</p>
  //         <p>danceability: {data.danceability}</p>
  //         <p>energy: {data.energy}</p>
  //         <p>instrumentalness: {data.instrumentalness}</p>
  //         <p>liveness: {data.liveness}</p>
  //         <p>loudness: {data.loudness}</p>
  //         <p>speechiness: {data.speechiness}</p>
  //         <p>valence: {data.valence}</p>
  //         <p>tempo: {data.tempo}</p>
  //       </div>
  //     </div>
  //     <div className="flex flex-row">
  //       <p>album: {data.album_name}</p>
  //     </div>
  //   </div>
  // );
};

export default DataInfo;
