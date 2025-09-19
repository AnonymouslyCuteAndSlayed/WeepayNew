import React, { useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const PointStyleChart = () => {
  const [pointStyle, setPointStyle] = useState("false");

  // Sample dataset
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        label: "2025",
        borderColor: "rgba(0, 115, 255, 1)",
        data: [10, -20, 30, -40, 50, -60], 
        backgroundColor: "rgba(0, 115, 255, 1)",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      
      
    },
  };

  

  return (
    <div style={{ width: "60%", margin: "auto", marginLeft:"0"}}>
      <Line data={data} options={options} />
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {((style, index) => (
          <button
            key={index}
            onClick={() => setPointStyle(style)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: pointStyle === style ? "#007bff" : "#f8f9fa",
              color: pointStyle === style ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {String(style)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PointStyleChart;
