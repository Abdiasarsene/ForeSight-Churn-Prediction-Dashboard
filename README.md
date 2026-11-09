* [ ] 

# ForeSight – Tableau de bord d’analyse du churn

Front-end statique : HTML, CSS, JavaScript, Bootstrap 5.3 et Chart.js 4 (chargés via CDN, aucune étape de build).

## Structure

```
index.html          page unique
css/style.css       thème (palette dans :root : --teal #3c9496, --cream #e6dfbd)
js/mock-data.js     données de démonstration (supprimer une fois l’API branchée)
js/api.js           client API + fetchDashboard()
js/app.js           rendu des KPI, listes et graphiques Chart.js
```

## Lancer en local

Ouvrir `index.html` dans le navigateur, ou : `python -m http.server 8000` puis http://localhost:8000.

## Déployer sur GitHub Pages

1. Créer un dépôt, y pousser le contenu de ce dossier (`index.html` à la racine).
2. Settings → Pages → Source : *Deploy from a branch* → `main` / `(root)`.
3. Le site est servi sur `https://<utilisateur>.github.io/<depot>/`.

## Brancher l’API

Dans `js/api.js`, renseigner `API.baseUrl` (et `API.token` si besoin). Tant que `baseUrl` est vide, les données de `mock-data.js` sont utilisées.
L’interface appelle `GET {baseUrl}/dashboard?period=2026&range=12` et attend le même JSON que l’objet `MOCK` :
`user`, `periods`, `kpis`, `churnTrend`, `risk`, `drivers`, `actions`, `predVsActual`, `model`.
Penser à autoriser l’origine du site côté API (CORS).
