import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { SpotifyData } from "../utils/dataHandler";
import { getSpotifyDataFn } from "../utils/dataHandler";

import type { Collection } from "../utils/dataHandler";
import SpotifyRadar from "../components/SpotifyRadar";
import Modal from "../components/Modal";
import DataPicker from "../components/DataPicker";
import DataList from "../components/DataList";
import SpotifyViolin from "../components/SpotifyViolin";
import SpotifyBar from "../components/SpotifyBar";

// Graph 1: Radar Chart Group Comparsion
//    User can select groups of songs to compare, by searching or through filtering
//    Searching: User can search for songs, artists, albums.
//    Filtering: User can filter by genre, popularity, key, etc.

// TODO: Think of a way to show the data in a more interesting way

// TODO: Share interactive legends between graphs
// TODO: Bar Chart, Pie Chart...

const Part1: React.FC = () => {
  const { data: rawData, isLoading } = useQuery(
    ["hw3"],
    getSpotifyDataFn(
      "https://raw.githubusercontent.com/scott306lr/SpotiTracks_Visualization/master/dataset.csv"
      // "http://vis.lab.djosix.com:2020/data/spotify_tracks.csv"
    )
  );
  // const [selected, setSelected] = useState<SpotifyData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const colorPallete = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [75, 192, 192],
    [153, 102, 255],
    [255, 159, 64],
  ];

  const addCollection = (
    d: SpotifyData[],
    name: string,
    color: [number, number, number] | undefined,
    id: number | undefined
  ) => {
    const collection = {
      id: id,
      name: name,
      data: d,
      color: color,
    };
    setCollections((prev) => {
      const id = collection.id ?? (prev.at(-1)?.id ?? -1) + 1;
      const name =
        collection.name === "" ? `Collection_${id}` : collection.name;
      const color =
        collection.color ??
        (colorPallete[id % colorPallete.length] as [number, number, number]);
      return [
        ...prev,
        {
          ...collection,
          id: id,
          name: name,
          color: color,
        },
      ];
    });
  };

  useEffect(() => {
    if (rawData == null) return;

    const avg = rawData;
    const popularg25 = rawData.filter((d) => d.popularity >= 50);
    addCollection(avg, "Average of All Tracks", undefined, undefined);
    addCollection(popularg25, "Popular Top 25%", undefined, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  //loading
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex w-full items-center py-2">
            {/* <h1 className="w-full text-3xl">Spotify Dataset</h1> */}
            <div className="flex w-full flex-col justify-center align-middle">
              <div className="flex w-full justify-center align-middle">
                <section className="flex w-5/12 flex-col items-center justify-center space-y-2 rounded border-2 border-gray-500 bg-blue-700/30 pb-6 align-middle shadow-xl">
                  <h1 className="w-3/4 text-center text-3xl">
                    Manage Collections Here...
                  </h1>
                  <div className="flex flex-col items-center space-y-4 rounded-lg border-2 border-black bg-blue-900/80 p-5 text-lg">
                    <DataList collections={collections} />
                    <button
                      className="w-full rounded-lg bg-white/80 p-2"
                      onClick={() => setModalOpen(true)}
                    >
                      Add/Modify
                    </button>
                  </div>
                </section>
                <section className="flex w-7/12 flex-col items-center justify-center space-y-2 rounded border-2 border-gray-500 bg-pink-500/30 p-6 align-middle shadow-xl">
                  <h1 className="text-center text-3xl">
                    Single Collection Analysis
                  </h1>
                  <SpotifyBar input={collections} />
                </section>
              </div>
              <div className="flex w-full justify-center">
                <section className="flex w-7/12 flex-col justify-center space-y-2 rounded border-2 border-gray-500 bg-green-700/30 px-4 align-middle shadow-xl">
                  <h1 className="text-center text-3xl">
                    Distribution Analysis
                  </h1>
                  <SpotifyViolin input={collections} />
                </section>

                <section className="flex w-5/12 flex-col items-center justify-center space-y-2 rounded border-2 border-gray-500 bg-purple-700/30 px-4 py-6 align-middle shadow-xl">
                  <h1 className="text-center text-3xl"> Radar Score </h1>
                  <div className="w-full rounded-lg bg-white px-5 py-2">
                    <SpotifyRadar input={collections} />
                  </div>
                </section>
              </div>
              {/* <section className="flex w-full flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl">
          
        </section> */}
            </div>
            <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
              {isLoading || rawData == null ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="flex w-full flex-col items-center justify-center">
                    <DataPicker
                      data={rawData}
                      collections={collections}
                      setCollections={setCollections}
                      addCollection={addCollection}
                    />
                  </div>
                </>
              )}
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100">
      <Head>
        <title>SpotiTracks: Spotify Data Visualization</title>
        <meta name="description" content="SpotiTracks" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-3xl">Spotify Data Visualization</h1>
        <Part1 />
      </main>
    </div>
  );
};

export default Home;
