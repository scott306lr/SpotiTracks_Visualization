import Papa from "papaparse";

export type Collection = {
  id: number;
  name: string;
  data: SpotifyData[];
  color: [number, number, number];
};

// typescript type for Spotify Music Data
export type SpotifyData = {
  id: string;
  track_id: string;
  artists: string;//string[];
  album_name: string;
  track_name: string;
  popularity: number;
  duration_s: number;
  explicit: boolean;
  danceability: number;
  energy: number;
  key: string;
  loudness: number;
  mode: string;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  time_signature: number;
  track_genre: string;
  [key: string]: boolean | number | string | string[] | undefined;
};

export const getSpotifyDataFn = (url: string) => {
  const queryFn = async () => {
    const response = await fetch(url)
      .then((response) => response.text())
      .then((text) =>
        Papa.parse(text, { header: true, skipEmptyLines: true, delimiter: "," })
      )
      .then((results) => results.data)
      .then((data) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((row: any) => {
          return {
            id: row[""] as string,
            track_id: row.track_id as string,
            artists: row.artists as string,
            album_name: row.album_name as string,
            track_name: row.track_name as string,
            track_genre: row.track_genre as string,
            popularity: +row.popularity,
            duration_s: +row.duration_ms / 1000,
            explicit: row.explicit as boolean,
            key: ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"][+row.key] as string,
            mode: ["minor", "major"][+row.mode] as string,
            tempo: +row.tempo,
            time_signature: +row.time_signature,
            danceability: +row.danceability,
            energy: +row.energy,
            loudness: +row.loudness,
            speechiness: +row.speechiness,
            acousticness: +row.acousticness,
            instrumentalness: +row.instrumentalness,
            liveness: +row.liveness,
            valence: +row.valence,
          };
        })
      );
    // console.log("fetched!");
    // console.log(response.slice(0, 10));
    return response as SpotifyData[];
  };

  return queryFn;
}

