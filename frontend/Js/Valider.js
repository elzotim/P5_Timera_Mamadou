let orderId = localStorage.getItem('responseOrder');
console.log(orderId);
// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);
var prix=document.getElementById("recap")
prix.innerHTML +=`"Le prix TOTAL :  " ${totalPrice}`
// Efface localStorage
localStorage.clear();