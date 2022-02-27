window.addEventListener("load", function () {
    console.log("loaded")
    valideLocalstorage()

})
//récupération données localStorage
let TeddiesLocalStorage = JSON.parse(localStorage.getItem('NouveauArticle'));
console.log(TeddiesLocalStorage);

// //Lorseque le localstorege est vide??????
var valideLocalstorage = () => {
    if (TeddiesLocalStorage == null || TeddiesLocalStorage.length === 0) {
        panierVide()

    }
    else {
        console.log("le locale storage n'est pas vide")
        // si des éléments sont présents dans le panier : récupération des éléments du panier
        afficherListeProduit()

    }
}
var panierVide = () => {
    const tbody = document.querySelector('#tbody-id');


    tbody.insertAdjacentHTML('afterbegin', `<tr><td colspan="6" style="text-align:center;">Le panier est vide</td></tr>`);

    tbody.insertAdjacentHTML('afterbegin', data);

}


////variable globale
const infosTeddy = document.createElement('div');
/*///////////*/
function afficherListeProduit() {
    const tbody = document.querySelector('#tbody-id');
    const tfoot = document.querySelector('#tfoot-id');

    var data = "";
    var prixtotal = 0;
    var qtetotal = 0;

    var y = 1;
    for (lesElements of TeddiesLocalStorage) {
        data += `<tr data-columns="${lesElements.teddyId}">
          <td scope="col">${y}</td>
          <td scope="col">${lesElements.teddyNom}</td>
          <td scope="col">${lesElements.teddyColor}</td>
          <td scope="col">${lesElements.teddyPrice} €</td>
          <td scope="col">${lesElements.quatity * lesElements.teddyPrice}€</td>
          <td scope="col" style="text-align: right;"  > <i id="product-id"   class="fas fa-trash btn  remove-product-id"></i></td>
        </tr>`;
        console.log(lesElements.teddyId);

        qtetotal += Number(lesElements.quatity * lesElements.teddyPrice);

        y++;
    }

    // chargement de la liste des produit
    if (lesElements == "") {
        const tbody = document.getElementById('tbody-id');

        tbody.insertAdjacentHTML('afterbegin', `<tr><td colspan="6" style="text-align:center;">Le panier est vide</td></tr>`);
    } else {
        tbody.insertAdjacentHTML('afterbegin', data);
    }


    // chargement des  statistiques
    tfoot.innerHTML = `<tr>
    <th colspan="5">Totals</th>
    <th >${qtetotal} €</th>
    </tr>`;
}
/***
 * ---------------------------------------------------------
 *  Suppression des produit du panier
 * ---------------------------------------------------------
 * 
 * si l'utilisateur souhaite retirer un produit du panier
 */
///selection de tous les buttons sup 
window.addEventListener("load", function () {
    var SuppButton = document.querySelectorAll(".remove-product-id")
    /// finn selection de tous les buttons sup 
    console.log(SuppButton.length);
    for (let i = 0; i < SuppButton.length; i++) {
        var teddies_id = (TeddiesLocalStorage[i].teddyId);
        SuppButton[i].addEventListener('click', (event) => {
            event.preventDefault();
            const neWlist = TeddiesLocalStorage.filter((teddy) =>
                teddy.teddyId !== teddies_id
            );
            localStorage.setItem('NouveauArticle', JSON.stringify(neWlist));
            console.log(neWlist);
            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html"
        })

    }
})

// ///le formulaire
//         /////////////////Nom//////////////// valide///////////////////////////
function validationNom(value) {
    return /^[A-Z-a-z\s]{5,80}$/.test(value)
};
function validationVille(value) {
    return /^[A-Z-a-z\s]{5,80}$/.test(value)
};
function validationPreNom(value) {
    return /^[A-Z-a-z\s]{5,80}$/.test(value)
};
function validationAddress(value) {
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
};
function validMail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};
Nom = document.getElementById('nombox')
let NomErreur = document.getElementById('NomErreur')
Nom.addEventListener("change", function (event) {
    if (validationNom(Nom.value)) {
        Nom.style.color = "green"
        NomErreur.style.visibility = "hidden"
    }
    else {
        NomErreur.innerHTML = "Le champ doit comporter que des lettres et chiffre "
        NomErreur.style.color = "red"
        NomErreur.style.marginTop = "10px"
        event.preventDefault()
    }
}
)
////////////////////Prenom /////////////////Valide

