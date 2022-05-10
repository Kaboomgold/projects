import { Item } from "./Item.js";
import { ItemManager } from "./ItemManager.js"; 
import { Canvas } from "../general/Canvas.js";


/**
 * @class PaperSheetItem
 * @extends Item
 */

export class PaperSheetItem extends Item {
    #elm_element;
    #canvas_element;

    
    /**
     * @param { Element } elm_element The element that should be the papersheet.
     * @param { boolean } [bool_isDraggable=false] Is the item draggable.
     */
    constructor(elm_element, bool_isDraggable = false) {
        super(elm_element, bool_isDraggable);

        this.#elm_element = elm_element;
        this.#canvas_element = elm_element.querySelector('canvas');

        ItemManager.SetPaperSheet(this);
    }

    /**
     * @function GetCanvas
     * @public
     * @memberof PaperSheetItem
     * @returns { Canvas } Returns an instance of a Canvas Object
     */
    GetCanvas() {
        return new Canvas(this.#canvas_element);
    }

    /**
     * @function GetAbsPosX
     * @public
     * @memberof PaperSheetItem
     * @returns returns the absolute offset to the left relative to the window.
     */
    GetAbsPosX() {
        const posX = this.GetElement().style.left.match(/[0-9]+|-[0-9]+/g)[0];
        return Math.abs(parseFloat(posX));
    }

    /**
     * @function GetAbsPosY
     * @public
     * @memberof PaperSheetItem
     * @returns returns the absolute offset to the top relative to the window.
     */
    GetAbsPosY() {
        const posY = this.GetElement().style.top.match(/[0-9]+|-[0-9]+/g)[0];
        return Math.abs(parseFloat(posY));
    }
}