//Todo: Read data and display all the information in a nice way

import type { SpotifyData } from "../utils/dataHandler";

const DataInfo: React.FC<{ data: SpotifyData }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p>name: {data.name}</p>
          <p>artist: {data.artists}</p>
          <p>popularity: {data.popularity}</p>
          <p>duration_ms: {data.duration_ms}</p>
          <p>explicit: {data.explicit}</p>
          <p>id: {data.id}</p>
          <p>release_date: {data.release_date}</p>
          <p>key: {data.key}</p>
          <p>mode: {data.mode}</p>
          <p>time_signature: {data.time_signature}</p>
        </div>
        <div className="flex flex-col">
          <p>acousticness: {data.acousticness}</p>
          <p>danceability: {data.danceability}</p>
          <p>energy: {data.energy}</p>
          <p>instrumentalness: {data.instrumentalness}</p>
          <p>liveness: {data.liveness}</p>
          <p>loudness: {data.loudness}</p>
          <p>speechiness: {data.speechiness}</p>
          <p>valence: {data.valence}</p>
          <p>tempo: {data.tempo}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <p>album: {data.album}</p>
      </div>
    </div>
  );
};

export default DataInfo;
