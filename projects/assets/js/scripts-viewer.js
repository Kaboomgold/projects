import { AjaxHandler } from "./ajax-handler.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class ScriptsViewer {

    #scripts_element = null;
    #viewer = null;

    constructor(scripts_element) {
        this.#scripts_element = scripts_element;
        this.#viewer = scripts_element.querySelector('.script');
    }

    get Viewer() {
        return this.#viewer;
    }

    #generateScripts() {
        const listItems = [...this.#scripts_element.querySelectorAll('.file')];

        listItems.forEach(listItem => {
            listItem.addEventListener('click', e => {
                const fileName = listItem.querySelector('p').textContent;

                this.#getColorizedScript(fileName, colorized_script => {
                    this.#addColorizedScript(colorized_script);
                });        
            });
        });

        Dom_Utils.domElementSelector(listItems);
    }

    clear() {
        this.#viewer.classList.remove('viewing');
        this.#viewer.innerHTML = '';
    }

    viewScript(scriptName) {
        this.#getColorizedScript(scriptName, colorized_script => {
            this.#viewer.classList.add('viewing');
            this.#addColorizedScript(colorized_script);
        });   
    }

    #getColorizedScript(script_name, callback) {
        AjaxHandler.Ajax_JSON_Request(`./php/ajax/get-colorized-script-html.php`, colorized_script => {
            callback(colorized_script);
        }, { script_name: script_name });
    }

    #addColorizedScript(colorized_script) {
        this.#viewer.innerHTML = colorized_script;
    }

}

export { ScriptsViewer }