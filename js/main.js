import * as THREE from './three.js-master/src/Three.js';
import { FBXLoader } from './three.js-master/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'

// class ModelViewManager {
//     static #views = [];

//     static createModelView(model_url, width, height) {
//         const modelView = new ModelView(model_url, width, height);
//         this.#views.push(modelView);
//         return modelView;
//     }

//     static renderModelView() {
//         for(let i = 0; i < this.#views.length; i++) {
//             this.#views[i].render();
//         }
//     }
// }

// const player_model = ModelViewManager.createModelView('Player.fbx', 300, 300);
// document.body.append(player_model.domElement);

// function animate() {
//     requestAnimationFrame( animate );
//     ModelViewManager.renderModelView();
// }

// animate();

const categoryLinks = document.querySelectorAll('.category-menu > ul a');

for (let i = 0; i < categoryLinks.length; i++) {

    categoryLinks[i].addEventListener('click', () => {

        categoryLinks.forEach(link => {
            link.classList.remove('active');
        });

        categoryLinks[i].classList.add('active');
    });
}