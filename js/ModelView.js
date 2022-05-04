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
    #controls = null;
    #animeMixer = null;
    #animeAction = null;
    #animeActions = [];
    #clock = new THREE.Clock();
    #selectedAnimation = null;
    #animation_names = [];
    #on_model_loaded = null;
    
    width = 100;
    height = 100;

    constructor(model_url, on_model_loaded) {
        this.#model_url = model_url;
        this.#on_model_loaded = on_model_loaded;

        this.#Init();
        this.#loadModel();
        this.#createLightning();
        this.#createFloor();
        
        this.#scene.background = new THREE.Color(0x327da8);

        this.#domElement = this.#renderer.domElement;
        this.#renderer.setSize( this.width, this.height );
        this.#renderer.shadowMap.enabled = true;
        this.#renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
        this.#camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
        this.#renderer = new THREE.WebGLRenderer({ antialising: true });
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    }

    #createLightning() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0.8, 1.4, 1.0);
        light.intensity = 1;
        light.castShadow = true;
        light.shadow.mapSize.width = 1080;
        light.shadow.mapSize.height = 1080;
        this.#scene.add(light);
    }

    #createFloor() {
        const floor = new THREE.PlaneGeometry(10, 10);
        const mat = new THREE.MeshStandardMaterial({color: 0x999999});
        const mesh = new THREE.Mesh(floor, mat);

        floor.rotateX(THREE.Math.degToRad(-90));
        mesh.receiveShadow = true;

        this.#scene.add(mesh);
        
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

                }
                object.castShadow = true;
                object.receiveShadow = true;

                object.children.forEach(mesh => {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                });
                
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

    setRendererSize(x, y) {
        this.#camera.aspect = x/y;
        this.#camera.updateProjectionMatrix();
        this.#renderer.setSize(x, y);
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