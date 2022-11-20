import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  ViolinController,
  BoxPlotController,
  Violin,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";
import type { Collection } from "../utils/dataHandler";

import { Tab } from "@headlessui/react";

// register controller in chart.js and ensure the defaults are set
ChartJS.register(
  ViolinController,
  Violin,
  BoxPlotController,
  BoxAndWiskers,
  LinearScale,
  CategoryScale,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: "XX Distribution",
      font: {
        size: 20,
      },
    },
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        boxWidth: 30,
        font: {
          size: 20,
        },
      },
    },
  },

  scales: {
    y: {
      ticks: {
        backdropColor: "transparent",
        font: {
          size: 20,
        },
      },
    },
    x: {
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

const ViolinPlot: React.FC<{
  input: Collection[] | undefined;
  label: string;
}> = ({ input, label }) => {
  const radarShow = {
    labels: [label],
    datasets:
      input != null
        ? input.map((collection) => {
            return {
              label: `${collection.name} (${collection.data.length})`,
              data: [collection.data.map((data) => data[label])],
              backgroundColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 0.2)`,
              borderColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 1)`,
              borderWidth: 1,
            };
          })
        : [],
  };

  const myOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: `"${
          label.charAt(0).toUpperCase() + label.slice(1)
        }" distribution between ${input?.length} collections`,
      },
    },
  };

  return (
    <Chart
      // height="100px"
      // width="100px"
      type="violin"
      data={radarShow}
      options={myOptions}
    />
  );
};

const SpotifyViolin: React.FC<{ input: Collection[] | undefined }> = ({
  input,
}) => {
  const labels = ["popularity", "duration_s", "tempo", "loudness"];

  return (
    <div className="flex w-full flex-col justify-center space-y-1 overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex space-x-4 overflow-x-auto rounded-xl bg-blue-900/80 px-2 py-1">
          {labels.map((label, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 px-1 text-lg font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                ${
                  selected
                    ? "bg-white/[0.70] shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                }`
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
              className={
                "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              }
            >
              <ViolinPlot input={input} label={label} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SpotifyViolin;
