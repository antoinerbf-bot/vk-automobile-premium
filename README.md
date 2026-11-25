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
- `scripts/smoke-test.cjs` — contrôle des pages, scripts, configuration et annonces publiées avant le build
- `scripts/generate-sitemap.cjs` — sitemap multilingue et robots.txt générés au build
- `package.json` — `npm test` pour les contrôles et `npm run build` pour les contrôles + sitemap
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

Quand le stock local est vide, l’accueil et la page Stock proposent un accès direct au stock actuellement publié sur le [site officiel VK Automobile](https://vkautomobile.com/vehicles). Le stock officiel consulté affiche des annonces actives ; le site de ce dépôt ne les copie pas automatiquement. Le site ne copie pas automatiquement ces annonces dans son propre stock : les véhicules, photos, prix et disponibilités doivent être importés/validés par le propriétaire avant d’être publiés ici.

Pour modifier le stock :
1. Ouvrir `admin-stock.html` sur le site déployé ou via un serveur local (un double-clic `file://` peut bloquer le chargement initial du JSON).
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

À vérifier par le propriétaire avant mise en production :
- Les mentions légales affichent maintenant les informations publiques retrouvées pour VK AUTOMOBILE SRL : BCE/TVA BE 0666.942.997, siège à Dison et établissement à Lontzen. Vérifier ces éléments dans le Public Search BCE avant validation finale.
- Les horaires affichés reprennent ceux publiés sur le site officiel actuel : lundi–vendredi 9h–18h, samedi 9h–17h, dimanche sur rendez-vous.
- **Vérifier l’adresse email de réception** : ce projet utilise `vkautimomobile@hotmail.com` (adresse transmise dans le brief), tandis qu’un annuaire public affiche `vkautomobile@hotmail.com`. Confirmer l’adresse qui reçoit réellement les demandes.
- Conditions réelles de garantie, financement et prestations.
- Stock réel, prix, kilométrage, spécifications, disponibilité et photos autorisées.
- Politique de confidentialité et mentions légales définitives, idéalement validées par un professionnel.
- Domaine final et propriété Google Business Profile pour le SEO local.

## Notes

Les photos d’ambiance sont des images externes illustratives. Les textes de services restent généraux et ne promettent pas de garantie, financement ou prestation non confirmés.


## Évolutions éditoriales et conversion — 25 novembre 2026

- Blog intégré à l’accueil et au menu, avec trois guides éditoriaux en FR/NL/DE : achat d’occasion, préparation d’une reprise, checklist de visite et d’essai.
- URLs propres /blog et /blog/<slug>, réécrites vers les templates statiques Vercel.
- Articles avec données structurées Schema.org Article, page blog CollectionPage/ItemList, hreflang et sitemap multilingue.
- Barre de conversion persistante sur toutes les pages : appel téléphonique direct et WhatsApp avec message prérempli, adaptée aux écrans mobiles et à la zone de sécurité iOS.
- Visuels éditoriaux automobiles illustratifs ; ils ne représentent pas des annonces du stock.

## État de la mise en ligne

Les dernières modifications sont poussées sur la branche GitHub main. La connexion Vercel n’est pas accessible depuis l’intégration actuelle : aucun projet VK Automobile n’est visible dans l’espace Vercel connecté et les tentatives de création/déploiement ont été refusées par Vercel avec une erreur 403 (permission de déploiement production). La mise en ligne automatique n’est donc pas confirmée.

Pour une publication durable et automatique, le dépôt doit être relié dans Vercel à un projet autorisé, avec la branche main comme branche de production. Cette intégration Git déclenchera les déploiements à chaque push, sans demander une autorisation temporaire pour chaque changement. Les domaines personnalisés doivent être associés au projet Vercel réellement utilisé.

## Contenu du stock

Le site officiel VK Automobile affiche son inventaire actuel à l’adresse https://vkautomobile.com/vehicles. Le fichier data/vehicles.json du présent projet reste vide tant que les annonces, les prix, les disponibilités et les photos exactes ne sont pas importés/confirmés. Le bouton de stock renvoie vers l’inventaire officiel afin d’éviter de présenter des véhicules vendus ou des photos génériques comme des annonces réelles.
