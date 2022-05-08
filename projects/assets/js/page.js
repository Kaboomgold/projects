class Page {
    _modules = [];
    _page_domElement = null;

    constructor(page_class_name) {
        this._page_domElement = document.querySelector(page_class_name);
    }

    addModule(Module_mod) {
        this._modules.push(Module_mod);
        Module_mod.create();
    }
    
}

export { Page }