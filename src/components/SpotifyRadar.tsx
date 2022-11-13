import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { SpotifyData } from "../utils/dataHandler";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export type Collection = {
  name: string;
  data: SpotifyData[];
};

const options = {
  plugins: {
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
  // label font size 32
  scales: {
    r: {
      pointLabels: {
        font: {
          size: 24,
        },
      },
      ticks: {
        backdropColor: "transparent",
        font: {
          size: 20,
        },
        stepSize: 0.2,
      },
      suggestedMin: 0,
      suggestedMax: 1,
    },
  },

  elements: {
    // point: {
    //   radius: 0,
    // },
    line: {
      borderWidth: 3,
      tension: 0.2,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const labels = [
  "danceability",
  "energy",
  // "loudness",
  "speechiness",
  // "acousticness",
  "liveness",
  "valence",
];

const SpotifyRadar: React.FC<{ input: Collection[] | undefined }> = ({
  input,
}) => {
  const calcAvg = (data: SpotifyData[]) => {
    if (data == null) return [];
    return labels.map(
      (label) =>
        data.reduce((acc, curr) => acc + (curr[label] as number), 0) /
        data.length
    );
  };

  const radarShow = {
    labels: labels,
    datasets:
      input != null
        ? input.map((collection) => {
            const rgb = [
              Math.floor(150 + Math.random() * 100),
              Math.floor(150 + Math.random() * 100),
              Math.floor(150 + Math.random() * 100),
            ];

            return {
              label: collection.name,
              data: calcAvg(collection.data),
              backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`,
              borderColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
              borderWidth: 1,
            };
          })
        : [],
  };

  return <Radar data={radarShow} options={options}></Radar>;
};

export default SpotifyRadar;
