export class Canvas {
    #elm_canvas;
    
    constructor(elm_canvas) {
        this.#elm_canvas = elm_canvas;
    }

    GetElement() {
        return this.#elm_canvas;
    }

    GetContext2D() {
        return this.#elm_canvas.getContext('2d');
    }
}