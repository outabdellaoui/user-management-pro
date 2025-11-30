User Management System

Un mini-projet JavaScript permettant de gérer des utilisateurs (CRUD) avec un stockage local, une interface simple et une architecture modulaire.

📁 Structure du projet
C:.
|   cd
|   data.json
|   index.html
|   schema.txt
|   styles.css
|
└───src
    |   main.js
    |
    ├───models
    │       User.js
    │       UserManager.js
    │
    ├───services
    │       api.js
    │       storage.js
    │
    ├───ui
    │       Toast.js
    │       UIManager.js
    │
    └───utils
            errors.js

📌 Description

Ce projet implémente un système de gestion des utilisateurs comprenant :

Ajout d’un utilisateur

Suppression

Mise à jour

Affichage dynamique

Validation des données

Notifications Toast

Stockage local (LocalStorage ou JSON file selon configuration)

L’objectif est de fournir une architecture propre, modulaire et facile à étendre.

📦 Technologies utilisées

HTML5

CSS3

JavaScript Vanilla (ES6 Modules)

LocalStorage / JSON Data

Architecture MVC simplifiée

🔍 Schéma d’un utilisateur
{
  "id": "integer",    // ID unique, positif
  "name": "string",   // min 2 caractères
  "email": "string",  // format email valide
  "age": "integer"    // entre 1 et 120
}

🧱 Architecture des modules
1. Models

User.js : représentation d’un utilisateur (validation incluse).

UserManager.js : gestion de la liste des utilisateurs (CRUD).

2. Services

storage.js : interaction avec LocalStorage ou data.json.

api.js : couche simulant des appels API.

3. UI

UIManager.js : gestion de l’affichage (DOM).

Toast.js : affichage des notifications.

4. Utils

errors.js : classes et messages d'erreurs personnalisés.

5. main.js

Point d’entrée, initialise la logique et connecte tous les modules.

🚀 Fonctionnalités

✔ Ajouter un utilisateur
✔ Modifier un utilisateur
✔ Supprimer un utilisateur
✔ Rechercher et lister les utilisateurs
✔ Validation stricte du schéma
✔ Notifications Toast
✔ Persistance locale des données

▶️ Comment exécuter ?
Option 1 : Ouvrir directement dans le navigateur

Ouvre simplement :

index.html

Option 2 : Servir le projet avec un serveur local

Exemple :

npx serve .

🛠️ Améliorations futures possibles

Intégration d’une vraie API backend (Node/Express).

Authentification utilisateur.

Pagination et filtres avancés.

Tests Jest pour les modèles et services.
