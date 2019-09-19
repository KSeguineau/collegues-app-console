const {Menu} = require("./Menu");
const {MenuItem} = require("./Menu");

class InterfaceUtilisateur {
    constructor(service,questionUtils){
         this.service = service;
         this.qU = questionUtils;
         this.menu = this.creerMenu(this.qU);
    }

    creerMenu(questionUtils){
        const menu = [];
        menu.push(new MenuItem("Sortir.",this.qU.close.bind(this.qU)));
        menu.push(new MenuItem("Rechercher par nom.",this.rechercherParNom.bind(this)));
        menu.push(new MenuItem("Creer un collegue.",this.creerCollegue.bind(this)));
        menu.push(new MenuItem("Modifier email.",this.modifier("email").bind(this)));
        menu.push(new MenuItem("Modifier photo.",this.modifier("photoUrl").bind(this)));
        return new Menu(menu,questionUtils);
    }

    afficherMenu(){
        this.menu.afficherMenu();
        this.menu.choisirMenu();
    }

//connecte l’utilisateur
    demarrerInterface() {

        console.log("connexion");

        this.qU.question("identifiant:", "id", {})
            .then(infosConnexion =>this.qU.question("mot de passe:", "mdp", infosConnexion))
            .then(infosConnexion =>  this.service.connexion(infosConnexion.id, infosConnexion.mdp))
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
            .then(collegue => this.service.recupererParNom(collegue.nom))
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
            .then(collegue => this.qU.question("prenom:", "prenom", collegue))
            .then(collegue=>  this.qU.question("email:", "email", collegue))
            .then(collegue => this.qU.question("ddn(yyyy-mm-dd):", "ddn", collegue))
            .then(collegue=> this.qU.question("photo:", "photo", collegue))
            .then(collegue =>  this.service.creerCollegue(collegue.nom, collegue.prenom, collegue.email, collegue.ddn, collegue.photo))
            .then(() => {
                console.log("creation réussi\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("creation impossible\n");
                this.afficherMenu();
            });
    }

    modifier(typeModification) {

      return ()=> this.qU.question("matricule :", "matricule", {})
            .then(modification => this.qU.question(`${typeModification} :`, typeModification, modification))
            .then(modification =>  this.service.modifierCollegue(modification.matricule, modification[typeModification],typeModification))
            .then(() => {
                console.log("modification reussi\n");
                this.afficherMenu();
            })
            .catch((err) => {
                console.log("modification impossible\n");
                console.log(err);
                this.afficherMenu();
            })
    }
}

//================================================================================

//export
exports.InterfaceUtilisateur = InterfaceUtilisateur;

