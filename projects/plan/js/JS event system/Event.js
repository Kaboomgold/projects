export class Event {

    #id = null;
    #delegate = null;
    #key;

    constructor(delegate, id, key) {
        this.#delegate = delegate;
        this.#id = id;
        this.#key = key;
    }

    GetKey() {
        return this.#key;
    }

    GetId() {
        return this.#id;
    }

    /**
     * Calls the callback function.
     * @param {Event} e Event to give to the callback.
     */
    Fire(e) {
        this.#delegate(e);
    }
}