//require
import InterfaceUtilisateur from "./InterfaceUtilisateur";
import Service from './service';
import QuestionUtils from './QuestionUtils';
//========================================================
const service = new Service();
const qU = new QuestionUtils();
const interfaceUtilisateur = new InterfaceUtilisateur(service,qU);


console.log("** Administartion Collegues **\n");

interfaceUtilisateur.demarrerInterface();
