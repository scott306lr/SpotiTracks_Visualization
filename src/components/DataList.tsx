//Todo: Read data and display all the information in a nice way

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { Collection } from "../utils/dataHandler";
// let nextID = 0;

interface IProps {
  collections: Collection[];
}

const DataList: React.FC<IProps> = ({ collections }) => {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center space-y-2 px-4 align-middle">
      <h3 className="w-full text-center text-2xl">My Collections</h3>
      <ul className="flex h-full w-full flex-col overflow-y-scroll rounded-lg px-2">
        {collections.map((d, idx) => (
          <li
            key={idx}
            className="flex items-center rounded-md px-2 py-1 hover:bg-slate-200"
          >
            <span className="flex px-4">
              {d.name}&nbsp;
              <p className="text-gray-500">{` (${d.data.length})`}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
