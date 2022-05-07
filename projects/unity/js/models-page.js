import { Page } from "./page.js";
import { ModelViewer } from "./model-viewer.js";
import { Dom_Utils } from "../../../js/dom_utils.js";
import { ScriptsViewer } from "./scripts-viewer.js";

class Models_Page extends Page {
    #model_viewer_container = this._page_domElement.querySelector('.model-viewer-container');
    #model_viewer = new ModelViewer();
    #scripts_viewer = null;

    constructor() {
        super('#three-d-assets-page');

        this.#scripts_viewer = new ScriptsViewer(this._page_domElement);
        this.#model_viewer_container.prepend(this.#model_viewer.domElement);

        this.#selected_model_loader();
        this.#setup_file_menu_events();
        this.#setup_animation_menu_selector();

        const files = [...this._page_domElement.querySelectorAll('.file')]
        Dom_Utils.domElementSelector(files);
    }

    #setup_animation_menu_selector() {
        this.#model_viewer.on_model_loaded = (obj) => {
            const menu_items = obj.animation_menu.querySelectorAll('li');
            Dom_Utils.domElementSelector(menu_items);
        }
    }

    #setup_file_menu_events() {
        const file_menu = this._page_domElement.querySelector('.file-menu');
        const file_menu_btn = document.querySelector('.file-menu-btn');
        const file_menu_close_btn = this._page_domElement.querySelector('.file-menu-close-btn');
        
        Dom_Utils.addSimpleDrag(file_menu);
        Dom_Utils.addSimpleDragTouch(file_menu);

        file_menu_close_btn.addEventListener('click', e => {
            e.preventDefault();
            file_menu_btn.classList.toggle('active');
            file_menu.classList.toggle('open');
        }, false);

        file_menu_btn.addEventListener('click', e => {
            e.preventDefault();
            file_menu_btn.classList.toggle('active');
            file_menu.classList.toggle('open');
        }, false);
    }

    #selected_model_loader() {
        const files = [...this._page_domElement.querySelectorAll('.file')];
        files.forEach(file => {
            file.addEventListener('click', e => {
                e.preventDefault();
                const fileName = file.querySelector('p').textContent;
                const texture_viewer = this.#model_viewer_container.querySelector('.texture-viewer');

                let path = '';

                function getPath(element){

                    if(parent = element.parentElement) {
                        if(parent.classList.contains('file-menu')) return;
                        
                        if (parent.classList.contains('sub-menu')) {
                            const folderName = parent.querySelector('.folder > p').textContent;
                            path = folderName + '/' + path;
                            getPath(parent);
                        } else {
                            getPath(parent);
                        }
                    }
                }
                getPath(file);

                if(fileName.match(/.png|.jpg/)) {

                    texture_viewer.style.cssText = `background-image: url('./src/${path+fileName}');`;
                    this.#scripts_viewer.clear();
                    this.#model_viewer.clear();

                } else if (fileName.match(/.fbx/)) {

                    texture_viewer.style.cssText = '';
                    this.#scripts_viewer.clear();
                    this.#model_viewer.viewModel(`../src/${path+fileName}`);

                } else if (fileName.match(/.cs|.json|.txt/)) {

                    texture_viewer.style.cssText = '';
                    this.#model_viewer.clear();
                    this.#scripts_viewer.viewScript(path+fileName);

                }

            });
        });
    }
}

export { Models_Page }