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
          size: 16,
        },
      },
    },
  },

  //darker line
  scales: {
    r: {
      angleLines: {
        color: "rgba(0, 0, 0, 0.5)",
        lineWidth: 2,
      },
      grid: {
        color: "rgba(0, 0, 0, 0.5)",
      },
      pointLabels: {
        font: {
          size: 20,
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
    line: {
      borderWidth: 1,
    },
  },

  // maintainAspectRation: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const labels = [
  "speechiness",
  "acousticness",
  "energy",
  "danceability",
  "valence",
  "liveness",
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
            const rgb = collection.color;
            return {
              label: `${collection.name} (${collection.data.length})`,
              data: calcAvg(collection.data),
              backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`,
              borderColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
            };
          })
        : [],
  };

  return (
    <Radar height={40} width={40} data={radarShow} options={options}></Radar>
  );
};

export default SpotifyRadar;
