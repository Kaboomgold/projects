import { OptionInterface } from "../OptionInterface.js";

export class Option {

    #type = 'button';
    #text = 'NO TEXT';
    #className = '';

    constructor(text, className, type = 'button') {
        new OptionInterface(this);

        this.#type = type;
        this.#text = text;
        this.#className = `${className} ${type}`;
    }

    GetType() {
        return this.#type;
    }

    GetText() {
        return this.#text;
    }

    GetClassName() {
        return this.#className;
    }

}