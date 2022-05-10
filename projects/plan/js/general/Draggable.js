export class Dragable {
    #elm_item;
    #float_newOffsetX = 0;
    #float_newOffsetY = 0;
    #abbController = new AbortController();
    allowDragging = true;

    constructor(elm_item) {
        this.#elm_item = elm_item;

        this.#prepare();
        this.#StartDrag();
    }

    #prepare() {
        this.#elm_item.style.position = 'absolute';

        this.#elm_item.style.left = `-${this.#elm_item.clientWidth/2}px`;
        this.#elm_item.style.top = `-${this.#elm_item.clientHeight/2}px`; 
    }

    #StartDrag() {

        window.addEventListener('mousedown', e => {
            if(e.target.tagName != 'INPUT') {
                e.preventDefault();
            }
            e.stopPropagation();
            this.#abbController = new AbortController();
            
            if (e.target == this.#elm_item) {
                this.#float_newOffsetX = parseFloat(this.#elm_item.style.left.match(/[0-9]+|-[0-9]+/g)[0]);
                this.#float_newOffsetY = parseFloat(this.#elm_item.style.top.match(/[0-9]+|-[0-9]+/g)[0]);

                this.#Drag(e.clientX, e.clientY);
            }

        }, {signal: this.#abbController.signal });
    }

    #Drag(float_offsetX, float_offsetY) {

        window.addEventListener('mousemove', e => {
            if(e.target.tagName != 'INPUT') {
                e.preventDefault();
            }
            e.stopPropagation();

            this.#elm_item.style.top = `${e.clientY - (float_offsetY - this.#float_newOffsetY)}px`;
            this.#elm_item.style.left = `${e.clientX - (float_offsetX - this.#float_newOffsetX)}px`;
            
        }, {signal: this.#abbController.signal });

        this.#StopDrag();
    }

    #StopDrag() {
        window.addEventListener('mouseup', e => {
            e.preventDefault();
            e.stopPropagation();

            this.#abbController.abort();
        }, {signal: this.#abbController.signal });
    }

    GetCurrentPos() {
        return {
            x: this.#float_newOffsetX,
            y: this.#float_newOffsetY
        }
    }
}