const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function uploadFile(file){
  const fd = new FormData();
  fd.append("file", file);
  // Timeout de 60s pour laisser le temps au backend de se réveiller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  
  try {
    const res = await fetch(`${API}/upload`, { 
      method: "POST", 
      body: fd,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function getHistory(){
  // Timeout de 60s pour laisser le temps au backend de se réveiller depuis Render
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  
  try {
    const res = await fetch(`${API}/history`, { 
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Erreur récupération historique:", error);
    throw error;
  }
}

