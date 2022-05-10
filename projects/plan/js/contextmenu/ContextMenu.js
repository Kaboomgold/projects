import { ContextMenuBase } from "./ContextMenuBase.js";

class ContextMenu extends ContextMenuBase {
    #rect = null;
    group = null;

    constructor() { 
        super();
        this.#GenerateStyling();
        this.#SetupClickEvents();
    }

    #GenerateStyling() {
        let stylesheet;

        const styleRules = [`
            .contextmenu {
                width: 175px;
                border: 1px solid gray;
                box-shadow: 2px 2px 3px rgb(114, 114, 114);
                font-family: "Consolas", 'Courier New', monospace;
                z-index: 999;
                background-color: white;
                position: absolute;
            }`,
            `.contextmenu {
                left: 100px;
                top: 100px;
            }`,
            `.contextmenu-option > .contextmenu {
                left: 100%;
                top: 0px;
                display: none;
                background-color: white;
            }`,
            `.contextmenu-option:hover .contextmenu {
                display: block;
            }`,
            `.contextmenu .contextmenu-option {
                font-weight: bold;
                width: 100%;
                height: 20px;
                display: flex;
                flex-direction: row;
                position: relative;
            }`,
            `.contextmenu .contextmenu-option:hover {
                background-color: rgb(243, 243, 243);
            }`,
            `.contextmenu .contextmenu-option:active {
                background-color: rgb(235, 235, 235);
            }`,
            `.contextmenu .contextmenu-option > div {
                user-select: none;
                flex: 1;
            }`,
            `.contextmenu .contextmenu-option > .name {
                flex: 4;
            }`,
            `.contextmenu .contextmenu-option > .expand-arrow {
                text-align: center;
            }`];

        if(0 in document.styleSheets) {
            stylesheet = document.styleSheets[0];

            styleRules.forEach(rule => {
                stylesheet.insertRule(rule);
            });
        } else {
            const stylesheet = new CSSStyleSheet();

            styleRules.forEach(rule => {
                stylesheet.insertRule(rule);
            });

            document.adoptedStyleSheets = [stylesheet];
        }
    }
    
    #SetupClickEvents() {
        window.addEventListener('contextmenu', e => {
            e.preventDefault();
            this._elm_contextMenu.remove();

            if(this.group != null) {
                if(this.group in this._groups) {
                    console.log(this._groups);
                    this._elm_contextMenu.innerHTML = '';
                    const options = this._groups[this.group];

                    for(let i = 0; i < options.length; i++) {
                        this._elm_contextMenu.append(options[i].GetContextMenuOption());
                    }

                }
            }

            document.body.append(this._elm_contextMenu);

            this._elm_contextMenu.style.left = `${e.clientX}px`;
            this._elm_contextMenu.style.top = `${e.clientY}px`;

            this.#rect = this._elm_contextMenu.getBoundingClientRect();

            if(this.IsOutOfBoundsX()) {
                this._elm_contextMenu.style.left = `${e.clientX - this.#rect.width}px`;
            }

            if(this.IsOutOfBoundsY()) {
                this._elm_contextMenu.style.top = `${e.clientY - this.#rect.height}px`;
            }

            window.addEventListener('click', () => {
                this._elm_contextMenu.remove();
            }, {once:true});
        });
    }

    IsOutOfBoundsX() {
        return ((window.innerWidth - this.#rect.x) - this.#rect.width) < 0;
    }

    IsOutOfBoundsY() {
        return ((window.innerHeight - this.#rect.y) - this.#rect.height) < 0;
    }
}

export { ContextMenu }