window.addEventListener("load", function () {
    console.log("loaded")
    AffichageElement();
})
//Variable du tableau présent dans le localstorage//
let ProduitLocalstorage = localStorage.getItem("produit")
    ? JSON.parse(localStorage.getItem("produit"))
    : [];
console.log(ProduitLocalstorage);
//Sélection de la classe ou injecter le code html
//Affichage des produits du panier
const positionElement = document.querySelector("#carte__produit");
function AffichageElement() {
    if (ProduitLocalstorage.length !== 0) {
        let ProduitPanier = "";
        for (let a = 0; a < ProduitLocalstorage.length; a++) {
            ProduitPanier += `
    <article class="carte_Objet" data-index = "${a}">
   <div class="carte_Objet__img">
     <img src="${ProduitLocalstorage[a].imageUrl}" alt="${ProduitLocalstorage[a].alt}">
   </div>
   <div class="carte_Objet__content">
     <div class="carte_Objet__content__TitrePrix">
       <h2>${ProduitLocalstorage[a].nom} ${ProduitLocalstorage[a].color
                }</h2>
       <p class="itemTotal">${(ProduitLocalstorage[a].price*ProduitLocalstorage[a].quantity  )
                } euros</p>
     </div>
     <div class="carte_Objet__content">
       <div class="carte_Objet__content__quantity">
         <p>Qté : </p>
         <input type="number" class=" AffichageQuantite" name=" AffichageQuantite" min="1" max="100" value="${ProduitLocalstorage[a].quantity
                }">
       </div>
       <div class="carte_Objet__content__supprim">
       <span>Supprimé: </span>
       <span class="deleteItem">
       <i id="product-id"   class="fas fa-trash btn"></i></span>
       </div>
     </div>
   </div>
 </article>`;
        }
        positionElement.innerHTML = ProduitPanier;
        displayTotal();
        SuppressionArticle();
    } else {
        var panierVide=document.getElementById("panierVide")
        panierVide.textContent="Votre panier est vide pour l'instant"
        var aColl = document.getElementById('class_non_visible')
        aColl.style.display='none'
    }
}
//fonction pour la mise à jour du total du prix et des Qté d'articles
function displayTotal() {
    let PrixTotalCalcule = [];
    let QuantiteTotaleCalcul = [];
    for (let t = 0; t < ProduitLocalstorage.length; t++) {
        let prixTotalPanier = ProduitLocalstorage[t].price;
        let quantitePanier = ProduitLocalstorage[t].quantity;
        PrixTotalCalcule.push(prixTotalPanier * quantitePanier);
        QuantiteTotaleCalcul.push(quantitePanier);
        console.log(QuantiteTotaleCalcul);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const PrixTotal = PrixTotalCalcule.reduce(reducer, 0);
    const displayTotalPrice = document.getElementById("PrixTotal");
    displayTotalPrice.innerHTML = PrixTotal;
    const displayQuantiteTotale = document.getElementById("QuantiteTotale");
    displayQuantiteTotale.innerHTML =`${eval(QuantiteTotaleCalcul.join("+"))}`;
    const QtéPanier = document.getElementById("qte_in_basket");
    QtéPanier.innerHTML= `${eval(QuantiteTotaleCalcul.join("+"))}`
}
//Suppression et modification du nombre d'article
let  AffichageQuantite = document.querySelector(".AffichageQuantite");
function SuppressionArticle() {
    let article = document.querySelectorAll(".carte_Objet");

    for (let n = 0; n < article.length; n++) {
        const btnDelete = article[n].querySelector(".deleteItem");
        btnDelete.addEventListener("click", (e) => {
            e.preventDefault();
            const elt = e.target.closest("article");
            const index = elt.dataset.index;
            ProduitLocalstorage.splice(index, 1);
            localStorage.setItem("produit", JSON.stringify(ProduitLocalstorage));
            elt.remove();
            window.location.href = "panier.html"
            AffichageElement();
            displayTotal();
        });
        const  btnAjoutProduit = article[n].querySelector(".AffichageQuantite");
         btnAjoutProduit.addEventListener("input", (e) => {
            //on récupère l'index du produit dans le storage
            //on actualise la quantité
            //on actualise le total
            //on sauvegarde le localstorage
            console.log(ProduitLocalstorage);
            const index = article[n].dataset.index;
            ProduitLocalstorage[index].quantity = parseInt(e.target.value);
            localStorage.setItem("produit", JSON.stringify(ProduitLocalstorage));
            article[n].querySelector(".itemTotal").innerHTML = `${ProduitLocalstorage[index].quantity * (ProduitLocalstorage[index].price)
                } euros`;

            displayTotal();
        });
    }
}

///le formulaire
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
    validePanier()
})
var validePanier = () => {
    //Création de l'objet "contact
    let contact = {
        firstName: Nom.value,
        lastName: PreNom.value,
        address: adresse.value,
        city: Ville.value,
        email: mail.value,
    }
    if (validationAddress(Nom.value) && validationPreNom(PreNom.value)
        && validationAddress(adresse.value) && validationVille(Ville.value)
        && (validMail(mail.value))) {
                // TAbleau pour recuperer les id des nounous qui sons dans le panier 
        let products = [];
        for (storedTeddy of ProduitLocalstorage) {
            console.log(storedTeddy);
            let produitId = storedTeddy.idProduit;
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
                    localStorage.removeItem("produit");
                    window.location = "validation.html";
                } else {
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
        submiErreur.style.visibility = "visible"
        submiErreur.innerHTML = "Remplissez Bien le formulaire SVP"
        submiErreur.style.color = "red"
        submiErreur.style.marginTop = "10px"
    }
}