//require
const {InterfaceUtilisateur} = require("./InterfaceUtilisateur");
const {Service} = require('./service');
const {QuestionUtils} = require('./QuestionUtils');
const {GestionCollegue} = require('./GestionCollegue');
//========================================================
const service = new Service();
const qU = new QuestionUtils();
const gestionCollegue = new GestionCollegue(service,qU);
const interfaceUtilisateur = new InterfaceUtilisateur(service,qU,gestionCollegue);


console.log("** Administartion Collegues **\n");

interfaceUtilisateur.demarrerInterface();
