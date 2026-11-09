/* ============ COUCHE DONNÉES (API-ready) ============
   Pour brancher l’API : renseigner API.baseUrl (ex. "https://api.exemple.com")
   et faire retourner à GET /dashboard?period=…&range=… le même JSON que MOCK. */
const API={baseUrl:"",token:null,
  async get(path,params={}){
    const q=new URLSearchParams(params).toString();
    const r=await fetch(`${this.baseUrl}${path}${q?"?"+q:""}`,{headers:{Accept:"application/json",...(this.token?{Authorization:`Bearer ${this.token}`}:{})}});
    if(!r.ok)throw new Error("HTTP "+r.status);return r.json();}
};
async function fetchDashboard(opts){
  if(!API.baseUrl){await new Promise(r=>setTimeout(r,250));return structuredClone(MOCK);}
  return API.get("/dashboard",opts);
}

