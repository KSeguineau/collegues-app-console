//require
var request = require('request').defaults({jar: true});

//exports
exports.connexion = connexion;
exports.recupererParNom = recupererParNom;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhoto = modifierPhoto;

//==========================================================================

// fait la demande de connexion
function connexion(identifiant, motDePasse, retour) {

     request('https://kseguineau-collegues-api.herokuapp.com/auth',
        {
            method: 'POST',
            json: true,
            body: {
                login: identifiant,
                mdp: motDePasse
            }
        },
        function (err, res, body) {
            retour(err, res);
        }
    );

}

//recupere une liste de collegue selon leur prenom et appel recupererInformationParMatricule pour chaque collegue
//renvoi un tableau de collegue
function recupererParNom(nom, retour) {

    request('https://kseguineau-collegues-api.herokuapp.com/collegues?nom=' + nom, {json: true}, function (err, res, body) {
        if (err) {
            return console.log('Erreur', err);
        }

        // body contient les données récupérées

        var collegues = [];
        var cpt = body.length;
        if (cpt > 0) {
            body.forEach((m) => {

                request('https://kseguineau-collegues-api.herokuapp.com/collegues/' + m, {json: true}, function (err, res, body) {
                    if (err) {
                        return console.log('Erreur', err);
                    }
                    cpt--;
                    collegues.push(body);
                    if (cpt === 0) {
                        retour(collegues);
                    }
                });


            });
        } else {
            retour([]);
        }
    });

}

// creation d’un collegue
function creerCollegue(nom, prenom, email, ddn, photo, retour) {
    request('https://kseguineau-collegues-api.herokuapp.com/collegues',
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
        },
        function (err, res, body) {
            retour(err, res, body);
        }
    );
}

// modification de l’email
function modifierEmail(matricule,email,retour) {
    request('https://kseguineau-collegues-api.herokuapp.com/collegues/'+matricule,
        {
            method: 'PATCH',
            json: true,
            body: {

                email: email

            }
        },
        function (err, res, body) {
            retour(err, res, body);
        }
    );
}

//modification de la photo
function modifierPhoto(matricule,photo,retour) {
    request('https://kseguineau-collegues-api.herokuapp.com/collegues/'+matricule,
        {
            method: 'PATCH',
            json: true,
            body: {

                photoUrl: photo

            }
        },
        function (err, res, body) {
            retour(err, res, body);
        }
    );
}



