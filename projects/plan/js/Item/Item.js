import { ItemManager } from "./ItemManager.js";
import { Dragable } from "../general/Draggable.js";

export class Item {
    #elm_element = null;
    #obj_drag = null;

    #bool_isDraggable = false;

    /**
     * @param { Element } elm_element The element that should be the papersheet.
     * @param { boolean } [bool_isDraggable=false] Is the item draggable.
     */
    constructor(elm_element, bool_isDraggable = false) {
        this.#elm_element = elm_element;

        if(bool_isDraggable) {
            this.#bool_isDraggable = bool_isDraggable;
            this.#obj_drag = new Dragable(elm_element);
            ItemManager.AddDraggableItem(this.#obj_drag);
        }

        ItemManager.AddItem(this);
    }

    GetElement() {
        return this.#elm_element;
    }

    IsDraggable() {
        return this.#bool_isDraggable;
    }

    SetDraggable(bool_canDrag) {
        this.#obj_drag.allowDragging = bool_canDrag;
    }

    SetPos(posx, posy) {
        this.#elm_element.style.left = `${posx}px`;
        this.#elm_element.style.top = `${posy}px`;
    }

}