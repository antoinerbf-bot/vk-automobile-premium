# VK Automobile — site premium multipage

Site statique responsive pour VK Automobile, Rue Mitoyenne 356, 4710 Lontzen, Belgique.

## Architecture

- `index.html` — accueil
- `stock.html` — stock avec filtres (recherche, marque, carburant, boîte, prix)
- `vehicle.html?id=ID` — fiche dynamique à partir de `data/vehicles.json`
- `reprise.html` — demande de reprise
- `services.html` — services
- `contact.html` — coordonnées, carte et formulaire
- `mentions-legales.html` — informations légales / confidentialité à compléter
- `admin-stock.html` — outil local d’édition du stock (import/export JSON)
- `assets/site.css` — styles responsive
- `assets/app.js` — rendu des pages, FR/NL/DE, filtres, formulaires et données SEO
- `data/vehicles.json` — source structurée du stock
- `vercel.json` — redirections propres et cache des ressources
- `scripts/generate-sitemap.cjs` — sitemap multilingue et robots.txt générés au build
- `package.json` — commande de build sans dépendance
- `robots.txt` — règles d’indexation

## Déploiement Vercel

1. Importer ce dépôt GitHub dans Vercel.
2. Framework Preset : **Other**.
3. Build Command : `npm run build` (génère automatiquement le sitemap et robots.txt avec le domaine Vercel).
4. Output Directory : `.`.
5. Déployer.

Le site ne nécessite aucune compilation front-end. La commande npm de build sert uniquement à générer le sitemap et les règles robots à partir du domaine Vercel. Le domaine canonique et les URL hreflang sont générés à partir du domaine réellement utilisé, afin de ne pas figer un domaine Vercel non confirmé.

## Langues

Le site propose français, néerlandais et allemand via le sélecteur FR / NL / DE. La langue est conservée dans le navigateur et le paramètre `?lang=` permet de partager une page dans une langue donnée.

## Gestion du stock

Le site ne publie que les entrées de `data/vehicles.json` ayant `published: true`, un identifiant, une marque et un modèle. Le fichier est actuellement un tableau vide : **aucun véhicule fictif n’est présenté comme une annonce réelle**.

Pour modifier le stock :
1. Ouvrir `admin-stock.html` dans le navigateur (après déploiement ou localement).
2. Ajouter/modifier les véhicules ou importer le JSON existant.
3. Exporter `vehicles.json`.
4. Remplacer `data/vehicles.json` dans GitHub par le fichier exporté.
5. Vercel redéploiera le site après le commit.

L’outil admin est volontairement local et non sécurisé : il n’a ni authentification ni accès direct à GitHub. Ne pas le transformer en interface publique d’administration sans backend sécurisé.

## Formulaires

Les formulaires de contact et de reprise ouvrent un email prérempli vers `vkautimomobile@hotmail.com`. Aucun formulaire ne stocke les données sur le site et aucune base de leads n’est connectée. La carte Google Maps se charge uniquement après un clic explicite du visiteur. Pour recevoir les demandes en arrière-plan, connecter ensuite un service de formulaire ou un backend avec consentement et politique de confidentialité adaptée.

## SEO / informations à valider avant lancement

- Pages séparées, titres et descriptions meta, balises Open Graph.
- Canonical et hreflang dynamiques sur le domaine de déploiement.
- Données structurées Schema.org AutoDealer avec adresse, téléphone, email et Facebook.
- Redirections vers les URL courtes (`/stock`, `/reprise`, `/services`, `/contact`).
- Favicon, robots.txt, cache des ressources et images lazy-loaded dans les pages concernées.

À compléter par le propriétaire avant mise en production :
- Numéro BCE / TVA, forme juridique et identité exacte de l’exploitant.
- Horaires d’ouverture vérifiés (non inventés ici).
- Conditions réelles de garantie, financement et prestations.
- Stock réel, prix, kilométrage, spécifications, disponibilité et photos autorisées.
- Politique de confidentialité et mentions légales définitives, idéalement validées par un professionnel.
- Domaine final et propriété Google Business Profile pour le SEO local.

## Notes

Les photos d’ambiance sont des images externes illustratives. Les textes de services restent généraux et ne promettent pas de garantie, financement ou prestation non confirmés.
