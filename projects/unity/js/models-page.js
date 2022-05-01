import { Page } from "./page.js";
import { ModelViewer } from "./model-viewer.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class Models_Page extends Page {
    #models_dir = '../src/models/';
    #model_viewer_container = this._page_domElement.querySelector('.model-viewer-container');
    #model_viewer = new ModelViewer();

    constructor() {
        super('#three-d-assets-page');

        this.#model_viewer_container.prepend(this.#model_viewer.domElement);

        this.#selected_model_loader();
        this.#setup_file_menu_events();
        this.#setup_animation_menu_selector();
    }

    #setup_animation_menu_selector() {
        this.#model_viewer.on_model_loaded = (obj) => {
            const menu_items = obj.animation_menu.querySelectorAll('li');
            Dom_Utils.domElementSelector(menu_items);
        }
    }

    #setup_file_menu_events() {
        const file_menu = this._page_domElement.querySelector('.file-menu');
        const file_menu_btn = this._page_domElement.querySelector('.file-menu-btn');
        
        file_menu_btn.addEventListener('click', e => {
            file_menu_btn.classList.toggle('active');
            file_menu.classList.toggle('open');
        }, false);
    }

    #selected_model_loader() {
        const files = [...this._page_domElement.querySelectorAll('.file')];
        files.forEach(file => {
            file.addEventListener('click', e => {
                const fileName = file.querySelector('p').textContent;
                const texture_viewer = this.#model_viewer_container.querySelector('.texture-viewer');

                // let path = '';

                // function getPath(element){

                //     if(parent = element.parentElement) {

                //         if(parent.classList.contains('file-menu')) {

                //         } else if (parent.classList.contains('sub-menu')) {
                //             const folderName = parent.querySelector('.folder > p').textContent;
                //             path += folderName;
                //             getPath(parent);
                //         } else {
                //             getPath(parent);
                //         }
                //     }
                // }
                // getPath(file);
                // console.log(path + ' | ' + fileName);

                if(fileName.match(/.png|.jpg/)) {
                    texture_viewer.style.cssText = `background-image: url('./src/models/${fileName}');`;
                } else {
                    texture_viewer.style.cssText = '';
                    this.#model_viewer.viewModel(this.#models_dir+fileName);
                }

            });
        });
    }
}

export { Models_Page }