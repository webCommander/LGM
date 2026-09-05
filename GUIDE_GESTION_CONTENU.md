# Guide de gestion du blog Les Grandes Marches

Ce guide explique comment ajouter des articles, des images, des sections et des liens dans le menu sans connaissances en développement.

## La méthode la plus simple : l'interface d'administration

Le site dispose d'une interface d'administration en ligne (Sveltia CMS), accessible à l'adresse **`/admin/`** du site (par exemple `https://webcommander.github.io/LGM/admin/`). C'est la méthode recommandée pour écrire des articles :

1. Ouvrir la page `/admin/` dans le navigateur.
2. Se connecter avec son compte GitHub (une seule fois, la session est mémorisée).
3. Ouvrir **Articles**, puis cliquer sur **Nouvel article**.
4. Remplir le titre et la date, choisir la catégorie, puis écrire le texte.
5. Les images s'ajoutent par glisser-déposer directement dans le texte.
6. Cliquer sur **Enregistrer** : l'article est publié et le site se met à jour tout seul en une ou deux minutes.

Aucune connaissance de Git ni du Markdown n'est nécessaire. La case « Brouillon » permet d'enregistrer un article sans le faire apparaître sur le site.

Les sections suivantes décrivent l'ancienne méthode manuelle (Typora + GitHub Desktop), qui reste utilisable.

## Ajouter une catégorie depuis l'administration

Les catégories correspondent aux voyages affichés dans le menu déroulant du site. Elles se gèrent directement depuis `/admin/` :

1. Ouvrir **Catégories** dans le menu de Sveltia CMS.
2. Cliquer sur **Nouvelle catégorie**.
3. Saisir son titre, par exemple `GR4`.
4. Choisir son ordre dans le menu : les nombres les plus petits apparaissent en premier.
5. Ajouter éventuellement une description, puis cliquer sur **Enregistrer**.

La nouvelle catégorie apparaît automatiquement dans le menu **Voyages** du site. Pour la masquer temporairement sans la supprimer, activer **Masquer dans le menu**.

Pour écrire dans cette rubrique, ouvrir ensuite **Articles**, créer un article et la sélectionner dans le champ **Catégorie**. Une catégorie doit être créée avant de pouvoir être sélectionnée dans un article.

## Outils recommandés

Utiliser deux logiciels séparés :

1. **Typora** pour écrire les articles Markdown avec une présentation proche d'un traitement de texte : <https://typora.io/>
2. **GitHub Desktop** pour télécharger les dernières modifications et publier les nouvelles : <https://desktop.github.com/>

Typora est l'éditeur conseillé pour ce blog. Il affiche directement les titres, paragraphes et listes sans l'interface complexe d'un logiciel de développement.

### Peut-on utiliser OpenOffice ou LibreOffice ?

LibreOffice Writer récent peut ouvrir et enregistrer des fichiers Markdown `.md`. Ce n'est cependant pas l'outil recommandé pour ce blog :

- il ne gère pas Git ni la publication sur GitHub ;
- il risque de modifier la structure technique placée au début des articles ;
- la gestion des noms et des emplacements d'images reste manuelle.

Apache OpenOffice ne convient pas à ce fonctionnement. Si LibreOffice est utilisé malgré tout, toujours enregistrer le fichier au format **Markdown `.md`**, jamais en `.odt` ou `.docx`.

## Les dossiers importants

| Élément | Emplacement |
|---|---|
| Catégories et menu des voyages | `content/blog/*/_index.md` |
| Configuration de l'accueil | `content/_index.md` |
| Articles Paris–Ispahan | `content/blog/paris-ispahan/` |
| Articles Tour des Zagoria | `content/blog/tour-des-zagoria/` |
| Autres articles | `content/blog/autre/` |
| Images Paris–Ispahan | `static/images/uploads/paris-ispahan/` |
| Image du bandeau | `static/images/hero.jpg` |

Ne pas modifier les dossiers suivants :

- `public/` : il est généré automatiquement ;
- `themes/` : il contient le thème Ananke ;
- `layouts/` et `assets/` : ils gèrent la présentation du site.

## Avant chaque modification

1. Ouvrir **GitHub Desktop**.
2. Sélectionner le dépôt `LGM`.
3. Cliquer sur **Fetch origin**.
4. S'il propose ensuite **Pull origin**, cliquer dessus.
5. Attendre la fin de la synchronisation avant de modifier les fichiers.

Cette étape évite de travailler sur une ancienne version du blog.

## Ajouter un article

### 1. Choisir sa catégorie

Créer le fichier dans le dossier de la catégorie correspondante, sous `content/blog/`. Par exemple :

- Paris–Ispahan : `content/blog/paris-ispahan/`
- GR4 : `content/blog/gr4/`
- Sicile : `content/blog/sicile/`

Le nom du dossier est également visible dans l'adresse de la catégorie sur le site.

### 2. Nommer le fichier

Utiliser cette forme :

```text
AAAA-MM-JJ-titre-court.md
```

Exemple :

```text
2026-07-13-depart-pour-le-jura.md
```

Dans le nom du fichier :

- utiliser uniquement des minuscules ;
- remplacer les espaces par des tirets `-` ;
- ne pas utiliser d'accent, d'apostrophe ou de caractère spécial.

### 3. Copier ce modèle

```markdown
---
title: "Départ pour le Jura"
date: 2026-07-13
draft: false
category: autre
---

Texte du nouvel article.

Un nouveau paragraphe commence après une ligne vide.
```

Adapter :

- `title` : titre affiché sur le site ;
- `date` : date au format `année-mois-jour` ;
- `category` : nom technique de la catégorie, identique au nom de son dossier ;
- le texte placé après le second `---`.

