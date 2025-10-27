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
      onNew(res);
      alert("PDF analysé — ajouté à l'historique");
    }catch(e){
      alert("Erreur upload");
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

