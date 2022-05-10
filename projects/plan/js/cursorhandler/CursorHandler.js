import { StyleSheetHandler } from '../general/StylesheetHandler.js';

class CursorHandler {
    #registeredCursors = [];
    #cursor = document.createElement('div');
    #cursorPos = 'center';
    #cursorLastPosX = 0;
    #cursorLastPosY = 0;
    #stylesheetHandler = new StyleSheetHandler();
    #stylesheet = null;

    constructor() {
        this.#cursor.className = 'cursor';
        this.#stylesheet = this.#stylesheetHandler.NewStyleSheet('cursor');

        this.#event();

        document.body.append(this.#cursor);
        this.#stylesheet.AddStyleRule('.cursor { left: 0px; top: 0px; }', 'cursor-pos', 0);
        
        this.#stylesheet.AddStyleRule(`.cursor { background-image: url("./images/cursor/dark-arrow3.png"); }`, 'cursor-image', 0);
    }

    #event() {
        window.addEventListener('mousemove', e => {
            this.#SetCursorPos(e.clientX, e.clientY);
        });
    }

    #SetCursorPos(posx, posy) {
        this.#cursorLastPosX = posx;
        this.#cursorLastPosY = posy;
        
        switch(this.#cursorPos) {
            case 'center': {
                this.#stylesheet.RefreshStyleRule(`.cursor {
                    left: ${posx - 10}px !important;
                    top: ${posy - 10}px !important;
                }`, 'cursor-pos');

                // this.#cursor.style.left = `${posx - 10}px`;
                // this.#cursor.style.top = `${posy - 10}px`;
            }
                break;
            case 'right bottom': {

                this.#stylesheet.RefreshStyleRule(`.cursor {
                    left: ${posx}px !important;
                    top: ${posy}px !important;
                }`, 'cursor-pos');

                // this.#cursor.style.left = `${posx}px`;
                // this.#cursor.style.top = `${posy}px`;
            }
                break;
        }
    }

    RegisterCursor(Cursor) {
        this.#registeredCursors.push(Cursor);
    }

    SetCursorType(cursorName) {
        
        this.#registeredCursors.forEach(cursor => {
            const name = cursor.GetName();

            if(cursorName == name) {
                this.#cursorPos = cursor.position;
                this.#stylesheet.RefreshStyleRule(`.cursor { background-image: url(${cursor.GetUrl()}); }`, 'cursor-image');

                // this.#cursor.style.backgroundImage = `url(${cursor.GetUrl()})`;
                this.#SetCursorPos(this.#cursorLastPosX, this.#cursorLastPosY);
            }
        });
    }
}

export { CursorHandler }