Ne pas supprimer les deux lignes `---` qui encadrent les informations de l'article.

### Brouillon ou publication

Pour publier :

```toml
draft: false
```

Pour conserver l'article comme brouillon :

```toml
draft: true
```

Un brouillon n'est pas publié sur le site.

## Ajouter des images à un article

La galerie d'un article est définie par la liste `photos` placée en tête de l'article. Dans l'interface `/admin/`, il suffit de glisser-déposer les photos dans le champ « Photos de l'article » — tout le reste est automatique.

En modification manuelle, ajouter la liste dans l'en-tête de l'article :

```markdown
---
title: "Départ pour le Jura"
date: 2026-07-13
draft: false
photos:
  - /images/uploads/ma-photo-1.jpg
  - /images/uploads/ma-photo-2.jpg
---
```

Règles :

- les fichiers image sont rangés dans `static/images/uploads/` (les anciennes photos Paris–Ispahan sont dans `static/images/uploads/paris-ispahan/`) ;
- la première photo de la liste sert de vignette sur l'accueil et les pages de liste ;
- toutes les photos s'affichent en galerie cliquable en haut de l'article, dans l'ordre de la liste ;
- pas de limite de nombre, et le nom des fichiers est libre.

Un fichier `.gpx` peut aussi être associé à l'article (champ « Trace GPX de l'étape » dans `/admin/`, ou ligne `gpx: /gpx/mon-fichier.gpx` dans l'en-tête, le fichier étant placé dans `static/gpx/`) : la carte du parcours s'affiche alors automatiquement dans l'article.

## Créer une nouvelle catégorie manuellement

La création depuis **Catégories** dans `/admin/` est recommandée. La procédure ci-dessous est son équivalent manuel.

Exemple : créer une section appelée « Chemin de Stevenson ».

### 1. Créer le dossier

Dans `content/blog/`, créer :

```text
chemin-stevenson/
```

Le nom du dossier doit être en minuscules, sans accent, avec des tirets.

### 2. Créer la page de section

Dans ce nouveau dossier, créer un fichier nommé obligatoirement :

```text
_index.md
```

Contenu :

```markdown
---
title: "Chemin de Stevenson"
weight: 7
---

Les récits de notre marche sur le chemin de Stevenson.
```

### 3. Ajouter les articles

Créer ensuite les fichiers d'articles dans :

```text
content/blog/chemin-stevenson/
```

Exemple :

```text
content/blog/chemin-stevenson/2026-07-13-le-depart.md
```

## Modifier le menu des voyages

Le menu déroulant **Voyages** est généré automatiquement depuis les catégories. Il n'est plus nécessaire de modifier `config.toml`.

Dans `/admin/`, ouvrir **Catégories**, puis sélectionner une catégorie :

- modifier **Titre** pour la renommer ;
- modifier **Ordre dans le menu** pour la déplacer ;
- activer **Masquer dans le menu** pour la retirer temporairement du menu sans supprimer ses articles.

## Gérer la page d'accueil

### Changer le nom du blog

Dans `config.toml`, modifier :

```toml
title = "Les Grandes Marches"
```

Ce titre est utilisé dans la navigation, l'accueil et le titre des pages du navigateur.

### Changer l'image du bandeau

Remplacer le fichier :

```text
static/images/hero.jpg
```

Conserver exactement le même nom. Utiliser une image horizontale de bonne qualité.

Le bandeau possède un fonctionnement particulier : le premier mouvement de défilement parcourt l'image, puis le reste du site défile normalement.

### Changer les textes d'introduction

Les textes visibles « Carnet de voyage » et « Récits, étapes et images d'une longue marche » sont actuellement définis dans `layouts/index.html`.

Ce fichier contrôle aussi le bloc « Derniers articles ». Il est préférable de demander une modification accompagnée plutôt que de l'éditer directement.

Les trois derniers articles sont sélectionnés automatiquement selon leur date. Il n'est pas nécessaire de les ajouter manuellement à l'accueil.

### Modifier la description de la page d'accueil

Le fichier `content/_index.md` contient la configuration générale de l'accueil et le chemin du bandeau :

```markdown
---
title: "Accueil"
hero: "/images/hero.jpg"
menu: main
---
```

Ne pas modifier `hero` sauf si l'image du bandeau change également de nom ou de dossier.

## Publier les modifications

Après avoir ajouté ou modifié les fichiers :

1. Ouvrir GitHub Desktop.
2. Vérifier la liste des fichiers modifiés dans la colonne de gauche.
3. Vérifier qu'aucun fichier du dossier `public/` n'apparaît.
4. Saisir un résumé, par exemple `Ajout de l'article Départ pour le Jura`.
5. Cliquer sur **Commit to main**.
6. Cliquer sur **Push origin**.
7. Attendre le déploiement automatique GitHub Pages (onglet *Actions* du dépôt).

Le site en ligne est généralement actualisé quelques minutes après le `Push origin`.

## Corriger une erreur simple

Si une page n'apparaît pas :

1. vérifier que `draft` vaut `false` ;
2. vérifier les deux blocs `---` au début du fichier ;
3. vérifier le format de la date `AAAA-MM-JJ` ;
4. vérifier que l'article se trouve dans le bon dossier ;
5. vérifier que les modifications ont été envoyées avec **Push origin**.

Si GitHub Desktop signale un conflit, ne pas choisir une correction au hasard. Arrêter la publication et demander de l'aide.

Si une image n'apparaît pas :

1. vérifier qu'elle est au format `.jpg` ;
2. vérifier que son nom contient la date exacte de l'article ;
3. vérifier que la première image finit par `_1.jpg` ;
4. vérifier qu'elle se trouve dans `static/images/uploads/paris-ispahan/`.
