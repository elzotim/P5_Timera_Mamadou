let orderId = localStorage.getItem('responseOrder');
console.log(orderId);
var orderIdd=document.getElementById("orderId")
orderIdd.innerHTML +=` <p id="ref">NUMERO DE SUIVI DE PRODUIT(S) </p> <strong id="ordercss">${orderId} <strong> `
// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);
var prix=document.getElementById("recap")
prix.innerHTML +=`<p id="idprix">PRIX TOTAL : </p>
<strong id="Price">${totalPrice} Euro </strong">`
// Efface localStorage

// Efface localStorage
localStorage.clear();