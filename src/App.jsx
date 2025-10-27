import React, {useEffect, useState} from "react";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import Dashboard from "./components/Dashboard";
import { getHistory } from "./api";

export default function App(){
  const [logged, setLogged] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (e) {
      console.error("Erreur chargement historique:", e);
      setError("Le serveur ne répond pas. Il se réveille peut-être (jusqu'à 60s)...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if(!logged) return <Login onLogin={()=>setLogged(true)} />;
  
  return (
    <div className="container">
      <div className="card header">
        <h1>🏦 Mon Assurance Vie & PEA - Tracker</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div className="small">Utilisateur connecté</div>
          {loading && <div className="small" style={{color: '#667eea', fontWeight: 500}}>⏳ Chargement...</div>}
        </div>
      </div>
      
      {error && (
        <div className="card" style={{background: '#fff3cd', borderLeft: '4px solid #ffc107'}}>
          <p style={{margin: 0, color: '#856404'}}>
            ⚠️ {error}
            <button 
              onClick={loadHistory} 
              style={{marginLeft: '12px', padding: '6px 12px', fontSize: '13px'}}
            >
              Réessayer
            </button>
          </p>
        </div>
      )}
      
      <UploadForm onNew={loadHistory} />
      <Dashboard history={history} />
    </div>
  );
}

