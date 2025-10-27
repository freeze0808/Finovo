# 📊 Finovo Frontend - Dashboard d'Assurance Vie

Interface React moderne pour suivre votre assurance vie et PEA.

## 🎨 Fonctionnalités

✅ **Dashboard interactif** avec KPIs visuels  
✅ **Graphique d'évolution** du portefeuille dans le temps  
✅ **Historique des transactions** avec filtres par type  
✅ **Upload de PDF** pour analyse automatique  
✅ **Design moderne** et responsive  
✅ **Formatage français** des montants et dates  

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:5000/api
```

**En production (Netlify)** :
- Allez dans Site settings → Environment variables
- Ajoutez : `VITE_API_URL` = `https://finovo-back.onrender.com/api`

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx           # Dashboard principal avec KPIs
│   │   ├── ChartView.jsx          # Graphique d'évolution
│   │   ├── TransactionHistory.jsx # Historique des transactions
│   │   └── Uploader.jsx           # Upload de PDF
│   ├── api.js                     # Appels API
│   ├── styles.css                 # Styles globaux
│   ├── App.jsx                    # Composant racine
│   └── main.jsx                   # Point d'entrée
├── index.html
├── package.json
├── vite.config.js
└── .env.local                     # Configuration locale (non versionné)
```

## 🎯 Composants Principaux

### `Dashboard.jsx`

Le composant principal qui affiche :

- **KPIs Cards** : Valeur atteinte, Total versé, Gain/Perte, Évolution
- **Graphique** : Courbe d'évolution du portefeuille
- **Tableau récapitulatif** : Détails du dernier relevé
- **Historique des transactions** : Liste filtrable des opérations
- **Répartition des supports** : Si disponible dans le PDF

**Props :**
- `history` : Array de relevés depuis l'API

**Fonctionnalités :**
- Calcul automatique de l'évolution entre relevés
- Formatage français des montants
- Affichage conditionnel selon les données disponibles
- Code couleur pour les gains/pertes

### `ChartView.jsx`

Graphique interactif Chart.js :

- **Courbe principale** : Valeur atteinte (bleu avec dégradé)
- **Courbe secondaire** : Total versé (vert pointillé)
- **Tooltips** : Montants formatés en euros
- **Responsive** : S'adapte à la taille de l'écran

**Props :**
- `history` : Array de relevés triés par date

**Personnalisation :**
- Formatage des dates en français (ex: "27 oct. 2025")
- Formatage des montants avec devise (ex: "47 591,19 €")
- Légende avec emojis pour plus de clarté

### `TransactionHistory.jsx`

Tableau filtrable des transactions :

- **Filtres** : Tout, Versement, Arbitrage, Frais
- **Codes couleur** : Vert (versements), Bleu (arbitrages), Rouge (frais)
- **Colonnes** : Date, Type, Montant brut, Montant net, Statut
- **Responsive** : Scroll horizontal sur mobile

**Props :**
- `transactions` : Array d'opérations depuis le relevé

### `Uploader.jsx`

Interface d'upload de PDF :

- **Drag & drop** (optionnel, selon implémentation)
- **Sélection de fichier** classique
- **Validation** : Accepte uniquement les PDF
- **Feedback** : Indication de chargement

**Callbacks :**
- `onUploadComplete` : Appelé après analyse réussie

## 🎨 Design System

### Couleurs

```css
/* Primaire */
--primary: #667eea;          /* Bleu-violet */
--primary-hover: #5a67d8;

/* États */
--success: #48bb78;          /* Vert */
--danger: #f56565;           /* Rouge */
--warning: #f6ad55;          /* Orange */

