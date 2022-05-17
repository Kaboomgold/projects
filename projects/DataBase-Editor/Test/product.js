import AjaxHandler from './AjaxHandler.js';
import CreateListing from './CreateListing.js';

const sendBtn = document.createElement('button');
sendBtn.textContent = 'Send';

const listing = new CreateListing('product-listing');
listing.inputCount = 1;
listing.inputPlaceHolders = ['producttype'];

document.querySelector('#product-table').append(listing.baseElement);
listing.baseElement.append(sendBtn);

const deletToggles = document.querySelectorAll('.delete-toggle');

sendBtn.addEventListener('click', () => {
    if (listing.GetItemList().length > 0) {
        AjaxHandler.makeRequest('insertProduct.php', 'product-names', listing.GetItemList(), true);
    }

    let deleteValues = [];
    for (let i = 0; i < deletToggles.length; i++) {
        if (deletToggles[i].checked == true) {
            deleteValues.push(deletToggles[i].getAttribute('data'));
        }
    }

    if (deleteValues.length > 0) {
        AjaxHandler.makeRequest('insertProduct.php', 'delete-values', deleteValues, true);
    }
});

window.addEventListener('dblclick', (e) => {
    if (e.target.className == 'input-item') {
        const inputGroup = e.target.parentElement;
        listing.RemoveInputGoup(inputGroup);
        inputGroup.remove();
    }
});
