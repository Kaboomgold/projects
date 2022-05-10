class StyleRule {
    #rule = '';
    #index = 0;
    #stylesheet = null;

    constructor(rule, index, stylesheet) {
        this.#rule = rule;
        this.#index = index;
        this.#stylesheet = stylesheet;
        stylesheet.insertRule(rule, index);
    }

    remove() {
        this.#stylesheet.deleteRule(this.#index);
    }

    refresh(rule) {
        this.#stylesheet.deleteRule(this.#index);
        this.#stylesheet.insertRule(rule, this.#index);
    }
}

class Stylesheet {
    #stylesheet = null;
    #styleRules = {};

    constructor(stylesheet) {
        this.#stylesheet = stylesheet;
    }

    AddStyleRule(rule, id) {
        this.#styleRules[id] = new StyleRule(rule, this.#stylesheet.cssRules.length, this.#stylesheet);
    }

    RemoveStyleRule(id) { 
        this.#styleRules[id].remove();
        delete this.#styleRules[id];
    }

    RefreshStyleRule(rule, id) {
        if(id in this.#styleRules) {
            this.#styleRules[id].refresh(rule);
        } else {
            this.AddStyleRule(rule, id);
        }
    }
}

class StyleSheetHandler {

    #stylesheets = {};

    NewStyleSheet(id, style) {
        const stylesheet = new CSSStyleSheet();
        
        if(style) {
            stylesheet.replaceSync(style);
        }
        
        const stylesheetObj = new Stylesheet(stylesheet);
        this.#stylesheets[id] = stylesheetObj;
        document.adoptedStyleSheets = [stylesheet];

        return stylesheetObj;
    }

    GetStylesheet(id) {
        return this.#stylesheets[id];
    }

}

export { StyleSheetHandler };