//On récupere l'id du produit en question dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//?
let article = '';

const colorSelect = document.querySelector('#colors');
const quantitySelect = document.querySelector('#quantity');

//On récupère les produits de l'API
window.addEventListener("load", function () {
  console.log("loaded")
  getTeddies()
})
///donner de l'Api
var getTeddies = () => {
  const searchParams = new URLSearchParams(location.search);
  const id_teddies = searchParams.get("_id");
  const teddies_Url = `http://localhost:3000/api/teddies/${id_teddies}`;
  fetch(teddies_Url)
    .then((response) => response.json())
    .then((article) => {
      listerElt(article)
    })
}
//Création article des produits
let listerElt = (article) => {
  //Création des images
  let elementImg = document.createElement('img');
  document.querySelector('.objet__img').appendChild(elementImg);
  elementImg.src = article.imageUrl;
  elementImg.Alt = article.description;
  elementImg.className = "img-fluid img-thumbnail p-"
  //Insertion des noms dans l'id title
  let elementTitle = document.getElementById('titre');
  elementTitle.textContent = article.name;

  //Insertion des prix dans l'id price
  let elementPrice = document.getElementById('prix');
  elementPrice.textContent = article.price / 100;
  //Insertion de la description des produits dans l'id description
  let elementDescription = document.getElementById('description');
  elementDescription.textContent = article.description;
  elementDescription.className = "card-text text-truncate"
  //Insertion des différents choix de couleurs
  for (let colors of article.colors) {
    let elementsColor = document.createElement('option');
    document.querySelector('#colors').appendChild(elementsColor);
    elementsColor.value = colors;
    elementsColor.textContent = colors;
  }
  // Appel de la function selectionTeddies
  selectionTeddies(article);
}

selectionTeddies = (article) => {
  //button d'ajout des produits et écouteurs d'événement au click
  const button = document.querySelector('#Ajout_Panier');
  button.addEventListener('click', (e) => {
    //Récupération des valeurs quantité et couleurs
    let selectColor = colorSelect.value;
    let selectQuantity = quantitySelect.value;

    if (
      selectQuantity == 0 ||
      selectQuantity > 100 ||
      selectColor == null ||
      selectColor == ''
    ) {
      alert(
        //alert si l'utilisateur ne sélectionne pas de couleur et|ou de quantité
        'Veuillez renseigner une quantité comprise entre 1 et 100 et une couleur'
      );
      return;
    } else {
      //Condition pour ajouter dans le panier couleur et quantité définit

      //Récupération des informations de l'article à ajouter au panier
      let info = {
        idProduit: article._id,
        color: selectColor,
        quantity: Number(selectQuantity),
        nom: article.name,
        description: article.description,
        imageUrl: article.imageUrl,
        imgAlt: article.altTxt,
        price: (article.price) / 100
      };
      console.log(info.idProduit);

      //init du localStorage

      let purchaseStorage = JSON.parse(localStorage.getItem('produit'));

      //alerte que l'utilisateur aura quand il ajoutera un article dans le panier

      const alertConfirmation = () => {
        if (
          window.confirm(
            `${selectQuantity} ${article.name} de couleur ${selectColor} bien ajouté à votre panier pour le consulter appuyer sur OK `
          )
        ) {
          //envoie l'utilisateur sur la page panier
          window.location.href = 'panier.html';
        } else {
          location.reload(); //reload de la page actuelle
        }
      };

      if (purchaseStorage) {
        const foundStorage = purchaseStorage.find(
          (p) => p.idProduit === article._id && p.color === selectColor
        );
        if (foundStorage) {
          //Si dans le panier il y a un produit avec le même id et la même couleur
          let totalQuantity =
            parseInt(info.quantity) + parseInt(foundStorage.quantity);
          foundStorage.quantity = totalQuantity;
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          alertConfirmation();
        } else {
          //Sinon (produit different de ceux deja commandé)

          purchaseStorage.push(info);
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          alertConfirmation();
        }
      } else {
        //s'il n'y a rien dans le panier création array
        purchaseStorage = [];
        //On push les informations du localStorage dans le array
        purchaseStorage.push(info);

        localStorage.setItem('produit', JSON.stringify(purchaseStorage));
        alertConfirmation();
      }
    }
  });
}
let teddisQuantiteTotlal = [];
let purchaseStorage = JSON.parse(localStorage.getItem('produit'));

if (purchaseStorage) {
  purchaseStorage.forEach((teddies) => {
    teddisQuantiteTotlal.push(teddies.quantity)
    console.log(teddisQuantiteTotlal);
    document.getElementById("qte_in_basket").textContent = `${eval(teddisQuantiteTotlal.join('+'))}`;
  })
}
