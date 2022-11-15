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
import type { Collection } from "../utils/dataHandler";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
  maintainAspectRation: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const labels = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
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
            return {
              label: `${collection.name} (${collection.data.length})`,
              data: calcAvg(collection.data),
              backgroundColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 0.2)`,
              borderColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 1)`,
              borderWidth: 1,
            };
          })
        : [],
  };

  return (
    <Radar height={50} width={50} data={radarShow} options={options}></Radar>
  );
};

export default SpotifyRadar;
