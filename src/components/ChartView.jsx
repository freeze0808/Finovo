import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from "chart.js";
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Filler);

export default function ChartView({history=[]}){
  if (!history || history.length === 0) {
    return null;
  }

  const labels = history.map(h => {
    // Formater la date pour l'affichage
    const date = new Date(h.report_date);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  });
  
  const values = history.map(h => h.value_atteinte || 0);
  const verses = history.map(h => h.total_verse || h.total_investi || null);
  
  // Filtrer les datasets vides
  const datasets = [
    {
      label: "💰 Valeur atteinte",
      data: values,
      borderColor: "#667eea",
      backgroundColor: "rgba(102, 126, 234, 0.1)",
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: "#667eea",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    }
  ];

  // Ajouter "Total versé" seulement si on a des données
  const hasVerses = verses.some(v => v !== null && v > 0);
  if (hasVerses) {
    datasets.push({
      label: "📥 Total versé",
      data: verses,
      borderColor: "#48bb78",
      backgroundColor: "rgba(72, 187, 120, 0.1)",
      tension: 0.4,
      fill: false,
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#48bb78",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 13,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-FR', { 
                style: 'currency', 
                currency: 'EUR',
                minimumFractionDigits: 2
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(value);
          },
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="card">
      <h3>📈 Évolution de votre portefeuille</h3>
      <div style={{marginTop: '20px'}}>
        <Line data={data} options={options} />
      </div>
      <p className="small" style={{marginTop: '16px', textAlign: 'center'}}>
        {history.length} relevé{history.length > 1 ? 's' : ''} enregistré{history.length > 1 ? 's' : ''}
      </p>
    </div>
  );
}

