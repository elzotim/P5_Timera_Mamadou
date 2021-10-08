window.addEventListener("load" ,function(){
    console.log("loaded")
    getTedis() 

})



const searchParams = new URLSearchParams(location.search);

const id_teddies = searchParams.get("_id");

const teddies_Url = `http://localhost:3000/api/teddies/${id_teddies}`;

//console.log(teddies_Url);
var getTedis =()=>{
fetch(teddies_Url)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        console.log(product);
        console.log(product.name);
        console.log(product._id);
        console.log(product.price);
        listerElemnt(data);


    })}
   
let panier=document.getElementById('iconePanier')
let list_Type=document.getElementById('list_Type')
list_Type.style.listStyleType="none"
panier.style.color='Black'
panier.style.cursor="pointer"
panier.addEventListener("click", function() {
    window.location.href = "panier.html";
  }); 



function listerElemnt(data) {
    //parcourir la liste 
    console.log(data)

    const card = document.getElementById("element");
    let options = "";
    for (color of data.colors) {
        console.log(color);
        options += `<option value="${color}">${color}</option>`



    }
    card.innerHTML += `
          <div class="  ">
              <div class="card border bg-light  p-3 mb-5 bg-body rounded">
                  <div class="card-body ">
                      <div class="row">
                         <div class="col-6">
                            <a href="">
                            <img src="${data.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${data.name}"></a>
                          </div>
                         
                          <div class=" col-6 mt-3 row" id="caracteristique">
                              <h5 class="card-title col-3">${data.name}</h5>
                          
                              <div class=" col-sm-5 text-end mt-3">
                                 <h5 class="card-title">${data.price / 100 + " €"}</h5>
                                </div>
                                
                                <p class="card-text text-truncate">${data.description}</p>
                                <select>${options}
                                </select>
                             </div>   
                            
                  </div>
              </div>
          </div>`;
    //creation de l'element button dans l'element id=carateristique   
    const caracteristique = document.getElementById("caracteristique")
    let AJouterTeddy = document.createElement("button");
    caracteristique.appendChild(AJouterTeddy);
    AJouterTeddy.type = 'submit';
    AJouterTeddy.name = 'Ajourt';
    AJouterTeddy.id = 'submit';
    AJouterTeddy.textContent = "Ajouter au panier";
    AJouterTeddy.className = "btn btn-secondary"



    //
    AJouterTeddy.addEventListener("click", function (event) {
        console.log("vous venez d'ajouter");
        event.preventDefault();

        //  les donnés  teddy à envoyer dans localStorage
        const select = document.querySelector('select');
        console.log()
        let teddiesChoisie = {
            teddyImage: data.imageUrl,
            teddyNom: data.name,
            teddyId: data._id,
            quatity: 1,
            teddyColor: select.value,
            teddyPrice: data.price / 100,
        };


        let HisTeddies = JSON.parse(localStorage.getItem('NouveauArticle'));
        if (HisTeddies) {
            const envoiePagner = window.confirm("Souhaitez-vous ajouté " + teddiesChoisie.teddyNom + " " + ' au panier ?')
            if (envoiePagner == true) {
                HisTeddies.push(teddiesChoisie);
                localStorage.setItem('NouveauArticle', JSON.stringify(HisTeddies));
                window.location.href = "panier.html";
            } else {
                window.location.href = "index.html";

            }
        }
        else {
            HisTeddies = [];
            const envoiePagner = window.confirm("Souhaitez-vous ajouté " + teddiesChoisie.teddyNom + " " + ' au panier ?')

            if (envoiePagner == true) {
                HisTeddies.push(teddiesChoisie);
                localStorage.setItem('NouveauArticle', JSON.stringify(HisTeddies));
                window.location.href = "panier.html";
            } else {
                window.location.href = "index.html";

            }
        }
    }
    );



}