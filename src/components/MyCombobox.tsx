import type { Dispatch, SetStateAction } from "react";
import { Fragment, useState, useRef } from "react";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

import fuzzysort from "fuzzysort";
import type { SpotifyData } from "../utils/dataHandler";
import { useVirtualizer } from "@tanstack/react-virtual";

interface IProps {
  data: SpotifyData[];
  selected: SpotifyData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<SpotifyData[] | any[]>>;
}

const MyCombobox: React.FC<IProps> = ({ data, selected, setSelected }) => {
  const [query, setQuery] = useState("");
  const [filterkey, setFilterkey] = useState("track_name");
  const filteredData = fuzzysort
    .go(query, data, {
      threshold: -10,
      // limit: 10,
      all: true,
      key: filterkey,
    })
    .map((d) => d.obj)
    .sort((a, b) => b.popularity - a.popularity);

  const parentRef = useRef<HTMLUListElement | null>(null);
  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 8,
    paddingStart: 64,
  });

  return (
    <div className="flex w-full items-center justify-center align-middle">
      <Combobox value={selected} by="id" onChange={setSelected} multiple>
        <div className="relative mt-1 w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              // displayValue={(arr) => `${arr?.length ?? 0} tracks selected`}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSearch
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm
              `}
              ref={parentRef}
            >
              <div
                style={{
                  height: virtualizer.getTotalSize(),
                  width: "100%",
                  position: "relative",
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              >
                <div
                  className="relative h-16 cursor-default select-none bg-teal-700/30 py-2 pl-10 pr-4 text-teal-900 hover:bg-teal-700 hover:text-white"
                  onClick={() => setSelected(filteredData)}
                >
                  <span className="block truncate text-base font-semibold hover:font-bold">
                    Select All
                    <p className="font-light">
                      {`Select all ${filteredData.length} tracks`}
                    </p>
                  </span>
                </div>

                {filteredData.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  virtualizer.getVirtualItems().map((virtualRow) => {
                    const data = filteredData[virtualRow.index] as SpotifyData;
                    return (
                      <Combobox.Option
                        key={virtualRow.key}
                        data-index={virtualRow.index}
                        ref={virtualizer.measureElement}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        value={data}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-bold" : "font-semibold"
                              }`}
                            >
                              {data.track_name}{" "}
                              <p className="font-light">
                                Album: {data.album_name}
                              </p>
                              <p className="font-light">
                                Artist: {data.artists.split(";").join(", ")}
                              </p>
                              <p className="font-light">
                                Genre: {data.track_genre}
                              </p>
                              {/* <p className="font-light">Score: {res.score}</p> */}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    );
                  })
                )}
              </div>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <div className="flex items-center justify-center space-x-1 px-2 align-middle">
        <p>By: </p>
        <MyListbox selected={filterkey} setSelected={setFilterkey} />
      </div>
    </div>
  );
};

interface IProps2 {
  selected: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<string>>;
}

type KeyMap = {
  [key: string]: string;
};

const MyListbox: React.FC<IProps2> = ({ selected, setSelected }) => {
  const keys = ["track_name", "artists", "album_name", "track_genre"];
  //[key: string]: string
  const key_map = {
    track_name: "Track",
    artists: "Artist",
    album_name: "Album",
    track_genre: "Genre",
  } as KeyMap;

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="w-25 relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{key_map[selected]}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {keys.map((key, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={key}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {key_map[key]}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default MyCombobox;
