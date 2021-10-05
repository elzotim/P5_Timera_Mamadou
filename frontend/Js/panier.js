window.addEventListener("load" ,function(){
    console.log("loaded")
     
})
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
    tfoot.textContent = totalPrice + " €"


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

    ///le formulaire

    /////////////////Nom//////////////// valide///////////////////////////
    function validationNom(value) {
        return /^[A-Z-a-z\s]{5,80}$/.test(value)
    };
    Nom = document.getElementById('nom')
    let NomErreur = document.getElementById('NomErreur')
    Nom.addEventListener("change", function (event) {
        if (validationAddress(Nom.value)) {
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
    function validationPreNom(value) {
        return /^[A-Z-a-z\s]{5,80}$/.test(value)
    };

    PreNom = document.getElementById('Prenom')
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
    function validationAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)

    };
    let AdressErreur = document.getElementById('AdressErreur')
    adresse = document.getElementById('adresse')
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

    function validationVille(value) {
        return /^[A-Z-a-z\s]{5,80}$/.test(value)
    };
    Ville = document.getElementById('ville')
    let VilleErreur = document.getElementById('VilleErreur')
    Ville.addEventListener("change", function (event) {
        if (validationVille(ville.value)) {
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

    function validMail(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    };
    var mail = document.getElementById("email")
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
    }
    )
    // envoie des données panier + contact au serveur si le formulaire est valide
    submit = document.getElementById("form")
    let submiErreur = document.getElementById("SubmitErreur")

    submit.addEventListener("submit", function (event) {
        //Création de l'objet "contact"
        let contact = {
            firstName: Nom.value,
            lastName: PreNom.value,
            address: adresse.value,
            city: ville.value,
            email: mail.value,
        }
        if (validationAddress(Nom.value) && validationPreNom(PreNom.value)
            && validationAddress(adresse.value) && validationVille(ville.value)
            && (validMail(mail.value))) {
            event.preventDefault();
            submiErreur.style.visibility = "hidden"
            console.log(contact)
            // envoie du prix total au localStorage
            localStorage.setItem('totalPrice', totalPrice);
            const storagePrice = localStorage.getItem('totalPrice');
            console.log(storagePrice);
            // TAbleau pour recuperer les id des nounous qui sons dans le panier 
            let teddies = [];
            for (storedTeddy of TeddiesLocalStorage) {
                let produitId = storedTeddy.teddyId;
                teddies.push((produitId));
            }
            console.log(teddies);
            
                const data= {
                      contact,
                      teddies
                }
            console.log(data)
            const post = async function (data){
                try {
                    let response = await fetch('http://localhost:3000/api/teddies/order', 
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: 
                        {
                            'Content-Type': 'application/json'
                        }
                    });
                    if(response) {
                        let data = await response.json();
                        alert(data);
                        localStorage.setItem("responseOrder", data.orderId);
                        window.location = "validation.html";
                        localStorage.removeItem("NouveauArticle");
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
            
             
       else{
           
        event.preventDefault();
        submiErreur.style.visibility = "visible"
        submiErreur.innerHTML = "Remplissez Bien le formulaire SVP"
        submiErreur.style.color = "red"
        submiErreur.style.marginTop = "10px"
    }
       
       
       
    
    }  )}


