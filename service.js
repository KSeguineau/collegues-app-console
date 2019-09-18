var request = require('request').defaults({jar: true});


// fait la demande de connexion
function connexion(identifiant, motDePasse, retour) {

    return request('https://kseguineau-collegues-api.herokuapp.com/auth',
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
function recupererParNom(nom, affichage) {

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
                        affichage(collegues);
                    }
                });


            });
        } else {
            affichage([]);
        }
    });

}

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


exports.connexion = connexion;
exports.recupererParNom = recupererParNom;
exports.creerCollegue = creerCollegue;