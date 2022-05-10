import { IEventAction } from "../IEventAction.js";

export class OnMouseMove {
    #onMoveEvents = [];

    constructor(onMove) {
        new IEventAction(this);

        this.#onMoveEvents = onMove;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onMove = this.#onMoveEvents;

        window.addEventListener('mousemove', e => {

            for (const E in onMove) {
                if (e.button == 0) {
                    onMove[E].Fire(e);
                }
            }

        });
    }
}