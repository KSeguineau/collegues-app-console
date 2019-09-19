//require
const request = require('request-promise-native').defaults({jar: true});
const config = require('./config');



//==========================================================================
class Service {

    // fait la demande de connexion
    connexion(identifiant, motDePasse) {

        return request(`${config.url.urlApiCollegue}/auth`,
            {
                method: 'POST',
                json: true,
                body: {
                    login: identifiant,
                    mdp: motDePasse
                }
            }
        );

    }

//recupere une liste de matricule grace au nom
    recupererParNom(nom) {

        return request(`${config.url.urlApiCollegue}/collegues?nom=${nom}`, {json: true})
            .then((listeMatricule) => {
                return this.recupererInfoCollegue(listeMatricule);
            });
    }


//recupere une liste de collegue grace à une liste de matricule
    recupererInfoCollegue(listeMatricule) {

        return Promise.all(listeMatricule.map((m) => {
            return request(`${config.url.urlApiCollegue}/collegues/${m}`, {json: true});
        }));

    }

// creation d’un collegue


    creerCollegue(nom, prenom, email, ddn, photo) {
        return request(`${config.url.urlApiCollegue}/collegues`,
            {
                method: 'POST',
                json: true,
                body: {
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    ddn: ddn,
                    photoUrl: photo
                }
            }
        );
    }

// modification de l’email

    modifierEmail(matricule, email) {
       return request(`${config.url.urlApiCollegue}/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    email: email
                }
            }
        );
    }

//modification de la photo
   modifierPhoto(matricule, photo) {
       return request(`${config.url.urlApiCollegue}/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    photoUrl: photo
                }
            }
        );
    }
}

//exports
exports.Service = Service;
