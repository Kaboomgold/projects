import { Page } from "./page.js";
import { ModelViewer } from "./model-viewer.js";
import { Dom_Utils } from "../../../js/dom_utils.js";
import { ScriptsViewer } from "./scripts-viewer.js";
import { Info_Section_Handler } from "./info-section/info_section_handler.js";

class Models_Page extends Page {
    #model_viewer_container = this._page_domElement.querySelector('.model-viewer-container');
    #model_viewer = new ModelViewer();
    #scripts_viewer = null;
    #info_section_handler = null;

    constructor() {
        super('#three-d-assets-page');

        this.#scripts_viewer = new ScriptsViewer(this._page_domElement);
        this.#model_viewer_container.prepend(this.#model_viewer.domElement);

        this.#selected_model_loader();
        this.#setup_file_menu_events();
        this.#setup_animation_menu_selector();
        this.#add_info();

        const files = [...this._page_domElement.querySelectorAll('.file')]
        Dom_Utils.domElementSelector(files);
    }

    #add_info() {
        const section_selector = document.querySelector('.section-selector');
        const add_info_btn = document.querySelector('.add-info-button');
        const info_section_popup = this._page_domElement.querySelector('.info-section-popup');
        const open_popup_btn = this._page_domElement.querySelector('.info-section-popup-button');
        const solidify_btn = document.createElement('button');
        solidify_btn.textContent = 'solidify';
        solidify_btn.classList.add('solidify-btn');
        document.body.append(solidify_btn);

        let solid = false;
        solidify_btn.onclick = e => {
            if(this.#info_section_handler) {
                if(!solid) {
                    this.#info_section_handler.solidify_sections();
                    solid = true;
                } else {
                    this.#info_section_handler.unsolidify_sections();
                    solid = false;
                }
            }
        }

        open_popup_btn.onclick = () => {
            info_section_popup.classList.toggle('open');

            section_selector.innerHTML = '';
            Info_Section_Handler.section_classes.forEach(curr_class => {
                const option = document.createElement('option');
                option.textContent = curr_class.INFO_TYPE;
                section_selector.append(option);
            });
        }

        add_info_btn.addEventListener('click', e => {
            if(this.#info_section_handler) {
                this.#info_section_handler.add_info_section_by_info_type(section_selector.value);
            }
        });
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
            file_menu_btn.classList.toggle('active');
            file_menu.classList.toggle('open');
        }, false);

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

                this.#model_viewer_container.setAttribute('file-data', fileName);
                
                let path = '';

                // path to the file based on the structure of the file-menu
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

                this.#info_section_handler = new Info_Section_Handler(path+fileName);

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