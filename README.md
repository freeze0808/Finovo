# Assurance Vie Tracker - Frontend

Application React + Vite pour le suivi d'assurance vie.

## Déploiement sur Netlify

### Méthode 1 : Via GitHub (recommandé)

1. Connectez-vous à [Netlify](https://www.netlify.com)
2. Cliquez sur "Add new site" → "Import an existing project"
3. Sélectionnez le repo GitHub `Finovo`
4. Netlify détectera automatiquement les paramètres de build depuis `netlify.toml`
5. Ajoutez la variable d'environnement :
   - **Key** : `VITE_API_URL`
   - **Value** : L'URL de votre backend Railway (ex: `https://votre-app.railway.app/api`)
6. Cliquez sur "Deploy site"

### Méthode 2 : Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Variables d'environnement

Configurez sur Netlify :

- `VITE_API_URL` : URL complète de votre API backend (se termine par `/api`)

Exemple : `https://finovo-backend.railway.app/api`

## Architecture

```
Frontend (Netlify) → Backend API (Railway)
    ↓
http://votre-site.netlify.app → https://backend.railway.app/api
```

## Développement local

```bash
npm install
npm run dev
```

L'application sera sur `http://localhost:5173`

Par défaut, le frontend se connecte à `http://localhost:5000/api` pour le développement.

## Build

```bash
npm run build
```

Le dossier `dist/` contient les fichiers statiques à déployer.

