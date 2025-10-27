import React from "react";
import ChartView from "./ChartView";
import TransactionHistory from "./TransactionHistory";

export default function Dashboard({history=[]}){
  // Dédupliquer l'historique : garder un seul relevé par date (le dernier en cas de doublon)
  const deduped = history.reduce((acc, current) => {
    const existingIndex = acc.findIndex(item => item.report_date === current.report_date);
    if (existingIndex >= 0) {
      // Remplacer si c'est un doublon (garder le dernier)
      acc[existingIndex] = current;
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
  
  const sorted = [...deduped].sort((a,b)=> new Date(a.report_date) - new Date(b.report_date));
  const latest = sorted[sorted.length-1] || null;
  const total_invested = latest ? (latest.total_verse || latest.total_investi) : 0;
  
  // Calculer l'évolution (si on a au moins 2 relevés)
  const previous = sorted.length > 1 ? sorted[sorted.length-2] : null;
  const evolution = previous && latest ? 
    ((latest.value_atteinte - previous.value_atteinte) / previous.value_atteinte * 100).toFixed(2) : null;

  if (!latest) {
    return (
      <div className="card empty-state">
        <p style={{fontSize: '18px', marginTop: 0}}>📊 Aucun relevé disponible</p>
        <p className="small">Uploadez votre premier relevé PDF pour commencer le suivi</p>
      </div>
    );
  }

  return (
    <div>
      {/* Cartes statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>💰 Valeur Atteinte</h4>
          <p className="value">{latest.value_atteinte?.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
          <p className="small" style={{margin: '8px 0 0 0', opacity: 1, color: 'rgba(255,255,255,0.95)'}}>Au {latest.report_date}</p>
        </div>

        {total_invested > 0 && (
          <div className="stat-card">
            <h4>📥 Total Versé</h4>
            <p className="value">{total_invested?.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
          </div>
        )}

        {latest.gain && (
          <div className={`stat-card ${latest.gain >= 0 ? 'positive' : 'negative'}`}>
            <h4>{latest.gain >= 0 ? '📈' : '📉'} Gain / Perte</h4>
            <p className="value">{latest.gain?.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
            {latest.performance_pct && (
              <p className="small" style={{margin: '8px 0 0 0', opacity: 1, color: 'rgba(255,255,255,0.95)'}}>
                {latest.performance_pct > 0 ? '+' : ''}{latest.performance_pct} %
              </p>
            )}
          </div>
        )}

        {evolution && (
          <div className={`stat-card ${parseFloat(evolution) >= 0 ? 'positive' : 'negative'}`}>
            <h4>📊 Évolution</h4>
            <p className="value">{evolution > 0 ? '+' : ''}{evolution} %</p>
            <p className="small" style={{margin: '8px 0 0 0', opacity: 1, color: 'rgba(255,255,255,0.95)'}}>Depuis dernier relevé</p>
          </div>
        )}
      </div>

      {/* Graphique */}
      {sorted.length > 1 && <ChartView history={sorted} />}

      {/* Tableau récapitulatif */}
      <div className="card">
        <h3>📋 Détails du dernier relevé</h3>
        <table className="table">
          <tbody>
            <tr><th>Date du relevé</th><td>{latest.report_date}</td></tr>
            <tr><th>Valeur atteinte</th><td style={{fontWeight: 600}}>{latest.value_atteinte?.toLocaleString('fr-FR', {minimumFractionDigits: 2})} €</td></tr>
            {total_invested > 0 && <tr><th>Total versé</th><td>{total_invested?.toLocaleString('fr-FR', {minimumFractionDigits: 2})} €</td></tr>}
            {latest.gain && <tr><th>Gain</th><td style={{color: latest.gain >= 0 ? '#48bb78' : '#f56565', fontWeight: 600}}>{latest.gain?.toLocaleString('fr-FR', {minimumFractionDigits: 2})} € ({latest.performance_pct} %)</td></tr>}
                   <tr><th>Nombre de relevés</th><td>{sorted.length} {sorted.length !== history.length && <span className="small" style={{color: '#718096'}}>(dédupliqués)</span>}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Historique des transactions */}
      {latest.transactions && latest.transactions.length > 0 && (
        <TransactionHistory transactions={latest.transactions} />
      )}

      {/* Supports */}
      {latest.supports && latest.supports.length > 0 && (
        <div className="card">
          <h3>💼 Répartition des supports</h3>
          <table className="table">
            <thead><tr><th>Support</th><th>Valeur (€)</th><th>Poids (%)</th></tr></thead>
            <tbody>
              {latest.supports.map((s,i)=>(
                <tr key={i}>
                  <td style={{maxWidth:400}}>{s.name}</td>
                  <td style={{fontWeight: 500}}>{s.value_eur?.toLocaleString('fr-FR', {minimumFractionDigits: 2}) ?? "-"}</td>
                  <td><span style={{background: '#e6fffa', color: '#047857', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>{s.pct_computed ?? s.pct_reported ?? "-"} %</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

