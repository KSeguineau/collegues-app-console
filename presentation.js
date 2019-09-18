// require
var readline = require('readline');
var service = require('./service');

//export
exports.start = start;
exports.menu = menu;

//===========================================================================

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//connecte l’utilisateur
function start(){

    console.log("connexion");

    rl.question("identifiant:", (id)=>{
        rl.question("mot de passe:",  (mdp)=>{
            service.connexion(id,mdp,(err,res)=>{
                if(res.statusCode===200){
                    console.log("connexion reussi\n");
                    menu();
                }else {
                    console.log("connexion impossible\n");
                    start();
                }
            })
        });
    });



}

// affiche le menu
function menu() {
    console.log("1. Rechercher un collègue par nom");
    console.log("2. Creer un collegue.");
    console.log("3. modification email");
    console.log("4. modification photo");
    console.log("99. Sortir\n");


    rl.question("choix:", (saisie) => {
        switch (saisie) {
            case "1":
                rl.question("nom:",(nom)=>service.recupererParNom(nom,affichageCollegue));
                break;
            case "2":
                creerCollegue();
                break;
            case "3":
                modifierEmail();
                break;
            case "4":
                modifierPhoto();
                break;
            case "99":
                rl.close();
                break;
            default:
                console.log("choix non reconnu.\n");
                menu();
                break;
        }

    });
}


// affiche un collegue avec la forme nom prenom dateDeNaissance
function affichageCollegue(collegues){
    if(collegues.length===0){
        console.log("Aucun collegues trouvés avec ce nom.\n");
        menu();
    }else {
        collegues.forEach(collegue => console.log(collegue.nom + " " + collegue.prenom + " " + collegue.ddn));
        console.log();
        menu();
    }
}

// creation d’un collegue
function creerCollegue() {

    rl.question("nom :",nom=> {
        rl.question("prenom :", prenom => {
            rl.question("email :", email => {
                rl.question("ddn (yyyy-mm--dd) :", ddn => {
                    rl.question("photo :", photo => {
                        service.creerCollegue(nom, prenom, email, ddn, photo, (err, res,body) => {
                            if (res.statusCode === 200) {
                                console.log("creation reussi\n");
                                menu();
                            } else {
                                console.log("creation impossible\n");
                                menu();
                            }
                        })
                    })
                })
            })
        })
    })
}

// modification d’un email
function modifierEmail() {
    rl.question("matricule :",matricule=>{
        rl.question("Email :", email=>{
        service.modifierEmail(matricule,email,(err, res,body) => {
            if (res.statusCode === 200) {
                console.log("modification reussi\n");
                menu();
            } else {
                console.log("modification impossible\n");
                menu();
            }
            })
        })
    })

}

//modification d’une photo
function modifierPhoto() {
    rl.question("matricule :",matricule=>{
        rl.question("photo :", photo=>{
            service.modifierPhoto(matricule,photo,(err, res,body) => {
                if (res.statusCode === 200) {
                    console.log("modification reussi\n");
                    menu();
                } else {
                    console.log("modification impossible\n");
                    menu();
                }
            })
        })
    })

}




