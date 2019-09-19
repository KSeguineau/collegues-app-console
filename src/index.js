//require
const {InterfaceUtilisateur} = require("./InterfaceUtilisateur");
const {Service} = require('./service');
const {QuestionUtils} = require('./QuestionUtils');
//========================================================
const service = new Service();
const qU = new QuestionUtils();
const interfaceUtilisateur = new InterfaceUtilisateur(service,qU);


console.log("** Administartion Collegues **\n");

interfaceUtilisateur.demarrerInterface();
