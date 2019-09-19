// require
const readline = require('readline');

//==================================================================

class QuestionUtils{
    constructor(){
        // création d'un objet `rl` permettant de récupérer la saisie utilisateur
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
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

    //ferme le readline
    close(){
        this.rl.close();
    }
}

//===================================================================
//export
exports.QuestionUtils = QuestionUtils;