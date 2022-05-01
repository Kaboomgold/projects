import { AjaxHandler } from "./ajax-handler.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class ScriptsViewer {

    #scripts_element = null;

    constructor(scripts_element) {
        this.#scripts_element = scripts_element;
        this.#generateScripts();

        const file_menu = scripts_element.querySelector('.file-menu');
        const file_menu_btn = scripts_element.querySelector('.file-menu-btn');
        
        file_menu_btn.addEventListener('click', e => {
            file_menu_btn.classList.toggle('active');
            file_menu.classList.toggle('open');
        }, false);
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