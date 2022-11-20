import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Collection, SpotifyData } from "../utils/dataHandler";
import { Tab } from "@headlessui/react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // maintianAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Top 10",
      font: {
        size: 20,
      },
    },
    legend: {
      display: false,
      position: "bottom",
      align: "start",
      labels: {
        boxWidth: 30,
        font: {
          size: 16,
        },
      },
    },
  },

  scales: {
    y: {
      stacked: true,
      ticks: {
        backdropColor: "transparent",
        font: {
          size: 20,
        },
      },
    },
    x: {
      stacked: true,
      ticks: {
        backdropColor: "transparent",
        font: {
          size: 20,
        },
      },
    },
  },

  elements: {
    line: {
      borderWidth: 3,
      tension: 0.2,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const DoughnutPlot: React.FC<{
  input: Collection;
  label: string;
}> = ({ input, label }) => {
  const countType = (input: SpotifyData[], toCount: string) => {
    const countDict: { [key: string]: number } = {};
    if (input != null) {
      input.forEach((track) => {
        const rawData = track[toCount] as string;
        if (rawData in countDict) {
          countDict[rawData] += 1;
        } else {
          countDict[rawData] = 1;
        }
      });
    }

    return countDict;
  };

  // const labels = ["track_genre", "artists", "explicit"];
  const countDict = countType(input.data, label);
  const sorted = Object.entries(countDict).sort((a, b) => b[1] - a[1]);

  const sortedLabels = sorted.map((entry) => entry[0]);
  const sortedData = sorted.map((entry) => entry[1]);

  const top10Labels =
    sortedLabels.length > 10
      ? [...sortedLabels.slice(0, 10)] //, "Others"]
      : sortedLabels.slice(0, 10);

  const top10Data = [
    ...sortedData.slice(0, 10),
    //sortedData.slice(10).reduce((a, b) => a + b, 0),
  ];

  const top10TotalCount = top10Data.reduce((a, b) => a + b, 0);
  const totalCount = sortedData.reduce((a, b) => a + b, 0);
  const top10Percent = ((top10TotalCount / totalCount) * 100).toFixed(2);

  const radarShow = {
    labels: top10Labels,
    datasets: [
      {
        label: `${input.name} (${input.data.length})`,
        data: top10Data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  const myOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: `Top ${top10Labels.length} of "${label}" (${top10Percent}% in the total of ${totalCount} data)`,
      },
    },
  };

  return <Bar data={radarShow} options={myOptions} />;
};

const SpotifyDoughnut: React.FC<{ input: Collection[] }> = ({ input }) => {
  const [select, setSelect] = useState<string>("track_genre");
  // const bar_labels = ["mode", "key"];
  // const labels = input.map((collection) => collection.name);

  // const labels3 = Object.keys(artists);
  // const labels4 = Object.keys(explicit);
  const labels = ["track_genre", "artists", "explicit", "mode", "key"];
  return (
    <div className="flex w-full flex-col justify-center space-y-1 overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex flex-col space-y-4">
          <div className="flex space-x-4 overflow-x-auto rounded-xl bg-gray-800/80 px-2 py-1">
            {input.map((collect) => (
              <Tab
                key={collect.id}
                className={({ selected }) =>
                  `w-full min-w-fit rounded-lg py-2.5 px-1 text-base font-medium leading-5 text-gray-500 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                ${
                  selected
                    ? "bg-white/[0.80] shadow"
                    : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                }`
                }
              >
                {collect.name}
              </Tab>
            ))}
          </div>
          <ul className="flex space-x-4 overflow-x-auto rounded-xl bg-blue-900/80 px-2 py-1">
            {labels.map((label, idx) => (
              <li
                key={idx}
                className={`w-full rounded-lg py-2.5 px-1 text-center text-lg font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                  ${
                    select === label
                      ? "bg-white/[0.70] shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`}
                onClick={() => setSelect(label)}
              >
                {label}
              </li>
            ))}
          </ul>
        </Tab.List>
        <Tab.Panels className="mt-2">
          {input.map((collect) => (
            <Tab.Panel
              key={collect.id}
              className={
                "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              }
            >
              {/* <LabelTab collect={collect} /> */}
              <DoughnutPlot key={select} input={collect} label={select} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SpotifyDoughnut;
