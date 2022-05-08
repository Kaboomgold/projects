import { ModelView } from "../../../js/ModelView.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class ModelViewer {
    #mv = null;
    #viewer = document.createElement('div');
    on_model_loaded = null;

    constructor() {
        this.#viewer.className = 'model_viewer_container';
    }

    clear() {
        this.#viewer.innerHTML = '';
    }

    viewModel(path_to_model) {
        this.clear();

        this.#mv = new ModelView(path_to_model, obj => {

            const old_ul = document.querySelector('.animation-menu');
            if(old_ul != null) {
                old_ul.remove();
            }

            if(obj.animationNames.length > 0) {
                
                const anime_list = this.#createAnimationList(obj);
                this.#viewer.append(anime_list);

                Dom_Utils.domElementSelector(anime_list);

                if(typeof(this.on_model_loaded) == 'function') {
                    this.on_model_loaded({'animation_menu': anime_list});
                }
            }
        });

        this.#setSize();
        window.addEventListener('resize', () => {
            this.#setSize();
        });
        
        this.#viewer.append(this.#mv.domElement);
        this.#animateViewer();
    }

    #createAnimationList(obj) {
        const ul = document.createElement('ul');
        ul.className = 'animation-menu';

        obj.animationNames.forEach(name => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            
            li.innerHTML = `<p>${name}</p><span></span>`;

            li.addEventListener('click', () => {
                obj.playAnimation(name);
            });

            ul.append(li);
        });

        return ul;
    }

    #setSize() {
        const { width, height } = this.#viewer.getBoundingClientRect();
        this.#mv.setRendererSize(width,height);
    }

    #animateViewer() {
        requestAnimationFrame( () => this.#animateViewer() );
        this.#mv.render();
    }

    get domElement() {
        return this.#viewer;
    }
}

export { ModelViewer };