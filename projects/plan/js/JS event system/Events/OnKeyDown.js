import { IEventAction } from "../IEventAction.js";

export class OnKeyDown {
    #onKeyDown = [];

    constructor(onKeyDown) {
        new IEventAction(this);

        this.#onKeyDown = onKeyDown;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onKeyDown = this.#onKeyDown;

        window.addEventListener('keydown', e => {
            for (const E in onKeyDown) {
                if (e.key == onKeyDown[E].GetKey()) {
                    onKeyDown[E].Fire(e);
                }
            }
        });
    }
}