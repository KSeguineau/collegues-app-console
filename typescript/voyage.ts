class Sejour{
    constructor(private _nom:string,private _prix:number){}


    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get prix(): number {
        return this._prix;
    }

    set prix(value: number) {
        this._prix = value;
    }
}

class SejourService{
    private listeSejour:Sejour[];
    constructor(){
        this.listeSejour = [];
        this.listeSejour.push(new Sejour("Paris",300));
        this.listeSejour.push(new Sejour("Madrid",500));
        this.listeSejour.push(new Sejour("Rome",600));
    }

    rechercherParNom(nomSejour:string):Sejour|undefined{
        return this.listeSejour.find(s=>s.nom===nomSejour);
    }

}

const sejour = new SejourService().rechercherParNom("Rome");
console.log(sejour);