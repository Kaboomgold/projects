export class ItemManager {
    static #draggable_items = [];
    static #items = [];
    static #paperSheet;

    static SetPaperSheet(PaperSheetItem_paperSheet) {
        this.#paperSheet = PaperSheetItem_paperSheet;
    }

    static AddItem(item) {
        this.#items.push(item);
    }

    static AddDraggableItem(item) {
        this.#draggable_items.push(item);
    }

    static GetDraggableItems() {
        return this.#draggable_items;
    }

    static GetPaperSheet() {
        return this.#paperSheet;
    }
}