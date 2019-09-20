"use strict";
console.log("Meteo App");
class Meteo {
    constructor(_ville, _temperature) {
        this._ville = _ville;
        this._temperature = _temperature;
    }
    toString() {
        return `${this._ville} - ${this._temperature}°C`;
    }
}
let nantesCeMatin = new Meteo('Nantes', 11);
console.log(nantesCeMatin.toString());
