/* Données de démonstration (même structure que la réponse attendue de l’API) */
const M12=["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const MOCK={
  user:{name:"Prénom Nom",role:"Data & Croissance"},
  periods:[{id:"2026",label:"1 janv. – 31 déc. 2026"},{id:"2025",label:"1 janv. – 31 déc. 2025"},{id:"2024",label:"1 janv. – 31 déc. 2024"}],
  kpis:[
    {id:"total",label:"Clients totaux",value:124563,format:"int",icon:"users",delta:12,good:true},
    {id:"churn",label:"Taux de churn",value:3.8,format:"pct",icon:"pie",delta:-22,good:true},
    {id:"risk",label:"Clients à risque",value:4732,format:"int",icon:"bars",delta:18,good:false},
    {id:"clv",label:"Valeur vie client",value:1240,format:"eur",icon:"coin",delta:11,good:true}],
  churnTrend:{labels:M12,values:[6.9,6.0,5.2,4.5,3.9,3.6,3.3,3.2,3.0,2.8,3.1,3.8]},
  risk:[{label:"Risque élevé",pct:3.8,count:4732,tone:"bad"},{label:"Risque moyen",pct:12.6,count:15678,tone:"warn"},{label:"Risque faible",pct:83.6,count:104153,tone:"teal"}],
  drivers:[{label:"Faible usage du produit",pct:28},{label:"Sensibilité au prix",pct:18},{label:"Support client insatisfaisant",pct:15},{label:"Fin de contrat proche",pct:12},{label:"Nombre élevé de réclamations",pct:9}],
  actions:[
    {icon:"chat",title:"Prise de contact proactive",desc:"Contacter 1 240 clients à haut risque"},
    {icon:"tag",title:"Offre personnalisée",desc:"Cibler 890 clients sensibles au prix"},
    {icon:"box",title:"Adoption des fonctionnalités",desc:"Relancer l’usage de 2 340 utilisateurs inactifs"},
    {icon:"heart",title:"Suivi du succès client",desc:"Réengager 567 comptes à risque"}],
  predVsActual:{labels:M12,predicted:[7.0,6.1,5.3,4.7,4.1,3.5,3.0,3.1,3.0,2.8,3.0,3.3],actual:[6.3,5.7,4.8,4.3,3.5,3.0,2.9,2.8,2.7,2.5,2.7,2.5]},
  model:{accuracy:92,auc:0.91}
};
