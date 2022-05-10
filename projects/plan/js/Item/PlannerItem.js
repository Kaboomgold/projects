import { Item } from "./Item.js";
import { ProgramManager } from "../ProgramManager.js";
import { ItemManager } from "../Item/ItemManager.js";

class PlannerItem extends Item {
    #plannerElement = document.createElement('div');
    #innerElement = document.createElement('div');
    #nameInput = document.createElement('input');
    #icon = ProgramManager.iconHandler.cogwheel_icon();
    #propertyContainer = document.createElement('div');
    #addPropertyBtn = document.createElement('button');
    
    constructor() {
        const plannerElement = document.createElement('div');
        super(plannerElement, true);
        this.#plannerElement = plannerElement;
        this.#plannerElement.append(this.#innerElement);
        this.#innerElement.append(this.#icon);
        this.#innerElement.append(this.#nameInput);

        this.#innerElement.append(this.#propertyContainer);
        this.#innerElement.append(this.#addPropertyBtn);

        this.#innerElement.className = 'planner-element';
        this.#nameInput.type = 'text';
        this.#nameInput.className = 'header-input';
        this.#nameInput.placeholder = 'Name';
        this.#nameInput.spellcheck = false;

        this.#propertyContainer.className = 'poperty-container';
        this.#addPropertyBtn.className = 'add-property-button';
        this.#addPropertyBtn.type = 'button';
        this.#addPropertyBtn.textContent = '+';
    }

    AddProperty(Property_prop) {
        const prop_item = Property_prop.GetItem();
    }

    Spawn(posX = 0, posY = 0) {
        const papersheet = ItemManager.GetPaperSheet();
        
        const relativePosX = papersheet.GetAbsPosX() + posX;
        const relativePosY = papersheet.GetAbsPosY() + posY;

        this.SetPos(relativePosX, relativePosY);

        ItemManager.GetPaperSheet()
            .GetElement()
            .append(this.GetElement());
    }
}

export { PlannerItem }