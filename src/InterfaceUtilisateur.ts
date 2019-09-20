import {Menu, MenuItem} from "./Menu";
import QuestionUtils from "./QuestionUtils";
import Service from "./service";
import {TypeModification} from "./TypeModification";
import Collegue from "./domain";
import { format } from 'date-fns'

export default class InterfaceUtilisateur {
     menu:Menu;

    constructor(public service:Service,public qU:QuestionUtils){
         this.menu = this.creerMenu(this.qU);
    }

    creerMenu(qu:QuestionUtils){
        const menu = [];
        menu.push(new MenuItem("Sortir.",this.qU.close.bind(this.qU)));
        menu.push(new MenuItem("Rechercher par nom.",this.rechercherParNom.bind(this)));
        menu.push(new MenuItem("Creer un collegue.",this.creerCollegue.bind(this)));
        menu.push(new MenuItem("Modifier email.",this.modifier(TypeModification.email).bind(this)));
        menu.push(new MenuItem("Modifier photo.",this.modifier(TypeModification.photoUrl).bind(this)));
        return new Menu(menu,qu);
    }

    afficherMenu(){
        this.menu.afficherMenu();
        this.menu.choisirMenu();
    }

//connecte l’utilisateur
    demarrerInterface() {

        console.log("connexion");
        console.log("id: user | mdp: user");
        console.log("id: admin | mdp: admin");
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
        console.log("nom disponible: user,admin")
        this.qU.question("nom:", "nom", {})
            .then(collegue => this.service.recupererParNom(collegue.nom))
            .then((listeCollegue) => this.affichageCollegue(listeCollegue));
    }

// affiche un collegue avec la forme nom prenom dateDeNaissance
    affichageCollegue(collegues:Collegue[]) {
        if (collegues.length === 0) {
            console.log("Aucun collegues trouvés avec ce nom.\n");
            this.afficherMenu();
        } else {
            collegues.forEach(collegue => console.log(`nom: ${collegue.nom} | prenom: ${collegue.prenom} | ddn: ${format(collegue.ddn, 'dd/MM/yyyy')} | matricule: ${collegue.matricule} | Email: ${collegue.email} | Url de la photo: ${collegue.photoUrl}`));
            console.log();
            this.afficherMenu();
        }
    }

// creation d’un collegue
    creerCollegue() {

        console.log("droit admin necessaire");
        this.qU.question("nom:", "nom", {})
            .then(collegue => this.qU.question("prenom:", "prenom", collegue))
            .then(collegue=>  this.qU.question("email:", "email", collegue))
            .then(collegue => this.qU.question("ddn(yyyy-mm-dd):", "ddn", collegue))
            .then(collegue=> this.qU.question("photo:", "photo", collegue))
            .then(collegue =>  this.service.creerCollegue(new Collegue(collegue.nom, collegue.prenom,new Date(Date.parse(collegue.ddn)), collegue.email, collegue.photo)))
            .then(() => {
                console.log("creation réussi\n");
                this.afficherMenu();
            })
            .catch(() => {
                console.log("creation impossible\n");
                this.afficherMenu();
            });
    }

    modifier(typeModification:TypeModification) {

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


