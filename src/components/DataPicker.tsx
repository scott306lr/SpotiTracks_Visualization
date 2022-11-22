//Todo: Read data and display all the information in a nice way

import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { Collection, SpotifyData } from "../utils/dataHandler";
import MyCombobox from "./MyCombobox";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineMode, MdCancel } from "react-icons/md";
import { useVirtualizer } from "@tanstack/react-virtual";

// let nextID = 0;

interface IProps {
  data: SpotifyData[];
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
  addCollection: (
    d: SpotifyData[],
    name: string,
    color: [number, number, number] | undefined,
    id: number | undefined
  ) => void;
}

const DataInfo: React.FC<IProps> = ({
  data,
  collections,
  setCollections,
  addCollection,
}) => {
  const [selected, setSelected] = useState<SpotifyData[]>([]);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<[number, number, number] | undefined>();
  const [id, setId] = useState<number>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const parentRef = useRef<HTMLUListElement | null>(null);
  const virtualizer = useVirtualizer({
    count: selected.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 6,
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-2 align-middle">
      <h3 className="text-2xl">Data Picker</h3>
      <MyCombobox data={data} selected={selected} setSelected={setSelected} />

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <h3 className="w-full text-xl">
            {" "}
            Selected Tracks: ({selected.length}){" "}
          </h3>
          <div className="flex w-full flex-col justify-center">
            <ul
              className="flex h-64 min-w-fit flex-col overflow-y-scroll"
              ref={parentRef}
            >
              <div
                style={{
                  width: "100%",
                  height: virtualizer.getTotalSize(),
                  position: "relative",
                }}
              >
                {selected.length == 0
                  ? "No tracks selected."
                  : virtualizer.getVirtualItems().map((virtualRow) => {
                      const data = selected[virtualRow.index] as SpotifyData;
                      return (
                        <div
                          key={virtualRow.key}
                          data-index={virtualRow.index}
                          ref={virtualizer.measureElement}
                          className="flex w-full items-center space-x-2 rounded-lg px-2 text-lg hover:bg-slate-200"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          <button>
                            <MdCancel
                              className="h-4 w-4 flex-none"
                              //remove from selected
                              onClick={() => {
                                setSelected(
                                  selected.filter((s) => s.id !== data.id)
                                );
                              }}
                            />
                          </button>
                          <p className="min-w-fit">{data.track_name}</p>
                        </div>
                      );
                    })}
              </div>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">My Collections:</h3>
          <ul className="flex h-64 w-full flex-col overflow-y-scroll">
            {collections.map((d, idx) => (
              <li key={idx} className="flex items-center">
                <HiOutlineTrash
                  className="h-8 w-8 flex-none cursor-pointer rounded-lg hover:bg-gray-200"
                  onClick={() => {
                    setCollections(collections.filter((s) => s.id !== d.id));
                  }}
                />
                <MdOutlineMode
                  className="h-8 w-8 flex-none cursor-pointer rounded-lg hover:bg-gray-200"
                  onClick={() => {
                    setSelected(d.data);
                    setName(d.name);
                    setColor(d.color);
                    setId(d.id);
                    setEditMode(true);
                  }}
                />
                <p>{`${d.name} (${d.data.length})`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <input
          type="text"
          className="w-full rounded-lg border-2 border-gray-500 p-2"
          placeholder={"New collection name..."}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          className="w-auto place-self-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            if (editMode && color != null && id != null) {
              setCollections(
                collections.map((c) => {
                  if (c.id === id) {
                    return {
                      ...c,
                      name: name,
                      data: selected,
                      color: color,
                    };
                  } else {
                    return c;
                  }
                })
              );
              setEditMode(false);
            } else {
              addCollection(selected, name, color, id);
            }
            setName("");
            setColor(undefined);
            setId(undefined);
            setSelected([]);
          }}
        >
          {editMode ? "Modify" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default DataInfo;
