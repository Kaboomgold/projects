import AjaxHandler from './AjaxHandler.js';
import CreateListing from './CreateListing.js';

const sendBtn = document.createElement('button');
sendBtn.textContent = 'Send';

const listing = new CreateListing('product-listing');
listing.inputCount = 5;
listing.inputPlaceHolders = ['producttypenummer', 'naam', 'prijs', 'voorraad', 'hoeveelheid'];

document.querySelector('#product-table').append(listing.baseElement);
listing.baseElement.append(sendBtn);

const deletToggles = document.querySelectorAll('.delete-toggle');

sendBtn.addEventListener('click', () => {
    if(listing.GetItemList().length > 0){
        AjaxHandler.makeRequest('insertProductType.php', 'product-types', listing.GetItemList(), true);
    }

    let deleteValues = [];
    for(let i = 0; i < deletToggles.length ;i++) {
        if(deletToggles[i].checked == true){
            deleteValues.push(deletToggles[i].getAttribute('data'));
        }
    }

    if(deleteValues.length > 0){
        AjaxHandler.makeRequest('insertProductType.php', 'delete-values', deleteValues, true);
    }
});

window.addEventListener('dblclick', (e) => {
    if(e.target.className == 'input-item') {
        const inputGroup = e.target.parentElement;
        listing.RemoveInputGoup(inputGroup);
        inputGroup.remove();
    }
});

//const deleteButtons = document.querySelectorAll('.delete-button');

/*
let producttypenummers = [];

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
        const producttypenummer = deleteButton.getAttribute('data');
        
    });
});*/