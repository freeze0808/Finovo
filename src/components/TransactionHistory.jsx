import React, { useState } from "react";

export default function TransactionHistory({ transactions = [] }) {
  const [filter, setFilter] = useState("all");
  
  if (!transactions || transactions.length === 0) {
    return null;
  }

  // Filtrer par type
  const filtered = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.type?.toLowerCase().includes(filter.toLowerCase()));

  // Types de transactions pour les filtres
  const types = ["all", "versement", "arbitrage", "frais"];

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>📜 Historique des opérations</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                background: filter === type ? '#667eea' : '#e2e8f0',
                color: filter === type ? 'white' : '#4a5568',
              }}
            >
              {type === 'all' ? 'Tout' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type d'opération</th>
              <th>Montant brut</th>
              <th>Montant net</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}>{t.date_valorisation || t.date_execution || t.date_demande || '-'}</td>
                <td>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: getTypeColor(t.type).bg,
                    color: getTypeColor(t.type).text
                  }}>
                    {t.type}
                  </span>
                </td>
                <td style={{ fontWeight: '500' }}>
                  {t.montant_brut ? `${parseFloat(t.montant_brut).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €` : '-'}
                </td>
                <td style={{ fontWeight: '500' }}>
                  {t.montant_net ? `${parseFloat(t.montant_net).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €` : '-'}
                </td>
                <td>
                  <span style={{
                    color: t.statut === 'Validé' ? '#48bb78' : '#718096',
                    fontWeight: '500'
                  }}>
                    {t.statut || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="small" style={{ marginTop: '12px', textAlign: 'center' }}>
        {filtered.length} opération{filtered.length > 1 ? 's' : ''} 
        {filter !== 'all' && ` (filtrées sur "${filter}")`}
      </p>
    </div>
  );
}

function getTypeColor(type) {
  const lower = type?.toLowerCase() || '';
  if (lower.includes('versement')) {
    return { bg: '#d1fae5', text: '#065f46' };
  }
  if (lower.includes('arbitrage')) {
    return { bg: '#dbeafe', text: '#1e40af' };
  }
  if (lower.includes('frais')) {
    return { bg: '#fee2e2', text: '#991b1b' };
  }
  if (lower.includes('participation')) {
    return { bg: '#fef3c7', text: '#92400e' };
  }
  return { bg: '#f3f4f6', text: '#374151' };
}





