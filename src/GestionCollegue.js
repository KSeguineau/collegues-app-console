class GestionCollegue{
//TODO gestion promese
    constructor(service,questionUtils) {
        this.service = service;
        this.qU = questionUtils;
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
        } else {
            collegues.forEach(collegue => console.log(`nom: ${collegue.nom} | prenom: ${collegue.prenom} | ddn: ${collegue.ddn} | matricule: ${collegue.matricule}`));
            console.log();
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
            })
            .catch(() => {
                console.log("creation impossible\n");
            });
    }

    modifier(typeModification) {

        return ()=> this.qU.question("matricule :", "matricule", {})
            .then(modification => this.qU.question(`${typeModification} :`, typeModification, modification))
            .then(modification =>  this.service.modifierCollegue(modification.matricule, modification[typeModification],typeModification))
            .then(() => {
                console.log("modification reussi\n");
            })
            .catch((err) => {
                console.log("modification impossible\n");
                console.log(err);
            })
    }

}

exports.GestionCollegue = GestionCollegue;