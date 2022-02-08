window.addEventListener("load" ,function(){
    console.log("loaded")
    recupererListe()  ;
    quantitéProduit()
})

// get de l'api
var recupererListe=()=>{
    fetch(url_api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        /*console.log(data[0].name)*/
        listerTeddies(data);
        /*return data.length*/
    })
    /*.then(function(des){
        console.log(des)
    })*/
    .catch((erreur) => console.log("erreur : " + erreur));


}
//fonction de recuperation de liste
function listerTeddies(data) {
    //parcourir la liste 
    for (teddies of data) {
       
        const card = document.getElementById("liste");
        
        //const price = convertPrice(teddies.price);
        card.innerHTML += `
      <div class="col-lg-4 pb-6 ">
          <div class="card border bg-light  p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                  <div class="row">
                      <a href="">
                      <img src="${teddies.imageUrl}" class="img-fluid img-thumbnail  " alt="${teddies.name}"></a>

                      <div class="col-6  mt-3 row" >
                          <h5 class=" col-9 ">${teddies.name}</h5>
                      
                          <h5 class="   text-center">${teddies.price/100 +" €"}</h5>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${teddies.description}</p>
                  <a href="./produit.html?_id=${teddies._id}" class="btn btn-secondary">Acheter une nounours</a>
              </div>
          </div>
      </div>`;
    }
  //////////afficher qte par 
}

//////////afficher qte par 
let HisTeddies = JSON.parse(localStorage.getItem('NouveauArticle'));
var quantitéProduit =()=>{
let teddisQuantiteTotlal =[];

if (HisTeddies){
    HisTeddies.forEach((teddies)=>{
        teddisQuantiteTotlal.push(teddies.quatity)
        console.log(teddisQuantiteTotlal);
        document.getElementById("qte_in_basket").textContent=`${eval(teddisQuantiteTotlal.join("+"))}`;
        ;
    })
}
}