const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export async function uploadFile(file){
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
  return res.json();
}
export async function getHistory(){
  const res = await fetch(`${API}/history`);
  return res.json();
}

