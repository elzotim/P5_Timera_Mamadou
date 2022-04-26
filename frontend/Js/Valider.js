
window.addEventListener("load", function () {
    console.log("loaded")
    valideCommande()
})
var valideCommande = () => {
    let orderId = localStorage.getItem('responseOrder');
    console.log(orderId);
    var orderIdd = document.getElementById("orderId")
    orderIdd.innerHTML += ` <p id="ref">NUMERO DE SUIVI DE PRODUIT(S) </p> <strong id="ordercss">${orderId} <strong> `
    var ordercss = document.getElementById("ordercss")
    ordercss.style.color = '#9100ff'
    // récupération du prix total de la commande

    // Efface localStorage
}