
//récupération données localStorage
let TeddiesLocalStorage = JSON.parse(localStorage.getItem('NouveauArticle'));
console.log(TeddiesLocalStorage);

// création de la page du récapitulatif panier

const teddyMain = document.getElementById('page_Produit');
const titreRecap=document.createElement("h2")
teddyMain.appendChild(titreRecap);
titreRecap.textContent="Récapitulatif de votre panier"

const teddyDiv=document.createElement("div")
teddyMain.appendChild(teddyDiv)
teddyDiv.className="referenceTeddy"

const CarteddyDiv=document.createElement("div")
teddyDiv.appendChild(CarteddyDiv)
CarteddyDiv.className="Carte_Teddy"


const teddyH3 = document.createElement('h3');
CarteddyDiv.appendChild(teddyH3);
teddyH3.textContent = "Vos oursons :";
//Lorseque le localstorege est vide??????
if(TeddiesLocalStorage == null || TeddiesLocalStorage.length === 0){
    const PanierVide=document.createElement("p")
    CarteddyDiv.appendChild(PanierVide)
    PanierVide.className = "CarteVide";
    PanierVide.textContent="Votre Panier est vide pour Linstant"
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
        teddiesCart.textContent = lesElements.quantity + " " + lesElements.teddyNom + " , ";
        ////Affichage du prix
        
        const teddyPrix = document.createElement('div');
        infosTeddy.appendChild(teddyPrix);
        teddyPrix.className = 'teddy_prix';
        teddyPrix.id = i++;
        const prix = document.createElement('p');
        teddyPrix.appendChild(prix);
        prix.textContent = lesElements.teddyPrice + "euro €"
        ////Affichage du limage
        const teddyImage = document.createElement('div');
        infosTeddy.appendChild(teddyImage);
        teddyImage.className = 'imagteddy';
        teddyImage.id = i++;
        teddyImage.innerHTML+=`<a href="">
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
//calcul du montant total et son 
let calculePrix = []
for (elementDeTeddy of TeddiesLocalStorage) {
    let PrixArticle = elementDeTeddy.teddyPrice;
    calculePrix.push(PrixArticle);
};
console.log(calculePrix);
const valeurs = (prixUnicial , valeurAjour) => 
prixUnicial + valeurAjour 
const totalPrice = calculePrix.reduce(valeurs);
console.log(totalPrice);

const total = document.createElement('p');
CarteddyDiv.appendChild(total);
total.className = 'total';
total.textContent = "Montant total = " + totalPrice + " €";

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
        const confirme=window.confirm("voulez vous vraiment supprimé")
        if(confirme==true)  { 
            window.location.href = "panier.html";
            localStorage.removeItem('NouveauArticle');
        } else {
            window.location.href = "panier.html";  
            
        }
       
    });
