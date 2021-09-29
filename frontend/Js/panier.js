
//récupération données localStorage
let TeddiesLocalStorage = JSON.parse(localStorage.getItem('NouveauArticle'));
console.log(TeddiesLocalStorage);

// création de la page du récapitulatif panier

const teddyMain = document.getElementById('page_Produit');
const titreRecap = document.createElement("h2")
teddyMain.appendChild(titreRecap);
titreRecap.textContent = "Récapitulatif de votre panier"

const teddyDiv = document.createElement("div")
teddyMain.appendChild(teddyDiv)
teddyDiv.className = "referenceTeddy"

const CarteddyDiv = document.createElement("div")
teddyDiv.appendChild(CarteddyDiv)
CarteddyDiv.className = "Carte_Teddy"


const teddyH3 = document.createElement('h3');
CarteddyDiv.appendChild(teddyH3);
teddyH3.textContent = "Vos oursons :";
const table = document.querySelector('table')
const vidCacher = document.getElementById('vidCacher')

//Lorseque le localstorege est vide??????
if (TeddiesLocalStorage == null || TeddiesLocalStorage.length === 0) {
    const PanierVide = document.createElement("p")
    CarteddyDiv.appendChild(PanierVide)
    PanierVide.className = "CarteVide";
    table.style.visibility = "hidden"
    vidCacher.style.visibility = "hidden"
    PanierVide.textContent = "Votre Panier est vide pour Linstant"
}
else {
    console.log("le locale storage n'est pas vide")

    // si des éléments sont présents dans le panier : récupération des éléments du panier
    let i = 0;

    for (lesElements of TeddiesLocalStorage) {
        console.log(lesElements)
        const infosTeddy = document.createElement('div');
        CarteddyDiv.appendChild(infosTeddy);
        infosTeddy.className = 'infosTeddy';

        const teddiesCart = document.createElement('p');
        infosTeddy.appendChild(teddiesCart);
        teddiesCart.textContent = lesElements.quantity + " " + lesElements.teddyNom + lesElements.teddyColor;
        ////color et quantique




        const tbody = document.createElement("tbody")
        table.appendChild(tbody)
        const tr2 = document.createElement('tr')
        tbody.appendChild(tr2)
        const td1 = document.createElement('td')
        tr2.appendChild(td1)
        td1.textContent = lesElements.teddyNom;
        const td2 = document.createElement('td')
        tr2.appendChild(td2)
        td2.textContent = lesElements.teddyPrice + "€"
        const td3 = document.createElement('td')
        tr2.appendChild(td3)
        td3.textContent = lesElements.teddyColor


        //////////////les images         
        const teddyImage = document.createElement('div');
        infosTeddy.appendChild(teddyImage);
        teddyImage.className = 'imagteddy';
        teddyImage.id = i++;
        teddyImage.innerHTML += `<a href="">
         <img src="${lesElements.teddyImage}" class="img-fluid img-thumbnail p-1" alt="${lesElements.name}" width="200px"></a>
`
        // création bouton suppression d'un teddy
        const SuppButton = document.createElement('button');
        infosTeddy.appendChild(SuppButton);
        SuppButton.className = 'supprime_teddy btn btn-secondary';
        SuppButton.title = 'Supprimer cet article ?';
        const iconButton = document.createElement('i');
        SuppButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt Acacher';

    };
    // on récupére l'article associé au bouton poubelle
    // let supprime_teddy = document.getElementsByClassName('supprime_teddy');
    // for (let i = 0 ; i < supprime_teddy.length; i++) {
    //     supprime_teddy[i].addEventListener('click' , function (event) { 
    //         event.preventDefault();
    //         let id = this.closest('.teddyprix').id;

    //         //on supprime l'article du localStorage
    //         TeddiesLocalStorage.splice(id, 1);

    //         //on enregistre le nouveau localStorage
    //         localStorage.setItem('NouveauArticle', JSON.stringify(TeddiesLocalStorage));
    //         JSON.parse(localStorage.getItem('NouveauArticle'));

    //         alert('Cet article a bien été supprimé !');
    //         window.location.href = "panier.html" }); 
    //     };
    //calcul du montant total et son 
    let calculePrix = []
    for (elementDeTeddy of TeddiesLocalStorage) {
        let PrixArticle = elementDeTeddy.teddyPrice;
        calculePrix.push(PrixArticle);
    };
    console.log(calculePrix);
    const valeurs = (prixUnicial, valeurAjour) =>
        prixUnicial + valeurAjour
    const totalPrice = calculePrix.reduce(valeurs);
    console.log(totalPrice);

    const total = document.createElement('p');
    CarteddyDiv.appendChild(total);
    total.className = 'total';
    total.textContent = "Montant total = " + totalPrice + " €";
    const tfoot = document.getElementById("MontantTotal")
    // table.appendChild(tfoot)

    tfoot.textContent = totalPrice + " €"

}
////butoon pour vider le panier
const ButVidPagnet = document.createElement('button');
CarteddyDiv.appendChild(ButVidPagnet);
ButVidPagnet.className = 'icon_SupButton  btn-secondary';

