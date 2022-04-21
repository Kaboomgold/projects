import { ModelView } from '../../../js/ModelView.js';

class AjaxHandler {

    static Ajax_JSON_Request($fileLoc, $callback = null, $data = null,  $method = 'POST') {
        const xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if($callback != null) {
                $callback(xhttp.responseText);
            }
        }

        xhttp.open($method, $fileLoc);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`ajax_data=${JSON.stringify($data)}`);
    }

}

class Utilities {
    static toggleItemInItems(items, item, className = 'active') {
        items.forEach(item => {
            item.classList.remove('active');
        })
    
        item.classList.add('active');
    }
}

const ajax_loc = './php/ajax/';

class Page {
    _modules = [];
    _page_domElement = null;

    constructor(page_class_name) {
        this._page_domElement = document.querySelector(page_class_name);
    }

    addModule(Module_mod) {
        this._modules.push(Module_mod);
        Module_mod.create();
    }
    
}

class Scripts extends Page { 
    constructor() {
        super('.scripts');
    }
}

class Module {
    _container_className = '';

    constructor(container_className) {
        this._container_className = container_className;
    }
}

class ScriptsViewer extends Module {

    constructor() {
        super('.script');
    }

    #generateScripts() {
        const scriptsList = document.querySelector('.script-list');
        const listItems = [...scriptsList.children];

        listItems.forEach(listItem => {
            listItem.addEventListener('click', e => {
                this.#getColorizedScript(listItem.textContent, colorized_script => {
                    this.#addColorizedScript(colorized_script);
                });

                Utilities.toggleItemInItems(listItems, listItem);
            });
        });
    }

    #getColorizedScript(script_name, callback) {
        AjaxHandler.Ajax_JSON_Request(`${ajax_loc}get-colorized-script-html.php`, colorized_script => {
            callback(colorized_script);
        }, { script_name: script_name });
    }

    #addColorizedScript(colorized_script) {
        document.querySelector('.scripts .script').innerHTML = colorized_script;
    }

}

generateScripts();



function generateScripts() {
    const scriptsList = document.querySelector('.script-list');
    const listItems = [...scriptsList.children];

    listItems.forEach(listItem => {
        listItem.addEventListener('click', e => {
            getColorizedScript(listItem.textContent, colorized_script => {
                addColorizedScript(colorized_script);
            });

            toggleItemInItems(listItems, listItem);
        });
    });
}

function toggleItemInItems(items, item, className = 'active') {
    items.forEach(item => {
        item.classList.remove('active');
    })

    item.classList.add('active');
}

function getColorizedScript(script_name, callback) {
    AjaxHandler.Ajax_JSON_Request(`${ajax_loc}get-colorized-script-html.php`, colorized_script => {
        callback(colorized_script);
    }, { script_name: script_name });
}

function addColorizedScript(colorized_script) {
    document.querySelector('.scripts .script').innerHTML = colorized_script;
}

class ModelViewer {
    #mv = null;
    #viewer = document.createElement('div');

    viewModel(path_to_model) {
        this.#mv = new ModelView(path_to_model, 300, 300);
        this.#viewer.append(this.#mv.domElement);
        this.#animateViewer();
    }

    #animateViewer() {
        requestAnimationFrame( () => this.#animateViewer() );
        this.#mv.render();
    }

    get domElement() {
        return this.#viewer;
    }
}

const model_viewer = new ModelViewer();
document.getElementById('3d-assets-page').append(model_viewer.domElement);

model_viewer.viewModel('../src/models/Player.fbx');
