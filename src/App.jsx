import React, {useEffect, useState} from "react";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import Dashboard from "./components/Dashboard";
import { getHistory } from "./api";

export default function App(){
  const [logged, setLogged] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(()=>{
    getHistory().then(setHistory);
  },[]);

  if(!logged) return <Login onLogin={()=>setLogged(true)} />;
  return (
    <div className="container">
      <div className="card header">
        <h1>🏦 Mon Assurance Vie & PEA - Tracker</h1>
        <div className="small">Utilisateur connecté</div>
      </div>
      <UploadForm onNew={(r)=> setHistory((h)=>[...h, r])} />
      <Dashboard history={history} />
    </div>
  );
}

