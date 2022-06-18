import { AjaxHandler } from "../ajax-handler.js";
import { Info_Section_Function } from "./info-section-function.js";

class Info_Section_Handler {

    static info_section_ajax_handler = '../assets/php/_RIGN/ajax/add-info-section.php';
    static section_classes = [];

    #info_section_container = document.querySelector('.info-container');
    #target_asset_name = '';
    #info_sections = [];

    constructor(asset_name) {
        this.#target_asset_name = asset_name;
        this.#info_section_container.innerHTML = '';

        this.register_class(Info_Section_Function);

        this.generate_info_sections();
    }

    get Info_Classes() {
        return Info_Section_Handler.section_classes;
    }

    register_class(info_class) {
        if(Info_Section_Handler.section_classes.indexOf(info_class) == -1) {
            Info_Section_Handler.section_classes.push(info_class);
        }
    }

    add_info_section_by_info_type(info_type) {
        const classes = Info_Section_Handler.section_classes;

        for(let i = 0; i < classes.length; i++) {
            if(info_type == classes[i].INFO_TYPE) {
                this.add_info_section(classes[i]);
            }
        }
    }

    generate_info_sections() {
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            const info_sections = JSON.parse(response);

            const classes = Info_Section_Handler.section_classes;
            for(const [id, info_section] of Object.entries(info_sections)) {
                for(let i = 0; i < classes.length; i++) {

                    if(info_section.info_type == classes[i].INFO_TYPE) {
                        const info_obj = this.add_info_section(classes[i]);
                        info_obj.section_id = id;
                        info_obj.set_value(info_section.values);
                    }
                }
            }

        }, { name: this.#target_asset_name, action: 'get' });
    }

    add_info_section(info_section) {
        const info_section_obj = new info_section(this.#target_asset_name);
        this.#info_sections.push(info_section_obj);
        this.#info_section_container.append(info_section_obj.domElement);
        return info_section_obj;
    }

    change_section_value(name, value) {
        this.#info_sections.forEach(info_section => {
            if(info_section.Name == name) {
                info_section.section_value = value;
                info_section.Update();
            } else {
                console.warn(`No info section found with that name.`);
            }
        });
    }

    solidify_sections() {
        this.#info_sections.forEach(info_section => {
            info_section.solidify();
        });
    }

    unsolidify_sections() {
        this.#info_sections.forEach(info_section => {
            info_section.unsolidify();
        });
    }
}
export { Info_Section_Handler }