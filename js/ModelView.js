import * as THREE from './three.js-master/src/Three.js';
import { FBXLoader } from './three.js-master/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer } from './three.js-master/src/animation/AnimationMixer.js';
import { AnimationAction } from './three.js-master/src/animation/AnimationAction.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'

class ModelView {
    #model_url = null;
    #scene = null;
    #camera = null;
    #renderer = null;
    #domElement = null;
    #width = 100;
    #height = 100;
    #controls = null;
    #animeMixer = null;
    #animeAction = null;
    #animeActions = [];
    #clock = new THREE.Clock();
    #selectedAnimation = null;
    #animation_names = [];
    #on_model_loaded = null;

    constructor(model_url, width, height, on_model_loaded) {
        this.#model_url = model_url;
        this.#width = width;
        this.#height = height;
        this.#on_model_loaded = on_model_loaded;

        this.#loadModel();
        this.#Init();
        this.#createLightning();

        this.#domElement = this.#renderer.domElement;
        this.#renderer.setSize( this.#width, this.#height );

        this.#camera.position.z = 2;
        this.#camera.position.y = 1;

        this.#controls.enableDamping = false;
        this.#controls.target.set(0, 1, 0);
    }

    get domElement() {
        return this.#domElement;
    }

    get animationNames() {
        return this.#animation_names;
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
                this.#animeMixer = new AnimationMixer(object);

                if(object.animations.length > 0) {
                    object.animations.forEach(animation => {
                        this.#animation_names.push(animation.name);

                        const action = new AnimationAction(this.#animeMixer, animation, object);
                        action.loop = THREE.LoopRepeat;
                        this.#animeActions.push({'name':animation.name, 'action':action});
                    });

                    this.#animeActions[0].action.play();
                }
                
                this.#on_model_loaded(this);

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

    playAnimation(animeName) {
        this.#animeActions.forEach(animationAction => {
            if(animationAction.name == animeName) {

                if(this.#selectedAnimation != null) {
                    this.#selectedAnimation.action.stop();
                }

                animationAction.action.play();
                this.#selectedAnimation = animationAction;
            }
        });
    }

    render() {
        if(this.#animeMixer != null) {
            this.#animeMixer.update(this.#clock.getDelta());
        }
        this.#renderer.render(this.#scene, this.#camera);
    }
}

export { ModelView }