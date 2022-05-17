
import { AjaxHandler } from "./ajax-handler.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class Info_Section_Handler {

    static info_section_ajax_handler = '../assets/php/ajax/add-info-section.php';
    static section_classes = [];
    #info_section_container = document.querySelector('.info-container');
    #target_asset_name = '';
    #info_sections = [];

    constructor(asset_name) {
        this.#target_asset_name = asset_name;
        this.#info_section_container.innerHTML = '';

        this.generate_info_sections();
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

            for(const [key, value] of Object.entries(info_sections)) {
                const classes = Info_Section_Handler.section_classes;

                for(let i = 0; i < classes.length; i++) {

                    if(key == classes[i].INFO_TYPE) {
                        const info_obj = this.add_info_section(classes[i]);
                        info_obj.set_value(value);
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
}

class Info_Section {
    
    _section_element = document.createElement('div');
    _wrapper = document.createElement('wrapper');
    _section_name = '';
    #asset_name = '';
    section_value = '';

    constructor(target_asset_name) {
        this.#asset_name = target_asset_name;
        this.INFO_TYPE = this.constructor.name;
    }

    get domElement() {
        return this._section_element;
    }

    get Name() {
        return this._section_name;
    }

    static initialize(class_name) {
        Info_Section_Handler.section_classes.push(class_name);
    }

    #create_section_obj(action_type) {
        let obj = {
            name: this.#asset_name,
            action: action_type,
            info_sections: {}
        }

        obj.info_sections[this._section_name] = this.section_value;

        return obj;
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

}

class Info_Section_function extends Info_Section {

    static section_id = 0;

    #wrapper = document.createElement('div');
    #inputs = {};
    #update_btn = document.createElement('button');
    #delete_btn = Dom_Utils.element({
        tagName: 'button',
        className: 'update',
        textContent: 'Update'
    });

    #types = ['int', 'bool', 'array', 'float', 'double'];
    static INFO_TYPE = "function";

    static { this.initialize(this) }

    constructor(asset_name) {
        super(asset_name);
        this.#init_elements();
        this.#add_delete_event();
        this.#add_update_event();
        this.#description();
        Info_Section_function.section_id++;
    }

    #init_elements() {

        this.#update_btn.type = 'button';
        this.#update_btn.className = 'update';
        this.#update_btn.textContent = 'Update';
        
        this.#delete_btn.type = 'button';
        this.#delete_btn.className = 'delete';
        this.#delete_btn.textContent = 'Delete';

        const return_type = Dom_Utils.element({
            tagName: 'select',
        });

        this.#types.forEach(type => {
            return_type.append(Dom_Utils.element({
                tagName: 'option',
                textContent: type
            }));
        });

        this.#inputs['return_type'] = return_type;

        // description
        // notes
        // return type
        // name
        // parameters
        // inner body
        // use case
        // function type
        // accesability
        // references

        this.#wrapper.append(return_type);
        this._section_element.append(this.#wrapper, this.#update_btn, this.#delete_btn);
    }

    #description() {
        const description_input = Dom_Utils.element({
            tagName: 'textarea',
            name: `function-description-${Info_Section_function.section_id}`,
        });

        const description = Dom_Utils.element({
            children: description_input,
        });

        this.#inputs['description'] = description_input;
        this.#wrapper.append(description);
    }

    #notes() {

    }

    #return_type() {

    }

    #name() {

    }

    #add_update_event() {
        this.#update_btn.addEventListener('click', e => {
            // this.section_value = this.#input.value;
            this.Update();
        });
    }

    #add_delete_event() {
        this.#delete_btn.addEventListener('click', e => {
            this.Remove();
        });
    }

    set_value(value) {
        // this.#input.value = value;
    }

}

class Info_Section_Description extends Info_Section {

    #input = document.createElement('textarea');
    #update_btn = document.createElement('button');
    #delete_btn = document.createElement('button');
    static INFO_TYPE = "description";
    
    static { this.initialize(this) }

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'description';
        this.#init_elements();
        this.#add_update_event();
        this.#add_delete_event();
    }

    #init_elements() {
        const wrapper = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'description';

        this.#input.name = 'description';
        this.#input.id = 'description';

        this.#update_btn.type = 'button';
        this.#update_btn.className = 'update';
        this.#update_btn.textContent = 'Update';
        
        this.#delete_btn.type = 'button';
        this.#delete_btn.className = 'delete';
        this.#delete_btn.textContent = 'Delete';

        wrapper.append(p, this.#input);
        this._section_element.append(wrapper, this.#update_btn, this.#delete_btn);
    }

    #add_update_event() {
        this.#update_btn.addEventListener('click', e => {
            this.section_value = this.#input.value;
            this.Update();
        });
    }

    #add_delete_event() {
        this.#delete_btn.addEventListener('click', e => {
            this.Remove();
        });
    }

    set_value(value) {
        this.#input.value = value;
    }

}

class Info_Section_Text extends Info_Section{
    #input = document.createElement('input');
    #update_btn = document.createElement('button');
    #delete_btn = document.createElement('button');
    static INFO_TYPE = "name";

    static { this.initialize(this) }

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'name';
        this.#init_elements();
        this.#add_update_event();
        this.#add_delete_event();
    }

    #init_elements() {
        const wrapper = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'name';

        this.#input.type = 'text';
        this.#input.name = 'name';
        this.#input.id = 'name';

        this.#update_btn.type = 'button';
        this.#update_btn.className = 'update';
        this.#update_btn.textContent = 'Update'; 
        
        this.#delete_btn.type = 'button';
        this.#delete_btn.className = 'delete';
        this.#delete_btn.textContent = 'Delete';

        wrapper.append(p, this.#input);
        this._section_element.append(wrapper, this.#update_btn, this.#delete_btn);
    }

    #add_update_event() {
        this.#update_btn.addEventListener('click', e => {
            this.section_value = this.#input.value;
            this.Update();
        });
    }

    set_value(value) {
        this.#input.value = value;
    }

    #add_delete_event() {
        this.#delete_btn.addEventListener('click', e => {
            this.Remove();
        });
    }
}

export { Info_Section_Handler }