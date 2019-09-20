class Menu{

    constructor(listeItemMenu,QuestionUtils){
        this.listeItemMenu = listeItemMenu;
        this.questionUtils = QuestionUtils;
    }

    afficherMenu(){

        const chaine = this.listeItemMenu.map((item,index) => `${index}. ${item.libelle}`).join("\n");
        console.log(chaine);
        this.choisirMenu()
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
                return this.listeItemMenu[reponse.choix];
            })
            .then((choix)=>{
                if(choix.sortir !== true){
                    this.afficherMenu();
                }
            })
    }

}

class MenuItem{
    constructor(libelle,fonction,sortir){
        this.libelle = libelle;
        this.fonction = fonction;
        this.sortir = sortir;
    }
}

exports.Menu = Menu;
exports.MenuItem = MenuItem;