import React from "react";
import ChartView from "./ChartView";

export default function Dashboard({history=[]}){
  const sorted = [...history].sort((a,b)=> new Date(a.report_date) - new Date(b.report_date));
  const latest = sorted[sorted.length-1] || null;
  const total_invested = latest ? (latest.total_verse || latest.total_investi) : 0;
  return (
    <div>
      <div className="card">
        <h3>Résumé</h3>
        {latest ? (
          <table className="table">
            <tbody>
              <tr><th>Dernier relevé</th><td>{latest.report_date}</td></tr>
              <tr><th>Valeur atteinte</th><td>{latest.value_atteinte?.toLocaleString()} €</td></tr>
              <tr><th>Total versé</th><td>{total_invested?.toLocaleString()} €</td></tr>
              <tr><th>Gain</th><td>{latest.gain?.toLocaleString()} € ({latest.performance_pct} %)</td></tr>
              <tr><th>CAGR estimé</th><td>{latest.cagr_pct ?? "N/A"} %</td></tr>
            </tbody>
          </table>
        ) : <div>Aucun relevé</div>}
      </div>

      <ChartView history={sorted} />

      <div className="card">
        <h3>Supports (dernier relevé)</h3>
        {latest && latest.supports && latest.supports.length>0 ? (
          <table className="table">
            <thead><tr><th>Support</th><th>Valeur (€)</th><th>% calculé</th></tr></thead>
            <tbody>
              {latest.supports.map((s,i)=>(
                <tr key={i}>
                  <td style={{maxWidth:300}}>{s.name}</td>
                  <td>{s.value_eur?.toLocaleString() ?? "-"}</td>
                  <td>{s.pct_computed ?? s.pct_reported ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <div className="small">Pas de détail disponible</div>}
      </div>
    </div>
  );
}

