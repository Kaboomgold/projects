/**
    * When inherited make the class interface capable.
    * @param {class} currentClass class that the interface should take effect on.
    * */
export class Interface {
    #currentClass = null;

    constructor(currentClass) {
        this.#currentClass = currentClass;
    }

    HasMethod(methodName, childClass = '') {
        if (typeof (this.#currentClass[methodName]) != 'function') {
            console.error(`Error: Interface(${childClass.constructor.name}) | The class ${this.#currentClass.constructor.name} needs to have a ${methodName} method.`);
        }
    }
}