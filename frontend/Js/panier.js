
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
const table=document.querySelector('table')
const vidCacher=document.getElementById('vidCacher')

//Lorseque le localstorege est vide??????
if(TeddiesLocalStorage == null || TeddiesLocalStorage.length === 0){
    const PanierVide=document.createElement("p")
    CarteddyDiv.appendChild(PanierVide)
    PanierVide.className = "CarteVide";
    table.style.visibility="hidden"
    vidCacher.style.visibility="hidden"
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
        teddiesCart.textContent = lesElements.quantity + " " + lesElements.teddyNom + lesElements.teddyColor;
        ////color et quantique
        
      
       

        const tbody =document.createElement("tbody")
        table.appendChild(tbody)
        const tr2=document.createElement('tr')
        tbody.appendChild(tr2)
        const td1=document.createElement('td')
        tr2.appendChild(td1)
        td1.textContent=lesElements.teddyNom;
        const td2=document.createElement('td')
        tr2.appendChild(td2)
        td2.textContent=lesElements.teddyPrice +"€"
        const td3=document.createElement('td')
        tr2.appendChild(td3)
        td3.textContent=lesElements.teddyColor

         
   //////////////les images         
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
const valeurs = (prixUnicial , valeurAjour) => 
prixUnicial + valeurAjour 
const totalPrice = calculePrix.reduce(valeurs);
console.log(totalPrice);

const total = document.createElement('p');
CarteddyDiv.appendChild(total);
total.className = 'total';
total.textContent = "Montant total = " + totalPrice + " €";
const tfoot =document.getElementById("MontantTotal")
        // table.appendChild(tfoot)
     
        tfoot.textContent=totalPrice + " €"

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
    
    ///le formulaire

  var Listfonction= {
 validNom:(ev)=>{
   var inputNom=ev.target; 
   var contenu =inputNom.value.trim() ;
   var nom =document.getElementById("NomError")
   
   console.log(inputNom)
   if (!contenu){
       nom.style.border="1px solid red"  
   } else if (!(/^[a-zA-Z]{2,30}$/).test(contenu)){
    nom.style.border="1px solid red"  
   }
   
 },
 validpreprenom:(ev)=>{
    var inputPreNom=ev.target; 
    var contenu =inputPreNom.value.trim() ;
    var prenom =document.getElementById("PrenomlError")
    
    if (!contenu){
       prenom.style.border="1px solid red"     
    } else if (!(/^[a-zA-Z]{2,30}$/).test(contenu)){
            prenom.style.border="1px solid red"   
    }
    
  
 },
 validpremail:(ev)=>{
    var inputPreNom=ev.target; 
    var contenu =inputPreNom.value.trim() ;
   var email= document.getElementById("PrenomlError")
    var erreur=""
    console.log(inputNom)
    if (!contenu){
        email.style.border="1px solid red"  
    } else if (!/^[a-zA-Z]{2,30}$/.test(contenu)){
        email.style.border="1px solid red"  
    }
    
 },
}
 var setuplistenner =()=>{
    var nom =document.forms[0]['nom']  
    var prenom =document.forms[0]['prenom']  
  nom? nom.onkeyup=Listfonction.validNom : null
  prenom?prenom.onkeyup=Listfonction.validNom : null
    

}
setuplistenner()  
 
// création fonctions et validité mail
function validMail(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};
var mail =document.getElementById("email")
mail.addEventListener("change", function (event) {
    if (validMail(mail.value)){
    } else {
        event.preventDefault()
        alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).");
    }
});
// création fonctions et  validité prénom, nom, ville
function isValid(value) {
    return /^[A-Z-a-z\s]{3,40}$/.test(value);
};
var ville=document.getElementById("ville")

ville.addEventListener( "change",function(evenement){
if (isValid(ville.value)) {
    
} 
    else {
        
        ville.style.border="1px solid red"
        evenementt.preventDefault()
    }
    
})