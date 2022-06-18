import { BufferAttribute } from "../../../../js/three.js-master/src/Three.js";
import { AjaxHandler } from "../ajax-handler.js";
import { Info_Section_Handler } from "./info_section_handler.js";
import { DOMInputFunctionality } from "../Utils/dom-input-functionality.js";

class Info_Section {
    
    static gen_section_id = 0;
    
    #asset_name = '';

    _inputs = [];
    _section_element = document.createElement('div');
    _wrapper = document.createElement('wrapper');
    _section_name = '';
    _update_btn = document.createElement('button');
    _delete_btn = document.createElement('button');
    _f_inputs = [];

    section_id = 0;
    section_value = '';

    constructor(target_asset_name) {
        this.#asset_name = target_asset_name;
        this._section_element.classList.add('info-section');
        this.INFO_TYPE = this.constructor.name;
        if(this.section_id == 0){
            Info_Section.gen_section_id++;
            this.section_id = Info_Section.gen_section_id;
        }
        this.#set_buttons();
    }

    get domElement() {
        return this._section_element;
    }

    get Name() {
        return this._section_name;
    }

    #set_buttons() {
        this._update_btn.type = 'button';
        this._update_btn.className = 'update';
        this._update_btn.textContent = 'Update';
        
        this._delete_btn.type = 'button';
        this._delete_btn.className = 'delete';
        this._delete_btn.textContent = 'Delete';

        this._update_btn.addEventListener('click', e => {
            this.Update();
        });

        this._delete_btn.addEventListener('click', e => {
            this.Remove();
        });
    }

    #create_section_obj(action_type) {
        let obj = {
            name: this.#asset_name,
            action: action_type,
            info_sections: {}
        }

        obj.info_sections["id"] = this.section_id;

        obj.info_sections['info'] = {};
        obj.info_sections['info']['info_type'] = this._section_name;
        obj.info_sections['info']['values'] = {};

        this._inputs.forEach(input => {
            obj.info_sections['info']['values'][input.name] = input.value;
        });

        return obj;
    }

    _add_input(name, type, default_val = '') {
        const input = document.createElement('input');
        input.name = name;
        input.type = type;

        if(default_val) {
            input.value = default_val;
        }

        const f_input = new DOMInputFunctionality(input);
        this._f_inputs.push(f_input);
        f_input.make_sizable();

        this._inputs.push(input);
        return input;
    }

    _add_select(name, options, default_val = '') {
        const select = document.createElement('select');
        select.name = name;

        options.forEach(option_text => {
            let option = document.createElement('option');
            option.textContent = option_text;
            option.value = option_text;
            select.append(option);
        });

        if(default_val) {
            select.value = default_val;
        }

        const f_input = new DOMInputFunctionality(select);
        this._f_inputs.push(f_input);
        f_input.make_sizable();

        this._inputs.push(select);
        return select;
    }

    _add_textarea(name) {
        const textarea = document.createElement('textarea');
        textarea.name = name;

        const f_input = new DOMInputFunctionality(textarea);
        this._f_inputs.push(f_input);

        this._inputs.push(textarea);
        return textarea;
    }

    Update() {
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, this.#create_section_obj('add'));
    }

    Remove() {
        this._section_element.remove();
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, this.#create_section_obj('remove'));
    }

    Remove_key(keys) {
        let section_object = this.#create_section_obj('remove_key');
        section_object.info_sections['key'] = keys;
        
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, section_object);
    }

    set_value(values) {
        const keys = Object.keys(values);
        const key_count = keys.length-1;

        keys.forEach((key, index) => {
            if(key != 'info_type') {

                this._inputs.forEach(input => {
                    if(input.name == key) {
                        input.value = values[key];
                    }
                });

                this.create_dynamic_inputs(key, values[key]);

                if(key_count == index) {
                    this._f_inputs.forEach(f_input => {
                        f_input.make_sizable();
                    })
                }
            }
        });
    }


    solidify() {
        this._f_inputs.forEach(input => {
            input.solidify(document.createElement('span'));
        });

        const buttons = [...this._section_element.querySelectorAll('button')];
        buttons.forEach(button => {
            button.style.display = 'none';
        });
        
    }

    unsolidify() {
        this._f_inputs.forEach(input => {
            input.unsolidify(document.createElement('span'));
        });

        const buttons = [...this._section_element.querySelectorAll('button')];
        buttons.forEach(button => {
            button.style.display = 'inline';
        });
    }

    _init_input_functionality() {
        const inputs = [...this._section_element.querySelectorAll('input, select, textarea')];


        if(this._f_inputs.length > 0) this._f_inputs = [];
        inputs.forEach(input => {
            const f_input = new DOMInputFunctionality(input);
            f_input.make_sizable();
            this._f_inputs.push(f_input);
        });
    }

    create_dynamic_inputs(key, value) {
        return null;
    }

}
export { Info_Section };