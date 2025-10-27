import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, TimeScale } from "chart.js";
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, TimeScale);

export default function ChartView({history=[]}){
  const labels = history.map(h => h.report_date);
  const values = history.map(h => h.value_atteinte);
  const verses = history.map(h => h.total_verse || h.total_investi);
  const data = {
    labels,
    datasets: [
      { label: "Valeur atteinte", data: values, borderColor: "#1f78b4", tension:0.2, fill:false },
      { label: "Total versé", data: verses, borderColor: "#33a02c", tension:0.2, borderDash:[5,5], fill:false }
    ]
  };
  return (
    <div className="card">
      <h3>Historique</h3>
      <Line data={data} />
    </div>
  );
}

