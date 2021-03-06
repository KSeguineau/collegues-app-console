import r from 'request-promise-native';
const request = r.defaults({jar: true});
import {url} from './config';
import {TypeModification} from "./TypeModification";
import Collegue from "./domain";



//==========================================================================
export default class Service {

    // fait la demande de connexion
    connexion(identifiant:string, motDePasse:string):Promise<void> {

        return request(`${url.urlApiCollegue}/auth`,
            {
                method: 'POST',
                json: true,
                body: {
                    login: identifiant,
                    mdp: motDePasse
                }
            }
        ).promise();

    }

//recupere une liste de matricule grace au nom
    recupererParNom(nom:string):Promise<Collegue[]> {

        return request(`${url.urlApiCollegue}/collegues?nom=${nom}`, {json: true})
            .then(listeMatricule => this.recupererInfoCollegue(listeMatricule));
    }


//recupere une liste de collegue grace à une liste de matricule
    recupererInfoCollegue(listeMatricule:string[]):Promise<Collegue[]> {

        return Promise.all(listeMatricule.map(matricule =>  request(`${url.urlApiCollegue}/collegues/${matricule}`, {json: true})))
            .then(listecollegue => listecollegue.map(collegue => new Collegue(collegue.nom,collegue.prenom,new Date(Date.parse(collegue.ddn)),collegue.email,collegue.photoUrl,collegue.matricule)) );

    }

// creation d’un collegue


    creerCollegue(collegue:Collegue):Promise<Collegue> {
        return request(`${url.urlApiCollegue}/collegues`,
            {
                method: 'POST',
                json: true,
                body: collegue
            }
        ).promise();
    }

// modification de l’email

    modifierCollegue(matricule:string,value:string,typeModification:TypeModification):Promise<Collegue>{

      const body:any ={};
      body[typeModification] = value;

        return request(`${url.urlApiCollegue}/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: body
            }
        ).promise();
    }
}


