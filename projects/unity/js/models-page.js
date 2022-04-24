import { Page } from "./page.js";
import { ModelViewer } from "./model-viewer.js";

class Models_Page extends Page {
    constructor() {
        super('#three-d-assets-page');
        const model_viewer = new ModelViewer();
        document.querySelector('#three-d-assets-page > .main-content').append(model_viewer.domElement);

        const models_dir = '../src/models/';
        const object_select = document.querySelector('.object-selection');

        model_viewer.viewModel(models_dir+object_select.value);

        object_select.addEventListener('change', e => {
            model_viewer.viewModel(models_dir+object_select.value);
        });
    }
}

export { Models_Page }