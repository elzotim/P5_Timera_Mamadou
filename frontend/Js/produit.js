const searchParams = new URLSearchParams(location.search);

const id_teddies = searchParams.get("_id");

const teddies_Url = `http://localhost:3000/api/teddies/${id_teddies}`;

//console.log(teddies_Url);

fetch(teddies_Url)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        console.log(product);
        console.log(product.name);
        console.log(product._id);
        console.log(product.price);
        listerElemnt(data);

    })

    function listerElemnt(data) {
        //parcourir la liste 
       
           
            const card = document.getElementById("element");
            
            //const price = convertPrice(teddies.price);
            card.innerHTML += `
          <div class="  ">
              <div class="card border bg-light  p-3 mb-5 bg-body rounded">
                  <div class="card-body ">
                      <div class="row">
                         <div class="col-6">
                            <a href="">
                            <img src="${data.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${data.name}"></a>
                          </div>
                         
                          <div class=" col-6 mt-3" >
                              <h5 class="card-title">${data.name}</h5>
                          
                              <div class=" col-sm-5 text-end mt-3">
                                 <h5 class="card-title">${data.price +" €"}</h5>
                                </div>
                                <p class="card-text text-truncate">${data.description}</p>
                                <a href="panier.html?_id=${data._id}" class="btn btn-secondary">Ajouter au panier pour ${data.price +" €"} </a>
                                <select>
                                <option>${data.colors[0]}</option>
                                <option>${data.colors[1]}</option>
                                <option>${data.colors[2]}</option>
                                <option>${data.colors[3]}</option>
                                
                                <option>${data.colors[4]}</option>


                                </select>
                             </div>   
                            
                  </div>
              </div>
          </div>`;
        }
    