/* Neutrals */
--gray-50: #f7fafc;
--gray-100: #edf2f7;
--gray-600: #718096;
--gray-900: #1a202c;
```

### Typographie

- **Font family** : Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Titres** : 600-700 weight
- **Corps** : 400-500 weight
- **Tailles** : 13-24px selon le contexte

### Composants

- **Cards** : Fond blanc, border-radius 12px, shadow subtile
- **Buttons** : Border-radius 8px, transitions smooth
- **Tables** : Borders minimalistes, alternance de couleurs
- **Charts** : Dégradés subtils, animations fluides

## 📊 Données Affichées

### KPIs (Cartes)

1. **💰 Valeur Atteinte** : Valeur totale du portefeuille
2. **📥 Total Versé** : Cumul des versements (si disponible)
3. **📈 Gain/Perte** : Différence entre valeur et versements
4. **📊 Évolution** : % de changement depuis le relevé précédent

### Graphique

- **Axe X** : Dates des relevés (format court français)
- **Axe Y** : Montants en euros
- **Courbe 1** : Valeur atteinte (zone remplie)
- **Courbe 2** : Total versé (si données disponibles)

### Transactions

Affichées avec **5 colonnes** :
- Date (valorisation prioritaire)
- Type (avec badge coloré)
- Montant brut
- Montant net
- Statut (Validé, En cours, Refusé)

**Filtres disponibles** :
- **Tout** : Affiche toutes les opérations
- **Versement** : Uniquement les versements
- **Arbitrage** : Uniquement les arbitrages
- **Frais** : Uniquement les frais de gestion

## 🔐 Authentification

Authentification simple par mot de passe :
- Mot de passe par défaut : `maline2025`
- Stocké en localStorage (développement uniquement)

⚠️ **Pour la production** :
- Utilisez Netlify Identity
- Ou implémentez JWT avec le backend
- Ou intégrez un provider OAuth (Google, GitHub)

## 🌐 Déploiement

### Netlify (Recommandé)

1. **Connecter le repo GitHub** :
   - Se connecter à Netlify
   - New site from Git → GitHub → Sélectionner `freeze0808/Finovo`

2. **Configuration de build** :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Node version** : 18

3. **Variables d'environnement** :
   - `VITE_API_URL` = `https://finovo-back.onrender.com/api`

4. **Déploiement** :
   - Chaque push sur `master` déclenche un build automatique
   - Build time : ~2-3 minutes
   - URL : https://myfinovo.netlify.app

### Build Local

```bash
# Créer le build de production
npm run build

# Le dossier dist/ contient les fichiers statiques
# Servir avec n'importe quel serveur HTTP
npx serve dist
```

## 🧪 Développement

### Scripts disponibles

```bash
# Serveur de développement avec hot reload
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linter (si configuré)
npm run lint
```

### Ajout d'un nouveau composant

1. Créer le fichier dans `src/components/`
2. Importer dans le composant parent
3. Ajouter les styles dans `styles.css` si nécessaire

Exemple :

```jsx
// src/components/MonComposant.jsx
import React from "react";

export default function MonComposant({ data }) {
  return (
    <div className="card">
      <h3>Mon Composant</h3>
      <p>{data}</p>
    </div>
  );
}
```

### Appel API

Utilisez les fonctions dans `api.js` :

```javascript
import { uploadFile, getHistory } from './api';

// Upload
const result = await uploadFile(file);

// Historique
const history = await getHistory();
```

## 📱 Responsive

L'interface s'adapte automatiquement :

- **Desktop (> 1200px)** : Grid 4 colonnes pour les KPIs
- **Tablet (768-1200px)** : Grid 2 colonnes
- **Mobile (< 768px)** : Stack vertical, scroll horizontal pour tableaux

## 🎯 Fonctionnalités à Venir

- [ ] Mode sombre (dark mode)
- [ ] Export des graphiques en PNG
- [ ] Comparaison vs indices de référence
- [ ] Notifications push
- [ ] Multi-utilisateurs
- [ ] Gestion de plusieurs contrats
- [ ] Prédictions basées sur l'historique
- [ ] Rapports mensuels automatiques

## 🐛 Debugging

### L'API ne répond pas

Vérifiez :
1. Le backend est démarré : `python backend/app.py`
2. La variable `VITE_API_URL` est correcte
3. Le backend est accessible : `curl http://localhost:5000/api/history`

### Données non affichées

Vérifiez :
1. La console du navigateur pour les erreurs
2. Le format des données retournées par l'API
3. Que l'historique n'est pas vide : `curl http://localhost:5000/api/history`

### Styles cassés

1. Vider le cache : Ctrl+Shift+R
2. Vérifier que `styles.css` est bien importé dans `App.jsx`
3. Inspecter l'élément dans les DevTools

## 📞 Support

- **Documentation backend** : Voir `backend/README.md`
- **Guide de démarrage** : Voir `GUIDE_DEMARRAGE.md`
- **Structure des données** : Voir `backend/README_DATA.md`

## 🏗️ Stack Technique

- **Framework** : React 18
- **Build tool** : Vite 5
- **Charts** : Chart.js + react-chartjs-2
- **Styling** : CSS pur (pas de framework)
- **State** : React Hooks (useState, useEffect)
- **HTTP** : Fetch API
- **Formatage** : Intl.NumberFormat, toLocaleString

---

**Interface moderne et intuitive pour votre patrimoine financier 💎**
