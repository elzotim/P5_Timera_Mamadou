//Variable du tableau présent dans le localstorage
let productRegister = localStorage.getItem("NouveauArticle")
  ? JSON.parse(localStorage.getItem("NouveauArticle"))
  : [];
console.log(productRegister);
//Sélection de la classe ou injecter le code html
//Affichage des produits du panier
const positionElement = document.querySelector("#cart__items");
AffichageElement();
console.log(positionElement  );
function AffichageElement() {
  if (productRegister.length !== 0) {
    let productPanier = "";

    for (let a = 0; a < productRegister.length; a++) {
      productPanier += `
    <article class="cart__item" data-index = "${a}">
   <div class="cart__item__img">
     <img src="${productRegister[a].teddyImage}" alt="${productRegister[a].alt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__titlePrice">
       <h2>${productRegister[a].teddyNom} ${
        productRegister[a].teddyColor
      }</h2>
       <p class="itemTotal">${
         productRegister[a].teddyPrice * productRegister[a].quantity
       } euros</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
           productRegister[a].quantity
         }">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem"><i id="product-id"   class="fas fa-trash btn"></i></p>
       </div>
     </div>
   </div>
 </article>`;
    }
    positionElement.innerHTML = productPanier;

    displayTotal();
    updateItem();
  } else {
    console.log("je  suis vide");
  }
}
//fonction pour la mise à jour du total du prix et des articles
function displayTotal() {
  let totalPriceCalcul = [];
  let totalQuantityCalcul = [];

  for (let t = 0; t < productRegister.length; t++) {
    let prixTotalPanier = productRegister[t].teddyPrice;
    let quantityPanier = productRegister[t].quantity;
    totalPriceCalcul.push(prixTotalPanier * quantityPanier);
    totalQuantityCalcul.push(quantityPanier);
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = totalPriceCalcul.reduce(reducer, 0);
  const totalQuantity = totalQuantityCalcul.reduce(reducer, 0);

  const displayTotalPrice = document.getElementById("totalPrice");
  displayTotalPrice.innerHTML = totalPrice;

  const displayTotalQuantity = document.getElementById("totalQuantity");
  displayTotalQuantity.innerHTML = totalQuantity;
}

//Suppression et modification du nombre d'article

let itemQuantity = document.querySelector(".itemQuantity");
function updateItem() {
  let article = document.querySelectorAll(".cart__item");

  for (let n = 0; n < article.length; n++) {
    const btnDelete = article[n].querySelector(".deleteItem");
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      const elt = e.target.closest("article");
      const index = elt.dataset.index;
      productRegister.splice(index, 1);
      localStorage.setItem("NouveauArticle", JSON.stringify(productRegister));
      elt.remove();
      AffichageElement();
      displayTotal();
    });
    const btnAddProduct = article[n].querySelector(".itemQuantity");
    btnAddProduct.addEventListener("input", (e) => {
      //on récupère l'index du produit dans le storage
      //on actualise la quantité
      //on actualise le total
      //on sauvegarde le localstorage
      const index = article[n].dataset.index;
      productRegister[index].quantity = parseInt(e.target.value);
      localStorage.setItem("NouveauArticle", JSON.stringify(productRegister));
      article[n].querySelector(".itemTotal").innerHTML = `${
        productRegister[index].quantity * productRegister[index].teddyPrice
      } euros`;

      displayTotal();
    });
  }
}
//---------Partie Formulaire

const btnSendForm = document.querySelector("#order");
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();

  //Récupérer les valeurs du formulaire
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  //Controle validation formulaire

  firstNameControl(contact);
  lastNameControl(contact);
  cityControl(contact);
  addressControl(contact);
  emailControl(contact);

  if (
    emptyBasket(productRegister) &&
    firstNameControl(contact) &&
    lastNameControl(contact) &&
    cityControl(contact) &&
    addressControl(contact) &&
    emailControl(contact)
  ) {
    localStorage.setItem("formulaireValues", JSON.stringify(contact));
    //Envoyer le formulaire et les produits sélectionnés vers l'API
    const products = productRegister.map((product) => product.id);
    const toSend = {
      products,
      contact,
    };
    postOrder(toSend);
  }

  //Mettre l'ensemble des valeurs dans le localstorage et récupérer l'id de commande
  function postOrder(toSend) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(toSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("order", JSON.stringify(response));
        document.location.href =
          "confirmation.html?orderId=" + response.orderId;
      });
  }
});
//Condition pour bloquer l'enregistrement d'une commande si le panier est vide
function emptyBasket(productRegister) {
  if (productRegister.length > 0) {
    return true;
  } else {
    alert("Votre panier est vide");
    return false;
  }
}
//Ensemble des fonctions regex afin de valider le formulaire
function firstNameControl(contact) {
  const regexPrenomNomVille = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
  };

  const firstName = contact.firstName;
  if (regexPrenomNomVille(firstName)) {
    return true;
  } else {
    const errorMsg = "Merci de transmettre des données valides";
    const displayError = document.querySelector("#firstNameErrorMsg");
    displayError.innerHTML = errorMsg;
    return false;
  }
}
function lastNameControl(contact) {
  const regexPrenomNomVille = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
  };
  const lastName = contact.lastName;
  if (regexPrenomNomVille(lastName)) {
    return true;
  } else {
    const errorMsg = "Merci de transmettre des données valides";
    const displayError = document.querySelector("#lastNameErrorMsg");
    displayError.innerHTML = errorMsg;
    return false;
  }
}
function cityControl(contact) {
  const regexPrenomNomVille = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
  };
  const city = contact.city;
  if (regexPrenomNomVille(city)) {
    return true;
  } else {
    const errorMsg = "Merci de transmettre des données valides";
    const displayError = document.querySelector("#cityErrorMsg");
    displayError.innerHTML = errorMsg;
    return false;
  }
}
function addressControl(contact) {
  const adress = contact.address;
  if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(adress)) {
    return true;
  } else {
    const errorMsg = "Merci de transmettre des données valides";
    const displayError = document.querySelector("#addressErrorMsg");
    displayError.innerHTML = errorMsg;
    return false;
  }
}
function emailControl(contact) {
  const mail = contact.email;
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(mail)) {
    return true;
  } else {
    const errorMsg = "Merci de transmettre des données valides";
    const displayError = document.querySelector("#emailErrorMsg");
    displayError.innerHTML = errorMsg;
    return false;
  }
}
