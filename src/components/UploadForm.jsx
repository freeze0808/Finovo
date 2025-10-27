import React, {useState} from "react";
import { uploadFile } from "../api";

export default function UploadForm({onNew}){
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);

  async function submit(){
    if(!file){ alert("Choisir un PDF"); return;}
    setLoading(true);
    try{
      const res = await uploadFile(file);
      
      // Vérifier si c'est un doublon
      if (res.status === "duplicate") {
        alert("⚠️ Ce relevé est déjà dans l'historique.\n\nDate du relevé : " + res.record.report_date + "\n\nAucune modification effectuée.");
      } else {
        // Recharger l'historique depuis l'API
        onNew();
        alert("✅ PDF analysé et ajouté à l'historique !\n\nDate du relevé : " + res.record.report_date);
      }
      
      // Réinitialiser le fichier
      setFile(null);
      const input = document.querySelector('input[type="file"]');
      if (input) input.value = '';
    }catch(e){
      console.error(e);
      if (e.name === 'AbortError') {
        alert("❌ Le serveur met trop de temps à répondre.\n\nIl se réveille peut-être après une période d'inactivité.\nRéessayez dans quelques instants.");
      } else {
        alert("❌ Erreur lors de l'upload du PDF\n\n" + e.message);
      }
    }finally{ setLoading(false); }
  }

  return (
    <div className="card">
      <h3>Uploader un relevé (PDF)</h3>
      <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} />
      <button onClick={submit} style={{marginLeft:12}} disabled={loading}>{loading?"Analyse...":"Analyser"}</button>
      <p className="small">Tu peux uploader quotidiennement ou mensuellement — l'historique s'accumulera automatiquement.</p>
    </div>
  );
}

