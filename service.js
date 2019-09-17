var request = require('request').defaults({ jar:true });


// fait la demande de connexion
function connexion(identifiant,motDePasse,retour){

   return  request('https://kseguineau-collegues-api.herokuapp.com/auth',
        {
            method: 'POST',
            json: true,
            body: {
                login: identifiant,
                mdp: motDePasse
            }
        },
        function(err, res, body) {
            retour(err,res);
        }
    );

}

//recupere une liste de collegue selon leur prenom et appel recupererInformationParMatricule pour chaque collegue
function recupererParNom(nom,affichage){

    request('https://kseguineau-collegues-api.herokuapp.com/collegues?nom='+nom, { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        body.forEach(m=>recupererInformationParMatricule(m,affichage));
    });

}

// recupere les informations d’un collegue grace à son matricule puis demande son affichage
function recupererInformationParMatricule(matricule,affichage){
    request('https://kseguineau-collegues-api.herokuapp.com/collegues/'+matricule, { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

         affichage(body);
    });
}

exports.connexion = connexion;
exports.recupererParNom = recupererParNom;