# Les Grandes Marches (LGM)

Blog de récits de voyage à pied (« Les Grandes Marches ») : Paris–Ispahan, Tour des Zagoria, etc.

Site statique généré avec [Hugo](https://gohugo.io/), basé sur le thème [Ananke](https://github.com/theNewDynamic/gohugo-theme-ananke) (submodule Git), en français.

> 📝 Pour ajouter des articles et des images, voir [GUIDE_GESTION_CONTENU.md](GUIDE_GESTION_CONTENU.md).

## Stack

| Élément | Détail |
|---|---|
| Générateur | Hugo (v0.149.1 en dev via Docker, v0.128.0 en CI) |
| Thème | `themes/gohugo-theme-ananke23` (submodule Git) |
| Dev local | Docker Compose (`ghcr.io/gohugoio/hugo`) |
| Déploiement | GitHub Pages via GitHub Actions ([.github/workflows/hugo.yml](.github/workflows/hugo.yml)) |
| Config alternative | [netlify.toml](netlify.toml) (build Netlify, non utilisé si Pages actif) |

## Démarrage rapide

```bash
# Cloner avec le thème (submodule)
git clone --recurse-submodules <url-du-depot>
cd LGM

# Lancer le serveur de dev (avec Docker, recommandé)
docker compose up
```

Le site est servi sur <http://localhost:1313/> avec rechargement automatique. Le rendu se fait en mémoire (`--renderToMemory`), rien n'est écrit dans `public/`.

Sans Docker, avec Hugo installé localement :

```bash
hugo server
```

Si le thème est vide après un clone classique :

```bash
git submodule update --init --recursive
```

## Structure du projet

```
├── config.toml               # Config Hugo : titre, langue, menus, permaliens
├── content/
│   ├── _index.md             # Page d'accueil
│   └── blog/
│       ├── paris-ispahan/    # Articles Paris–Ispahan (2019)
│       ├── tour-des-zagoria/ # Articles Tour des Zagoria
│       └── autre/            # Autres articles
├── static/
│   └── images/               # Images (hero.jpg, paris-ispahan/, …)
├── layouts/                  # Surcharges du thème (index, single, list, partials)
├── assets/css/custom.css     # CSS personnalisé
├── themes/gohugo-theme-ananke23/  # Thème Ananke (submodule — ne pas modifier)
├── public/                   # Sortie de build (généré — ne pas modifier)
├── docker-compose.yml        # Serveur Hugo de dev
└── parisispahan.txt          # Export de l'ancien blog (source de la migration)
```

Les articles suivent la convention de nommage `AAAA-MM-JJ-titre-court.md` avec un front matter TOML/YAML (voir le guide de contenu). Les permaliens des posts sont de la forme `/posts/:section/:slug/`.

## Build

```bash
hugo --gc --minify        # équivalent : npm run build
```

La sortie est générée dans `public/`.

## Déploiement

Le déploiement est automatique : tout push sur `main` déclenche le workflow GitHub Actions qui build le site (submodules inclus) et le publie sur GitHub Pages. Le workflow peut aussi être lancé manuellement depuis l'onglet *Actions*.

Un [netlify.toml](netlify.toml) est également présent si le site devait être hébergé sur Netlify (`hugo --gc --minify`, publication de `public/`).

## Ajouter du contenu

Voir [GUIDE_GESTION_CONTENU.md](GUIDE_GESTION_CONTENU.md) — il couvre le nommage des fichiers, le front matter, les images et le workflow de publication avec GitHub Desktop.

En résumé pour un dev :

1. Créer `content/blog/<section>/AAAA-MM-JJ-titre.md` avec son front matter.
2. Déposer les images dans `static/images/<section>/`.
3. Vérifier le rendu en local (`docker compose up`).
4. Commit + push sur `main` → déploiement automatique.

Pour ajouter une section au menu, éditer le bloc `[menu]` de [config.toml](config.toml) et créer le dossier `content/blog/<section>/` avec un `_index.md`.
