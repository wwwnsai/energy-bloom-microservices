import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { BackgroundGradientAnimation } from "../backgrounds/background-gradient-animation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ElectricityUsageGraph = () => {
  // NOTE: 14 DAYS ONLY (ADD ONE MORE ON REAL PRESENTATION DAY)
  const MOCK_UNIT_USAGE = [
    280, 320, 340, 480, 390, 490, 450, 470, 500, 400, 570, 690, 430, 500,
  ];

  const [unitUsageData, setUnitUsageData] = useState<number[]>(MOCK_UNIT_USAGE);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    // Generate the labels for the current month up to today
    const today = dayjs();
    const daysInMonth = today.date(); // Get the number of days up to today
    const labelData = Array.from({ length: daysInMonth }, (_, i) =>
      today.set("date", i + 1).format("MMM D")
    );
    setLabels(labelData);

    // Set an interval to update the unit usage data for the current day
    const interval = setInterval(() => {
      setUnitUsageData((prevUsage) => {
        // Get the current day index (today is the last entry in the array)
        const currentDayIndex = prevUsage.length - 1;

        // Update only today's usage value by adding a random number
        const updatedUsage = [...prevUsage];
        updatedUsage[currentDayIndex] += Math.floor(Math.random() * 10);

        return updatedUsage;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval); 
  }, []);

  const data = {
    labels: labels, // Dynamically generated labels
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: unitUsageData,
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#fff",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#fff", // White color for X axis labels
        },
        grid: {
          display: false, // Hide grid lines
        },
      },
      y: {
        ticks: {
          color: "#fff", // White color for Y axis labels
        },
        grid: {
          display: false, // Hide grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} kWh`;
          },
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(64, 64, 64)" // Dark gray start
        gradientBackgroundEnd="rgb(10, 25, 47)" // Dark blue end
        firstColor="64, 64, 64" // Gray
        secondColor="10, 25, 47" // Dark blue
        thirdColor="30, 30, 30" // Medium gray
        fourthColor="50, 50, 100" // Darker blue
        fifthColor="10, 25, 47" // Dark blue
        pointerColor="255, 255, 255" // White for the pointer highlight
      >
        <div className="z-50 w-full flex flex-1 justify-start items-center">
          <div className="w-full flex flex-1 scale-[80%] -translate-x-16 -translate-y-5">
            <Line data={data} options={options} />
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default ElectricityUsageGraph;
