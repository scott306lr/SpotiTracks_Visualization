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
import type { SpotifyData } from "../utils/dataHandler";
import type { Collection } from "../utils/dataHandler";

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
    legend: {
      display: false,
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
    y: {
      ticks: {
        backdropColor: "transparent",
        font: {
          size: 20,
        },
        // stepSize: 0.2,
      },
      // suggestedMin: 0,
      // suggestedMax: 1,
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

// function randomValues(count: number, min: number, max: number) {
//   const delta = max - min;
//   return Array.from({ length: count }).map(() => Math.random() * delta + min);
// }

// const labels = ["danceability", "energy", "speechiness", "liveness", "valence"];
// const labels = ["popularity", "duration_s", "tempo"];
// const labels = ["loudness"];
// const labels = ["duration_s"];

const SpotifyViolin: React.FC<{
  input: Collection[] | undefined;
  label: string;
}> = ({ input, label }) => {
  const radarShow = {
    labels: [label],
    datasets:
      input != null
        ? input.map((collection) => {
            return {
              label: collection.name,
              data: [collection.data.slice(0, 2000).map((data) => data[label])],
              // labels.map((label) =>
              //   collection.data.slice(0, 2000).map((data) => data[label])
              // ),
              backgroundColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 0.2)`,
              borderColor: `rgba(${collection.color[0]}, ${collection.color[1]}, ${collection.color[2]}, 1)`,
              borderWidth: 1,
            };
          })
        : [],
  };

  return (
    <Chart
      // height="100px"
      // width="100px"
      type="violin"
      data={radarShow}
      options={options}
    />
  );
};
export default SpotifyViolin;
