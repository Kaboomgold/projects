class SizableInput {

    static span = document.createElement('span');
    #input = null;

    static {
        SizableInput.span.classList = 'simple';
        SizableInput.span.style.visibility = 'hidden';
        SizableInput.span.style.position = 'absolute';
        document.body.append(SizableInput.span);
    }

    constructor(input) {
        this.#input = input;
        this.resize_input(2);

        if(input.tagName == 'SELECT') {
            this.#add_resize_on_change();
        } else {
            this.#add_resize_on_keyown();
        }
        
    }

    #add_resize_on_change() {
        this.#input.addEventListener('change', e => {
            this.resize_input(2);
        });
    }

    #add_resize_on_keyown() {
        this.#input.addEventListener('keydown', e => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'ArrowDown':
                case 'Shift':
                    break;
                default: {
                    if(e.key == 'Backspace')
                        this.resize_input(-5);
                    else
                        this.resize_input(12);
                }
            }
        });
    }

    resize_input(spacing = 0) {
        SizableInput.span.textContent = this.#input.value;
        const {width, height} = SizableInput.span.getBoundingClientRect();
        this.#input.style.width = `${width + spacing}px`;
        this.#input.style.height = `${height}px`;
    }

}

export { SizableInput }