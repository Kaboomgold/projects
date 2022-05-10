import { IEventAction } from "../IEventAction.js";

export class OnMouseUp {
    #onLeftEvents = [];
    #onRightEvents = [];

    constructor(onLeft, onRight) {
        new IEventAction(this);

        this.#onLeftEvents = onLeft;
        this.#onRightEvents = onRight;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onLeft = this.#onLeftEvents;
        const onRight = this.#onRightEvents;

        window.addEventListener('mouseup', e => {

            for (const E in onLeft) {
                if (e.button == 0) {
                    onLeft[E].Fire(e);
                }
            }

            for (const E in onRight) {
                if (e.button == 2) {
                    onRight[E].Fire(e);
                }
            }
        });
    }
}