import { ModelView } from "../../../js/ModelView.js";

class ModelViewer {
    #mv = null;
    #viewer = document.createElement('div');
    on_model_loaded = null;

    constructor() {
        this.#viewer.className = 'model_viewer_container';
    }

    viewModel(path_to_model) {
        this.#viewer.innerHTML = '';

        this.#mv = new ModelView(path_to_model, obj => {

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

                if(typeof(this.on_model_loaded) == 'function') {
                    this.on_model_loaded({'animation_menu': ul});
                }
            }
        });

        const { width, height } = this.#viewer.getBoundingClientRect();
        this.#mv.setRendererSize(width,height);

        window.addEventListener('resize', () => {
            const { width, height } = this.#viewer.getBoundingClientRect();
            this.#mv.setRendererSize(width,height);
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

export { ModelViewer };