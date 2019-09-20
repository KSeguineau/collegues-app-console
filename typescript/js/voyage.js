"use strict";
class Sejour {
    constructor(_nom, _prix) {
        this._nom = _nom;
        this._prix = _prix;
    }
    get nom() {
        return this._nom;
    }
    set nom(value) {
        this._nom = value;
    }
    get prix() {
        return this._prix;
    }
    set prix(value) {
        this._prix = value;
    }
}
class SejourService {
    constructor() {
        this.listeSejour = [];
        this.listeSejour.push(new Sejour("Paris", 300));
        this.listeSejour.push(new Sejour("Madrid", 500));
        this.listeSejour.push(new Sejour("Rome", 600));
    }
    rechercherParNom(nomSejour) {
        return this.listeSejour.find(s => s.nom === nomSejour);
    }
}
const sejour = new SejourService().rechercherParNom("Rome");
console.log(sejour);
