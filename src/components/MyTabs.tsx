// import { useState } from "react";
import { Tab } from "@headlessui/react";
import SpotifyViolin from "./SpotifyViolin";
import type { Collection } from "../utils/dataHandler";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const MyTabs: React.FC<{ input: Collection[] | undefined }> = ({ input }) => {
  const labels = [
    "danceability",
    "energy",
    "speechiness",
    "liveness",
    "valence",
    "popularity",
    "duration_s",
    "tempo",
    "loudness",
  ];
  return (
    <div className="w-full space-y-1 overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex space-x-4 overflow-x-scroll rounded-xl bg-blue-900/80 px-2 py-1">
          {labels.map((label, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 px-1 text-lg font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white/[0.70] shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {labels.map((label, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <SpotifyViolin input={input} label={label} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MyTabs;
