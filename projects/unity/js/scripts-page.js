import { Page } from "./page.js";
import { ScriptsViewer } from "./scripts-viewer.js";

class Scripts_Page extends Page { 
    constructor() {
        super('.scripts');
        const sv = new ScriptsViewer();
    }
}

export { Scripts_Page }