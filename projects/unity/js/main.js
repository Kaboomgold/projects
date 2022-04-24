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
    
    constructor() {
        this.#viewer.className = 'model_viewer_container';
    }

    viewModel(path_to_model) {
        this.#viewer.innerHTML = '';
        this.#viewer.style.width = `${700}px`;

        this.#mv = new ModelView(path_to_model, 700, 700, obj => {

            const old_ul = document.querySelector('.animation-menu');
            if(old_ul != null) {
                old_ul.remove();
            }

            if(obj.animationNames.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'animation-menu';

                obj.animationNames.forEach(name => {
                    const li = document.createElement('li');
                    li.textContent = name;

                    li.addEventListener('click', () => {
                        obj.playAnimation(name);
                    });

                    ul.append(li);
                })

                this.#viewer.append(ul);
            }
        });
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
document.querySelector('#three-d-assets-page > .main-content').append(model_viewer.domElement);

const models_dir = '../src/models/';

const object_select = document.querySelector('.object-selection');

model_viewer.viewModel(models_dir+object_select.value);

object_select.addEventListener('change', e => {
    model_viewer.viewModel(models_dir+object_select.value);
});
