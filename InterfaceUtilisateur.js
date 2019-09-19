// require
const readline = require('readline');
const {Service} = require('./service');




//===========================================================================

class InterfaceUtilisateur {
    constructor(){
        // création d'un objet `rl` permettant de récupérer la saisie utilisateur
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
         this.service = new Service();
    }

    //questionne l’utilisateur et renvoie une promesse contenant objet avec pour attribut nomParam qui contient la répon
    question(chaine, nomParam, objet) {
        return new Promise((resolve) => {
            this.rl.question(chaine, reponse => {
                objet[nomParam] = reponse;
                resolve(objet);
            });
        });
    }

//connecte l’utilisateur
    start() {

        console.log("connexion");

        this.question("identifiant:", "id", {})
            .then((objet) => {
                return this.question("mot de passe:", "mdp", objet)
            })
            .then((objet) => {
                return this.service.connexion(objet.id, objet.mdp);
            })
            .then(() => {
                console.log("connexion reussie.\n");
                this.menu();
            })
            .catch(() => {
                console.log("connexion impossible.\n");
                this.start();
            });
    }


// affiche le menu
    menu() {
        console.log("1. Rechercher un collègue par nom.");
        console.log("2. Creer un collegue.");
        console.log("3. modification email.");
        console.log("4. modification photo.");
        console.log("99. Sortir.\n");


        this.rl.question("choix:", (saisie) => {
            switch (saisie) {
                case "1":
                    this.rechercherParNom();
                    break;
                case "2":
                    this.creerCollegue();
                    break;
                case "3":
                    this.modifierEmail();
                    break;
                case "4":
                    this.modifierPhoto();
                    break;
                case "99":
                    this.rl.close();
                    break;
                default:
                    console.log("choix non reconnu.\n");
                    this.menu();
                    break;
            }

        });
    }

//affiche la liste des collegues qui on le nom demandé
    rechercherParNom() {
        this.question("nom:", "nom", {})
            .then((objet) => {
                return this.service.recupererParNom(objet.nom)
            })
            .then((listeCollegue) => this.affichageCollegue(listeCollegue));
    }

// affiche un collegue avec la forme nom prenom dateDeNaissance
    affichageCollegue(collegues) {
        if (collegues.length === 0) {
            console.log("Aucun collegues trouvés avec ce nom.\n");
            this.menu();
        } else {
            collegues.forEach(collegue => console.log(`${collegue.nom} ${collegue.prenom} ${collegue.ddn}`));
            console.log();
            this.menu();
        }
    }

// creation d’un collegue
    creerCollegue() {

        this.question("nom:", "nom", {})
            .then((objet) => {
                return this.question("prenom:", "prenom", objet);
            })
            .then((objet) => {
                return this.question("email:", "email", objet);
            })
            .then((objet) => {
                return this.question("ddn(yyyy-mm-dd):", "ddn", objet);
            })
            .then((objet) => {
                return this.question("photo:", "photo", objet);
            })
            .then((objet) => {
                return this.service.creerCollegue(objet.nom, objet.prenom, objet.email, objet.ddn, objet.photo);
            })
            .then(() => {
                console.log("creation réussi\n");
                this.menu();
            })
            .catch(() => {
                console.log("creation impossible\n");
                this.menu();
            });
    }

// modification d’un email
    modifierEmail() {

        this.question("matricule :", "matricule", {})
            .then((objet) => {
                return this.question("Email :", "email", objet);
            })
            .then((objet) => {
                return this.service.modifierEmail(objet.matricule, objet.email);
            })
            .then(() => {
                console.log("modification reussi\n");
                this.menu();
            })
            .catch(() => {
                console.log("modification impossible\n");
                this.menu();
            })
    }

//modification d’une photo
    modifierPhoto() {

        this.question("matricule :", "matricule", {})
            .then((objet) => {
                return this.question("photo :", "photo", objet);
            })
            .then((objet) => {
                return this.service.modifierPhoto(objet.matricule, objet.photo);
            })
            .then(() => {
                console.log("modification reussi\n");
                this.menu();
            })
            .catch(() => {
                console.log("modification impossible\n");
                this.menu();
            })


    }
}

//export
exports.InterfaceUtilisateur = InterfaceUtilisateur;

