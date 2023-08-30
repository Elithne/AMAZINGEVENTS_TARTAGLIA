function createCards(arrayItems, containerId) {
    for(let item of arrayItems){
        let card = `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 my-1 d-flex align-items-stretch">
                <div class="card p-2 m-2 shadow-sm";">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between">
                            <p class="card-text p-2">Price: ${item.price}</p>                           
                            <div>
                                <a href="details.html" class="btn btn-danger">Details</a>
                            </div>                    
                        </div>                    
                    </div>                   
                </div>
            </div>`; 
        cardsContainer.innerHTML += card; 
    }
};

function createCategories(arrayItems, containerId) {
    for(let item of arrayItems){
        
        let checkbox = `
        <label class="form-check-label p-3">
        <input class="form-check-input" type="checkbox" name="" value="">
        <span class="form-option">${item.category}</span>
        </label> `; 
        checkboxContainer.innerHTML += checkbox; 
    }
};


