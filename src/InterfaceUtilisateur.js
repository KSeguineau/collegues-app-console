const {Menu} = require("./Menu");
const {MenuItem} = require("./Menu");

class InterfaceUtilisateur {
    constructor(service,questionUtils,gestionCollegue){
         this.service = service;
         this.qU = questionUtils;
        this.gestionCollegue = gestionCollegue;
         this.menu = this.creerMenu(this.qU);

    }

    //creer le menu
    creerMenu(questionUtils){
        const menu = [];
        menu.push(new MenuItem("Sortir.",this.qU.close.bind(this.qU),true));
        menu.push(new MenuItem("Rechercher par nom.",this.gestionCollegue.rechercherParNom.bind(this.gestionCollegue)));
        menu.push(new MenuItem("Creer un collegue.",this.gestionCollegue.creerCollegue.bind(this.gestionCollegue)));
        menu.push(new MenuItem("Modifier email.",this.gestionCollegue.modifier("email").bind(this.gestionCollegue)));
        menu.push(new MenuItem("Modifier photo.",this.gestionCollegue.modifier("photoUrl").bind(this.gestionCollegue)));
        return new Menu(menu,questionUtils);
    }




//connecte l’utilisateur
    demarrerInterface() {

        console.log("connexion");

        this.qU.question("identifiant:", "id", {})
            .then(infosConnexion =>this.qU.question("mot de passe:", "mdp", infosConnexion))
            .then(infosConnexion =>  this.service.connexion(infosConnexion.id, infosConnexion.mdp))
            .then(() => {
                console.log("connexion reussie.\n");
                this.demarrerMenu();
            })
            .catch(() => {
                console.log("connexion impossible.\n");
                this.demarrerInterface();
            });
    }

    demarrerMenu(){
        this.menu.afficherMenu();
    }

}

//================================================================================

//export
exports.InterfaceUtilisateur = InterfaceUtilisateur;

