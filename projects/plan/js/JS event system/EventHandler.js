
import { EventType } from "./EventType.js";
import { Event } from "./Event.js";

import { OnKeyUp } from "./Events/OnKeyUp.js";
import { OnMouseDown } from "./Events/OnMouseDown.js";
import { OnKeyDown } from "./Events/OnKeyDown.js";
import { OnMouseMove } from "./Events/OnMouseMove.js";
import { OnMouseUp } from "./Events/OnMouseUp.js";

export class EventHandler {
    static #delegatePool = [];

    static eventType = EventType;

    static {
        this.#InitEvents();
        this.#OnKeyDown();
        this.#OnMouseMove();
        this.#OnMouseDown();
        this.#OnMouseUp();
        this.#OnKeyUp();
    }

    /**
     * Adds a callback to a delegate pool.
     * @param {function}  callback   Function to call on event fire.
     * @param {any}       id         To keep track of the function.      
     * @param {EventType} eventType  On which type of event the function should be called.
     */
    static AddEvent(callback, id, eventType, key = '') {
        if (!this.#IsFunc(callback)) {
            console.error('InputHandler: The first argument of the AddEvent() method needs to be of type function!');
            return;
        }

        const E = new Event(callback, id, key);
        this.#delegatePool[eventType].push(E);
    }

    /**
     * Removes an callback from an event pool.
     * @param {any} id Id of the function that needs to be removed.
     */
    static RemoveEvent(id) {
        for (const i in this.#delegatePool) {
            for (const E in this.#delegatePool[i]) {
                if (id == this.#delegatePool[i][E].GetId()) {
                    const index = this.#delegatePool[i].indexOf(this.#delegatePool[i][E]);
                    this.#delegatePool[i].splice(index, 1);
                }
            }
        }
    }

    static GetDelegatePool() {
        return this.#delegatePool;
    }

    static #IsFunc(checked) {
        return (typeof (checked) == 'function');
    }

    static #InitEvents() {
        for (const [key, value] of Object.entries(EventType)) {
            this.#delegatePool[value] = [];
        }
    }

    static #OnKeyUp() {
        const onKeyUp = this.#delegatePool[EventType.onKeyUp];

        const OKU = new OnKeyUp(onKeyUp);
    }

    static #OnKeyDown() {
        const onKeyDown = this.#delegatePool[EventType.onKeyDown];

        const OKD = new OnKeyDown(onKeyDown);
    }

    static #OnMouseUp() {
        const onLeft = this.#delegatePool[EventType.onLeftMouseUp];
        const onRight = this.#delegatePool[EventType.onRightMouseUp];

        const OMUE = new OnMouseUp(onLeft, onRight);
    }

    static #OnMouseDown() {
        const onLeft = this.#delegatePool[EventType.onLeftMouseDown];
        const onRight = this.#delegatePool[EventType.onRightMouseDown];

        const MDE = new OnMouseDown(onLeft, onRight);
    }

    static #OnMouseMove() {
        const onMove = this.#delegatePool[EventType.onMouseMove];

        const OMME = new OnMouseMove(onMove);
    }
}