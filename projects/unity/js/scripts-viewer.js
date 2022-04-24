import { AjaxHandler } from "./ajax-handler.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class ScriptsViewer {

    constructor() {
        this.#generateScripts();
    }

    #generateScripts() {
        const scriptsList = document.querySelector('.script-list');
        const listItems = [...scriptsList.children];

        listItems.forEach(listItem => {
            listItem.addEventListener('click', e => {
                this.#getColorizedScript(listItem.textContent, colorized_script => {
                    this.#addColorizedScript(colorized_script);
                });        
            });
        });

        Dom_Utils.domElementSelector(listItems);
    }

    #getColorizedScript(script_name, callback) {
        AjaxHandler.Ajax_JSON_Request(`./php/ajax/get-colorized-script-html.php`, colorized_script => {
            callback(colorized_script);
        }, { script_name: script_name });
    }

    #addColorizedScript(colorized_script) {
        document.querySelector('.scripts .script').innerHTML = colorized_script;
    }

}

export { ScriptsViewer }