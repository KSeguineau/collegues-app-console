const {Menu} = require("./Menu");
const {MenuItem} = require("./Menu");

class InterfaceUtilisateur {
    constructor(service,questionUtils){
         this.service = service;
         this.qU = questionUtils;
         this.menu = new Menu(this.creerMenu(),this.qU);
    }

    creerMenu(){
        const menu = [];
        menu.push(new MenuItem("Sortir.",this.qU.close.bind(this.qU)));
        menu.push(new MenuItem("Rechercher par nom.",this.rechercherParNom.bind(this)));
        menu.push(new MenuItem("Creer un collegue.",this.creerCollegue.bind(this)));
        menu.push(new MenuItem("Modifier email.",this.modifierEmail.bind(this)));
        menu.push(new MenuItem("Modifier photo.",this.modifierPhoto.bind(this)));
        return menu;
    }

    afficherMenu(){
        this.menu.afficherMenu();
        this.menu.choisirMenu();
    }

//connecte l’utilisateur
    demarrerInterface() {

        console.log("connexion");

        this.qU.question("identifiant:", "id", {})
            .then(objet =>this.qU.question("mot de passe:", "mdp", objet))
            .then(objet =>  this.service.connexion(objet.id, objet.mdp))
            .then(() => {
                console.log("connexion reussie.\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("connexion impossible.\n");
                this.demarrerInterface();
            });
    }


//affiche la liste des collegues qui on le nom demandé
    rechercherParNom() {
        this.qU.question("nom:", "nom", {})
            .then(objet => this.service.recupererParNom(objet.nom))
            .then((listeCollegue) => this.affichageCollegue(listeCollegue));
    }

// affiche un collegue avec la forme nom prenom dateDeNaissance
    affichageCollegue(collegues) {
        if (collegues.length === 0) {
            console.log("Aucun collegues trouvés avec ce nom.\n");
            this.afficherMenu();
        } else {
            collegues.forEach(collegue => console.log(`nom: ${collegue.nom} | prenom: ${collegue.prenom} | ddn: ${collegue.ddn} | matricule: ${collegue.matricule}`));
            console.log();
            this.afficherMenu();
        }
    }

// creation d’un collegue
    creerCollegue() {

        this.qU.question("nom:", "nom", {})
            .then(objet => this.qU.question("prenom:", "prenom", objet))
            .then(objet=>  this.qU.question("email:", "email", objet))
            .then(objet => this.qU.question("ddn(yyyy-mm-dd):", "ddn", objet))
            .then(objet=> this.qU.question("photo:", "photo", objet))
            .then(objet =>  this.service.creerCollegue(objet.nom, objet.prenom, objet.email, objet.ddn, objet.photo))
            .then(() => {
                console.log("creation réussi\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("creation impossible\n");
                this.afficherMenu();
            });
    }

// modification d’un email
    modifierEmail() {

        this.qU.question("matricule :", "matricule", {})
            .then(objet => this.qU.question("Email :", "email", objet))
            .then(objet =>  this.service.modifierEmail(objet.matricule, objet.email))
            .then(() => {
                console.log("modification reussi\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("modification impossible\n");
                this.afficherMenu();
            })
    }

//modification d’une photo
    modifierPhoto() {

        this.qU.question("matricule :", "matricule", {})
            .then(objet => this.qU.question("photo :", "photo", objet))
            .then(objet =>  this.service.modifierPhoto(objet.matricule, objet.photo))
            .then(() => {
                console.log("modification reussi\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("modification impossible\n");
                this.afficherMenu();
            })


    }
}

//================================================================================

//export
exports.InterfaceUtilisateur = InterfaceUtilisateur;

