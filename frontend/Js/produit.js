window.addEventListener("load", function () {
    console.log("loaded")
    getTedis()
})




//console.log(teddies_Url);
var getTedis = () => {
    const searchParams = new URLSearchParams(location.search);
const id_teddies = searchParams.get("_id");
const teddies_Url = `http://localhost:3000/api/teddies/${id_teddies}`;
    fetch(teddies_Url)
        .then((response) => response.json())
        .then((data) => {
            listerElemnt(data);
            selectionTeddies(data)
        })
}
/*affichage des elelemnt*/
function listerElemnt(data) {
    //parcourir la liste 
    console.log(data)
    const card = document.getElementById("form-id");
    let options = "";
    var i = 0;
    for (color of data.colors) 
    {
        if(i == 0){
            options += `<option value="${color}">${color} (Couleur par defaut)</option>`;
        }else{
            options += `<option value="${color}">${color}</option>`
        }
    }
    card.insertAdjacentHTML('afterbegin', `
    <div class="container-xl block">
      
        <div class="row">
          <div class="col-6">
            <img
              src="${data.imageUrl}"
              class="img-fluid img-thumbnail p-1"
              alt="${data.name}"
            />
          </div>
          <div class="col-6 d-flex flex-column bd-highlight mb-3" id="caracteristique">
            <div class="row hauteur " height=100>
              <div class="col def">${data.name}</div>
              <div class="col def text-center">${data.price / 100 + " €"}</div>
            </div>

            <p  >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate nam quia optlam suscipit a omnis, distinctio placeat
              
            </p>
            <select class=" form-select form-select-sm hauteur" name="color" id="color-id">
              ${options}
            </select>
            <select class="row form-select form-select-sm hauteur " name="num-product" id="num-product-id" >
              <option value="0">Selectionnez la quantité</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <button 
              class="btn btn-secondary text-center  "
              id="btn-basket"
              type="submit"
              name="ajout"
            >
              Ajouter au panier
            </button>
            <div id="output-id"></div>
          </div>
      
      </div>
    </div>`);
}
let HisTeddies = JSON.parse(localStorage.getItem('NouveauArticle'));
function selectionTeddies(data) {
    //creation de l'element button dans l'element id=carateristique   
    const caracteristique = document.getElementById("form-id")

       caracteristique.addEventListener("submit", function (event) {
        console.log("vous venez d'ajouter");
        event.preventDefault();
        //  les donnés  teddy à envoyer dans localStorage
        console.log()
        let teddiesChoisie = {
            teddyImage: data.imageUrl,
            teddyNom: data.name,
            teddyId: data._id,
            quatity: document.querySelector('#num-product-id').value,
            teddyColor: document.querySelector('#color-id').value,
            teddyPrice: data.price / 100,
        };
        var quatity= document.querySelector('#num-product-id').value;
       

        let HisTeddies = JSON.parse(localStorage.getItem('NouveauArticle'));
        if (HisTeddies && quatity != 0)
        
         {
           
            const envoiePagner = window.confirm("Souhaitez-vous ajouté " + teddiesChoisie.teddyNom + " " + ' au panier ?')
            if (envoiePagner == true && quatity != 0) {
                console.log(quatity);
                HisTeddies.push(teddiesChoisie);
                localStorage.setItem('NouveauArticle', JSON.stringify(HisTeddies));
                document.querySelector('#output-id').innerHTML =   "Le produit " + teddiesChoisie.teddyNom + `(quatité ${teddiesChoisie.quatity})  a bien été ajouté au panier`;
                HisTeddies[data.teddyId] = data;
            } else {
                document.querySelector('#output-id').innerHTML = "Veuillez selectionner la quatité svp.";
  
            }
        }
        else {
            HisTeddies = []   ;
            const envoiePagner = window.confirm("Souhaitez-vous ajouté " + teddiesChoisie.teddyNom + " " + ' au panier ?')
           
            if (envoiePagner == true && quatity !=0) {
                HisTeddies.push(teddiesChoisie);
                localStorage.setItem('NouveauArticle', JSON.stringify(HisTeddies));
                window.location.href = "panier.html";
            } else {
        document.querySelector('#output-id').innerHTML = "Veuillez selectionner la quatité svp.";
            }
        }
    }
    );
}
console.log(HisTeddies);
 /**
         * -----------------------------------------------------
         * Afficharge du nombre de produit dans le panier
         * -----------------------------------------------------
         * 
         */
let teddisQuantiteTotlal =[];

if (HisTeddies){
    HisTeddies.forEach((teddies)=>{
        teddisQuantiteTotlal.push(teddies.quatity)
        console.log(teddisQuantiteTotlal);
        document.getElementById("qte_in_basket").textContent=`${eval(teddisQuantiteTotlal.join('+'))}`;

    })
}




