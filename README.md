# Onyxia Gestion

Application web  de démonstration pour présenter un système de gestion financière sur mesure : clients, devis, factures, dépenses, paiements, documents & IA, rapports et paramètres entreprise.

## Fichiers

- `index.html` : page d’accueil + inscription/connexion locale + page de comptabiliter 
- `style.css` : design de la page d’accueil.
- `app.js` : logique d’inscription/connexion locale.


## Fonctionnalités incluses

- Page d’accueil moderne et responsive.
- Connexion / inscription de démonstration via `localStorage`.
- Tableau de bord avec données de démonstration.
- Gestion des clients et fournisseurs.
- Création, modification, suppression et export CSV des devis.
- Transformation d’un devis en facture.
- Création, modification, suppression, paiement et export CSV des factures.
- Génération d’un document imprimable / PDF pour les factures et devis.
- Gestion des dépenses et paiements.
- Module `Documents & IA` avec dépôt de fichiers et analyse simulée.
- Rapports internes et export JSON de sauvegarde.
- Paramètres entreprise : BRN, VAT number, banque, devise, mentions légales.

## Utilisation

Ouvrir `index.html` dans un navigateur moderne, puis créer un compte local ou cliquer sur “Voir l’espace de gestion”.

Les données sont stockées uniquement dans le navigateur. Cette version est une démonstration locale et ne remplace pas une validation comptable légale.


## Mise à jour demandée

- **Nouveau compte = espace vide** : quand un utilisateur crée un compte, les clients, devis, factures, dépenses, paiements et documents démarrent à zéro.
- **Tableau de bord réactif** : les KPI, la trésorerie, la TVA estimée, les priorités, l'activité récente et le graphique 12 mois se recalculent automatiquement à partir des données saisies.
- **Mode démo conservé** : si l'application est ouverte sans compte, elle affiche encore des données de démonstration. Depuis l'espace de gestion, le bouton “Recharger la démo” permet de remplir l'application avec des exemples.
