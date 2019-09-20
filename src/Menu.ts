import QuestionUtils from "./QuestionUtils";

interface Choix {
    choix:string;

}
export class Menu{

    constructor(public listeItemMenu:MenuItem[],public questionUtils:QuestionUtils){

    }

    afficherMenu(){

        const chaine = this.listeItemMenu.map((item,index) => `${index}. ${item.libelle}`).join("\n");
        console.log(chaine);
    }

    choisirMenu(){
        this.questionUtils.question("choix:","choix",{})
            .then(reponse =>{
                if(reponse.choix < this.listeItemMenu.length && reponse.choix >= 0){
                    this.listeItemMenu[reponse.choix].fonction();
                }
                else{
                    console.log("choix non reconnu");
                    this.choisirMenu();
                }
            })
    }

}

export class MenuItem{
    constructor(public libelle:string,public fonction:Function){

    }
}

