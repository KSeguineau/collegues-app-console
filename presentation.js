// récupération du module `readline`
var readline = require('readline');
var service = require('./service');


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// affiche un collegue avec la forme nom prenom dateDeNaissance
function affichageCollegue(collegue){
    console.log(collegue.nom+" "+collegue.prenom+" "+collegue.ddn);
}

//connecte l’utilisateur
function start(){

    console.log("connexion");

    rl.question("identifiant:", (id)=>{
        rl.question("mot de passe:",  (mdp)=>{
           service.connexion(id,mdp,(err,res)=>{
                if(res.statusCode===200){
                   console.log("connexion reussi");
                   menu();
               }else {
                    console.log("connexion impossible");
                    start();
                }
           })
        });
    });



}

// affiche le menu
function menu() {
        console.log("1. Rechercher un collègue par nom");
        console.log("99. Sortir");

        rl.question("choix:", (saisie) => {
            switch (saisie) {
                case "1":
                    console.log("Recherche en cours du nom xxx.");
                    rl.question("nom:",(nom)=>service.recupererParNom(nom,affichageCollegue));
                    menu();
                    break;
                case "99":
                    rl.close();
                    break;
                default:
                    console.log("choix non reconnu.");
                    menu();
                    break;
            }

        });
}


exports.start = start;