const cartLien = document.createElement('a');
ButVidPagnet.appendChild(cartLien);
cartLien.href = "panier.html";
cartLien.id = "cart_lien"
cartLien.title = 'Vider le panier ?';
cartLien.textContent = "Vider mon panier ";

const icon = document.createElement('i');
cartLien.appendChild(icon);
icon.className = 'fas fa-trash-alt'

ButVidPagnet.addEventListener("click", function (event) {
    event.preventDefault();
    const confirme = window.confirm("voulez vous vider le panier?")
    if (confirme == true) {
        window.location.href = "panier.html";
        localStorage.removeItem('NouveauArticle');
    } else {
        window.location.href = "panier.html";

    }

});

///le formulaire

let Monform = document.getElementById("form")
let monreget = /^[a-zA-Z-\s]+$/
Monform.addEventListener('submit', function (e) {
    var InputNom = document.getElementById('nom')
     InputNom.style.fontFamily="cursive"  
    InputNom.style.color = "#d31faf"
    if (InputNom.value.trim() == "") {
        let NomErreur = document.getElementById('NomErreur')
        NomErreur.innerHTML = "Le champ nom est requis"
        NomErreur.style.color = "red"
        NomErreur.style.marginTop="10px"
        e.preventDefault()


    }
    else if (monreget.test(InputNom.value) == false) {
        let NomErreur = document.getElementById('NomErreur')
        NomErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
        NomErreur.style.color = "red"
        NomErreur.style.marginTop="10px"
        e.preventDefault()

    }
}

)
let Prenomform = document.getElementById("form")
Prenomform.addEventListener('submit', function (e) {
    var InputPreNom = document.getElementById('Prenom')
    InputPreNom.style.color = "#d31faf"
    InputPreNom.style.fontFamily="cursive"  
    if (InputPreNom.value.trim() == "") {
        let PrenomErreur = document.getElementById('PreNomErreur')
        PrenomErreur.innerHTML = "Le champ Prénom est requis"
        PrenomErreur.style.color = "red"
        PrenomErreur.style.marginTop="10px"
        e.preventDefault()


    } else if (monreget.test(InputPreNom.value) == false) {
        let PrenomErreur = document.getElementById('PreNomErreur')
        PrenomErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
        PrenomErreur.style.color = "red"
        PrenomErreur.style.marginTop="10px"
        e.preventDefault()
    }
}
)
Monform.addEventListener('submit', function (e) {
    var InputAdresse = document.getElementById('adresse')
     InputAdresse.style.fontFamily="cursive"  
    InputAdresse.style.color = "#d31faf"
    if (InputAdresse.value.trim() == "") {
        let AdressErreur = document.getElementById('AdressErreur')
        AdressErreur.innerHTML = "Le champ Adresse est requis"
        AdressErreur.style.color = "red"
        AdressErreur.style.marginTop="10px"
        e.preventDefault()


    }
    else if (monreget.test(InputAdresse.value) == false) {
        let NomErreur = document.getElementById('AdressErreur')
        AdressErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
        AdressErreur.style.color = "#d31faf"
        AdressErreur.style.marginTop="10px"
        e.preventDefault()

    }
}

)



adresse
//validation de la ville 
let Villeform = document.getElementById("form")
Villeform.addEventListener('submit', function (e) {
    var InputVille = document.getElementById('ville')
    InputVille.style.fontFamily="cursive"  
    InputVille.style.color = "#d31faf"
    if (InputVille.value.trim() == "") {
        let VilleErreur = document.getElementById('VilleErreur')
        VilleErreur.innerHTML = "Le champ Ville est requis"
        VilleErreur.style.color = "red"
        VilleErreur.style.marginTop="10px" 
        e.preventDefault()


    } else if (monreget.test(InputVille.value) == false) {
        let VilleErreur = document.getElementById('VilleErreur')
        VilleErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
        VilleErreur.style.color = "red"
        VilleErreur.style.marginTop="10px" 
        e.preventDefault()
    }
}
)



// // création fonctions et validité mail

function validMail(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};
var mail =document.getElementById("email")
mail.style.color="#d31faf"
 
mail.addEventListener("change", function (event) {
    if (validMail(mail.value)){
    } else {
        mail.style.fontFamily="cursive" 
        
        let EmailErreur = document.getElementById('EmailErreur')
        EmailErreur.innerHTML = "Veuillez saisir une adresse mail valide (exemple : abcd@mail.com)."
        EmailErreur.style.color = "red"
        EmailErreur.style.marginTop="10px" 
        event.preventDefault()
;
    }
});