let PreNom = document.getElementById('prenombox')
let PreNomErreur = document.getElementById('PreNomErreur')
PreNom.addEventListener("change", function (event) {
    if (validationPreNom(PreNom.value)) {
        PreNom.style.color = "green"
        PreNomErreur.style.visibility = "hidden"
    }
    else {
        PreNomErreur.innerHTML = "Le champ doit comperter que des lettre et chiffre "
        PreNomErreur.style.color = "red"
        PreNomErreur.style.marginTop = "10px"
        event.preventDefault()
    }
}
)
// Vérification de la validité de l'adresse

let AdressErreur = document.getElementById('AdressErreur')
let adresse = document.getElementById('adressbox')
adresse.addEventListener("change", function (event) {
    if (validationAddress(adresse.value)) {
        adresse.style.color = "green"
        AdressErreur.style.visibility = "hidden"

    } else {
        AdressErreur.innerHTML = "Le champ doit comperter que des lettre et chiffre "
        AdressErreur.style.color = "red"
        AdressErreur.style.marginTop = "10px"
        event.preventDefault()
    }
}
)
//validation de la ville 
let Ville = document.getElementById('villebox')
console.log(Ville);
let VilleErreur = document.getElementById('VilleErreur')
Ville.addEventListener("change", function (event) {
    if (validationVille(Ville.value)) {
        Ville.style.color = "green"
        VilleErreur.style.visibility = "hidden"
    }
    else {
        VilleErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
        VilleErreur.style.color = "red"
        VilleErreur.style.marginTop = "10px"
        event.preventDefault()
    }
}
)
// // création fonctions et validité mail
var mail = document.getElementById("emailbox")
let EmailErreur = document.getElementById('EmailErreur')
mail.addEventListener("change", function (event) {
    if (validMail(mail.value)) {
        mail.style.color = "green"
        EmailErreur.style.visibility = "hidden"
    }
    else {
        mail.style.fontFamily = "cursive"
        EmailErreur.innerHTML = "Veuillez saisir une adresse mail valide (exemple : abcd@mail.com)."
        EmailErreur.style.color = "red"
        EmailErreur.style.marginTop = "10px"
        event.preventDefault()
    }
})
// envoie des données panier + contact au serveur si le formulaire est valide
let submit = document.getElementById("form")
console.log(submit);
let submiErreur = document.getElementById("SubmitErreur")
console.log(submiErreur);
//Création de l'objet "contact"
let contact = {
    firstName: Nom.value,
    lastName: PreNom.value,
    address: adresse.value,
    city: Ville.value,
    email: mail.value,
}
console.log(contact);
submit.addEventListener("submit", function (event) {
    event.preventDefault()
    //Création de l'objet "contact"
    let contact = {
        firstName: Nom.value,
        lastName: PreNom.value,
        address: adresse.value,
        city: Ville.value,
        email: mail.value,
    }
    console.log(contact);
    if (validationAddress(Nom.value) && validationPreNom(PreNom.value)
        && validationAddress(adresse.value) && validationVille(Ville.value)
        && (validMail(mail.value))) {
        let calculePrix = []
        for (elementDeTeddy of TeddiesLocalStorage) {
            let PrixArticle = elementDeTeddy.teddyPrice;
            calculePrix.push(PrixArticle);
        };
        console.log(calculePrix);
        const valeurs = (prixUnicial, valeurAjour) =>
            prixUnicial + valeurAjour
        const totalPrice = calculePrix.reduce(valeurs);
        event.preventDefault();
        submiErreur.style.visibility = "hidden"
        console.log(contact)

        // TAbleau pour recuperer les id des nounous qui sons dans le panier 
        let products = [];
        for (storedTeddy of TeddiesLocalStorage) {
            let produitId = storedTeddy.teddyId;
            products.push((produitId));
        }
        console.log(products);

        const data = {
            contact,
            products
        }
        console.log(data)
        var API = 'http://localhost:3000/api/teddies/order'
        const post = async function (data) {
            try {
                let response = await fetch(API,
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:
                        {
                            'Content-Type': 'application/json'
                        }
                    });
                if (response) {
                    let datas = await response.json();
                    console.log(datas)
                    localStorage.setItem("responseOrder", datas.orderId);
                    localStorage.removeItem("NouveauArticle");
                    window.location = "validation.html";
                } else {
                    event.preventDefault();
                    console.error('Retour du serveur : ', response.status);
                    alert('Erreur rencontrée : ' + response.status);
                }
            }
            catch (error) {
                alert("Erreur : " + error);
            }
        };
        post(data);
    }
    else {

        event.preventDefault();
        submiErreur.style.visibility = "visible"
        submiErreur.innerHTML = "Remplissez Bien le formulaire SVP"
        submiErreur.style.color = "red"
        submiErreur.style.marginTop = "10px"


    }
})

