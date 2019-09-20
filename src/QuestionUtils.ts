
import readline, {Interface} from 'readline';

//==================================================================

export default class QuestionUtils{
    rl:Interface;
    constructor(){
        // création d'un objet `rl` permettant de récupérer la saisie utilisateur
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    //TODO interface map<string,string>
    //questionne l’utilisateur et renvoie une promesse contenant objet avec pour attribut nomParam qui contient la répon
    question(chaine:string, nomParam:string, objet:any):Promise<any> {
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
