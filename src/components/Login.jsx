import React, {useState} from "react";
export default function Login({onLogin}){
  const [pw,setPw]=useState("");
  const submit=e=>{
    e.preventDefault();
    if(pw==="maline2025"){ onLogin(); } else alert("Mot de passe incorrect");
  };
  return (
    <div className="container" style={{maxWidth:420, marginTop:80}}>
      <div className="card">
        <h2>Connexion</h2>
        <form onSubmit={submit}>
          <input style={{width:"100%",padding:8,marginTop:8}} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Mot de passe" />
          <button style={{marginTop:10, padding:"8px 12px"}}>Se connecter</button>
        </form>
        <p className="small">Ce login est local — remplace-le par Netlify Identity pour production.</p>
      </div>
    </div>
  );
}

