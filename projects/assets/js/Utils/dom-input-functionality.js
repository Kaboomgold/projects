import { SizableInput } from "./sizable-input.js";

class DOMInputFunctionality {
    static DOMIF_inputs = [];

    #input = null;
    #solidified = false;
    #curr_solidify_elm = null;
    #si = null;

    constructor(elm_input) {
        this.#input = elm_input;
        DOMInputFunctionality.DOMIF_inputs.push(this);
    }

    /**
     * The input element.
     */
    get input() {
        return this.#input;
    }

    /**
     * If the input is solidified.
     */
    get is_solidified() {
        return this.#solidified;
    }

    set value(value = null) {
        if(value != null) {
            this.#input.value = value;
        }

        if(this.#si) {
            this.#si.resize_input();
        }

        return value;
    }

    /**
     * Makes the input resize itself when typing.
     */
    make_sizable() {
        const si = new SizableInput(this.#input);
        this.#si = si;
    }

    /**
     * Converts the input element to a non input element.
     * @param {Element} element The element that the input should be converted to.
     */
    solidify(element) {
        if(!this.is_solidified) {
            element.textContent = this.#input.value+' ';
            const attrs = this.#input.getAttributeNames();

            attrs.forEach(attr_name => {
                switch(attr_name) {
                    case 'name':
                    case 'value':
                    case 'type':
                        break;
                    default: {
                        element.setAttribute(attr_name, this.#input.getAttribute(attr_name));
                    }
                }
            });

            this.#input.parentElement.replaceChild(element, this.#input);
            this.#curr_solidify_elm = element;
            this.#solidified = true;
            
        } else {
            console.warn(`Can't solidify a already solidified input.`);
        }
    }

    /**
     * Converts the changed input element to its original state.
     */
    unsolidify() {
        if(this.is_solidified) {
            this.#curr_solidify_elm.parentElement.replaceChild(this.#input, this.#curr_solidify_elm);
            this.#solidified = false;
        } 
    }

}

export { DOMInputFunctionality }