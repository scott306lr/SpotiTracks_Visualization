//Todo: Read data and display all the information in a nice way

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { Collection, SpotifyData } from "../utils/dataHandler";
import MyCombobox from "./MyCombobox";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineMode, MdCancel } from "react-icons/md";

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

  return (
    <>
      <h3 className="text-lg">Data Picker</h3>
      <MyCombobox data={data} selected={selected} setSelected={setSelected} />

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <h3 className="w-full text-xl"> Selected Tracks: </h3>
          <div className="flex w-full flex-col justify-center">
            <ul className="flex h-64 flex-col overflow-y-scroll">
              {selected.length != 0
                ? selected.map((d, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <button>
                        <MdCancel
                          className="h-4 w-4 flex-none"
                          //remove from selected
                          onClick={() => {
                            setSelected(selected.filter((s) => s.id !== d.id));
                          }}
                        />
                      </button>
                      <p>{d.track_name}</p>
                    </div>
                  ))
                : "No tracks selected."}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="text"
              className="w-5/6 rounded-lg border-2 border-gray-500 p-2"
              // placeholder={"Collection_{id}"}
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
              }}
            >
              {editMode ? "Modify" : "Create"}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">Collections:</h3>
          <ul className="flex h-64 w-full flex-col overflow-y-scroll">
            {collections.map((d, idx) => (
              <li key={idx} className="flex  items-center">
                <HiOutlineTrash
                  className="h-8 w-8 flex-none"
                  onClick={() => {
                    setCollections(collections.filter((s) => s.id !== d.id));
                  }}
                />
                <MdOutlineMode
                  className="h-8 w-8 flex-none"
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
    </>
  );
};

export default DataInfo;
