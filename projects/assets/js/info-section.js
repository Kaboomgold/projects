
import { AjaxHandler } from "./ajax-handler";

class Info_Section_Handler {

    #name = '';
    #sections = [];

    constructor(asset_name) {
        this.#name = asset_name;
    }

    add_info_section(info_section) {
        const section = new Info_Section(this.#name);
    }
}

class Info_Section {

    #main_element = null;
    #section_value = '';
    #section_name = '';
    #asset_name = '';

    constructor(section_element) {
        this.#main_element = section_element;
    }

    Update() {
        AjaxHandler.Ajax_JSON_Request();
    }

}