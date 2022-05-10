import { IEventAction } from "../IEventAction.js";

export class OnKeyUp {
    #onKeyUp = [];

    constructor(onKeyUp) {
        new IEventAction(this);

        this.#onKeyUp = onKeyUp;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onKeyUp = this.#onKeyUp;

        window.addEventListener('keyup', e => {
            for (const E in onKeyUp) {
                if (e.key == onKeyUp[E].GetKey()) {
                    onKeyUp[E].Fire(e);
                }
            }
        });
    }
}