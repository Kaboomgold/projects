
export default class CreateListing {
    #inputGroups = [];
    baseElement = null;
    inputPlaceHolders = [];
    inputTypes = [];
    inputGroupCount = 1;

    constructor(className){
        this.baseElement = document.createElement('div');

        if (className != null || className != ''){
            this.baseElement.className = className;
        }

        this.#GenerateAddButton();
    }

    #GenerateAddButton(){
        const button = document.createElement('button');
        button.textContent = "Add";
        button.addEventListener('click', () => {
            this.#CreateInputGroup();
            this.#AddEvents();
        });
        this.baseElement.append(button);
    }

    #CreateInputGroup(){
        const group = document.createElement('div');
        group.className = 'inputGroup';
        let groupingList = [];

        for (let i = 0; i < this.inputCount; i++) {

            let input;

            if (this.inputTypes.length > 0) {
                if (Array.isArray(this.inputTypes[i])) {

                    input = document.createElement('select');

                    this.inputTypes[i].forEach(option => {
                        const optionDom = document.createElement('option');
                        optionDom.textContent = option;
                        input.append(optionDom);
                    });

                } else {
                    input = document.createElement('input');
                    input.type = this.inputTypes[i];
                    input.className = 'input-item';

                    if (this.inputPlaceHolders[i] != null) {
                        input.placeholder = this.inputPlaceHolders[i];
                    }
                }
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'input-item';

                if (this.inputPlaceHolders[i] != null) {
                    input.placeholder = this.inputPlaceHolders[i];
                }
            }

            groupingList.push(input);
            group.append(input);
        }

        this.#inputGroups.push([group, groupingList]);
        this.baseElement.prepend(group);
    }

    #AddEvents() {
        this.#inputGroups.forEach(inputGroup => {
            inputGroup[0].addEventListener('dblclick', () => {
                this.RemoveInputGoup(inputGroup[0]);
            });
        });
    }

    /**
     * Gives back an twodimensional array containing the values from all generated inputs.
     * @return {Array} 
     * */
    GetItemList(){
        let list = [];

        for(let i = 0; i < this.#inputGroups.length; i++){
            let listing = [];
            for (let x = 0; x < this.#inputGroups[i][1].length; x++){
                const input = this.#inputGroups[i][1][x];

                switch (input.type) {
                    case 'checkbox':
                        listing.push(input.checked);
                        break;
                    default: 
                        listing.push(input.value);
                }
            }
            list.push(listing);
        }
        
        return list;
    }

    /**
     * Removes the domElement and the stored inputgroup from the listing object.
     * @param {Element} inputGroup Input group to be deleted.
     */
    RemoveInputGoup(inputGroup) {
        for (let i = 0; i < this.#inputGroups.length; i++) {
            if (this.#inputGroups[i][0] == inputGroup) {
                const inputGroup = this.#inputGroups.splice(i, 1);
                inputGroup[0][0].remove();
            }
        }
    }
}