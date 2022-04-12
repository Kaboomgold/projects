import * as THREE from './three.js-master/src/Three.js';
import { FBXLoader } from './three.js-master/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'

class ModelViewManager {
    static #views = [];

    static createModelView(model_url, width, height) {
        const modelView = new ModelView(model_url, width, height);
        this.#views.push(modelView);
        return modelView;
    }

    static renderModelView() {
        for(let i = 0; i < this.#views.length; i++) {
            this.#views[i].render();
        }
    }
}

class ModelView {
    #model_url;
    #scene;
    #camera;
    #renderer;
    #domElement;
    #width;
    #height;
    #controls;

    constructor(model_url, width, height) {
        this.#model_url = model_url;
        this.#width = width;
        this.#height = height;

        this.#loadModel();
        this.#Init();
        this.#createLightning();

        this.#domElement = this.#renderer.domElement;
        this.#renderer.setSize( this.#width, this.#height );

        this.#camera.position.z = 2;
        this.#camera.position.y = 1;

        this.#controls.enableDamping = true;
        this.#controls.target.set(0, 1, 0);
    }

    get domElement() {
        return this.#domElement;
    }

    #Init() {
        this.#scene = new THREE.Scene();
        this.#camera = new THREE.PerspectiveCamera(75, this.#width/this.#height, 0.1, 1000);
        this.#renderer = new THREE.WebGLRenderer();
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    }

    #createLightning() {
        const ambientLight = new THREE.AmbientLight();
        this.#scene.add(ambientLight);

        const light = new THREE.PointLight();
        light.position.set(0.8, 1.4, 1.0);
        this.#scene.add(light);
    }

    #loadModel() {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
            `models/${this.#model_url}`,
            (object) => {
                this.#scene.add(object);
            },
            (xhr) => {
                //console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        this.#renderer.render(this.#scene, this.#camera);
    }
}


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